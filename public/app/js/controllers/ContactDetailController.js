define([], function () {

    function ContactDetailController($scope, $routeParams, $http, $firebase) {
        this._scope = $scope;
        this._routeParams = $routeParams;
        this._http = $http;
        this._id = $routeParams.contactId;
        this._storage = new Firebase("https://sweltering-fire-6062.firebaseio.com/phoneApp");
        var self = this;

        this._getStaticContact();

    }

    ContactDetailController.prototype._getStaticContact = function() {
        var self = this;

        this._http.get('resources/contacts.json')
            .success(
            function(data) {
                for(var i = 0, len = data.length; i < len; i++) {
                    if(parseInt(self._id, 10) === data[i].id) {
                        self._scope.contact = data[i];
                    }
                }
            }
        )
    }

    return ContactDetailController;

})