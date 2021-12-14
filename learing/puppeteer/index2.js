/*
 * @Description:
 * @Author: YH
 * @Date: 2021-09-23 16:42:48
 * @LastEditTime: 2021-09-24 16:58:54
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

  // let elementHandles = await page.$$('#menu li a')
  // elementHandles[3].click()

  let inputEle = await page.$('.searchl .formhue')
  // console.log(inputEle);
  await inputEle.focus()
  await page.keyboard.type('蝙蝠侠')
  await page.$eval('.bd3rl>.search', el => {
    el.addEventListener('click', function (event) {
      event.cancelBubble = true
    })
  })
  let serarchBtn = await page.$('.searchr input[name="Submit"]')
  console.log(serarchBtn)
  // await page.keyboard.down('Enter')
  serarchBtn.click()
}

test()
