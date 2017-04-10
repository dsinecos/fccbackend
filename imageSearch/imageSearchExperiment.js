// Initializing app


var express = require('express');
var app = express();
var PORT = process.env.PORT || 2346;

app.enable("trust proxy");
app.listen(PORT);

app.get('/testingquery/:param', function(req, res) {

    console.log(req.params.param);
    console.log(req.query.num);

    var demoArray = [{prop1: 'value1', prop2: 'value2'}, {prop1: 'value1', prop2: 'value2'}, {prop1: 'value1', prop2: 'value2'}, {prop1: 'value1', prop2: 'value2'}, {prop1: 'value1', prop2: 'value2'}, {prop1: 'value1', prop2: 'value2'}];
    
    res.write(JSON.stringify(demoArray, null, "   "));
    res.write("Thank you for making the request");
    res.end();

    console.log("Works even after the res.end is evoked");

});


// Learning to use the shorthand of if-else in JS using ternary operatory ?:
/*
test = NaN;

var numOfResults = (Boolean(Number(req.query.num)) && Number(req.query.num) < 10 ) ? test : 10;

console.log(numOfResults);
*/

// What happens when you JSON.stringify an array
/*
var demoArray = [1, 2, 3, 4, 5, 6];

console.log(JSON.stringify(demoArray));
console.log(demoArray);
*/