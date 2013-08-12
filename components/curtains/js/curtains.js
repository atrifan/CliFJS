define([], function () {
    function CurtainController() {}

    CurtainController.prototype.init = function () {}

    CurtainController.prototype.start = function () {
        this._root = this.context.getRoot();
        var self = this;
        this._curtain = this._root.find('.curtain');
        this.context.messaging.messageSubscribe('curtain', function(value) {
            self[value]();
            self.context.getComponent('curtain').then(function (curtainButton) {
                var value = curtainButton.value();
                if(value === 'open') {
                    value = 'close';
                    curtainButton.label('Close curtain');
                } else {
                    value = 'open';
                    curtainButton.label('Open curtain');
                }

                curtainButton.value(value);
            });
        })
    }

    CurtainController.prototype.open = function () {
        this._curtain.animate({
            top: '-' + this._curtain.height() + 'px'
        }, 1000);
    };

    CurtainController.prototype.close = function () {
        this._curtain.animate({
            top: '0px'
        }, 1000);
    }

    CurtainController.prototype.destroy = function () {}

    return CurtainController;
})