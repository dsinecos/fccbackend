/*
The objective here is to use a file as a database to
1. Write data
2. Read data
3. Retrieve data
*/

var fs = require('fs');

//var readDatabase = fs.createReadStream('database', 'utf8');

// Can I create a JSON object by using JSON.parse when reading from a stream?
// What happens when the size of the file is larger than the size of the buffer? How'll that be managed?
// Would each buffer size data be converted to a JSON object and the relevant functions carried out?
// Or will that throw an error?
// Can I use the above created JSON object to match to a query and extract that object's sibling properties?


// The following code works. It uses a writeStream to write to a file and readFile to read from it.
// The read data is converted to an object using JSON.parse and the relevant key-value pairs are extracted

redirectURLInfo = {
    request1: {
        redirectURL: 'redirect1',
        shortURL: 'shortURL1'
    },
    request2: {
        redirectURL: 'redirect2',
        shortURL: 'shortURL2'
    },
    request3: {
        redirectURL: 'redirect3',
        shortURL: 'shortURL3'
    }
};

var writeDatabase = fs.createWriteStream('database');

writeDatabase.write(JSON.stringify(redirectURLInfo));

fs.readFile('database', 'utf8', function(err, data){
    
    if(err) throw err;    
    var fileDataAsObject = JSON.parse(data);
    
    // console.log(fileDataAsObject.request1.redirectURL);
        
    getRelevantData(fileDataAsObject);    

});


// This part of the program extracts the relevant key-value pairs by running through all the keys 
// in the file

function getRelevantData(fileDataAsObject) {

    for(i in fileDataAsObject) {
        console.log('\n');
        if(fileDataAsObject[i].shortURL === 'shortURL1') {
            console.log(fileDataAsObject[i].redirectURL);
        } else {
            console.log("The shortURL you specified was not located in the database");
        }
    }
}