/**
 * Created by atrifan on 10/28/2015.
 */
define(['modal'], function (Modal) {
    function WordGame() {

    }

    WordGame.prototype.init = function () {
        var self = this;
        this._socket = this.context.getSocketToServer('wordGame');
        this._socket.on('registerSelf', function(okState) {
            if(okState) {
                self._showGame();
            }
        });
        this._socket.on('registerUser', function(user) {
            self._appendUser(user);
        });
    };

    WordGame.prototype.start = function () {
        this._root = this.context.getRoot();
        this._gameWrapper = this._root.find('.wordGameWrapper');
        this._usersContainer = this._root.find('.users-container');
        this._chooseUserName();

    }

    WordGame.prototype._showGame = function () {
        this._gameWrapper.css('visibility', 'visible');
        this._appendUser({
            userName: 'alex',
            scor: 0
        });
    }


    WordGame.prototype._chooseUserName = function () {

        var self = this;
        var inputText = $('<input id="userName" type="text" value="Enter userName"/>');
        this._loginModal = Modal.info('Choose a user name:', inputText[0].outerHTML, 'Submit');
        inputText = $('#userName');
        inputText.on('focus', function() {
            inputText.val('');
        });
        inputText.on('keypress', function(event) {
            var userName = inputText.val();
            if(event.keyCode == 13) {
                self._loginModal._destroy();
                self._registerUser(userName);
            }
        });
        this._loginModal.on('OK', function() {
            var userName = inputText.val();
            self._registerUser(userName);
        })
    };

    WordGame.prototype._appendUser = function (user) {
        var locationToAppendUser = this._usersContainer.find('.card-body');
        this.context.insertTemplate('user', user, locationToAppendUser);
    };

    WordGame.prototype._registerUser = function(userName) {
        this._userName = userName;
        this._showGame();
        //this._socket.emit('register', 'userName');

    }

    return WordGame;
});
