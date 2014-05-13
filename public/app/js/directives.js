define([], function () {
    var phoneApp = angular.module('directives', []);

    //complete directive
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
                function () {

                    var lastItem = parent.children("*[ complete-id = '" + id + "' ]:last");

                    if (!lastItem.length) {

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

    //ng-repeat directive
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
                function () {

                    var lastItem = parent.children("*[ repeat-complete-id = '" + id + "' ]:last");

                    if (!lastItem.length) {

                        return;

                    }

                    var itemScope = lastItem.scope();

                    if (itemScope.$last) {

                        itemScope.$eval(completeExpression);

                    }

                }
            );

        }

        return({
            compile: compile,
            priority: 1001,
            restrict: "A"
        });
    });
});