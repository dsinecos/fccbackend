var path = require('path');
var searchGoogle = require(path.resolve( __dirname, "./searchGoogle.js"));

var searchQuery = "sweden";

var options = {
    protocol: 'https:',
    hostname: 'www.googleapis.com',
    method: 'GET',
    path: '/customsearch/v1?key=AIzaSyAMvA5Qgc7zh7QQRiWHlDUyZKHo2Bip1nc&cx=002283777886525146733%3Ave3xyd9kete&q=' + searchQuery + '&searchType=image&fileType=jpg&imgSize=xlarge&alt=json',
};

searchGoogle(options).then(printImageResults);

function printImageResults(imageSearchResults) {
    for(i = 0; i < imageSearchResults.length; i++) {
        console.log(JSON.stringify(imageSearchResults[i], null, "  "));
    };
}

