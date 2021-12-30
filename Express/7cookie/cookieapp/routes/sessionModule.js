var express = require('express')
var router = express.Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})

// 设置session
router.get('/setSession', (req, res) => {
  // 登录后,获取用户的姓名和等级
  req.session.isLogin = 'true'
  req.session.username = '小明'
  req.session.vipLevel = 5
  req.session.cookie.maxAge = 10000
  res.send('登录状态已设置到session中')
})

// 获取session
router.get('/getSession', (req, res) => {
  console.log(req.session)
  if (req.session.isLogin === 'true') {
    res.send(
      `登陆成功,用户名${req.session.username},用户等级${req.session.vipLevel}\n<a href='/session/exitSession' target='_blank'>退出登录</a>`
    )
  } else {
    res.send('尚未登录')
  }
})

// 销毁session
router.get('/exitSession', (req, res) => {
  req.session.destroy(() => {
    console.log('session已经销毁完毕')
  })
  res.send('成功退出')
})

module.exports = router
