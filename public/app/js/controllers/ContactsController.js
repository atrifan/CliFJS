define(['js/util/online'], function (Online) {
    function PhoneContacts($scope, $http, $firebase, $timeout, $rootElement) {
        this._http = $http;
        this._scope = $scope;
        var self = this;

        this._root = $rootElement;
        this.settings = {
            perPage: 10,
            showPrevNext: true,
            numbersPerPage: 5,
            hidePageNumbers: false
        }

        this._pager = $('#myPager');
        this._pager.data("curr", 0);

        this._children = null;

        this._storage = new Firebase("https://sweltering-fire-6062.firebaseio.com/phoneApp");
        this._getStaticContacts($http);


        /*
        Online.checkInternet().then(
            function () {
                self.dataExists().then(
                    function () {
                        $scope.contacts = $firebase(self._storage);
                        console.log($scope.contacts);
                    },
                    function () {
                       $http.get('resources/contacts.json')
                           .success(
                               function (data) {
                                   for (var i = 0, len = data.length; i < len; i++) {
                                       self.store(data[i]);
                                   }
                                   $scope.contacts = data;
                               }
                           )
                    }
                )
            },
            function () {
                self._getStaticContacts($http);
            }
            */
        //)

    }

    PhoneContacts.prototype._addPagination = function () {
        if(this.settings.showPrevNext) {
            $('<li><a href="#" class="prev_link">«</a></li>').appendTo(this._pager);
        }

        var curr = 0,
            numItems = this._children.size(),
            numPages = Math.ceil(numItems/this.settings.perPage),
            self = this;

        while(numPages > curr && !this.settings.hidePageNumbers) {
            $('<li><a href="#" class="page_link">'+(curr+1)+'</a></li>').appendTo(this._pager);
            curr++;
        }

        if(this.settings.numbersPerPage > 1) {
            $('.page_link').hide();
            $('.page_link').slice(this._pager.data("curr"), this.settings.numbersPerPage).show();
        }

        if(this.settings.showPrevNext) {
            $('<li><a href="#" class="next_link">»</a></li>').appendTo(this._pager);
        }

        this._pager.find('.page_link:first').addClass('active');
        this._pager.find('.prev_link').hide();
        if (numPages <= 1) {
            this._pager.find('.next_link').hide();
        }
        this._pager.children().eq(1).addClass("active");

        this.children.hide();
        this.children.slice(0, this.settings.perPage).show();

        this._pager.find('li .page_link').click(function(){
            var clickedPage = $(document).html().valueOf() - 1;
            self._goTo(clickedPage, this.settings.perPage);
            return false;
        });

        this._pager.find('li .prev_link').click(function(){
            self._previous();
            return false;
        });

        this._pager.find('li .next_link').click(function(){
            self._next();
            return false;
        });

    }

    PhoneContacts.prototype._previous = function(){
        var goToPage = parseInt(this._pager.data("curr")) - 1;
        this.goTo(goToPage);
    }

    PhoneContacts.prototype._next = function(){
        var goToPage = parseInt(this._pager.data("curr")) + 1;
        this.goTo(goToPage);
    }

    PhoneContacts.prototype._goTo = function(page){
        var startAt = page * this.settings.perPage,
            endOn = startAt + this.settings.perPage;

        this._children.css('display','none').slice(startAt, endOn).show();

        if (page >= 1) {
            this._pager.find('.prev_link').show();
        }
        else {
            this._pager.find('.prev_link').hide();
        }

        if (page < (numPages-1)) {
            this._pager.find('.next_link').show();
        }
        else {
            this._pager.find('.next_link').hide();
        }

        this._pager.data("curr", page);

        if (settings.numbersPerPage > 1) {
            $('.page_link').hide();
            $('.page_link').slice(page, this.settings.numbersPerPage + page).show();
        }

        this._pager.children().removeClass("active");
        this._pager.children().eq(page + 1).addClass("active");

    }

    PhoneContacts.prototype._getStaticContacts = function(requester) {
        var self = this;
        requester.get('resources/contacts.json')
            .success(
                function(data) {
                    console.log(self._scope);
                    self._scope.contacts = data;
                    console.log(self._root.find('.contact'));
                }
            )
    }

    return PhoneContacts;
})