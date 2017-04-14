var multer = require('multer');
var upload = multer();

var express = require('express');
var path = require('path');
var app = express();
var PORT = process.env.PORT || 2346;

var publicPath = path.resolve(__dirname, "./public");

app.use(express.static(publicPath));
app.use(multer().single('thumbnail'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/public/uploadFile.html");
});

app.post('/uploadFile', function(req, res) {
    
    res.write(JSON.stringify(req.file.size));
    res.write("Thankyuo for your interest");
    res.end();

})

app.listen(PORT);