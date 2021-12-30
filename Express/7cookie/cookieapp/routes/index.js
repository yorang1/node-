var express = require('express')
var router = express.Router()
const crypto = require('crypto')
const secretCookie = {}
function setSecretCookie (str, secretStr) {
  secretCookie[secretStr] = str
}
function getSecretCookie (secretStr) {
  return secretCookie[secretStr]
}
function jiami (str) {
  const password = '123456'
  // 使用什么算法加密
  const obj = crypto.createHash('md5')
  // 进行加密
  obj.update(password)
  // 加密后的二进制数据以字符串的形式输出
  const result = obj.digest('hex')
  return result
}
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

// 设置加密cookie
router.get('/setSecretCookie', function (req, res, next) {
  res.cookie('secretLogin', 'true', { signed: true })
  res.send('设置加密cookie')
})

router.get('/setcookie', function (req, res, next) {
  res.cookie('isLogin', true, { maxAge: 10000 })
  res.cookie('isHttpOnly', true, { maxAge: 100000, httpOnly: true })
  res.send('设置cookie')
})

router.get('/admin', function (req, res, next) {
  console.log('req.cookies', req.cookies)
  if (req.cookies.isLogin) {
    res.send('登陆成功')
  } else {
    res.send('登陆失败')
  }
})

router.get('/adminSecret', function (req, res, next) {
  console.log('req.signedCookies.secretLogin', req.signedCookies)
  res.send('加密cookie' + req.signedCookies.secretLogin)
})

router.get('/secret', function (req, res, next) {
  const password = '123456'
  // 使用什么算法加密
  const obj = crypto.createHash('md5')
  // 进行加密
  obj.update(password)
  // 加密后的二进制数据以字符串的形式输出
  const result = obj.digest('hex')
  console.log(result)

  res.send('crypto:' + result)
})

// 自己定义加密
router.get('/appSecret', (req, res) => {
  const secretStr = jiami('true')
  console.log('secretStr',secretStr)
  res.cookie('register', secretStr)
  // 把设置加密的明文和密文放在一个对象
  setSecretCookie('true', secretStr)
  console.log(secretCookie);
  res.send('cookie加密成功')
})

// 获取自己定义的加密
router.get('/getSecret', (req, res) => {
  const strSecret = req.cookies.register
  console.log(strSecret);
  const content = getSecretCookie(strSecret)
  console.log(secretCookie);
  res.send('解密后的值:'+content)
})

module.exports = router
