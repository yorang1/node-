const http = require('http')
const path = require('path')
const url = require('url')
const fs = require('fs')
class LcApp {
  constructor () {
    this.server = http.createServer()
    this.reqEvent = {}
    // this.staticDir = '/static' // 这个默认值,index.js已经修改为abc了,下面ReadStream固定写的'./static'
    this.server.on('request', (req, res) => {
      let resState = false
      let pathObj = path.parse(req.url)
      req.pathObj = pathObj
      res.render = render
      // 正则匹配
      for (const key in this.reqEvent) {
        let regStr = key
        let reg = new RegExp(regStr, 'igs')
        if (reg.test(req.url)) {
          this.reqEvent[key](req, res)
          resState = true
          break
        }
      }
      if (!resState) {
        if (pathObj.dir == this.staticDir) {
          res.setHeader('content-type', this.getContentType(pathObj.ext))
          let rs = fs.createReadStream('./static/' + pathObj.base)
          rs.pipe(res)
        } else {
          res.setHeader('content-type', 'text/html;charset=utf-8')
          res.end('<h1>404!页面找不到</h1>')
        }
      }
    })
  }
  on (url, fn) {
    this.reqEvent[url] = fn
  }
  run (port, callback) {
    this.server.listen(port, callback)
  }
  getContentType (extName) {
    switch (extName) {
      case '.jpg':
        return 'image/jpeg'
      case '.html':
        return 'text/html;charset=utf-8'
      case '.js':
        return 'text/javascript;charset=utf-8'
      case '.json':
        return 'text/json;charset=utf-8'
      case '.gif':
        return 'image/gif'
      case '.css':
        return 'text/css'
    }
  }
}

function render (options, path) {
  fs.readFile(path, { encoding: 'utf-8', flag: 'r' }, (err, data) => {
    if (err) {
      // console.log(err)
    } else {
      data = replaceArr(options, data)
      data = replaceVar(options, data)
      // console.log('replaceVaa(data, options)', data)

      this.end(data)
    }
  })
}
function replaceVar (options, data) {
  // console.log(options)
  // console.log(data)
  let reg = /\{\{(.*?)\}\}/gis
  let result
  while ((result = reg.exec(data))) {
    let strKey = result[1].trim()
    console.log(strKey)
    let strValue = eval('options.' + strKey)
    // console.log(result[0], '-------', strValue)
    data = data.replace(result[0], strValue)
  }
  return data
}

function replaceArr (options, data) {
  // 匹配循环的变量,并且替换循环的内容
  let reg = /\{\%for\{(.*?)\}\%\}(.*?)\{\%endfor\%\}/gis
  while ((result = reg.exec(data))) {
    let strKey = result[1].trim()
    let strValueArr = options[strKey]
    let listStr = ''
    strValueArr.forEach((item, i) => {
      //替换每一项内容里的变量
      listStr = listStr + replaceVar({ item }, result[2])
    })
    data = data.replace(result[0], listStr)
  }
  // console.log('return data',data);
  return data
}
module.exports = LcApp
