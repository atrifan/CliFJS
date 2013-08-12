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

    return Context;
});
