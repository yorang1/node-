const express = require('express')
const app = express()
const sqlQuery = require('./utilsMySQL')

app.get('/', async (req,res) => {
  // 数据库book表里面前28条的book获取出来
  let strSql = 'SELECT id,bookname,bookimg,author,cataory FROM book limit 0,28';
  let result = await sqlQuery(strSql)
  // let resJson = JSON.stringify(Array.from(result))
  // res.send(resJson)
  res.json(Array.from(result))
})
app.get('/xiaoshuowenxue', (req,res) => {
  let strSql = 'SELECT id,bookname,bookimg,author,cataory FROM book where cataory = "文学小说" limit 0,28';
  
})
app.get('/books/:bookid', (req,res) => {
  
})

module.exports = app;