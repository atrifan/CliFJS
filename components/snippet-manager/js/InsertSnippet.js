define([], function () {
    function ButtonController() {}

    ButtonController.prototype.init = function () {

    };

    ButtonController.prototype.start = function () {
        this._root = this.context.getRoot();
        this._buttonWrapper = this._root.find('.button-wrapper');
        this._button = this._root.find('.button');
        this._label = this._root.find('.label');
        this._button.on('click', this.click.bind(this));
    };

    ButtonController.prototype.label = function (label) {
        if(!label) {
            return this._label.text();
        }

        this._label.text(label);
        return this;
    };

    ButtonController.prototype.value = function (value) {
        if(!value) {
            return this._button.attr('value');
        }

        this._button.attr('value', value);
        return this;
    };


    ButtonController.prototype.click = function (event) {
        this.emit('click');
        this.context.messaging.messagePublish(this._button.attr('type'),
            this._button.attr('value'));
    };

    ButtonController.prototype.destroy = function () {

    };

    return ButtonController;
})