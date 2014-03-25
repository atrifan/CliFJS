define([], function () {
    function DetailedSnippet() {}

    DetailedSnippet.prototype.init = function () {

    };

    DetailedSnippet.prototype.start = function () {
        this._root = this.context.getRoot();
        this._shortInfo = this._root.find(".short-info");
        this._detailedView = this._root.find('.detailed-view');
        var self = this;
        this._shortInfo.on('click', this.toggle.bind(this));
    };

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