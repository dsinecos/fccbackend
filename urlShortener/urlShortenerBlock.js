app.get('/:shortURL', function(req, res){
    
    var shortURL = req.params.shortURL;
    var ipAddress = req.headers['x-forwarded-for'] || req.ip;
    
    console.log("This is the shortURL " + shortURL);
    console.log("This is the IP Address " + ipAddress);
    
    getRedirectURL(shortURL, ipAddress, sendResponse);
    
    function sendResponse(redirectURL) {
        
        if(redirectURL.error) {
            res.write(redirectURL.error);
            res.end();
        } else {
            res.redirect(redirectURL.redirectURL);
            res.end();
        }
        
    }
    
});

function getRedirectURL(shortURL, ipAddress) {
    
    client.query("SELECT longURL FROM urlShortenerData WHERE shortURL = $1 AND ipAddress = $2", [shortURL, ipAddress], function(err, result) {
        
        if(err) {
            console.log("Error occured " + err);
            
            var data = {
                error: err,
                redirectURL: null
            };

            sendResponse(data);
        }
        
        console.log("longURL found :" + result.rows[0].longURL);
        
        var data = {
            error: null,
            redirectURL: result.rows[0].longURL
        };

        sendResponse(data);
        
    });    
    
}