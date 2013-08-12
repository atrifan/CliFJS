define([], function () {
    function Heater () {

    }

    Heater.prototype.init = function () {

    }

    Heater.prototype.start = function () {
        this._root = this.context.getRoot();
        this._heater = this._root.find('.heater');
        this._tempLabel = this._root.find('.label');
        var self = this;
        this.context.messaging.messageSubscribe('temperature', function (data) {
            var temperature = parseInt(data, 10);
            if(!temperature.isNaN) {
                self.temperature(temperature);
            }
        });
        this.temperature();
    }

    Heater.prototype.temperature = function (temperature) {
        var self = this;

        var urlPath;
        if (window.serverUsed === 'express') {
            urlPath = '/temperature'
        } else {
            urlPath = '../resources/temperature.txt'
        }
        if(!temperature) {
            $.ajax({
                url: urlPath,
                method: "GET",
                success: function (info) {
                    self._clientTemperature(info);
                },
                fail: function (error) {
                    alert('Getting temperature from server failed');
                }
            });
        } else {
            $.ajax({
                url: '/?temperature=' + temperature,
                method: "POST",
                success: function () {
                    if(window.serverUsed === 'express') {
                        alert('Changes have been made and are persistent');
                        self._clientTemperature(temperature);
                    } else {
                        alert('Changes have been sent to server but are not persistent');
                        self._clientTemperature(temperature);
                    }
                },
                fail: function (error) {
                    alert('Failed to set temperature on the server');
                }
            })
        }
    }


    Heater.prototype._clientTemperature = function (value) {
        this._tempLabel.text(value);
    }

    Heater.prototype.destroy = function () {

    }

    return Heater;
})