/**
 * Created by atrifan on 9/22/2015.
 */
define(['../../../public/js/lib/promise.js',
        'modal'], function (Promise, Modal) {

    function RegisterController() {

    }

    RegisterController.prototype.init = function () {

    };

    RegisterController.prototype.start = function () {
        var deferred = Promise.defer(),
            self = this;
        this._root = this.context.getRoot();
        this._wrapper = this._root.find('register-container');
        this._registerURL = this._wrapper.data('registerurl');
        this._redirectURL = this._wrapper.data('redirectto');
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

        Modal.error('time', 'to do it');
        var dataToSubmit = {};
        for(var key in registerData) {
            dataToSubmit[key] = registerData[key].value();
        }
        this.context.loadingIndicator.fadeOut();
    }

    return RegisterController;


});
