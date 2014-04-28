define(['js/lib/promise'], function (Promise) {

    function Context() {
    }

    Context.prototype._openFirebaseStorage = function () {
        this._storage = new Firebase("https://sweltering-fire-6062.firebaseio.com").child('phoneApp');
    }

    Context.prototype.store = function (data) {
        if(!this._storage) {
            this._openFirebaseStorage();
        }
        this._storage.push(data);
    }

    Context.prototype.onStorageEvent = function (event, callback) {
        if(!this._storage) {
            this._openFirebaseStorage();
        }
        this._storage.on(event, callback);
    };

    Context.prototype.dataExists = function () {
        if(!this._storage) {
            this._openFirebaseStorage();
        }
        var deferred = Promise.defer();

        this._storage.once('value', function(snapshot) {
            if(snapshot.val() !== null) {
                deferred.resolve(snapshot.val());
            } else {
                deferred.reject();
            }
        });

        return deferred;
    }

    Context.prototype.checkOnline = function () {
        var deferred = Promise.defer();

        $.ajax({
            url: "http://query.yahooapis.com/v1/public/yql",

            // the name of the callback parameter, as specified by the YQL service
            jsonp: "callback",

            // tell jQuery we're expecting JSONP
            dataType: "jsonp",

            data: {
                q: "select title,abstract,url from search.news where query=\"cat\"",
                format: "json"
            },
            // work with the response
            success: function() {
                deferred.resolve();
            },

            error: function () {
                deferred.reject();
            }

        });

        return deferred;
    }

    return Context;
});