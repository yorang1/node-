var express = require('express')
var path = require('path')
const myRouter = require('./routes/mall')
const api = require('./routes/api')
var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
// 添加中间件
app.use((req, res, next) => {
  res.addNum = (a, b) => {
    return a + b
  }
  // console.log('访问任何页面,都会执行这个函数')
  next()
})

// 封装格式化get请求的query方法
app.use((req, res, next) => {
  const query = req.url.split('?')
  if (query.length > 0 && query[1]) {
    let queryArr = query[1].split('&')
    console.log(queryArr)
    if (queryArr) {
      const queryObj = {}
      queryArr.forEach(e => {
        queryObj[e.split('=')[0]] = e.split('=')[1]
      })
      console.log('queryObj', queryObj)
      req.myQuery = queryObj
    }
  }
  next()
})

app.get('/', (req, res) => {
  res.send('首页' + res.addNum(7, 8))
})
app.get('/abc', (req, res) => {
  res.send(req.myQuery)
})

app.use('/mall', myRouter)
app.use('/api', api)

module.exports = app
