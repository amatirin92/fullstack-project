var express = require('express');
var request = require('request');
var musicRoute = express.Router();
var Music = require('../models/music-schema');

musicRoute


.get('/', function (req,res){
    res.json({ message: 'hooray! welcome to our api!' });
})
.get('/:name/:id', function(req,res){
        Music.findById(req.params.mbid, function(err,music){
            res.json(music);
        })
    })

    .get('/:name', function(req,res){
        //use request to make my API call req.params.search
        //Music.findOne(artist with the mbid from the body from the response)
        var requesttype = 'method=artist.getinfo&';
        var key = '4a845444a3aa5d88e98031ed96671efc';
        request('http://ws.audioscrobbler.com/2.0/?' + requesttype + 'artist=' + req.params.name + '&api_key=' + key +
            '&format=json', function (error, response, body) {
            var newEntry = JSON.parse(body);
            Music.find({artist: newEntry.artist.name}, function (err, objectArray) {
                newEntry.shoutbox = objectArray[0].shoutbox;
                res.send(newEntry)
            })
        })
    })

    //I want to post a new shout.
    //Shouts are documents with the name of the artist and a shoutbox property.
    //if the shoutbox doesn't exist, create a new one.
    //else update it

    .put('/:name', function(req,res) {
        console.log(req.params);
        console.log(req);

        Music.findOneAndUpdate({artist: req.params.name}, req.body, function(err, artist){

            res.send(artist.shoutbox);
            })
    });

module.exports = musicRoute;