var express = require('express')
const sqlQuery = require('../utilsMySQL')
// 实例化路由模块,此路由模块相当于一个小的app实例
// 提供前端ajax请求的接口
const api = express.Router()

//允许前端跨域请求的中间件
api.use((req, res,next) => {
  res.append('Access-Control-Allow-Origin', '*')
  res.append('Access-Control-Allow-Content-Type', '*')
  next()
})

// 提供什么分类下的,第N页book的数据
api.get('/book/category/:cid/page/:pid', async (req, res) => {
  let page = parseInt(req.params.pid)
  let sqlStr
  let result
  let arr
  let sqlStr1
  if (req.params.cid == 0) {
    sqlStr = 'select id,bookname,bookimg,author,cataory from book limit ?,28'
    arr = [(page - 1) * 28]
    result = await sqlQuery(sqlStr, arr)
    sqlStr1 = 'select count(id) as num  from book'
  } else {
    sqlStr =
      'select id,bookname,bookimg,author,cataory from book WHERE cataory in (SELECT category from category WHERE id = ?) limit ?,28'
    arr = [req.params.cid, (page - 1) * 28]
    result = await sqlQuery(sqlStr, arr)
    sqlStr1 =
      'select count(id) as num  from book WHERE cataory in (SELECT category from category WHERE id = ?)'
  }

  //获取总页数
  let result1 = await sqlQuery(sqlStr1, arr)
  let pageAll = Math.ceil(result1[0].num / 28)
  let cid = req.params.cid
  //设置分页的起始点
  let startPage = page - 4 < 1 ? 1 : page - 4
  let endPage = page + 5 > pageAll ? pageAll : page + 5
  let options = {
    books: Array.from(result),
    cataorys: await getCataory(),
    pageAll,
    page,
    cid,
    startPage,
    endPage
  }

  res.json(options)
})
api.get('/list', (req, res) => {
  res.send('商城列表')
})

async function getCataory () {
  //获取所有分类
  let sqlStr = 'select * from category'
  let result = await sqlQuery(sqlStr)
  return Array.from(result)
}

module.exports = api
