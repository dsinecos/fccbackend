// Creating a module for searching using the Google Custom Search API

// Import modules
const https = require('https');

// Export module
module.exports = getImageResults;

function getImageResults(userOptions) {

    var options = defineOptions(userOptions);
    
    var getImageResultsPromise = new Promise(function(resolve, reject) {
        var imageResults = searchGoogle(options).then(arrayOfImageResults);
        resolve(imageResults);
    });

    return getImageResultsPromise;
}

// To define options with default values where values have not been provided
function defineOptions(userOptions) {

    var options = {};
    options = userOptions

    return options;
}

function searchGoogle(options) {

    var googleAPICompleteResponse = "";

    var searchGooglePromise = new Promise(resolveSearchGooglePromise)

    function resolveSearchGooglePromise(resolve, reject) {

        https.get(options, handleImageSearchAPIResponse);

        function handleImageSearchAPIResponse(res) {

            res.on('data', function (data) {
                googleAPICompleteResponse += data;
            });

            res.on('error', function (error) {
                console.log("Error occurred ");
                console.log(error);
            });

            res.on('end', function () {
                var googleAPICompleteResponseAsObject = JSON.parse(googleAPICompleteResponse);
                resolve(googleAPICompleteResponseAsObject);
            });
        }
    }

    return searchGooglePromise;
}

function arrayOfImageResults(googleAPICompleteResponseAsObject) {

    var imageSearchResults = [];
    var responseLengthFromGoogleSearchAPI = googleAPICompleteResponseAsObject.items.length;

    for (i = 0; i < responseLengthFromGoogleSearchAPI; i++) {
        var objectName = "result";
        var imageData = {
            [objectName + Number(i + 1)]: {
                pageURL: googleAPICompleteResponseAsObject.items[i].image.contextLink,
                imageURL: googleAPICompleteResponseAsObject.items[i].link,
                altText: googleAPICompleteResponseAsObject.items[i].snippet
            }
        };

        imageSearchResults[i] = imageData;
    };

    return imageSearchResults;
}
