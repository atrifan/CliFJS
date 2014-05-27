define([], function () {

    function ContactDetailController($scope, $routeParams, $http, $firebase) {
        this._scope = $scope;
        this._routeParams = $routeParams;
        this._http = $http;
        this._id = $routeParams.contactId;
        this._storage = new Firebase("https://sweltering-fire-6062.firebaseio.com/phoneApp");
        this._myPosition = document.getElementById("myPosition");
        console.log(this._myPosition);
        var mapOptions = {
            zoom: 12
        };

        this._map = new google.maps.Map(this._myPosition,
            mapOptions);
        this._getStaticContact();
        this._getPosition();
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
                        //self._scope.contact.myPosition = Location.getCoordinates();
                    }
                }
            }
        )
    }

    ContactDetailController.prototype._getPosition = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this._showPosition.bind(this));
        } else {
            this._showPosition(null);
        }
    }

    ContactDetailController.prototype._showPosition = function (position) {
        if (!position) {
            this._myPosition.text("No position available");
            return;
        }

        var pos = new google.maps.LatLng(position.coords.latitude,
            position.coords.longitude);

        var infowindow = new google.maps.InfoWindow({
            map: this._map,
            position: pos,
            content: 'Your location'
        });

        this._map.setCenter(pos);

    }

    return ContactDetailController;

})