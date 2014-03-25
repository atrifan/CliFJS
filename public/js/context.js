define(['./component_map',
        './messaging'], function (ComponentMap, Messaging) {

    /**
     * The component's controller execution context this module is being injected in the controller
     * of the component so that it methods can easily be used from the component's controller.
     *
     * @param {Object} config the component's configuration.
     * @name Context
     * @constructor
     */
    function Context(config) {
        /**
         * The component's containerId
         *
         * @type {String}
         * @private
         */
        this._parentId = config.containerId;

        /**
         * The messaging queue module so the components can easily use it for communication.
         *
         * @type {Messaging}
         * @public
         */
        this.messaging = Messaging.get();

        /**
         * The Storage module
         * @type {Firebase}
         * @public
         */
        this.storrage = new Firebase("https://sweltering-fire-6062.firebaseio.com");
    }

    /**
     * Retrieves the container of the component.
     *
     * @returns {jQuery|HTMLElement}
     * @public
     */
    Context.prototype.getRoot = function () {
        return $('#' + this._parentId);
    };

    /**
     * Get a component's controller depending on there ``sid`` (Singular ID).
     *
     * @param {String} sid the Singular ID passed in the sid parameter in the component's helper.
     * @returns {Promise} the controller for that component.
     * @public
     */
    Context.prototype.getComponent = function (sid) {
        var componentMap = ComponentMap.get().getComponentMap();

        for (var component in componentMap) {
            if (componentMap[component].sid === sid) {
                return componentMap[component].controller;
            }
        }
    }

    Context.prototype.delete = function (sid) {
        var componentMap = ComponentMap.get().getComponentMap();
        for (var component in componentMap) {
            if (componentMap[component].sid === sid) {
                ComponentMap.get().removeComponent(component);
                //must remove CSS
                var domElement = $('#' + component);
                domElement.remove();
            }
        }

    }

    Context.prototype.replace = function (sid, componentConfig) {
        //implement replace functionality
        var componentMap = ComponentMap.get().getComponentMap(),
            domElement;
        for (var component in componentMap) {
            if (componentMap[component].sid === sid) {
                domElement = $('#' + component).parent();
            }
        }

        this.delete(sid);
        //register an put stuff her
        var handlebarContext = '{{component ';
        for(var key in componentConfig) {
            handlebarContext += key + '="' + componentConfig[key] + '"';
        }
        handlebarContext += "}}"
        var content = Handlebars.compile(handlebarContext)
        domElement.html(content);
    }

    Context.prototype.insert = function(element, componentConfig) {

        var handlebar = '{{component ';
        for (var handlebarInfo in componentConfig.handleBar) {
            handlebar += handlebarInfo + '="' + componentConfig.handleBar[handlebarInfo] + '"';
        }

        for (var handlebarInfo in componentConfig.context) {
            handlebar += handlebarInfo + '="' + componentConfig.context[handlebarInfo] + '"';
        }

        handlebar += "}}";

        console.log(componentConfig.context);
        var content = Handlebars.compile(handlebar);
        element.html(content);



    }

    return Context;
});
