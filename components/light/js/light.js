define([], function (){
    function LightController() {}

    LightController.prototype.init = function () {

    };

    LightController.prototype.start = function () {
        this._root = this.context.getRoot();
        this._light = this._root.find('.light');
        var self = this;
        this.context.messaging.messageSubscribe('light', function (event, state) {
            self.toggleLight();
        });
    };

    LightController.prototype.toggleLight = function () {
        if(this._light.hasClass('on')) {
            this._light.removeClass('on');
            this._light.addClass('off');
            this.context.getComponent('lighter').then(function (Lighter) {
                Lighter.label('Turn on light');
                Lighter.value('light-on');
            })
        } else {
            this._light.removeClass('off');
            this._light.addClass('on');
            this.context.getComponent('lighter').then(function (Lighter) {
                Lighter.label('Turn off light');
                Lighter.value('light-off');
            })
        }
    };

    LightController.prototype.destroy = function () {

    };

    return LightController;
})