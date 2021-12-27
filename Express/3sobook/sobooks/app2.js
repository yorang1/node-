const express = require('express')
const app = express()
const sqlQuery = require('./utilsMySQL')
// 使用ejs模板引擎来渲染页面
const ejs = require('ejs')
// 将模板引擎与express应用相关联
app.set('views', "views")//设置视图的对应目录
app.set("view engine", "ejs")//设置默认的模板引擎
app.engine("ejs",ejs.__express)//定义模板引擎

app.get('/', async (req,res) => {
  // 数据库book表里面前28条的book获取出来
  let strSql = 'SELECT id,bookname,bookimg,author,cataory FROM book limit 0,28';
  let result = await sqlQuery(strSql)
  // let resJson = JSON.stringify(Array.from(result))
  // res.send(resJson)
  // res.json(Array.from(result))
  res.render("index.ejs",{title:"lcBook首页"})
})
app.get('/xiaoshuowenxue', async (req,res) => {
  let strSql = 'SELECT id,bookname,bookimg,author,cataory FROM book where cataory = "小说文学" limit 0,20';
  let result = await sqlQuery(strSql)
  res.json(Array.from(result))
  
})
app.get('/books/:bookid', async (req,res) => {
  let strSql = "select * from book where id = ?"
  let bookid = req.params.bookid;
  let result = await sqlQuery(strSql, [bookid])
  res.json(Array.from(result))
})

module.exports = app;