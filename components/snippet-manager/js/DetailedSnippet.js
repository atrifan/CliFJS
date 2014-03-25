define([], function () {
    function DetailedSnippet() {}

    DetailedSnippet.prototype.init = function () {
        this.snippetStorage = this.context.storrage.child('snippets');
    };

    DetailedSnippet.prototype.start = function () {
        this._root = this.context.getRoot();
        this._shortInfo = this._root.find(".short-info");
        this._detailedView = this._root.find('.detailed-view');
        this._delete = this._root.find('.delete');
        var self = this;
        this._delete.on('click', this.deleteEntry.bind(this));
        this._shortInfo.on('click', this.toggle.bind(this));
    };

   DetailedSnippet.prototype.deleteEntry = function (event) {
       event.stopPropagation();
       var id = $(event.target).attr('id'),
           self = this;


       this.snippetStorage.child(id).remove();

   }
   DetailedSnippet.prototype.toggle = function (event) {
       if (this._detailedView.css('display') == 'none') {
           this._detailedView.css('display', 'inline');
       } else {
           this._detailedView.css('display', 'none');
       }
   }

    DetailedSnippet.prototype.destroy = function () {

    };

    return DetailedSnippet;
})