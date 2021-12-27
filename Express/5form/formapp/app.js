const express = require('express')
const sqlQuery = require('./utilsMySQL')
const path = require('path')
const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))

// 解析post提交的数据
app.use(express.urlencoded({ extended: true }))

//搜索首页
app.get('/', (req, res) => {
  res.render('index.ejs')
})

// get 搜索
app.get('/search', async (req, res) => {
  // let queryStr = req.url.split('?')[1]
  // console.log(queryStr);
  // let quertResult = queryStr.split('&')
  // console.log(quertResult);
  console.log(req.query)
  console.log(req.query.searchKey)
  let strSql =
    "select id,bookname,cataory from book where bookname like '%" +
    req.query.searchKey +
    "%'"
  let result = await sqlQuery(strSql)
  res.json(Array.from(result))
})

// 获取post提交的请求
app.post('/searchPost', (req, res) => {
  console.log(req.query) // 空对象
  console.log(req.body)
  res.send('post提交数据')
  // res.render('ajaxPost.ejs')
})

// 登录
app.get('/login', (req, res) => {
  res.render('login.ejs')
})

app.post('/login', async (req, res) => {
  // 获取用户名和密码
  const { username, password } = req.body
  // 查询数据库是否有此用户名和密码
  let sqlStr = 'select * from user where username = ? and password = ?'
  let result = await sqlQuery(sqlStr, [username, password])
  if (result.length === 0) {
    res.send('登录失败')
  } else {
    res.send('登录成功')
  }
})

app.get('/ajax', async (req, res) => {
  res.render('ajax.ejs')
})

module.exports = app
