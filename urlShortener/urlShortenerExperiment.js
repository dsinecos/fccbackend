// Math.round();

var max = 1000000;
var min = 1;
var shortenedURLID = Math.round(Math.random()*(max-min) + min);
var shortenedURL = "bite" + shortenedURLID;

console.log(shortenedURL);