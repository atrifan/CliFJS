define(['js/util/online'], function (Online) {
    function PhoneContacts($scope, $http, $firebase) {
        this._http = $http;
        this._scope = $scope;
        var self = this;

        this._storage = new Firebase("https://sweltering-fire-6062.firebaseio.com/phoneApp");
        this._getStaticContacts($http);


        /*
        Online.checkInternet().then(
            function () {
                self.dataExists().then(
                    function () {
                        $scope.contacts = $firebase(self._storage);
                        console.log($scope.contacts);
                    },
                    function () {
                       $http.get('resources/contacts.json')
                           .success(
                               function (data) {
                                   for (var i = 0, len = data.length; i < len; i++) {
                                       self.store(data[i]);
                                   }
                                   $scope.contacts = data;
                               }
                           )
                    }
                )
            },
            function () {
                self._getStaticContacts($http);
            }
            */
        //)

    }

    PhoneContacts.prototype._getStaticContacts = function(requester) {
        var self = this;
        requester.get('resources/contacts.json')
            .success(
                function(data) {
                    self._scope.contacts = data;
                }
            )
    }

    return PhoneContacts;
})