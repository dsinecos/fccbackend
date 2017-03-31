var express = require('express');
var path = require('path');

var app = express();

//app.set("port", process.env.PORT || 2346);
app.listen(2346);

app.get('/:date', function(req, res){
    
    var date = req.params.date;
    
    if(isValidDate(date)) {
        res.write(JSON.stringify(outputDate(date)));
        res.end();
    } else {
        res.write(JSON.stringify(outputDate(date)));
        res.end();
    }
    
});

function isValidDate(date) {
    
    var isValidDate = Boolean(Date.parse(date)) || Boolean(Number(date));
    
    if(isValidDate) {
        return true;
    } else {
        return false;
    }
    
}

function outputDate(dateRequest) {
    
    if(Number(dateRequest)) {

        dateObject = new Date(dateRequest*1000);
        date = {
            unix: dateRequest,
            natural: dateObject,
            //format: 'unix'
        };

        return date;        
        
    } else if (Date.parse(dateRequest)) {
        
        dateObject = new Date(dateRequest);
        date = {
            unix: dateObject.valueOf()/1000,
            natural: dateObject,
            //format: 'string'
        };
        
        return date;
        
    } else {
        date = {
            unix: null,
            natural: null
        };

        return date;
    }
    
    
}