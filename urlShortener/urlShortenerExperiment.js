// Learn to use regex to extract URL from /shorten/:url
var express = require('express');
var app = express();
var PORT = process.env.PORT || 2350;

app.enable("trust proxy");
app.listen(PORT);

app.get(/shorten/, function(req, res) {
    
    var ipAddress = req.headers['x-forwarded-for'] || req.ip;
    
    var path = req.path;
    var url = path.replace(/shorten/i, "");
    var longURL = url.slice(2, url.length);

    // What regex to use to test that longURL is a valid URL - of the format - http://www.example.com?

    if(isValidURL(longURL)) {
        res.redirect(longURL);
    }

    function isValidURL(url) {
        var regexTestForValidURL = new RegExp("https?://www.*.com");
        var isValidURL = regexTestForValidURL.test(url);
        console.log(isValidURL);
        return isValidURL;
    }



    console.log(req.path);
    console.log(longURL);
    console.log(longURL.length);
    
});

// We have to apply regex on path

