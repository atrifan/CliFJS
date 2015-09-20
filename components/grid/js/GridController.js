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
        this.createGrid({
            headers: ['id', 'nume', 'prenume'],
            mapping: {
                'id': 'id',
                'nume': 'name',
                'prenume': 'surname'
            },
            data: [{
                id: '1',
                name: 'to',
                surname: 'me',
                extra: 'extraStuff',
                collapsable: true
            },
                {
                    id: '2',
                    name: 'to2',
                    surname: 'me2',
                    extra: 'extraStuff2',
                    collapsable: true
                }]
        });
        //var test = this._root.find('.first_insertion')
        //this.context.insertTemplate('column_type_1', {column: [{value: 'toMe'}]}, test);
    }

    GridController.prototype.createGrid = function(configuration) {
        var headers = configuration.headers;

        this._data = configuration.data;
        this._configuration = configuration;
        var headerData = {
            column: []
        };
        for(var i = 0; i < headers.length; i++) {
            headerData.column[i] = {};
            headerData.column[i].css = 'header';
            headerData.column[i].value = headers[i];
            headerData.column[i].id = headers[i];
        }

        var headerPlaceholder = this._root.find('.header-row');
        this._headers = this.context.insertTemplate('column_type_1', headerData, headerPlaceholder);

        var rowData = {
            row: []
        };

        var data = configuration.data,
            mapping = configuration.mapping;

        for(var i = 0; i < data.length; i++) {
            rowData.row[i] = {};
            rowData.row[i].data = {};
            rowData.row[i].data["column"] = [];
            for(var j = 0; j < headers.length; j++) {
                var headerName = headers[j];
                var jsonKey = mapping[headerName];
                rowData.row[i].id = i;
                rowData.row[i].collapsable = data[i]["collapsable"] || false;
                rowData.row[i].data["column"].push({
                    css: '',
                    value: data[i][jsonKey]
                });
            }
        }

        this._info = this._gridWrapper.find('.info');
        this._rows = this.context.insertTemplate('row_type_1', rowData, this._info);

        this._configureRows();


    }

    GridController.prototype._configureHeaders = function () {1

    }
    GridController.prototype._configureRows = function() {
        var self = this;
        for(var i = 0; i < this._rows.length; i++) {
            var row = $(this._rows[i]);
            var children = row.find('.cell');
            children.each(function(index, elem) {
                var id = self._configuration.headers[index];
                var headerWidth = $('#'+id).width();
                $(elem).width(headerWidth);
            });
            this._makeRowClickable(row);
        }
    };

    GridController.prototype._makeRowClickable = function(row) {
        var self = this;
        row.on('click', function() {
            var id = row.attr('id');
            console.log(id);
            self.emit(self._data[id]);
            var collapsePlaceholder = row.find('.collapsation-data');
            if(!collapsePlaceholder.html().trim().length) {
                self.context.messaging.messagePublish('collapse', {
                    injectLocation: id,
                    key: [{
                        value: self._data[id].extra
                    }]
                });
            } else {
                if(collapsePlaceholder.hasClass('visible')) {
                    collapsePlaceholder.removeClass('visible');
                } else {
                    collapsePlaceholder.addClass('visible');
                }
            }
        });
    }

    return GridController;
});