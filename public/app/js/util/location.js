define(['../lib/promise'], function (Promise) {
    function Location() {
        this._deferred = Promise.defer();
        this.possition = this._deferred.promise;
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getCoordinates);
        } else {
            this._deferred.resolve('GeoLocation not available');
        }
    }

    Location.prototype.getCoordinates = function (position) {
        console.log(position);
            this._deferred.resolve(position.coords.latitude+","+position.coords.longitude);
    }

    Location._instance = null;

    Location.get = function () {
        return Location._instance ||
            (Location._instance = new Location());
    }

    return Location.get();
})