/*
 * @Description:
 * @Author: YH
 * @Date: 2021-09-16 11:56:45
 * @LastEditTime: 2021-09-27 15:32:07
 */
const url = require('url')
// console.log(url)
// const httpUrl = 'https://www.huawei.com/cn/?ic_medium=direct&ic_source=surlent'
const httpUrl =
  'http://img.doutula.com/production/uploads/image/2021/09/23/20210923363217_uNsrFU.jpg'
// const urlObj = url.parse(httpUrl)
// console.log(urlObj)

const { URL } = require('url')
const myURL = new URL(httpUrl)
console.log(myURL)
//   (async function () {
//   let res = await axios.get(httpUrl)
// })()
