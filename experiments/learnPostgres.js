var pg = require("pg");

var conString = "pg://admin:guest@localhost:5432/learnpostgres";

var client = new pg.Client(conString);

client.connect();

/*
client.connect(function(err) {
    console.log("Connection to database server PostgreSQL established");
});
*/

// Creating a Table
client.query("DROP TABLE IF EXISTS contacts");
client.query("CREATE TABLE IF NOT EXISTS contacts(firstname varchar(64), lastname varchar(64), address varchar(256))");



// Inserting data into a table

client.query("INSERT INTO contacts(firstname, lastname, address) VALUES ($1, $2, $3)", ["Tyler", "Durden", "VictoriasSecret"]);

// Updating the table
client.query("UPDATE contacts set firstname = 'Brad' WHERE lastname='Durden'");
//console.log("This is the update query " + JSON.stringify(queryUpdate, null, "  "));

// Inserting data into a table
client.query("INSERT INTO contacts(firstname, lastname, address) VALUES ($1, $2, $3)", ["Jack", "Sparrow", "Tortuga"]);
client.query("INSERT INTO contacts(firstname, lastname, address) VALUES ($1, $2, $3)", ["Joker", "Batman", "Gotham"]);

// Deleting data from the table
client.query("DELETE FROM  contacts WHERE address = 'Tortuga'");

//client.query("INSERT INTO emps(firstname, lastname) values($1, $2)", ['Tinniam', 'Ganesh']);

// Retrieving data from a table
var query = client.query("SELECT * FROM contacts");

query.on("row", handleRow);
query.on("end", handleEnd);

function handleRow(row, result) {

    //console.log("This is the row " + JSON.stringify(row, null, "  "));
    //console.log("This is the result " + JSON.stringify(result, null, "  "));

    result.addRow(row);

    //console.log("This is the result after using addRow method " + JSON.stringify(result, null, "  "));

}

function handleEnd(result) {
    
    //console.log("Inside handleEnd function. Result is " + JSON.stringify(result, null, "  "));
    console.log(JSON.stringify(result.rows, null, "   "));

}

// The following piece of code works provided there is at least one client.query command in the rest of the code
client.on('drain', function() {
    console.log("Event 'drain' detected. Closing connection to PostgreSQL server")
    client.end();
});
