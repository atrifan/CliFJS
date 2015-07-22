/**
 * Created by atrifan on 7/22/2015.
 */
define([], function () {
    function GridController() {}

    GridController.prototype.init = function () {

    }

    GridController.prototype.start = function () {
        this._root = this.context.getRoot();
        this._gridWrapper = this._root.find('.grid');
        var self = this;
        this._gridWrapper.on('click', function () {
            self.context.messaging.messagePublish('collapse', {
                cell: [{
                    value: 'someData1'
                }, {
                    value: 'someData2'
                }, {
                    value: 'someData3'
                }]
            });
        });
    }

    return GridController;
})