define([], function () {
    function InsertSnippet() {}

    InsertSnippet.prototype.init = function () {

    };

    InsertSnippet.prototype.start = function () {
        this._root = this.context.getRoot();
        var self = this;
        this.context.getComponent('saveSnippet').then(function(SubmitButton) {
            SubmitButton.on('click', self.saveSnippet.bind(self));
        });
    };

    InsertSnippet.prototype.saveSnippet = function (event) {

    }
    InsertSnippet.prototype.label = function (label) {
        if(!label) {
            return this._label.text();
        }

        this._label.text(label);
        return this;
    };

    InsertSnippet.prototype.value = function (value) {
        if(!value) {
            return this._button.attr('value');
        }

        this._button.attr('value', value);
        return this;
    };


    InsertSnippet.prototype.click = function (event) {
        this.emit('click');
        this.context.messaging.messagePublish(this._button.attr('type'),
            this._button.attr('value'));
    };

    InsertSnippet.prototype.destroy = function () {

    };

    return InsertSnippet;
})