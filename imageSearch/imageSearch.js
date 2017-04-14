// Importing module for using Google Custom Search API
var path = require('path');
var searchGoogle = require(path.resolve(__dirname, "./searchGoogle.js"));
var dbConstructor = require(path.resolve(__dirname, "./imageSearchDb.js"));
var db = new dbConstructor();

// Initializing app

var express = require('express');
var app = express();
var PORT = process.env.PORT || 2346;

app.enable("trust proxy");
app.listen(PORT);

// Setting up routers

app.get('/searchimage/:imageQuery', searchforImage);
app.get('/recentsearches/', returnRecentSearches);

function searchforImage(req, res) {

    // Prepare search query for Google Custom Search API
    var searchQuery = req.params.imageQuery;
    var ipAddress = req.headers['x-forwarded-for'] || req.ip;
    var numOfResults = (Boolean(Number(req.query.num)) && Number(req.query.num) < 10) ? req.query.num : 10;
    var options = {
        protocol: 'https:',
        hostname: 'www.googleapis.com',
        method: 'GET',
        path: '/customsearch/v1?key=AIzaSyAMvA5Qgc7zh7QQRiWHlDUyZKHo2Bip1nc&cx=002283777886525146733%3Ave3xyd9kete&q=' + searchQuery + '&searchType=image&fileType=jpg&imgSize=xlarge&alt=json&num=' + numOfResults
    };

    // Send the search query to the Google Custom Search API
    var imageSearchResults = searchGoogle(options);

    // Send Image results to client and update database
    imageSearchResults.then(function (imageSearchResultsComplete) {

        // Send response to the client
        var imageSearchResults = [];

        for (i = 0; i < numOfResults; i++) {
            imageSearchResults[i] = imageSearchResultsComplete[i];
        }

        res.write(JSON.stringify(imageSearchResults, null, "  "));
        res.end();

    });

    // Update Database
    // Logic
    // Check if the entry for the current ipAddress exists
    // If it exists append new search query next to the others
    // If the current ipAddress does not exist, create a new row and add the ipAddress and the search query
    // Check what kind of errors does UPDATE return when the row does not exist?

    var searchQueryForDatabase = searchQuery + "<>";
    // Have to revise the queryText to be able to Concat the new search query with the existing queries
    var queryText = "UPDATE imagesearch SET searchqueries = CONCAT($1::text, searchqueries) WHERE ipaddress = $2";
    var queryValues = [searchQueryForDatabase, ipAddress];

    var updateDbPromise = new Promise(function (resolve, reject) {
        //console.log("Inside update function");
        db.update(queryText, queryValues, handleDatabaseUpdateResponse);

        function handleDatabaseUpdateResponse(error, result) {
            if (result.rowCount === 1) {
                resolve(result);
            } else {
                reject(1);
            }
        }
    });

    updateDbPromise.catch(function (databaseUpdateFailed) {
        //console.log("Inside catch function");
        var searchQueryForDatabase = searchQuery + "<>";
        var queryText = "INSERT INTO imagesearch(ipaddress, searchqueries) VALUES($1, $2)";
        var queryValues = [ipAddress, searchQueryForDatabase];
        db.insert(queryText, queryValues);
    });

}

function returnRecentSearches(req, res) {
    // Extract ipAddress from request
    var ipAddress = req.headers['x-forwarded-for'] || req.ip;

    // Check for searchqueries against the extracted ipAddress using Promises
    // If the ipAddress is not found return "No search queries found against this ipAddress"
    // if the ipAddress is found parse the searchqueries, store them in an object and return to the client

    var getSearchQueries = new Promise(function (resolve, reject) {

        //var queryText = "SELECT * FROM imagesearch WHERE ipAddress = $1";        
        //var queryValues = [ipAddress];
        //db.select(queryText, queryValues, handleDatabaseResponse);

        var queryText = "SELECT * FROM imagesearch";
        db.select(queryText, handleDatabaseResponse);

        function handleDatabaseResponse(error, result) {
            //console.log(result);
            if (!result.rows[0]) {
                reject("No search queries found against the provided IP Address");
            } else {
                //console.log("Data returned from database " + JSON.stringify(result.rows[0], null, "   "));
                resolve(result.rows[0]);
            }
        }

    });

    getSearchQueries.then(function (searchQueries) {
        //console.log(searchQueries.ipaddress);
        //console.log(searchQueries.searchqueries)
        res.write(JSON.stringify(searchQueries.ipaddress));
        res.write(JSON.stringify(searchQueries.searchqueries));
        res.end();
    }).catch(function (errorMessage) {
        console.log(errorMessage);
        res.write(errorMessage);
        res.end();
    });
}



