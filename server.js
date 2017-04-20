var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var musicRoute = require('./routers/music-router');
var path = require('path');
var app = express();
var port = 8000;

app.use(bodyParser.json());
app.use('/', musicRoute);
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost/musicme', function(err){
    console.log('Connected to DB');
});






app.listen(port, function(){
    console.log("server is listening at 8000");
})