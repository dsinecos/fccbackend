var pg = require("pg");

var conString = "pg://admin:guest@localhost:5432/learnPostgres";

var client = new pg.Client(conString);

client.connect(function(err) {
    console.log("Connection to database server PostgreSQL established");
});




// How to make the following piece of code work as intended?
client.on('drain', function() {
    console.log("Event 'drain' detected. Closing connection to PostgreSQL server")
    client.end();
});