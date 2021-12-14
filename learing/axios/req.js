/*
 * @Description:
 * @Author: YH
 * @Date: 2021-09-17 15:29:18
 * @LastEditTime: 2021-09-22 15:24:24
 */
// headers: {
//   'X-Requested-With': 'XMLHttpRequest',
//   'Upgrade-Insecure-Requests': 1,
//   'User-Agent':
//     'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36}'
// }
// const axios = require('axios')
const axios = require('request')
const iconv = require('iconv-lite')
const { fsDir, fsWrite, fsRead } = require('../utils.js')

let httpUrl = 'https://www.dydytt.net/'

function axiosGet (url) {
  return new Promise((reslove, reject) => {
    axios.get({ url, encoding: null }, function (err, response, body) {
      if (err) {
        reject(err)
      } else {
        reslove(iconv.decode(body, 'gbk'))
      }
    })
  })
}
async function getBody () {
  let arr = []
  const res = await axiosGet(httpUrl)
  let reg = /<a href='(.*?)'>202/gi
  let result = res.match(reg)
  // console.log(result)
  result.forEach(item => {
    item.replace(/<a href='(.*?)'>202/g, e => {
      // console.log(e)
      // console.log(RegExp.$1)
      if (arr.length < 3) arr.push(RegExp.$1)
    })
  })
  return arr
}
getBody().then(res => {
  // console.log(res)
  getDetail(res)
})
// /MAX-WIDTH:\s400px\"\s\/\>([\s\S]+)◎简\s+介/;
async function getDetail (arr) {
  // const detail = await axiosGet(httpUrl + arr[0])
  const synopsis = []
  const regexp = /◎(.*)/gi

  for (let i = 0; i < arr.length; i++) {
    const detail = await axiosGet(httpUrl + arr[i])
    let detailList = detail.match(regexp)
    let synopsisObj = {}
    for (let i = 0; i < detailList.length; i++) {
      let key = detailList[i].slice(1, 5).replace(/\s/g, '')
      let value = detailList[i].slice(5, detailList[i].length - 6)
      value = value.replace(/&nbsp;/g, ' ')
      value = value.replace(/&egrave;/g, 'è')
      value = value.replace(/&middot;/g, '·')
      value = value.replace(/\s/g, '')
      synopsisObj[key] = value
    }
    await fsDir('./movies/' + synopsisObj['片名'])
    synopsisObj['pageUrl'] = httpUrl + arr[i]
    await fsWrite(
      './movies/' + synopsisObj['片名'] + '/' + synopsisObj['片名'] + '.json',
      JSON.stringify(synopsisObj)
    )

    synopsis.push(synopsisObj)
  }
  console.log(synopsis)
}
