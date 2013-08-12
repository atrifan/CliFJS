define(['./context',
        './component_map',
        './lib/EventEmitter'], function (Context, ComponentMap, EventEmitter) {

    /**
     * The Framework module that makes all the computations and registers components to the client component
     * map.
     *
     * @name Framework
     * @constructor
     */
    function Framework() {
        /**
         * Private property of Framework defining a serie of events, to be later
         * inherited by the controller of the component.
         *
         * @type {{_init: Function, emit: Function, once: Function, on: Function, off: Function}}
         * @private
         */
    }

    /**
     * The instance of the Framework module.
     *
     * @type {Framework}
     * @private
     */
    Framework._instance = null;

    /**
     * Singleton get method of the Framework module.
     *
     * @returns {Framework}
     * @static
     */
    Framework.get = function () {
        return Framework._instance ||
            (Framework._instance = new Framework());
    }

    /**
     * Process the components configuration, requires the controller of the component and it
     * extends it with the context module and the framework ``_events`` so they can be easily used
     * as default from the controller of the component and registers the component to the clientMap.
     *
     * Rejects the promise if the controller for the client was not found or if the somehow the uniqueId was
     * already generated(javascript's random is kind of dummy).
     *
     * @param {Object} config the components configuration
     * @returns {Promise} the required component's controller.
     * @public
     */
    Framework.prototype.processComponent = function (config) {
        var deferredController = $.Deferred(),
            id = config.containerId,
            self = this;

        if(ComponentMap.get().getComponent(id)) {
            //TODO: do something here cause it is wrong
            return;
        }

        ComponentMap.get().registerComponent(id, {
            sid: config.sid,
            controller: deferredController
        });

        if(!config.clientController) {
            setTimeout(function () {
                deferredController.resolve();
            }, 0);
            return deferredController.promise();
        }

        require([config.path + '/js/' + config.clientController], function (controller) {
            jQuery.extend(controller.prototype, EventEmitter.prototype);

            var cnt = new controller(),
                context = new Context(config);

            cnt.context = context;
            deferredController.resolve(cnt);
        }, function (err) {
            deferredController.reject(err);
        });

        return deferredController.promise();
    }

    return Framework;
});
