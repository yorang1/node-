/*
 * @Description:
 * @Author: YH
 * @Date: 2021-09-13 11:27:10
 * @LastEditTime: 2021-09-15 10:53:22
 */
let fs = require('fs')
fs.readFile('hello.txt', { flag: 'r', encoding: 'utf-8' }, function (
  err,
  data
) {
  if (err) {
    console.log(err)
  } else {
    console.log(3,data)
    nodeEvent.emit('fileSuccess', data)
    console.log(7);
  }
})
console.log(1);
let nodeEvent = {
  event: {
    fileSuccess: []
  },
  on: function (eventName, eventFn) {
    console.log(2,'on');
    console.log(eventName);
    // console.log(eventFn);
    this.event[eventName].push(eventFn)
  },
  emit: function (eventName, eventMsg) {
    console.log(4,'emit');
    if (this.event[eventName]) {
      this.event[eventName].forEach(itemFn => {
        console.log(eventMsg);
        itemFn(eventMsg)
      })
    }
  }
}
nodeEvent.on('fileSuccess', function (eventMsg) {
  console.log(5,eventMsg);
})
nodeEvent.on('fileSuccess', function (eventMsg) {
  console.log(6,eventMsg)
})
