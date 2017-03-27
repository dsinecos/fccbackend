var http = require("http");
var url = require('url');

var httpServer = http.createServer(requestListener);
var PORT = process.argv[2] || 2346;

function requestListener(request, response) {

  console.log("Request received ");
  console.log("Request method :" + request.method);
  console.log("Request URL :" + request.url);

  var parsedURL = url.parse(request.url, true);

  // Dealing with response object
  
  if (parsedURL.pathname === '/api/parsetime') {
    parseTime();
  } else if (parsedURL.pathname === '/api/unixtime') {
    unixTime();
  }
  

  function parseTime() {

    //console.log("Parsed Request URL");
    //console.log(parsedURL);

    var isoTime = new Date(parsedURL.query.iso);
    //console.log("Iso Time from URL :" + isoTime);

    var responseIsoTime = {
      hour: isoTime.getHours(),
      minute: isoTime.getMinutes(),
      second: isoTime.getSeconds()
    }

    //console.log("Iso time hours" + JSON.stringify(responseIsoTime));
    
    response.write(JSON.stringify(responseIsoTime));
    response.end();
    
  }

  function unixTime() {
    var unixTime = new Date(parsedURL.query.iso);
    var responseUnixTime = {
      unixtime: unixTime.getTime()
    };

    response.write(JSON.stringify(responseUnixTime));
    response.end();
  }

  /*
  response.setHeader('X-Foo', 'bar');
  response.writeHead(200, "Is this a status message", { 'Content-Type': 'text/plain',
                          'Trailer': 'Content-MD5' });
  
  response.write("Does this go into the body or somewhere else?");
  response.end();
  */

}

httpServer.listen(PORT, serverInitiatedMessage);

function serverInitiatedMessage() {

  console.log("Server initiated");
  console.log("Listening on Port :" + JSON.stringify(httpServer.address()));

}