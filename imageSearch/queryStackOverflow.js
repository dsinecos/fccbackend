var pg = require('pg');

var connectionString = process.env.DATABASE_URL || "pg://admin:guest@localhost:5432/imagesearchexperiment";

var client = new pg.Client(connectionString);
client.connect();

client.query("DROP TABLE IF EXISTS imagesearchexperiment");
client.query("CREATE TABLE IF NOT EXISTS imagesearchexperiment(ipAddress varchar(64), searchqueries text)");

client.query("INSERT INTO imagesearchexperiment(ipAddress, searchqueries) VALUES($1, $2)",["ipAddress1","query1<>query2<>query3"]);
client.query("INSERT INTO imagesearchexperiment(ipAddress, searchqueries) VALUES($1, $2)",["ipAddress2","query1<>query2<>query3"]);
client.query("INSERT INTO imagesearchexperiment(ipAddress, searchqueries) VALUES($1, $2)",["ipAddress3","query1<>query2<>query3"]);

var searchQuery = "query4<>Updated<>";
var ip = "ipAddress3";

client.query("UPDATE imagesearchexperiment SET searchqueries = CONCAT($1::text, searchqueries) WHERE ipAddress = $2", [searchQuery, ip]);


client.query("SELECT * FROM imagesearchexperiment WHERE ipAddress = $1", ["ipAddress3"], handleDatabaseResponse);

function handleDatabaseResponse(error,result) {
    //console.log(error);
    if(!result.rows[0]) {
        console.log("There's been an error");
        //console.log(result.rows[0].ipaddress);
        console.log("Data returned from database " + JSON.stringify(result.rows[0], null, "   "));
    } else {
        console.log("Data returned from database " + JSON.stringify(result.rows[0], null, "   "));
    }
}