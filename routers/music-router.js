var express = require('express');
var request = require('request');
var musicRoute = express.Router();
var Music = require('../models/music-schema');

musicRoute



.post('/artists/:name', function(req, res){
    var newShout = new Music(req.body);
    newShout.save(function(err, savedPost){
        if (err) throw err;
        res.send(savedPost);
    })
})

    .get('/artists/:name', function(req,res){
        //use request to make my API call req.params.search
        //Music.findOne(artist with the mbid from the body from the response)
        var requesttype = 'method=artist.getinfo&';
        var key = '4a845444a3aa5d88e98031ed96671efc';
        request('http://ws.audioscrobbler.com/2.0/?' + requesttype + 'artist=' + req.params.name + '&api_key=' + key + '&format=json', function (error, response, body) {
            var newEntry = JSON.parse(body);

            Music.find({artist: req.params.name}, function (err, shouts) {
               console.log(shouts.shoutbox)
                console.log(shouts)
                // newEntry.shoutbox = shouts;
                res.send(newEntry);
            })
        })

    })

    .put('/:artist/shouts/:id', function(req,res){
        Music.findByIdAndUpdate(req.params.id, req.body, function(err,editedPost){
            if (err) throw err;
            res.send(editedPost);
        })
    })

    .delete('/:artist/shouts/:id', function(req,res){
        Music.findByIdAndRemove(req.params.id, function(err, deleted){
            console.log('It was deleted');
            res.send(deleted);
        })

    })

module.exports = musicRoute;