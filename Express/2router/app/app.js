const express = require('express')
const app = express()

// 1字符串的路由模式
app.get('/', (req, res) => {
  res.send('这是首页')
})

// 2类字符串的正则模式(类似正则)
// 例如:匹配2个路径abcd或者acd 
// 例如 / ab + cd / (+号代表最少一个): abcd abbcd abbbcd
// 例如/ab*cd/(*号代表以ab开头cd结尾中间可以是任何字符): ab123cd ab112b321cd abb111bcd
app.get('/ab?cd', (req, res) => {
  res.send('这是abcd/acd')
})

// 3真正的正则匹配
// 匹配\a开头后面至少有10个数据的路径
app.get(/\/a\d{10,}/, (req, res)=>{
  res.send('新闻页面')
})

app.listen(8080)

module.exports = app