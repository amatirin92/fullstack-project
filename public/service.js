var app = angular.module('musicApp');

app.service('apiService', function($http){
    // this.getApi = function(artist) {
    //     // var request = 'method=artist.getinfo&';
    //     // var key = '4a845444a3aa5d88e98031ed96671efc'
    //     // return $http.get('http://ws.audioscrobbler.com/2.0/?' + request + 'artist=' + artist + '&api_key=' + key + '&format=json')
    //     //     .then(function(response){
    //     //         return response.data
    //     //     })
    //
    //     return $http.get('/artists/' + artist).then(function(response){
    //         return response.data;
    //     })
    // }
})

app.service('databaseService', function($http){
    this.putToDatabase = function(artist, newShout){
        return $http.put('/artists/' + artist, newShout).then(function(response){
            return response.data
        })
    }
    this.getFromDatabase = function(artist){
        return $http.get('/artists/' + artist).then(function (response){
            return response.data
        })
    }
});