// Problem - I've to store search queries provided by the user. How do I know beforehand what would be the total length of these queries? Can I create a variable length varchar in Postgres?

// Initialize database
// Use text type/ Use Array type - Define a column of a table as a variable length multidimensional array
// Store search query in a text type column. Update when a new search query is entered

var pg = require('pg');

var connectionString = process.env.DATABASE_URL || "pg://admin:guest@localhost:5432/imagesearchexperiment";

var client = new pg.Client(connectionString);
client.connect();

client.query("DROP TABLE IF EXISTS imagesearchexperiment");
client.query("CREATE TABLE IF NOT EXISTS imagesearchexperiment(ipAddress varchar(64), searchqueries text[])");

var testForModularity = "imagesearchexperiment(ipAddress, searchqueries)";

client.query("INSERT INTO " + testForModularity + " VALUES($1, $2)",["ipAddress1",["query1","query2","query3"]]);
client.query("INSERT INTO imagesearchexperiment(ipAddress, searchqueries) VALUES($1, $2)",["ipAddress2",["query1","query2","query3"]]);
client.query("INSERT INTO imagesearchexperiment(ipAddress, searchqueries) VALUES($1, $2)",["ipAddress3",["query1","query2","query3"]]);

//client.query("UPDATE imagesearchexperiment SET searchqueries[4] = $1 WHERE ipAddress = $2", ["query4","ipAddress1"]);

var getSearchQuery = client.query("SELECT * FROM imagesearchexperiment WHERE ipAddress = $1", ["ipAddress1"]);

getSearchQuery.on('row', function(row, result) {

    result.addRow(row);
    console.log("Data returned from database " + JSON.stringify(result.rows[0], null, "   "));
    //client.end();

});

// How to extract the searchqueries for a given ipAddress?

// How to close the Postgres Database connection
// How to update the searchquery Array with a new query



