define([], function () {
    var phoneApp = angular.module('directives', []);

    phoneApp.directive('complete', function ($rootScope) {
        var uuid = 0;

        function compile(tElement, tAttributes) {
            var id = ++uuid;

            tElement.attr("complete-id", id);

            tElement.removeAttr("complete");
            var completeExpression = tAttributes.complete;
            var parent = tElement.parent();
            var parentScope = ( parent.scope() || $rootScope );


            var unbindWatcher = parentScope.$watch(
                function() {

                    // Now that we're in a digest, check to see
                    // if there are any ngRepeat items being
                    // rendered. Since we want to know when the
                    // list has completed, we only need the last
                    // one we can find.
                    var lastItem = parent.children( "*[ complete-id = '" + id + "' ]:last" );

                    // If no items have been rendered yet, stop.
                    if ( ! lastItem.length ) {

                        return;

                    }

                    var itemScope = lastItem.scope();

                    unbindWatcher();

                    itemScope.$eval(completeExpression);


                }
            );

        }
        return({
            compile: compile,
            priority: 1001,
            restrict: "A"
        });

    });
    phoneApp.directive('repeatComplete', function ($rootScope) {
        var uuid = 0;

        function compile(tElement, tAttributes) {
            var id = ++uuid;

            tElement.attr("repeat-complete-id", id);

            tElement.removeAttr("repeat-complete");
            var completeExpression = tAttributes.repeatComplete;
            var parent = tElement.parent();
            var parentScope = ( parent.scope() || $rootScope );

            var unbindWatcher = parentScope.$watch(
                function() {

                    // Now that we're in a digest, check to see
                    // if there are any ngRepeat items being
                    // rendered. Since we want to know when the
                    // list has completed, we only need the last
                    // one we can find.
                    var lastItem = parent.children( "*[ repeat-complete-id = '" + id + "' ]:last" );

                    // If no items have been rendered yet, stop.
                    if ( ! lastItem.length ) {

                        return;

                    }

                    // Get the local ng-repeat scope for the item.
                    var itemScope = lastItem.scope();

                    // If the item is the "last" item as defined
                    // by the ng-repeat directive, then we know
                    // that the ng-repeat directive has finished
                    // rendering its list (for the first time).
                    if ( itemScope.$last ) {

                        // Stop watching for changes - we only
                        // care about the first complete rendering.
                        // unbindWatcher();

                        // Invoke the callback.
                        itemScope.$eval(completeExpression);

                    }

                }
            );

        }

        // Return the directive configuration. It's important
        // that this compiles before the ngRepeat directive
        // compiles the DOM node.
        return({
            compile: compile,
            priority: 1001,
            restrict: "A"
        });
    });
});