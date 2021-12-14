const express = require('express')

const app = express()
app.get('/', function (req, res) {
  console.log(req);
  console.log(res);
  res.send('<h1>hellworld,我是首页</h1>')
})
app.listen(8080, () => {
  console.log('服务器启动完成:','http://127,0.0.1:8080');
})