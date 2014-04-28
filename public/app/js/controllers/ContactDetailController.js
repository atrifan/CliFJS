define([], function () {

    function ContactDetailController($scope, $routeParams, $http, $firebase) {
        this._scope = $scope;
        this._routeParams = $routeParams;
        this._id = $routeParams.contactId;
        this._storage = new Firebase("https://sweltering-fire-6062.firebaseio.com/phoneApp");
        var self = this;

        var online = navigator.onLine;
        console.log(online);


        var keys = $firebase(this._storage).$getIndex();
        $scope.contact = $firebase(this._storage).$child(keys[this._id - 1]);
    }

    return ContactDetailController;

})