/**
 * Created by amatirin on 4/17/17.
 */
var app = angular.module('musicApp', ['ngRoute']);
app
    .config(function($routeProvider){
        $routeProvider.when('/artists/:name', {
            controller: 'mainController',
            templateUrl: "views/artist.html"
        });
    })

    .controller('mainController', ['$scope', 'apiService', 'databaseService', function ($scope, apiService, databaseService, $http) {
        // $scope.get = function (artist) {
        //     apiService.getApi(artist).then(function (response) {
        //         $scope.artist = response.artist.name;
        //         $scope.bio = response.artist.bio.content;
        //         $scope.photo = response.artist.image[0]["#text"];
        //         $scope.fans = response.artist.stats.listeners;
        //         $scope.playcount = response.artist.stats.playcount;
        //         $scope.apiid = response.artist.mbid;
        //
        //         var newArtist = {
        //             artist: $scope.artist,
        //             // imgUrl: $scope.photo,
        //             // bio: $scope.bio,
        //             shoutbox: $scope.shout,
        //             // fans: $scope.fans,
        //             // playcount: $scope.playcount
        //             apiid: $scope.apiid
        //         };
        //         $scope.newEntry = response;
        //
        //     })
        // };

        $scope.post = function (newShout) {
            databaseService.postToDatabase(newShout).then(function (response) {
                console.log(response);
            })
        }

        $scope.getFromDatabase = function(artist){
            databaseService.getFromDatabase(artist).then(function(response){
                $scope.newEntry = response;
                $scope.photo = response.artist.image[3]["#text"];
            })
        }
    }]);