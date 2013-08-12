define(['./framework', './lib/promise'], function (Framework, Promise) {

    /**
     * The ClientProvider module, renders the component's css, asks the framework to process the components
     * configuration, invokes the lifeCycle of the component and inserts the component's HTML in place.
     *
     * @name ClientProvider
     * @constructor
     */
    function ClientProvider () {}

    /**
     * Renders the components css and asks the framework to process the components configuration.
     * If any error occurs it renders an error message inside the page.
     *
     * @param {Object} configuration the component's configuration
     * @public
     */
    ClientProvider.prototype.render = function (configuration) {
        this._renderCss(configuration, configuration.css, configuration.path);

        var invokeLifeCycle = function(controller) {
            controller.init();
            controller.start();
        }

        $('#' + configuration.containerId).html(configuration.content);
        $('#' + configuration.containerId).css('visibility', 'hidden');
        configuration.cssLoaded.then(function () {
            $('#' + configuration.containerId).css('visibility', 'visible');
        }, function (err) {
            //TODO: do something here
        });
        Framework.get().processComponent(configuration).then(function (controller) {
            if(controller) {
                invokeLifeCycle(controller);
            }
        }, function (err) {
            //TODO: show an error
            //show an error box;
        });
    }

    /**
     * Renders the component's css in page.
     *
     * @param {Object} configuration the components configuration
     * @param {[String]} css an array of css paths for the current component
     * @param {String} location the component's location on the server
     * @private
     */
    ClientProvider.prototype._renderCss = function (configuration, css, location) {
        if (!css) {
            return;
        }

        var deferrers = [];

        var deferred = Promise.defer();

        var head = $("head"),
            linkElement;

        for(var i = 0, len = css.length; i < len; i++) {
            var cssPath = location + '/css/' + css[i],
                sameLinks = head.find('link[href="' + cssPath + '"]');


            if (sameLinks.length === 0){
                var deferrer = Promise.defer();

                deferrers.push(deferrer);
                linkElement = document.createElement('link');
                linkElement.type = "text/css";
                linkElement.rel = "stylesheet";
                linkElement.href = cssPath;
                linkElement.onload = function () {
                    deferrer.resolve();
                }
                head.append(linkElement);
            }
        }

        configuration.cssLoaded = deferred.promise;
        Promise.all(deferrer).then(function () {
            deferred.resolve();
        }, function (err) {
            deferred.reject(err);
        });
    }

    return ClientProvider;
});
