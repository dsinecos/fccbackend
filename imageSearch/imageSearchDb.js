var pg = require('pg');
var connectionString = process.env.DATABASE_URL || "pg://admin:guest@localhost:5432/imagesearch";
var client = new pg.Client(connectionString);

client.connect();

//client.query("DROP TABLE IF EXISTS imagesearch");
client.query("CREATE TABLE IF NOT EXISTS imagesearch(ipaddress varchar(64), searchqueries text)");

function dbConstructor() {

}

module.exports = dbConstructor;


dbConstructor.prototype.insert = function (text, values) {
    client.query(text, values);
}

dbConstructor.prototype.select = function (text, values, callback) {
    client.query(text, values, callback);
}

dbConstructor.prototype.update = function (text, values, callback) {
    client.query(text, values, callback);
}

// What is returned if that row does not exist when using SELECT?
// What happens when UPDATE WHERE is used but the specified row does not exist?


