// Get data from Google's Custom Image search API for a search parameter

// Name of the custom search engine - fccbackendapi4
// https://cse.google.com/cse/create/congrats?cx=002283777886525146733%3Ave3xyd9kete
// cx = "here will be your CUSTOM_SEARCH_ID"
// The api endpoint url is - https://www.googleapis.com/customsearch/v1
// API Key -  AIzaSyAMvA5Qgc7zh7QQRiWHlDUyZKHo2Bip1nc 

// https request format for API endpoint - https://www.googleapis.com/customsearch/v1?key=SERVER_KEY&cx=CUSTOM_SEARCH_ID&q=flower&searchType=image&fileType=jpg&imgSize=xlarge&alt=json

// Example request url - https://www.googleapis.com/customsearch/v1?key=AIzaSyAMvA5Qgc7zh7QQRiWHlDUyZKHo2Bip1nc&cx=002283777886525146733%3Ave3xyd9kete&q=tallinn&searchType=image&fileType=jpg&imgSize=xlarge&alt=json

// How to make a request to an external API

const https = require('https');

var searchQuery = "sweden";

var options = {
    protocol: 'https:',
    hostname: 'www.googleapis.com',
    method: 'GET',
    path: '/customsearch/v1?key=AIzaSyAMvA5Qgc7zh7QQRiWHlDUyZKHo2Bip1nc&cx=002283777886525146733%3Ave3xyd9kete&q=' + searchQuery + '&searchType=image&fileType=jpg&imgSize=xlarge&alt=json',
};

https.get(options, handleImageSearchAPIResponse);

var googleAPICompleteResponse = " ";

function handleImageSearchAPIResponse(res) {

    console.log("Status code " + res.statusCode);
    console.log("Headers " + JSON.stringify(res.headers, null, "  "));

    res.on('data', function(data) {
        console.log("Data chunk returned from the Google Custom Image Search API");
        googleAPICompleteResponse += data;
    });

    res.on('error', function(error) {
        console.log("Error occurred ");
        console.log(error);
    });

    res.on('end', function(){
        console.log("Complete response recieved from Google Custom Search API");
        //  console.log(googleAPICompleteResponse);
        var googleAPICompleteResponseAsObject = JSON.parse(googleAPICompleteResponse);
        //console.log(googleAPICompleteResponseAsObject.items[0]);
        //console.log("Length of response sent from Google's Custom Search API " + googleAPICompleteResponseAsObject.items.length);

        // Initialize an array of objects that'll be returned to the user whose made this request
        var imageSearchResults = [];
        var responseLengthFromGoogleSearchAPI = googleAPICompleteResponseAsObject.items.length;
        
        for(i = 0; i < responseLengthFromGoogleSearchAPI; i++){
            
            var objectName = "result";

            var imageData = {
                [objectName + i]: {
                    pageURL: googleAPICompleteResponseAsObject.items[i].image.contextLink,
                    imageURL: googleAPICompleteResponseAsObject.items[i].link,
                    altText: googleAPICompleteResponseAsObject.items[i].snippet 
                }
            };
            
            imageSearchResults[i] = imageData;
            /*
            imageSearchResults[i][objectName + i].pageURL = googleAPICompleteResponseAsObject.items[i].image.contextLink;
            imageSearchResults[i][objectName + i].imageURL = googleAPICompleteResponseAsObject.items[i].link;
            imageSearchResults[i][objectName + i].altText = googleAPICompleteResponseAsObject.items[i].snippet;
            */

        };

        for(i = 0; i < imageSearchResults.length; i++) {
            console.log(JSON.stringify(imageSearchResults[i], null, "  "));
        };
        
    });

    // Go through items which is an array of objects and extract the relevant details
    // Return the relevant details to the user
}

// Send query parameters as an object. Send a dynamic variable as the search parameter
// Extract relevant image information to pass on to the user. Store results as an array of objects.
// Return to the user the relevant number of search results depending upon the query value provided by them

