/**
 * Created by atrifan on 9/17/2015.
 */
define(['../../../public/js/lib/promise.js'], function (Promise) {
    function TrainingController() {

    }

    TrainingController.prototype.init = function () {

    }

    TrainingController.prototype.start = function () {
        var deferred = Promise.defer();
        var self = this;
        this._root = this.context.getRoot();
        this._wrapper = this._root.find('.shield-container');

        this._getHeroes().then(function (heroes) {

            for(var i = 0; i < heroes.length; i++) {
                self._createHeroEntry(heroes[i]);
            }
            deferred.resolve();
        }, function (error) {
            deferred.resolve();
        });

        return deferred.promise;
    };

    TrainingController.prototype._createHeroEntry = function(hero) {
        var heroContainer = $('<div class="heroContainer"></div>');
        this._wrapper.append(heroContainer);
        var componentConfiguration = {
            handleBar: {
                name: 'training',
                view: 'profile'
            },
            context: {
                hasName: true,
                userName: hero.name,
                age: hero.age,
                height: hero.height,
                speed: hero.speed,
                superPower: hero.superPower
            }
        };

        this.context.insert(heroContainer, componentConfiguration);
    };

    TrainingController.prototype._getHeroes = function () {
        var deferred = Promise.defer();

        $.ajax({
            url: '/training-server/shield',
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                deferred.resolve(response);
            },
            error: function (error) {
                deferred.reject(error);
            }
        });

        return deferred.promise;

    };

    return TrainingController;
});