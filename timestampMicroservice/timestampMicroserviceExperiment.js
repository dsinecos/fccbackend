var test = "2 Jan 1992";
var testDate = new Date(test);

//console.log(Boolean(Date.parse(testDate)));
//console.log(Boolean(testDate));

//console.log(Date.parse(testDate));

//console.log(Boolean(Number(test)));

//console.log(Date.parse(testDate));

var demo = Date.parse(testDate);

console.log(demo.valueOf());

var date2 = new Date(demo);

console.log(date2);
console.log(date2.valueOf());

/*
console.log(date2.toDateString());
console.log(date2.toISOString());
console.log(date2.toJSON());
console.log(date2.toLocaleDateString());
console.log(date2.toLocaleString());
console.log(date2.toString());
console.log(date2.toTimeString());
console.log(date2.toUTCString());
//console.log(date2.toLocaleFormat());
console.log(date2.toLocaleTimeString());
//console.log(date2.toSource());
*/