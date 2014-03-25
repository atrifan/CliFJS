define([], function () {
    function SnippetManager() {}

    SnippetManager.prototype.init = function () {
        this.snippetStorage = this.context.storrage.child('snippets');
    };

    SnippetManager.prototype.start = function () {
        this._root = this.context.getRoot();
        this._wrapper = this._root.find('.snippet-manager-wrapper');
        this.snippetStorage.once('value', this._showData.bind(this));
        var self = this;
    };

    SnippetManager.prototype._showData = function (info) {
        info = info.val();
        console.log(info);
        for(var key in info) {
            this._assert(key, info[key]);
        }
    }

    SnippetManager.prototype._assert = function (key, info) {
        console.log('gigi');
        console.log(this._wrapper);
        info["id"] = key;
        var row = $('<div></div>');
        row.attr('class', 'row');
        this._wrapper.append(row);
        var configuration = {
            'handleBar': {
                'name': 'snippet-manager',
                'view': 'detailedSnippet',
                'sid': key
            },
            'context': info
        };
        this.context.insert(row, configuration);

    }

    SnippetManager.prototype.saveSnippet = function (event) {

    }

    SnippetManager.prototype.destroy = function () {

    };

    return SnippetManager;
})