var pg = require('pg');

var conString = "pg://fccbackend:blackwidow@localhost:5432/urlShortener";
var client = new pg.Client(conString);

client.connect();

client.query("DROP TABLE IF EXISTS ghanta");
client.query("CREATE TABLE IF NOT EXISTS ghanta(firstname varchar(64), lastname varchar(64))");
//client.end();
//client.connect();
client.query("INSERT INTO ghanta(firstname, lastname) values($1, $2)", ['Ronald', 'McDonald']);
client.query("INSERT INTO ghanta(firstname, lastname) values($1, $2)", ['Mayor', 'McCheese']);

var test = "Mayor";

var query = client.query('SELECT * FROM ghanta WHERE firstname = $1', [test]);

query.on("row", function (row, result) {
    result.addRow(row);
});
query.on("end", function (result) {
    var resultObject = result.rows;
    console.log(resultObject);
    console.log(resultObject[0].lastname);
    client.end();
});

console.log("Hoye");
