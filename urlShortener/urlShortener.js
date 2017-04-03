var express = require('express');
var pg = require('pg');

var app = express();
var PORT = process.env.PORT || 2346;
var conString = "pg://fccbackend:blackwidow@localhost:5432/urlShortener";
var client = new pg.Client(conString);

client.connect();
//client.query("DROP TABLE IF EXISTS urlShortener");
client.query("CREATE TABLE IF NOT EXISTS urlShortener(longURL varchar(64), shortURL varchar(64))");

app.listen(PORT);

app.get('/:shortURL', function(req, res){
    
    var shortURL = req.params.shortURL;

    console.log("This is the shortURL " + shortURL);
    
    res.redirect(getRedirectURL(shortURL));
    res.end(); // Is this required? //
    
});

app.get('/shorten/:shortenURL', function(req, res) {
    
    var shortenURL = req.params.shortenURL;

    console.log("The longURL registered by the server is" + shortenURL);
    
    var returnObject = JSON.stringify(createShortURL(shortenURL));

    res.write(returnObject);
    res.end();
    
});

function createShortURL(longURL) {
    
    /* This function will
    Create an object that has two properties 1. Long or Redirect URL 2. Short URL
    Write the object to the database
    Send the object back to the calling function which will write it to the response stream
    */ 
    
    var max = 1000000;
    var min = 1;
    var shortenedURLID = Math.round(Math.random()*(max-min) + min);
    //var shortenedURL = "bite" + shortenedURLID;
    
    client.query("INSERT INTO urlShortener(longURL, shortURL) values($1, $2)", [longURL, shortenedURLID]);
    
    return {
        longURL: longURL,
        shortURL: shortenedURLID
    };
    
}

function getRedirectURL(shortURL) {
    
    /*
    This function will
    1. Read the database and find the matching Long URL for the given short URL
    2. Return the Long URL which will be redirected to by the calling function
    */
    
    console.log("This is inside the getRedirectURL function " + shortURL);

    var redirectURL;

    var queryLongURL = client.query("SELECT longURL, shortURL FROM urlShortener WHERE shortURL = $1" [shortURL]);
    
    console.log("After query");

    queryLongURL.on("row", function (row, result) {
        
        result.addRow(row);

    });

    queryLongURL.on("end", function (result) {
        
        redirectURL = result.rows[0].longURL;
        
        console.log("The redirect URL returned to the user is :" + redirectURL);
        
        return redirectURL;
        
        client.end();
    });   
    
    
}




