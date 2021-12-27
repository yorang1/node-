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
  //插入变量
  const options = {
    title: "lcBook首页",
    articleTitle:"<h1>文章标题</h1>"
  }
  res.render("index.ejs",options)
})
app.get('/tj', async (req, res) => {
  //条件
  let options = {
    username: "小明",
    gender :"男" 
  }
  res.render('condition.ejs',options)
  // res.json(Array.from(result))
  
})

app.get('/xh', async (req,res) => {
  //循环
  const stars = ['cjx','gjm','wyf','lh']
  res.render('xh.ejs', { stars })
})

module.exports = app;