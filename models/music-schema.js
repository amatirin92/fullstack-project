/**
 * Created by amatirin on 4/17/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var musicSchema = new Schema({
    artist: String,
    apiid: String,
    shoutbox: [String]
});

var Music = mongoose.model('MusicModel', musicSchema);

module.exports = Music;