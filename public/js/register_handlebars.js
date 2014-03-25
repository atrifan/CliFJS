/**
 * RegisterComponent method. Registers the component helper in the Handlebars module.
 */
function registerComponent() {

    Handlebars.registerHelper('component', function(options) {
        var componentName = options.hash.name,
            view = options.hash.view || "index",
            context = options.hash,
            sid = options.hash.sid,
            id = Math.floor(Date.now()/(Math.random()*1001) * Math.floor(Math.random()*1001));
            console.log(context);
        /**
         * Gets the required component's configuration from the meta.json in it's folder.
         */
        $.get('../../components/' + componentName + '/meta.json', function (config) {

            if(!config.views[view]) {
                alert("The specified view " + view + " for component " + componentName + " was not found!")
                //should show 404
                return;
            }
            console.log("---", id);
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

        /**
         * The container div with the unique id.
         */
        return new Handlebars.SafeString('<div id="' + id + '"></div>');
    });

    Handlebars.registerHelper('application', function(options) {
        var applicationName = options.hash.name,
            context = options.hash,
            sid = options.hash.sid,
            id = Math.floor(Date.now()/(Math.random()*1001) * Math.floor(Math.random()*1001));

        /**
         * Gets the required component's configuration from the meta.json in it's folder.
         */
        $.get('../../applications/' + applicationName + '/meta.json', function (config) {

            var controller = config.controller,
                css = config.css,
                template = config.view,
                applicationURI = '../../applications/' + applicationName;


            /**
             * Gets the HTML file for that component, based on the configuration from the meta.json
             */

                //TODO: maybe it should support if no template an index.html
            $.get(applicationURI + '/template/' + template, function (html) {
                var content = Handlebars.compile(html)(context);
                var applicationConfig = {
                    content: content,
                    clientController: controller,
                    css: css,
                    containerId: id,
                    sid: sid,
                    path: applicationURI
                }

                /**
                 * Calls the client_provider with the components configuration.
                 */
                provide(applicationConfig);


            });
        });

        /**
         * The container div with the unique id.
         */
        return new Handlebars.SafeString('<div id="' + id + '"></div>');
    });
}
