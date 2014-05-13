define(['../util/location'], function (Location) {

    function ContactDetailController($scope, $routeParams, $http, $firebase) {
        this._scope = $scope;
        this._routeParams = $routeParams;
        this._http = $http;
        this._id = $routeParams.contactId;
        this._storage = new Firebase("https://sweltering-fire-6062.firebaseio.com/phoneApp");

        this._getStaticContact();
    }

    ContactDetailController.prototype._getStaticContact = function () {
        var self = this;

        this._http.get('resources/contacts.json')
            .success(
            function (data) {
                for (var i = 0, len = data.length; i < len; i++) {
                    if (parseInt(self._id, 10) === data[i].id) {
                        self._scope.contact = data[i];
                        var birthDate = moment(parseInt(data[i].birthDate * 1000, 10));
                        var nextBirthDate = birthDate.year(moment().year());
                        if (moment().isBefore(birthDate)) {
                            self._scope.contact.daysUntil = birthDate.diff(moment(), 'days');
                        } else if (moment().isBefore(nextBirthDate)) {
                            self._scope.contact.daysUntil = nextBirthDate.diff(moment(), 'days');
                        } else {
                            nextBirthDate.add(1, 'year');
                            self._scope.contact.daysUntil = nextBirthDate.diff(moment(), 'days');
                        }
                        self._scope.contact.myPosition = Location.getCoordinates();
                    }
                }
            }
        )
    }

    return ContactDetailController;

})