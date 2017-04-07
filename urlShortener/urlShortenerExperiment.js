// Learn to use regex to extract URL from /shorten/:url
var express = require('express');
var app = express();
var PORT = process.env.PORT || 2350;

app.enable("trust proxy");
app.listen(PORT);

app.get(/shorten/, function(req, res) {
    
    //var longURL = req.params.longURL;

    /*
    var ipAddress = req.headers['x-forwarded-for'] || req.ip;
    
    var path = req.path;
    var url = path.replace(/shorten/i, "");
    var longURL = url.slice(2, url.length);

    console.log(req.path);
    console.log(longURL);
    console.log(longURL.length);
    */

    var url = "https://www.reddit.com/r/rickandmorty/"

    res.redirect(url);
    res.end();
});

// We have to apply regex on path

