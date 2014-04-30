define([], function () {

    function ContactDetailController($scope, $routeParams, $http, $firebase) {
        this._scope = $scope;
        this._routeParams = $routeParams;
        this._http = $http;
        this._id = $routeParams.contactId;
        this._storage = new Firebase("https://sweltering-fire-6062.firebaseio.com/phoneApp");
        var self = this;

        $scope.$on('$viewContentLoaded', function(){
            console.log('snatatea');
            console.log($('.bbday').html());
            console.log(moment([2015 ,3, 4]).fromNow());
            console.log(self._scope.contact);
            //Here your view content is fully loaded !!
        });

        $scope.$watch("bbday", function (data) {
            console.log(data);
        })


        this._getStaticContact();


       /* var keys = $firebase(this._storage).$getIndex();
        $scope.contact = $firebase(this._storage).$child(keys[this._id - 1]); */
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