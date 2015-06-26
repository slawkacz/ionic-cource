angular.module('starter.controllers', []).controller('PhotosCtrl', function($scope, $ionicLoading, Photos, $q) {
    $scope.photos = [];
    $scope.photo;
    var setPhotoOnStage = function() {
        var defer = $q.defer();
        Photos.getPhotos().then(function(images) {
            $ionicLoading.show({
                template: '<ion-spinner icon="android"></ion-spinner>'
            });
            var img = new Image();
            img.onload = function() {
                $ionicLoading.hide();
                $scope.photos = images;
                $scope.photo = $scope.photos[0];
                defer.resolve();
                $scope.$digest();
            }
            img.src = images[0].image.src;
        });
        return defer.promise;
    };
     $scope.onSwipeUp = function() {
        Photos.rate($scope.photo.image.src, 1).then(setPhotoOnStage);
    };
    $scope.onSwipeDown = function() {
        Photos.rate($scope.photo.image.src, -1).then(setPhotoOnStage);
    };
    setPhotoOnStage();
}).controller('RatedCtrl', function($scope) {});