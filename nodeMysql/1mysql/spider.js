const axios = require('axios')
async function getPageUrl (num) {
  let httpUrl = 'https://sobooks.cc/page/' + num
  let res = await axios.get(httpUrl)
  console.log(res);
}
getPageUrl()