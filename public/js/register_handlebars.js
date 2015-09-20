/**
 * RegisterComponent method. Registers the component helper in the Handlebars module.
 */
define(['./component_requester'], function(ComponentRequester) {
    var registerComponent = function() {
        Handlebars.registerHelper('component', function (options) {

            var componentData = {
                    name: options.hash.name,
                    view: options.hash.view || "index",
                    sid: options.hash.sid
                },
                context = options.hash;

            return ComponentRequester.render(componentData, context);
        });

        Handlebars.registerHelper('onEvent', function (options) {
            var eventName = options.hash.name,
                injectLocation = options.hash.injectLocation;
            var id = Math.floor(Date.now() / (Math.random() * 1001) * Math.floor(Math.random() * 1001));

            console.log(injectLocation);
            eventingQueue.messageSubscribe(eventName, function (data) {
                console.log(data);
                var info = options.fn(data);
                var idInject;
                if(injectLocation) {
                    if(data.injectLocation) {
                        idInject = injectLocation + '-' + data.injectLocation;
                    }
                    $('#' + idInject).html(info);
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
