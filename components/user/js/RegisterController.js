/**
 * Created by atrifan on 9/22/2015.
 */
define(['promise',
        'modal',
        'validator'], function (Promise, Modal, Validator) {

    function RegisterController() {

    }

    RegisterController.prototype.init = function () {

    };

    RegisterController.prototype.start = function () {
        var deferred = Promise.defer(),
            self = this;
        this._root = this.context.getRoot();
        this._wrapper = this._root.find('.register-container');
        this._registerURL = this._wrapper.data('registerurl');
        this._redirectURL = this._wrapper.data('redirectto');
        this._clientValidate = this._wrapper.data('clientvalidate');
        this.context.getChildren().then(function (children) {
            var submitButton = self._submitButton = children.register;
            var requestData = {};

            for(var key in children) {
                if(key!='register') {
                    requestData[key] = children[key];
                }
            }

            submitButton.on('click', self._registerAccount.bind(self, requestData));

            deferred.resolve();
        });

        return deferred.promise;

    };

    RegisterController.prototype._registerAccount = function (registerData) {
        this._submitButton.disable();
        var self = this;
        this.context.loadingIndicator.show();

        var dataToSubmit = {};
        for(var key in registerData) {
            dataToSubmit[key] = registerData[key].value();
        }

        var validations = {};
        if(this._clientValidate) {
            var validator = Validator.get();
            var validations = {};
            for(var key in registerData) {
                var validationType = registerData[key].validationType();
                if(validationType) {
                    var dataToCheck = dataToSubmit[key];
                    validations[validationType] = validator[validationType](dataToCheck);
                }
            }
        }

        Promise.allKeys(validations).then(function (validationResponses) {
            var validationFailed = false;
            for(var keys in validationResponses) {
                if(!validationResponses[keys]) {
                    validationFailed = true;
                }
            }

            if(validationFailed) {
                self._resetForm();
                Modal.error('Validation', 'Additional fields are invalid please check');
            } else {
                $.ajax({
                    url: self._registerURL,
                    type: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify(dataToSubmit),
                    dataType: 'json',
                    success: function(data) {
                        self.context.loadingIndicator.fadeOut();
                    },
                    error: function(err) {
                        self.context.loadingIndicator.fadeOut();
                        self._resetForm();
                        Modal.error('Failure', 'something bad happened at registration');
                    }
                })
            }
        }, function(err) {
            self._resetForm();
            Modal.error('Failure', 'Failed to validate');
        });

    };

    RegisterController.prototype._resetForm = function () {
        this.context.loadingIndicator.fadeOut();
        this._submitButton.enable();
    };

    return RegisterController;


});
