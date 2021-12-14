/*
 * @Description:
 * @Author: YH
 * @Date: 2021-09-29 11:31:25
 * @LastEditTime: 2021-09-29 11:50:26
 */

const http = require('http')

const server = http.createServer()

server.on('request', function (req, res) {
  res.end('hello world')
})

server.listen(3000, function () {
  console.log(111)
})
