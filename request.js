// download contents of url (works on any webpage)
const request = require('request');
request('https://poloniex.com/public?command=returnTicker', function(error, response, body) {
  var ticker = JSON.parse(body);
  console.log(ticker);
});
