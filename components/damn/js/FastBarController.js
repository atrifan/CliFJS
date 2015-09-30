/**
 * Created by alexandru.trifan on 28.09.2015.
 */
define([], function () {
    function FastBarController() {}

    FastBarController.prototype.init = function () {

    }

    FastBarController.prototype.start = function () {
        this._root = this.context.getRoot();
        var self = this;
        this.context.messaging.messageSubscribe('close-notifications', this._closeNotifications.bind(this));
        this.context.getChildren().then(function(kids) {
            var calendarButton = self._calendarButton = kids['calendar'],
                notificationButton = self._notificationButton = kids['alert'],
                menuButton = self._menuButton = kids['menu'];
            calendarButton.on('click', self._showCalendar.bind(self));
            notificationButton.on('click', self._showAlerts.bind(self));
            menuButton.on('click', self._showMenu.bind(self));
        });
    };

    FastBarController.prototype._showMenu = function () {
        if(this._menuButton.hasClass('active')) {
            this.context.messaging.messagePublish('hide-menu');
            this._menuButton.removeClass('active');
        } else {
            this.context.messaging.messagePublish('show-menu');
            this._menuButton.addClass('active');
        }
    };


    FastBarController.prototype._closeNotifications = function() {
        if(this._alertPlaceHolder) {
            this._calendarButton.removeClass('active');
            this._notificationButton.removeClass('active');
            this._alertPlaceHolder.html('');
            this._alertPlaceHolder.hide();
        }

        if(this._calendarPlaceHolder) {
            this._calendarButton.removeClass('active');
            this._notificationButton.removeClass('active');
            this._calendarPlaceHolder.html('');
            this._calendarPlaceHolder.hide();
        }

        this._menuButton.removeClass('active');

        this.context.messaging.messagePublish('hide-menu');
    };

    FastBarController.prototype._showAlerts = function() {
        var alertPlaceHolder = this._root.find('#collapse-notification-fast-bar');
        this._notificationButton.addClass('active');
        this._calendarButton.removeClass('active');
        if(!this._alertPlaceHolder) {
            this._alertPlaceHolder = alertPlaceHolder;
        }

        if(!alertPlaceHolder.html().trim().length) {
            if(this._calendarPlaceHolder) {
                this._calendarPlaceHolder.html('');
                this._calendarPlaceHolder.hide();
                delete this._calendarPlaceHolder;
            }
            this.context.messaging.messagePublish('collapse_data', {
                injectLocation: 'collapse-notification-fast-bar',
                context: {
                    notifications: true
                },
                callback: function(element) {
                    $('#collapse-notification-fast-bar .notifications')
                }
            });

            alertPlaceHolder.show();
            alertPlaceHolder.data('hidden', false);
        } else {
            if(alertPlaceHolder.data('hidden')) {
                alertPlaceHolder.data('hidden', false);
                alertPlaceHolder.show();
            } else {
                alertPlaceHolder.data('hidden', true);
                this._notificationButton.removeClass('active');
                alertPlaceHolder.hide();
            }
        }
    };

    FastBarController.prototype._showCalendar = function() {
        this._notificationButton.removeClass('active');
        this._calendarButton.addClass('active');
        var calendarPlaceHolder = this._root.find('#collapse-calendar-fast-bar');
        if(!this._calendarPlaceHolder) {
            this._calendarPlaceHolder = calendarPlaceHolder;
        }

        if(!calendarPlaceHolder.html().trim().length) {
            if(this._alertPlaceHolder) {
                this._alertPlaceHolder.html('');
                this._alertPlaceHolder.hide();
                delete this._alertPlaceHolder;
            }
            this.context.messaging.messagePublish('collapse_data', {
                injectLocation: 'collapse-calendar-fast-bar',
                context: {
                    calendar: true
                },
                callback: function(element) {
                    $('#collapse-calendar-fast-bar .calendar').datepicker();
                }
            });

            calendarPlaceHolder.show();
            calendarPlaceHolder.data('hidden', false);
        } else {
            if(calendarPlaceHolder.data('hidden')) {
                calendarPlaceHolder.data('hidden', false);
                calendarPlaceHolder.show();
            } else {
                calendarPlaceHolder.data('hidden', true);
                this._calendarButton.removeClass('active');
                calendarPlaceHolder.hide();
            }
        }
    };

    return FastBarController;
});
