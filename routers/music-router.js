var express = require('express');
var request = require('request');
var musicRoute = express.Router();
var Music = require('../models/music-schema');

musicRoute


.get('/', function (req,res){
    res.json({ message: 'hooray! welcome to our api!' });
})


// .post('/:name', function(req, res){
//     var newShout = new Music(req.body);
//     newShout.save(function(err, savedPost){
//         if (err) throw err;
//         res.send(savedPost);
//     })
// })

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
            console.log(newEntry);
            Music.find({artist: newEntry.artist.name}, function (err, objectArray) {
                newEntry.shoutbox = objectArray[0].shoutbox;
                res.send(newEntry)
                })
            })
        })

    .put('/:name', function(req,res) {
        Music.findOneAndUpdate({artist: req.params.name}, function(err, artist){
            artist.shoutbox = newEntry.shoutbox;
            return artist.save(function (err){
                    return res.send(artist.shoutbox)
            })
        })
    })

module.exports = musicRoute;