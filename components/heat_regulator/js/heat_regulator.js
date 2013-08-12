define([], function () {
    function HeatRegulatorController() {}

    HeatRegulatorController.prototype.init = function () {

    };

    HeatRegulatorController.prototype.start = function () {
        this._root = this.context.getRoot();
        this._input = this._root.find('.heater_entry');
        var self = this;

        this._input.on('click', function () {
            self.value("");
        });

        this._input.on('keypress', function (event) {
            if(event.keyCode === 13) {
                var value = self.value();
                self.value("");
                self.context.messaging.messagePublish('temperature', value);
            };
        });


        this.context.getComponent('heat-submit').then(function(button) {
            button.on('click', function() {
                var value = self.value();
                self.value("");
                self.context.messaging.messagePublish('temperature', value);
            })
        });
    };

    HeatRegulatorController.prototype.value = function (value) {
        if(!value && typeof value !== 'string') {
            return this._input.val();
        }

        this._input.val(value);
        return this;
    };


    HeatRegulatorController.prototype.destroy = function () {

    };

    return HeatRegulatorController;
})