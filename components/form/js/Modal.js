/**
 * Created by atrifan on 9/22/2015.
 */
define(['../../../public/js/lib/EventEmitter',
    'clientProvider',
    '../../../public/js/lib/promise',
    '../../../public/js/component_requester',
    'componentMap'], function (EventEmitter, ClientProvider, Promise, ComponentRequester, ComponentMap) {


    function Modal(configuration) {
        ClientProvider._renderCss({}, ['modal.css'], '/components/form');
        this._overlay = $('<div class="modal-bg overlay"></div>');
        this._modalWrapper = $('<div class="modal-wrapper overlay nobg"></div>');
        this._modalContent = $('<div class="center modal card-wrapper round"></div>');
        this._modalTitle = $('<div class="card-title"><div class="modal-title fTitle"></div>');
        this._modalBody = $('<div class="modal-body card-body no-title"></div>');
        this._okBtn = $('<div class="right-container"></div>');
        this._cancelBtn = $('<div class="left-container"></div>');

        if(configuration.title) {
            this._modalTitle.find('.modal-title').text(configuration.title);
            this._modalBody.removeClass('no-title');
        }

        if(configuration.message) {
            this._modalBody.text(configuration.message);
        }

        var confirmButton = {
            type: 'OK',
            component: {
                name: 'form',
                view: 'button'
            },
            context: {
                type: 'primary',
                label: configuration.ok || 'OK',
                sid: 'modalOk'
            }
        };

        var cancelButton = {
            type: 'CANCEL',
            component: {
                name: 'form',
                view: 'button'
            },
            context: {
                type: 'secondary',
                label: configuration.nok || 'CANCEL',
                sid: 'modalCancel'
            }
        };

        this._modalContent.addClass(configuration.type);

        this._overlay.css('visibility', 'hidden');
        this._modalWrapper.css('visibility', 'hidden');

        this._modalContent.append(this._modalTitle);
        this._modalContent.append(this._modalBody);
        this._modalContent.append(this._okBtn);
        this._modalContent.append(this._cancelBtn);

        this._modalWrapper.append(this._modalContent);


        $('body').append(this._overlay);
        $('body').append(this._modalWrapper);

        if(configuration.type == 'SUCCESS' ||
            configuration.type == 'ERROR') {
            this._overlay.css('visibility', 'inherit');
            this._modalWrapper.css('visibility', 'inherit');
        }

        if(configuration.type == 'CONFIRM') {
            this._insertButtons([confirmButton, cancelButton]);
        }

        if(configuration.type == 'INFO') {
            this._insertButtons([confirmButton]);
        }
    }

    Modal.prototype._insertButtons = function (buttonsConfiguration) {
        var buttonInsertions = {};
        var self = this;
        for (var i = 0; i < buttonsConfiguration.length; i++) {
            buttonInsertions[buttonsConfiguration[i].context.sid] = this._injectComponent(buttonsConfiguration[i]);
        }

        Promise.allKeys(buttonInsertions).then(function (buttons) {
            buttons['modalOk'].on('click', function() {
                self.emit('OK');
                self._modalWrapper.remove();
                self._overlay.remove();
            });
            if(buttons['modalCancel']) {
                buttons['modalCancel'].on('click', function() {
                    self.emit('CANCEL');
                    self._modalWrapper.remove();
                    self._overlay.remove();
                });
            }
            self._overlay.css('visibility', 'inherit');
            self._modalWrapper.css('visibility', 'inherit');
        }, function () {
            console.log('SOMETHING BAD HAPPENED');
        })
    };

    Modal.prototype._injectComponent = function (componentConfig) {
        var content = ComponentRequester.render(componentConfig.component, componentConfig.context),
            componentMap = ComponentMap.get();
        var domObject = $(content.string);
        var element = componentConfig.type == 'OK' ? this._okBtn : this._cancelBtn;

        element.html(content.string);
        return componentMap.getComponent(domObject.attr('id')).controller;
    };

    jQuery.extend(Modal.prototype, EventEmitter.prototype);

    function confirm(title, message, ok, nok) {
        return new Modal({
            title: title,
            message: message,
            ok: ok,
            nok: nok,
            type: 'CONFIRM'
        });
    }

    function info(title, message, ok) {
        return new Modal({
            title: title,
            message: message,
            ok: ok,
            type: 'INFO'
        });
    }

    function success(title, message) {
        return new Modal({
            title: title,
            message: message,
            type: 'SUCCESS'
        });
    }

    function error (title, message) {
        return new Modal({
            title: title,
            message: message,
            type: 'ERROR'
        });
    }


    return {
        confirm: confirm,
        error: error,
        info: info,
        success: success
    }
});