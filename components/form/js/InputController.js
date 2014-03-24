define([], function () {
    function InputController() {}

    InputController.prototype.init = function () {

    };

    InputController.prototype.start = function () {
        this._root = this.context.getRoot();
        this._inputWrapper = this._root.find('.input-wrapper');
        this._input = this._root.find('input');
        this._label = this._root.find('.label');
    };

    InputController.prototype.value = function (value) {
        if(!value) {
            return this._input.val();
        }

        this._input.val(value);
        return this;
    };


    InputController.prototype.destroy = function () {

    };

    return InputController;
})