/**
 * Created by alexandru.trifan on 20.09.2015.
 */
define(['promise',
        'componentMap'], function (Promise, ComponentMap) {

    function renderComponent(component, context) {
        var id = Math.floor(Date.now() / (Math.random() * 1001) * Math.floor(Math.random() * 1001));
        /**
         * Gets the required component's configuration from the meta.json in it's folder.
         */
        var sid = component.sid || id,
            view = component.view || 'index',
            componentName = component.name;

        var componentMap = ComponentMap.get();

        var deferred = Promise.defer();
        componentMap.registerComponent(id, {
            sid: sid,
            controller: deferred
        });

        setTimeout(function () {
            $.get('../../components/' + componentName + '/meta.json', function (config) {

                if (!config.views[view]) {
                    alert("The specified view " + view + " for component " + componentName + " was not found!");
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
                    var content = Handlebars.compile(html)(context || {});
                    var componentConfig = {
                        content: content,
                        clientController: controller,
                        templates: config.templates,
                        css: css,
                        containerId: id,
                        sid: sid,
                        path: componentURI
                    };

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
        return new Handlebars.SafeString('<div class="' + 'app-clifJs"' + 'id="' + id + '" ></div>');
    }

    return {
        render: renderComponent
    }
});
