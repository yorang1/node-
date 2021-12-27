var express = require('express')
// 实例化路由模块,此路由模块相当于一个小的app实例
const myRouter = express.Router()
myRouter.use((req, res, next) => {
  console.log('判断是否是商城用户')
  next()
})
myRouter.get('/', (req, res) => {
  res.send('商城首页')
})
myRouter.get('/list', (req, res) => {
  res.send('商城列表')
})

module.exports = myRouter
