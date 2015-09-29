/**
 * Created by atrifan on 9/28/2015.
 */
define([], function() {
    function OptionsController() {}

    OptionsController.prototype.init = function () {

    }

    OptionsController.prototype.start = function () {
        var self = this;
        this._navigationMenu = {};

        this.context.getChildren().then(function(kids) {
            var newsButton = self._newsButton = kids["news"],
                profileButton = self._profileButton = kids["profile"],
                friendsButton = self._friendsButton = kids["friends"],
                blogButton = self._blogButton = kids["blog"],
                photosButton = self._photosButton = kids["photos"],
                videosButton = self._videosButton = kids["videos"],
                cloudButton = self._cloudButton = kids["cloud"],
                privacyButton = self._privacyButton = kids["privacy"];

            self._navigationMenu = {
                'news': self._newsButton,
                'profile': self._profileButton,
                'friends': self._friendsButton,
                'blog': self._blogButton,
                'photos': self._photosButton,
                'videos': self._videosButton,
                'cloud': self._cloudButton,
                'privacy': self._privacyButton
            };

            newsButton.on('click', self._handleMenuNavigation.bind(self, 'news'));
            profileButton.on('click', self._handleMenuNavigation.bind(self, 'profile'));
            friendsButton.on('click', self._handleMenuNavigation.bind(self, 'friends'));
            blogButton.on('click', self._handleMenuNavigation.bind(self, 'blog'));
            photosButton.on('click', self._handleMenuNavigation.bind(self, 'photos'));
            videosButton.on('click', self._handleMenuNavigation.bind(self, 'videos'));
            cloudButton.on('click', self._handleMenuNavigation.bind(self, 'cloud'));
            privacyButton.on('click', self._handleMenuNavigation.bind(self, 'privacy'));
        });
    };

    OptionsController.prototype._handleMenuNavigation = function(destination) {
        var arrow;

        this.context.messaging.messagePublish('close-notifications');
        this._navigationMenu[destination].addClass('active');
        arrow = $(this._navigationMenu[destination]._root.parent()[0]).find('.arrow-left');
        $(arrow).addClass('active');

        for(var key in this._navigationMenu) {
            if(key != destination) {
                arrow = $(this._navigationMenu[key]._root.parent()[0]).find('.arrow-left');
                $(arrow).removeClass('active');
                this._navigationMenu[key].removeClass('active');
            }
        }

        //insert something
    };

    return OptionsController;
});
