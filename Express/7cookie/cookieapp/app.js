var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
// 引入session模块
const session = require('express-session')

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
const sessionRouter = require('./routes/sessionModule')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// express 中间件
app.use(
  session({
    // 配置
    secret: '123', // 密言
    resave: true, // 是否强制保存,保存在磁盘上
    // session本质就是cookie
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000 // 设置session的有效期为1周
    },
    saveUninitialized: true // 是否保存初始化session
  })
)
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser('secret')) // secret:cookie加密
app.use(express.static(path.join(__dirname, 'public')))

// 路由匹配
app.use('/', indexRouter)
app.use('/users', usersRouter)

// session页面相关的路由匹配
app.use('/session', sessionRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
