define(['/public/js/lib/promise.js'], function (Promise) {
    function InsertSnippet() {}

    InsertSnippet.prototype.init = function () {
        this.snippetStorage = this.context.storrage.child('snippets');
    };

    InsertSnippet.prototype.start = function () {
        this._root = this.context.getRoot();
        var _code = this.context.getComponent('code');
        var _author = this.context.getComponent('user');
        var _description = this.context.getComponent('description');
        this._children = {
            'code': this.context.getComponent('code'),
            'description': this.context.getComponent('description'),
            'author': this.context.getComponent('user')
        };

        var self = this;
        this.context.getComponent('saveSnippet').then(function(SubmitButton) {
            SubmitButton.on('click', self.saveSnippet.bind(self));
        });
    };

    InsertSnippet.prototype.saveSnippet = function (event) {
        var info = {},
            self = this;
        Promise.allKeys(this._children).then(
            function (kids) {
                for (kid in kids) {
                    info[kid] = kids[kid].value();
                    kids[kid].value(" ");
                }
                self.snippetStorage.push(info);
            },
            function (err) {
                console.log(err);
            }
        );
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