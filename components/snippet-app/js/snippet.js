define([], function () {
    function SnippetApp() {}

    SnippetApp.prototype.init = function () {
        this.snippetStorage = this.context.storrage.child('snippets');
    };

    SnippetApp.prototype.start = function () {
        this._root = this.context.getRoot();
        var self = this;
        this._viewContainment = this._root.find('.app-view');
        this.context.messaging.messageSubscribe('change', function (data) {
            var info = {
                'name': "snippet-manager"
            };
            if (data === "manage") {
                info.view = "snippetManager";
                info.sid = "snippetView";
                self.changeView(info);
            } else if (data === "insert") {
                info.view = "insertSnippet";
                info.sid = "snippetView";
                self.changeView(info);
            }
        });

    };

    SnippetApp.prototype.changeView = function (info) {
            this.context.delete('snippetView');
            this.context.insert(this._viewContainment, {handleBar: info});
    }

    SnippetApp.prototype.destroy = function () {

    };

    return SnippetApp;
})