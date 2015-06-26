angular.module('starter.services', []).factory('$localstorage', ['$window',
    function($window) {
        return {
            set: function(key, value) {
                $window.localStorage[key] = value;
            },
            get: function(key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            setObject: function(key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function(key) {
                return JSON.parse($window.localStorage[key] || "[]");
            }
        }
    }
]).factory('Storage', function($localstorage) {
    return {
        setUnrated: function(Images, offset) {
            $localstorage.setObject('unratedPhotos', Images);
            var lastOffset = parseInt($localstorage.get('lastOffset', 0));
            $localstorage.set('lastOffset', lastOffset + offset);
        },
        getUnrated: function() {
            return $localstorage.getObject('unratedPhotos');
        },
        getRated: function() {
            return $localstorage.getObject('ratedPhotos');
        },
        getLastOffset: function() {
            return $localstorage.get('lastOffset') || 0
        },
        rateImage: function(imgSrc, vote) {
            unrated = this.getUnrated();
            unrated = unrated.filter(function(el) {
                return el.image.src !== imgSrc;
            });
            $localstorage.setObject('unratedPhotos', unrated);
            var rated = $localstorage.getObject('ratedPhotos');
            rated.push({
                image: imgSrc,
                vote: vote
            });
            $localstorage.setObject('ratedPhotos', rated);
            return true;
        }
    }
})