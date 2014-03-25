define([], function () {
    function TextAreaController() {}

    TextAreaController.prototype.init = function () {

    };

    TextAreaController.prototype.start = function () {
        this._root = this.context.getRoot();
        this._buttonWrapper = this._root.find('.textarea-wrapper');
        this._textarea = this._root.find('textarea');
        this._label = this._root.find('.label');
    };

    TextAreaController.prototype.value = function (value) {
        if(!value) {
            return this._textarea.val();
        }

        this._textarea.val(value);
        return this;
    };


    TextAreaController.prototype.destroy = function () {

    };

    return TextAreaController;
})