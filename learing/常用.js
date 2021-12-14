/*
 * @Description:
 * @Author: YH
 * @Date: 2021-09-16 11:15:58
 * @LastEditTime: 2021-09-16 11:43:10
 */

let path = require('path')
const fs = require('fs')
console.log(path)

let strPath =
  'https://gitlab.91jkys.com/uploads/-/system/appearance/header_logo/1/logo-mini.png'
let info = path.extname(strPath)
console.log(info) // .png

let arr = ['/sxt', 'aaa', 'bbb']
let src = path.resolve(...arr)
console.log(src)

console.log(__dirname) // 当前路径

let src2 = path.join(__dirname, ...arr)
console.log(src2);


let httpSrc = 'https://gitlab.91jkys.com/web/operate-admin/-/pipelines'
let arrParse = httpSrc.split('/')
console.log(arrParse);
console.log(arrParse.slice(-2));

// let filePath = path.join(__dirname, 'xinwen.html')

// fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// })
console.log(__filename);
console.log(path.extname(__filename));
console.log(path.parse(__filename));
