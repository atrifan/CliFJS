/**
 * Created  on 25.06.2015.
 */
define(['promise'], function (Promise) {
    function LoginController() {}

    LoginController.prototype.init = function () {

        this._root = this.context.getRoot();
        this._loginContainer = this._root.find('.login-container');


        this._loginUrl = this._loginContainer.data('loginurl');
        this._redirectTo = this._loginContainer.data('redirectto');
        this._appId = window.localStorage.getItem('app-hash');
        if(this._appId) {
            var deferred = Promise.defer();
            setTimeout(function () {
                deferred.resolve();
            }, 100);
            window.location = this._loginUrl;
            return deferred.promise;
        }
        this._storage = this.context.storrage.child("login");
    }
    
    LoginController.prototype.start = function () {

        var self = this;

        this.context.getChildren().then(function(children) {
            console.log(children);
            self._login = children["loginButton"];
            self._userName = children["userName"];
            self._password = children["password"];
            self._login.on('click', self._submitLogin.bind(self));
            self._password.on('keyPress', function(event) {
                if (event.keyCode == 13) {
                    self._submitLogin();
                }
            });
        });
    }

    LoginController.prototype._submitLogin = function () {
        var data = {
            username: this._userName.value(),
            password: this._password.value()
        };

        var self = this;
        this.context.loadingIndicator.show();

        $.ajax({
            url: this._loginUrl,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (response) {
                response.timeStamp = Date.now();
                var postReference = self._storage.push(response);
                self._jumpToMainPage(postReference.name());
            },
            error: function (error) {
                console.log("ERROR");
                self.context.loadingIndicator.fadeOut();
            }
        });
    }

    LoginController.prototype._jumpToMainPage = function(sessionKey) {
        window.localStorage.setItem('app-hash', sessionKey);
        this.context.loadingIndicator.fadeOut();
        window.location = this._redirectTo;
    }

    LoginController.prototype._remove = function(info) {

    }

    LoginController.prototype.destroy = function () {}

    return LoginController;
});
