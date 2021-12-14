/*
 * @Description:
 * @Author: YH
 * @Date: 2021-09-18 15:35:43
 * @LastEditTime: 2021-09-18 15:54:10
 */
let fs = require('fs')

function read (path) {
  return new Promise(function (resolve, reject) {
    fs.readFile(path, { encoding: 'utf-8' }, function (err, data) {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

function write (path, content) {
  return new Promise(function (resolve, reject) {
    fs.writeFile(path, content, { flag: 'a', encoding: 'utf-8' }, function (
      err
    ) {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

function mkdir (path) {
  return new Promise((resolve, reject) => {
    fs.mkdir(path, function (err) {
      if (err) {
        reject(err)
      } else {
        resolve('创建成功')
      }
    })
  })
}

function rename (oldPath, newPath) {
  return new Promise(function (resovle, reject) {
    fs.rename(oldPath, newPath, error => {
      if (error) {
        reject(error)
      } else {
        resovle('rename success')
      }
    })
  })
}

function readDir () {
  return new Promise(function (resolve, reject) {
    fs.readFile(path, options,function(err,files) {
      if (err) {
        reject(err) 
      } else {
        resolve(files)
      }
    })
  })
}

module.exports = { read, write, mkdir,rename, readDir}
