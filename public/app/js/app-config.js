define([
        "./controllers",
        "./directives"
    ], function(controllers) {

        var phoneApp = angular.module('controllers', []);

        phoneApp.controller("Caller", ["$scope", "$http", "$rootElement", controllers["Caller"]]);
        phoneApp.controller("PhoneContacts", ["$scope", "$http", "$firebase", "$timeout", "$rootElement", controllers["PhoneContacts"]]);
        phoneApp.controller("ContactDetail", ['$scope', '$routeParams', '$http', '$firebase', controllers["ContactDetail"]]);


        // you can do some more stuff here like calling app.factory()...
    }
);
/*
var phoneApp = angular.module('phoneApp', [
    'ngRoute',
    'phoneControllers'
]);*/

