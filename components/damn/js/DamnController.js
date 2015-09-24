/**
 * Created by atrifan on 9/24/2015.
 */
define([], function() {
    function DamnController() {

    }

    DamnController.prototype.init = function () {}

    DamnController.prototype.start = function () {
        this._root = this.context.getRoot();
        var self = this;
        this.context.getChildren().then(function(kids) {
            var eventsButton = self._eventsButton = kids['collapseEvents'];
            eventsButton.on('click', self._showEvents.bind(self));
        })
    };

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
