var express = require('express');

var app = express();
var PORT = 2346;

// For Heroku deployment
app.set("port", process.env.PORT);

// For local machine deployment and testing
app.listen(PORT);

app.use(function(req,res){
    
    /* 1. Extract headers from the request
    2. Format them into a JSON object
    3. Send it as response
    */
    
    console.log('Request recieved from :' + req.ip);
    
    res.write(getUserData(req));
    res.end();
    
    console.log("Request processed and responded with" + getUserData(req));
    
});

function getUserData(req) {

    var language = req.acceptsLanguages()[0];

    var userSoftware = req.headers['user-agent'];
    var beginOSIndex = userSoftware.indexOf('(');
    var endOSIndex = userSoftware.indexOf(')');
    var operatingSystem = userSoftware.slice(beginOSIndex, endOSIndex);
 
    
    var parsedHeader = {
        ipaddress: req.ip,
        language: language,
        os: operatingSystem
    };
    
    var parsedHeaderString = JSON.stringify(parsedHeader);

    return parsedHeaderString;   
    
}
