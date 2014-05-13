define([
    "./controllers",
    "./directives"
], function (controllers) {

        var phoneApp = angular.module('controllers', []);

        phoneApp.controller("Caller", ["$scope", "$http", "$rootElement", controllers["Caller"]]);
        phoneApp.controller("ContactDetail", ['$scope', '$routeParams', '$http', '$firebase', controllers["ContactDetail"]]);

    }
);

