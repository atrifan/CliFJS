var controllers = [
    "js/controllers/CallController.js",
    "js/controllers/ContactsController.js",
    "js/controllers/ContactDetailController.js"
];
var phoneApp = angular.module('phoneApp', [
    'ngRoutes',
    'controllers'
]);

phoneApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/call', {
                templateUrl: 'templates/call.html',
                controller: 'Caller'
            })
            .when('/contacts', {
                templateUrl: 'templates/contact-list.html',
                controller: 'Caller'
            })
            .when('/contacts/:contactId', {
                templateUrl: 'templates/contact-detail.html',
                controller: 'ContactDetail'
            })
            .otherwise({
                redirectTo: '/call'
            });
    }
]);

require(controllers, function (CallController, ContactsController, ContactDetailController) {
    phoneApp.controller("Caller", ["$scope", "$http", CallController]);
    phoneApp.controller("Caller", ["$scope", "$http", ContactsController]);
    phoneApp.controller("ContactDetail", ["scope", "$http", ContactDetailController]);
});
