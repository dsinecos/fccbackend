var express = require('express');
var multer = require('multer');

var app = express();
app.listen(2346);

var uploads = multer({
  dest: 'stackOverflow/'
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/stackOverflow.html");
});

app.post('/upload', uploads.single('avatar'), function(req, res, next) {
  console.log(req.file);
  res.write(JSON.stringify(req.file.size));
  console.log(req.file.size);
  res.end();
});