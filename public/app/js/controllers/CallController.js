define([], function () {
    function Caller($scope) {
        this._scope = $scope;

        console.log(this);
        this._call = $('.call-button');
        this._call.on('click', this.call.bind(this));

        return this;
    }

    Caller.prototype.call = function (event) {
        console.log('ok');
        window.location.href = '#/contacts';
    }

    return Caller;
});


