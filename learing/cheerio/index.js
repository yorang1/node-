/*
 * @Description:
 * @Author: YH
 * @Date: 2021-09-22 16:45:33
 * @LastEditTime: 2021-09-23 16:42:40
 */
const cheerio = require('cheerio')
const axios = require('axios')
const fs = require('fs')
const parseurl = require('url')
const path = require('path')
const { fsRead, fsWrite, fsDir } = require('../utils')

let httpUrl = 'https://www.doutula.com/article/list/?page=1'
axios.get(httpUrl).then(res => {
  let $ = cheerio.load(res.data)
  let reg = /(.*?)\d/gis
  $('#home .col-sm-9>a').each((i, el) => {
    // console.log(el);
    // console.log($(el).attr('href'))
    let pageUrl = $(el).attr('href')
    let title = $(el)
      .find('.random_title')
      .text()
    title = title.replace(/\s+/g, '').slice(0, 5)
    console.log(title)
    fsDir('./img/' + title.slice(0, 5))
    // console.log(reg.exec(title))
    // console.log(reg.exec(title)[1]);
    // console.log(title.match(reg));
    // console.log(reg.exec(title));
    // console.log(title.match(reg)[title.match(reg).length-1]);
    // parsePage(pageUrl, title)
  })
})

async function parsePage (url, title) {
  let res = await axios.get(url)
  let $ = cheerio.load(res.data)
  $('.pic-content img').each((i, el) => {
    let imgUrl = $(el).attr('src')
    // console.log(imgUrl)
    // console.log(path.extname(imgUrl))
    let extname = path.extname(imgUrl)
    // 图片写入的路径和名字
    let src = `./img/${title}/${title}-${i}${extname}`
    // 创建写入图片流
    let ws = fs.createWriteStream(src)
    axios.get(imgUrl, { responseType: 'stream' }).then(res => {
      res.data.pipe(ws)
      console.log('图片加载完成' + imgUrl)
      res.data.on('close', function () {
        ws.close()
      })
    })
  })
}
