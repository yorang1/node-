/*
 * @Description:
 * @Author: YH
 * @Date: 2021-09-23 16:42:48
 * @LastEditTime: 2021-09-24 16:29:01
 */
const puppeteer = require('puppeteer')

async function test () {
  let options = {
    defaultViewport: {
      width: 1400,
      height: 800
    },
    headless: false
  }
  let browser = await puppeteer.launch(options)
  let page = await browser.newPage()
  await page.goto('https://www.dydytt.net/')
  await page.screenshot({ path: 'screenshot.png' })
  // $$eval函数使得,我们的回调函数可以运行在浏览器中,并且可以通过浏览器的方式进行输出
  let elements = await page.$$eval('#menu li a', el => {
    let eles = []
    el.forEach((item, i) => {
      // console.log(item.innerHTML)
      // console.log(item.innerText)
      let eleObj = {
        href: item.getAttribute('href'),
        text: item.innerText
      }
      eles.push(eleObj)
      // console.log(eleObj)
    })
    return eles
  })
  let gnPage = await browser.newPage()
  await gnPage.goto(elements[2].href)
  console.log(elements);
  // 浏览器的内容可以进行监听控制台的输出
  page.on('console', function (...args) {
    // console.log(args)
  })
}

test()
