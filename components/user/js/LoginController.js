/**
 * Created  on 25.06.2015.
 */
define(['promise',
        'validator',
        'modal'], function (Promise, Validator, Modal) {
    function LoginController() {}

    LoginController.prototype.init = function () {

        this._root = this.context.getRoot();
        this._loginContainer = this._root.find('.login-container');
        this._clientValidate = this._loginContainer.data('clientvalidate');

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

        this._login.disable();

        var self = this;
        this.context.loadingIndicator.show();

        var validations = {};
        var validator = Validator.get();
        if(this._clientValidate) {
            var validationType = this._userName.validationType();
            if(validationType) {
                validations['username'] = validator[validationType](data.username);
            }

            validationType = this._password.validationType();
            if(validationType) {
                validations['password'] = validator[validationType](data.password);
            }
        }

        Promise.allKeys(validations).then(function(validations) {

            var failedValidation = false;
            for(var key in validations) {
                if(!validations[key]) {
                    failedValidation = true;
                }
            }

            if(failedValidation) {
                self._resetForm();
                Modal.error('Validation', 'Some fields are invalid');
            } else {
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
                        self._resetForm();
                        Modal.error('Failure', 'something bad happened at login');
                    }
                });
            }
        }, function (err) {
            self._resetForm();
            Modal.error('Validation', 'failed to validate');
        });

    }

    LoginController.prototype._resetForm = function() {
        this.context.loadingIndicator.fadeOut();
        this._login.enable();
    };

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
