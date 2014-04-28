define([
        "./controllers"
    ], function(controllers) {
        var phoneApp = angular.module('phoneApp');
        phoneApp.controller("Caller", controllers["Caller"]);
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

