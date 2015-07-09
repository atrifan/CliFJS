/**
 * Created by alexandru.trifan on 09.07.2015.
 */
define([], function () {

    function LogoutController() {};

    LogoutController.prototype.init = function () {
        this._storage = this.context.storrage.child("login");
        this._appId = window.localStorage.getItem('app-hash');
    }

    LogoutController.prototype.start = function () {
        this._root = this.context.getRoot();
        this._logoutContainer = this._root.find('logout-wrapper');
        this._redirectTo = this._logoutContainer.data('redirectto');

        var self = this;
        this.context.getChildren().then(function (children) {
            self._logoutButton = children["logout"];

            self._logoutButton.on('click', self._logout.bind(self));
        });
    }

    LogoutController.prototype._logout = function () {
        window.localStorage.removeItem('app-hash');
        this._storage.child(this._appId).remove();
        window.location = this._redirectTo;
    }

    return LogoutController;
});