define(['js/lib/promise'], function(Promise) {

    function Online() {

    }

    Online.checkInternet = function() {
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

    return Online;

});