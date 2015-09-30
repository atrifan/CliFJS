/**
 * Created by atrifan on 9/30/2015.
 */
define([], function () {
    function NewsController() {

    }

    NewsController.prototype.init = function () {

    }

    NewsController.prototype.start = function () {
        this._root = this.context.getRoot();
        this._newsWrapper = this._root.find('.news-wrapper');

        this.context.insertTemplate('news_entry', {
            author: 'GIGEL BAROSAN',
            date: '30-12-1989',
            news: 'ceva scris de mine'
        }, this._newsWrapper);
    }

    return NewsController;
})
