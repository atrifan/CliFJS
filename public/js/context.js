define(['./component_map',
        './lib/promise'
        ], function (ComponentMap, Promise) {

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
        this.messaging = eventingQueue;

        this._templates = config.templateInfo;

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

    Context.prototype.getChildren = function() {
        var componentMap = ComponentMap.get().getComponentMap();
        var children = ComponentMap.get()._getDeps(this._parentId);
        var theChildren = {};
        for(var i = 0; i < children.length; i++) {
            if(componentMap[children[i]]) {
                theChildren[children[i]] = componentMap[children[i]].controller;
            }
        }

        var deferred = Promise.defer();
        Promise.allKeys(theChildren).then(function(data) {
            var ids = Object.keys(data);
            var resolvedChildren = {};
            for(var i = 0; i < ids.length; i++) {
                resolvedChildren[ComponentMap.get().getComponent(ids[i]).sid] = data[ids[i]];
            }
            deferred.resolve(resolvedChildren);
        });
        return deferred.promise;
    };


    Context.prototype.delete = function (sid) {
        console.log('deleting', sid);
        var componentMap = ComponentMap.get().getComponentMap();
        console.log(componentMap.length);
        for (var component in componentMap) {
            if (componentMap[component].sid === sid || component === sid) {
                sid = componentMap[component].sid;
                this.getComponent(sid).then(function (Controller) {
                    Controller.destroy();
                });
                //ComponentMap.get().removeComponent(component);
                //must remove CSS
                ComponentMap.get().removeComponent(component);
                var domElement = $('#' + component);
                var results = ComponentMap.get()._getDeps(component);
                for (var i = 0, len = results.length; i < len; i++) {
                    console.log("element", results[i]);
                    this.delete(results[i]);
                }
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

        var content = Handlebars.compile(handlebar);
        element.html(content);



    }

    Context.prototype.insertTemplate = function(templateId, templateContext, location) {
        var domElement = $.parseHTML(unescapeHTML(this._templates[templateId](templateContext).trim()));
        location.append(domElement);
        return domElement;
    }

    function unescapeHTML(p_string)
    {
        if ((typeof p_string === "string") && (new RegExp(/&amp;|&lt;|&gt;|&quot;|&#39;/).test(p_string)))
        {
            return p_string.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, "\"").replace(/&#39;/g, "'");
        }

        return p_string;
    }
    return Context;
});
