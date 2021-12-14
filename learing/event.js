/*
 * @Description:
 * @Author: YH
 * @Date: 2021-09-15 16:01:48
 * @LastEditTime: 2021-09-15 16:53:36
 */
const { rejects } = require('assert')
let event = require('events')
let fs = require('fs')
const { resolve } = require('path')
const { encode } = require('punycode')

let ee = new event.EventEmitter()
ee.on('helloSuccess', function (data) {
  console.log('1', data)
})
ee.on('helloSuccess', function () {
  console.log('2')
})

// fs.readFile('hello.txt', { encoding: 'utf-8' }, function (err, data) {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(data)
//     ee.emit('helloSuccess', data)
//   }
// })

function yhReadFile (path) {
  return new Promise(function (resolve, reject) {
    fs.readFile(path, { encoding: 'utf-8' }, function (err, data) {
      if (err) {
        reject(err)
      } else {
        resolve(data)
        // ee.emit('helloSuccess', data)
      }
    })
  })
}

// yhReadFile('hello.txt').then(res => {
//   ee.emit('helloSuccess', res)
// })

async function test () {
  let  res = await yhReadFile('hello.txt')
  ee.emit('helloSuccess', res)
}

test()