/*
 * @Description:
 * @Author: YH
 * @Date: 2021-10-22 17:51:19
 * @LastEditTime: 2021-11-09 11:27:07
 */
let LcApp = require('./lcApp')
let app = new LcApp()
app.staticDir = '/abc'

app.on('^/$', (req, res) => {
  res.setHeader('content-type', 'text/html;charset=utf-8')
  res.end('<h1>静静看到这个网站</h1><img src="./abc/logo.jpg">')
})

app.on('/gnxw(.*)', (req, res) => {
  console.log('国内新闻')
  res.setHeader('content-type', 'text/html;charset=utf-8')
  console.log(req.pathObj);
  if (req.pathObj.base === 'index') {
    res.end('这是国内新闻')
  } else {
    res.end('国内新闻其他页面')
  }
})

// app.on('/movies/\\d+', (req, res) => {
  app.on('/movies/[01]', (req, res) => {
  let movies = [
    {
      name: '雪豹',
      brief: '雪豹详情',
      author: '张震',
      stars: ['小明', 'TFBOY', '蔡徐坤']
    },
    {
      name: '少年的你',
      brief: '少年的你详情',
      author: '周冬雨',
      stars: [
        { name: '蔡徐坤', gender: '男' },
        { name: '迪丽热巴', gender: '女' }
      ]
    }
  ]
  console.log(req.pathObj);
  let index = req.pathObj.base
  // res.end(movies[index].name)
  res.render(movies[index], `./template/index${index}.html`)

  // if (index == 0) {
  //   res.render(movies[index], './template/index0.html')
  // } else {
  //   res.render(movies[index], './template/index1.html')
  // }
})

app.run(8090, () => {
  console.log('服务启动成功')
})
