define([], function () {
    function ChatController() {}

    ChatController.prototype.init = function () {
        this.chatStorrage = this.context.storrage.child('chat');
    };

    ChatController.prototype.start = function () {
        this._root = this.context.getRoot();
        this._message = this._root.find('.communicate');
        this._message.css({
            'display': 'none'
        });
        this._user;
        this._textToSend = {
            user: '',
            text: ''
        };
        this._messageBox = this._root.find('.messages');
        this._messageToSend;
        var self = this;

        this.chatStorrage.on('child_added', this._assert.bind(this));

        this.context.getComponent('userName').then(function(Controller) {
            self._user = Controller;
            Controller.on('keyPress', self._submitUser.bind(self));
        });

        this.context.getComponent('text').then(function (Controller) {
            self._messageToSend = Controller;
            Controller.on('keyPress', self._submitMessage.bind(self));
        });

        this.context.messaging.messageSubscribe('sendMessage', this._submitMessage.bind(this));
    };

    ChatController.prototype._assert = function (info) {
        var messageWrapper = $('<div></div>');
        var label = $('<div></div>')
        var text = $('<div></div>');

        var message = info.val();

        label.attr('class', 'msgLabel');
        text.attr('class', 'msgText');
        messageWrapper.attr('class', 'msgWrapper');


        label.text(message.user + " :");
        text.text(message.text);
        messageWrapper.append(label);
        messageWrapper.append(text);
        this._messageBox.append(messageWrapper);

    }

    ChatController.prototype._submitMessage = function (event) {

        if(event.keyCode == 13 || typeof event === 'string') {
            console.log(this._messageToSend);
            this._textToSend.text = this._messageToSend.value();
            this._messageToSend.value(" ");
            this.chatStorrage.push(this._textToSend);
        }
    };

    ChatController.prototype._submitUser = function (event) {
        if(event.keyCode == '13') {
            this._showCommunication();
            this._textToSend.user = this._user.value();
            this._user.disable();
        }

    }

    ChatController.prototype._showCommunication = function () {
        this._message.css({
            'display': 'inline'
        });
    }
    ChatController.prototype.destroy = function () {

    };

    return ChatController;
})