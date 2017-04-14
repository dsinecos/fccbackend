var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

var express = require('express');
var path = require('path');
var app = express();
var PORT = process.env.PORT || 2346;

var publicPath = path.resolve(__dirname, "./public");

app.use(express.static(publicPath));
app.use(multer().single('thumbnail'));

//app.use(bodyParser.urlencoded({extended: false}));
//app.use(bodyParser.json());

/*
app.use(function(request, response) {
    response.writeHead(200, { "Content-Type": "text/html"});
    response.end("Looks like you didn't find the static file");
});
*/

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/public/uploadFile.html");
});

app.post('/uploadFile', function(req, res) {
    //var fileUpload = req.body.thumbnail;
    //console.log(fileUpload);
    console.log(req.file.size);
    //console.log(req.body);
    //console.log(req.body.password);
    res.write(req.file.size);
    res.write("Thankyuo for your interest");
    res.end();
})

app.listen(PORT);