/**
 * Created by atrifan on 9/24/2015.
 */
define(['promise'], function(Promise) {
    function DamnController() {

    }

    DamnController.prototype.init = function () {}

    DamnController.prototype.start = function () {
        this._root = this.context.getRoot();
        this._menuWrapper = this._root.find('.damn-content .options');
        this._contentWrapper = this._root.find('.damn-content .content');
        var self = this;

        this.context.messaging.messageSubscribe('show-menu', this._showMenu.bind(this));
        this.context.messaging.messageSubscribe('hide-menu', this._hideMenu.bind(this));
        this.context.getChildren().then(function(kids) {
            var eventsButton = self._eventsButton = kids['collapseEvents'],
                damnOptions = self._damnOptions = kids['damnOptions'];

            damnOptions.on('render', self._showView.bind(self));
        });

    };

    DamnController.prototype._showView = function(event) {
        var self = this;
        this.context.insert(this._contentWrapper, {
            component: {
                name: 'damn',
                view: event
            },
            context: {}
        }).then(function(controller) {
            self._currentView = controller;
        });
    };

    DamnController.prototype._showMenu = function() {
        this._menuWrapper.addClass('active');
    }

    DamnController.prototype._hideMenu = function() {
        this._menuWrapper.removeClass('active');
    }

    DamnController.prototype._showEvents = function() {
        var calendarPlaceHolder = this._root.find('#collapse-calendar');
        if(!calendarPlaceHolder.html().trim().length) {
            this.context.messaging.messagePublish('collapse', {
                injectLocation: 'collapse-calendar',
                context: {
                    calendar: true
                },
                callback: function(element) {
                    $('.calendar').datepicker();
                }
            });

            calendarPlaceHolder.show();
            calendarPlaceHolder.removeClass('no-title');
            this._eventsButton._icon.removeClass('COLLAPSE');
            this._eventsButton._icon.addClass('UP');
            calendarPlaceHolder.data('hidden', false);
        } else {
            if(calendarPlaceHolder.data('hidden')) {
                calendarPlaceHolder.data('hidden', false);
                calendarPlaceHolder.removeClass('no-title');
                this._eventsButton._icon.removeClass('COLLAPSE');
                this._eventsButton._icon.addClass('UP');
                calendarPlaceHolder.show();
            } else {
                calendarPlaceHolder.data('hidden', true);
                calendarPlaceHolder.addClass('no-title');
                this._eventsButton._icon.removeClass('UP');
                this._eventsButton._icon.addClass('COLLAPSE');
                calendarPlaceHolder.hide();
            }
        }
    };

    return DamnController;
});
