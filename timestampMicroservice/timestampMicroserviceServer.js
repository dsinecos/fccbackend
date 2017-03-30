var express = require('express');

var app = express();
var PORT = 2346;

app.get('/', function(req,res) {

    res.write("Hello World!");
    res.end();

})

app.get('/:date', function(req, res){ // Would the path for the website be decided by the heroku address?

    
    console.log("Request recieved ");
    //console.log(req.path);
    console.log(req.method);
    console.log(req.protocol);
    console.log("Date in request " + req.params.date);    

    res.write("Test");
    res.end("Request recieved");   
    
});

app.listen(PORT, cb);

function cb() {
    console.log("Listening on Port " + PORT);
}

console.log("Testing Nodemon");