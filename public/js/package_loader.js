/**
 * Created by atrifan on 7/22/2015.
 */
requirejs.config({
   paths: {
       'componentMap': '/public/js/component_map',
       'clientProvider': '/public/js/client_provider',
       'modal': '/components/form/js/modal',
       'context': '/public/js/context',
       'eventEmitter': '/public/js/lib/EventEmitter',
       'framework': '/public/js/framework',
       'promise': '/public/js/lib/promise',
       'messaging': '/public/js/messaging',
       'componentRequester': '/public/js/component_requester',
       'validator': '/components/form/js/util/Validator'
   }
});
function provide(configuration) {
    if (typeof configuration === 'undefined') {
        provide(provisioningStack);
    }

    if(!window.provider) {
        provisioningStack.push(configuration);
    } else if (configuration instanceof Array) {
        for (var i = 0, len = configuration.length; i < len; i++) {
            provider.render(configuration[i]);
        }
    } else if (typeof configuration !== 'undefined'){
        provider.render(configuration);
    }

};
var provider,
    provisioningStack = [],
    eventingQueue,
    templateEngine = {
    },
    incrementalId = 0;

requirejs(['messaging', './register_handlebars', 'clientProvider'], function(Messaging, HandleBarsRegister, ClientProvider) {
    eventingQueue = Messaging.get();
    HandleBarsRegister();
    /**
     * Get all the x-handlebars-template save and replace the containers with empty html,
     * compile the saved html with handlebars and then run it.
     */
    $(document).ready(function() {
        var handlebarsTemplate = $('[type="x-handlebars-template"]'),
            templatesHTML = [];

        handlebarsTemplate.each(function () {
            var element = this;
            templatesHTML.push({
                element: this,
                content: $(this).html()
            });
            $(this).html('');
            $(this).css('visibility', 'inherit');
        });

        for(var i = 0, len = handlebarsTemplate.length; i < len; i++) {
            var aggregation = Handlebars.compile(templatesHTML[i].content);
            $(templatesHTML[i].element).append(aggregation);
        }
    });

    /**
     * Provisioning method. Provides the requested components on the client side.
     *
     * @param {Object} configuration the configuration of the component representing guidelines
     * for the provisioning method to provide the specified component.
     */
    provider = ClientProvider;
    provide();
});
