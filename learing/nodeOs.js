/*
 * @Description:
 * @Author: YH
 * @Date: 2021-09-16 11:46:00
 * @LastEditTime: 2021-09-16 11:56:35
 */
const os = require('os')
console.log(os)
console.log(os.cpus()) //cpu信息
// console.log(os.totalmem() / 1024 / 1024 / 1024) //内存信息
console.log(os.arch()) // 查看系统架构
// console.log(os.freemem() / 1024 / 1024 / 1024) //查看剩余内存
console.log(os.platform()) // 查看系统平台
