define([], function () {
    function SnippetManager() {}

    SnippetManager.prototype.init = function () {
        this.snippetStorage = this.context.storrage.child('snippets');
    };

    SnippetManager.prototype.start = function () {
        this._root = this.context.getRoot();
        this._wrapper = this._root.find('.snippet-manager-wrapper');
        this.snippetStorage.on('child_added', this._assert.bind(this));
        this.snippetStorage.on('child_removed', this._remove.bind(this));
        var self = this;
    };

    SnippetManager.prototype._remove = function (info) {
        console.log(info.name());
        var removeSid = info.name();
        this.context.delete(removeSid);
        $('#'+removeSid).remove();
    }

    SnippetManager.prototype._assert = function (info, oldInfo) {
        var name = info.name();
        info = info.val();
        info["id"] = name;
        var row = $('<div></div>');
        row.attr('class', 'row');
        row.attr('id', name);
        this._wrapper.append(row);
        var configuration = {
            'handleBar': {
                'name': 'snippet-manager',
                'view': 'detailedSnippet',
                'sid': name
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