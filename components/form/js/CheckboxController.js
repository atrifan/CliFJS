/**
 * Created by alexandru.trifan on 25.06.2015.
 */
define([], function () {

    function CheckboxController() {
    }

    CheckboxController.prototype.init = function () {
    }
    CheckboxController.prototype.start = function () {
        this._root = this.context.getRoot();
        this._checkBoxButton = this._root.find('.checkbox-button');
    }

    CheckboxController.prototype.checked = function (value) {
        if(typeof value == 'undefined') {
            return this._checkBoxButton.prop('checked');
        }
        this._checkBoxButton.prop('checked', value);
    }

    CheckboxController.prototype.value = function () {
        return this._checkBoxButton.prop('checked');
    };

    CheckboxController.prototype.destroy = function () {
    }

    return CheckboxController;
});