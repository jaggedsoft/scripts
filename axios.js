const axios = require('axios');
(async () => {
let response = await axios.get("https://files.coinmarketcap.com/generated/stats/global.json");
let cmc = response.data;
console.log(cmc);
/*
// Send a POST request
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});

var instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});
*/
})();
