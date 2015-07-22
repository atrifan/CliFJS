/**
 * RegisterComponent method. Registers the component helper in the Handlebars module.
 */
define([], function() {
    var registerComponent = function() {
        Handlebars.registerHelper('component', function (options) {
            var componentName = options.hash.name,
                view = options.hash.view || "index",
                context = options.hash,
                sid = options.hash.sid,
                id = Math.floor(Date.now() / (Math.random() * 1001) * Math.floor(Math.random() * 1001));
            /**
             * Gets the required component's configuration from the meta.json in it's folder.
             */
            if (!sid) {
                sid = id;
            }

            setTimeout(function () {
                $.get('../../components/' + componentName + '/meta.json', function (config) {

                    if (!config.views[view]) {
                        alert("The specified view " + view + " for component " + componentName + " was not found!")
                        //should show 404
                        return;
                    }
                    var viewConfig = config.views[view],
                        controller = viewConfig.controller,
                        css = viewConfig.css,
                        template = viewConfig.view,
                        componentURI = '../../components/' + componentName;


                    /**
                     * Gets the HTML file for that component, based on the configuration from the meta.json
                     */

                        //TODO: maybe it should support if no template an index.html
                    $.get(componentURI + '/template/' + template, function (html) {
                        var content = Handlebars.compile(html)(context);
                        var componentConfig = {
                            content: content,
                            clientController: controller,
                            templates: config.templates,
                            css: css,
                            containerId: id,
                            sid: sid,
                            path: componentURI
                        }

                        /**
                         * Calls the client_provider with the components configuration.
                         */
                        provide(componentConfig);


                    });
                });
            }, 0);

            /**
             * The container div with the unique id.
             */
            return new Handlebars.SafeString('<div class="' + 'app-clifJs"' + 'id="' + id + '" +></div>');
        });

        Handlebars.registerHelper('onEvent', function (options) {
            var eventName = options.hash.name,
                injectLocation = options.hash.injectLocation;
            var id = Math.floor(Date.now() / (Math.random() * 1001) * Math.floor(Math.random() * 1001));

            eventingQueue.messageSubscribe(eventName, function (data) {
                var info = options.fn(data);
                if(injectLocation) {
                    if(data.injectLocation) {
                        injectLocation += '-' + data.injectLocation;
                    }
                    $('#' + injectLocation).html(info);
                } else {
                    $('#' + id).html(info);
                }
            });

            if(!injectLocation) {
                return new Handlebars.SafeString('<div class="app-clifJs-event"' + 'id="' + id + '"></div>');
            }
        });


        Handlebars.registerHelper('template', function (options) {
            var id = options.hash.id;
            templateEngine[id] = options.fn;
            return {
                id: id,
                templateData: options.fn
            };
        });

        Handlebars.registerHelper('template_insert', function(options) {
            var id = options.hash.id,
                data = options.hash.data;

           return templateEngine[id](data);
        });
    }
    return registerComponent;
});
