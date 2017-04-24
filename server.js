var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var musicRoute = require('./routers/music-router');
var path = require('path');
var app = express();
var port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/artists/', musicRoute);
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req,res,next){
    console.log('Something is happening.');
    next();
})

mongoose.connect('mongodb://localhost/musicme', function(err){
    console.log('Connected to DB');
});



app.listen(port, function(){
    console.log("server is listening at 8000");
})