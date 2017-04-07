// Importing modules

var url = require('url');

// Initializing app

var express = require('express');
var app = express();
var PORT = process.env.PORT || 2346;

app.enable("trust proxy");
app.listen(PORT);

// Connecting to database and creating table

var pg = require('pg');
var conString = process.env.DATABASE_URL || "pg://admin:guest@localhost:5432/urlshortenerdata";
var client = new pg.Client(conString);

client.connect();

// Create three fields - longURL, shortURL, ipAddress - in the table

//client.query("DROP TABLE IF EXISTS urlshortenerdata");
client.query("CREATE TABLE IF NOT EXISTS urlshortenerdata(longURL varchar(64), shortURL integer, ipAddress varchar(20))");

// Routers

app.get(/shorten/, function(req, res) {
    
    var path = req.path;
    var url = path.replace(/shorten/i, "");
    var longURL = url.slice(2, url.length);
    
    var ipAddress = req.headers['x-forwarded-for'] || req.ip;
    
    //console.log("ipAddress at the root " + ipAddress);
    
    if(isValidURL(longURL)) {
        createShortURL(longURL, ipAddress, sendResponse);
    } else {
        res.write("The url provided is not valid")
        res.end();
    }

    function isValidURL(url) {
        var regexTestForValidURL = new RegExp("https?://www.*.com");
        var isValidURL = regexTestForValidURL.test(url);
        console.log(isValidURL);
        return isValidURL;
    }    
    
    function sendResponse(data) {
        res.write(JSON.stringify(data, null, "  "));
        res.end();
    }
    
});

function createShortURL(longURL, ipAddress, sendResponse) {
    
    /*
    Get the maximum shortURL value for the given ipAddress. Increment it by 1.
    */
    
    var maxShortURL = client.query("SELECT MAX(shortURL) FROM urlshortenerdata WHERE ipAddress = $1", [ipAddress]);
    
    maxShortURL.on("row", function(row, result) {
        
        console.log("Inside local function. The returned value of row from database is " + Number(row.max));
        
        var shortURL = Number(row.max) + 1;
        
        client.query("INSERT INTO urlshortenerdata(longURL, shortURL, ipAddress) values($1, $2, $3)", [longURL, Number(shortURL), ipAddress]);
        
        var data = {
            longURL: longURL,
            shortURL: shortURL,
            ipAddress: ipAddress
        };
        
        sendResponse(data)                
    });
    
}

app.get('/:shortURL', function(req, res){
    
    var shortURL = req.params.shortURL;
    var ipAddress = req.headers['x-forwarded-for'] || req.ip;
    
    console.log("This is the shortURL " + shortURL);
    console.log("This is the IP Address " + ipAddress);
    
    getRedirectURL(shortURL, ipAddress, sendResponse);
    
    function sendResponse(data) {        
        
        var longURL = String(data.longurl);        
        
        res.redirect(longURL);
        res.end();        
        
    }
    
});

function getRedirectURL(shortURL, ipAddress, sendResponse) {
    
    var redirectURLQuery = client.query("SELECT * FROM urlshortenerdata WHERE shortURL = $1 AND ipAddress = $2", [shortURL, ipAddress]);
    
    redirectURLQuery.on("row", handleRow);
    //redirectURLQuery.on("end", handleEnd);
    
    function handleRow(row, result) {
        
        //console.log("This is the row " + JSON.stringify(row, null, "  "));
        //console.log("This is the result " + JSON.stringify(result, null, "  "));
        
        result.addRow(row);
        console.log("Inside handleEnd function " + JSON.stringify(result.rows[0], null, "   "));
        sendResponse(result.rows[0]);
        //console.log("This is the result after using addRow method " + JSON.stringify(result, null, "  "));
        
    }
}
