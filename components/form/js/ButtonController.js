define([], function () {
    function ButtonController() {}

    ButtonController.prototype.init = function () {

    };

    ButtonController.prototype.start = function () {
        this._root = this.context.getRoot();
        this._buttonWrapper = this._root.find('.button-wrapper');
        this._button = this._root.find('.button');
        this._label = this._root.find('.button-label');
        this._button.on('click', this.click.bind(this));
    };

    ButtonController.prototype.label = function (label) {
        if(typeof label == 'undefined') {
            return this._label.text();
        }

        this._label.text(label);
        return this;
    };

    ButtonController.prototype.value = function (value) {
        if(typeof value == 'undefined') {
            if(("" + this._button.attr('value')).length > 0) {
                return this._button.attr('value');
            } else {
                return undefined;
            }
        }

        this._button.attr('value', value);
        return this;
    };

    ButtonController.prototype.resetValue = function () {
        this._button.removeAttr('value');
    }


    ButtonController.prototype.click = function (event) {
        this.emit('click');
        this.context.messaging.messagePublish(this._button.attr('type'),
            this._button.attr('value'));
    };

    ButtonController.prototype.destroy = function () {
        ButtonController = null;
    };

    return ButtonController;
})