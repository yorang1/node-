/*
 * @Description:
 * @Author: YH
 * @Date: 2021-09-27 10:25:29
 * @LastEditTime: 2021-09-27 16:05:19
 */
const puppeteer = require('puppeteer')
const axios = require('axios')
const url = require('url')
const fs = require('fs')
const path = require('path')

let httpUrl = 'https://sobooks.cc/'
;(async function () {
  let debugOptions = {
    defaultViewport: {
      width: 1400,
      height: 800
    },
    // 设置为有界面,如果为true,即为无界面
    headless: false,
    // 设置放慢每个步骤的毫秒数
    slowMo: 0,
    timeout: 0
  }
  const browser = await puppeteer.launch(debugOptions)
  // const browser = await puppeteer.launch({ headless: true })
  async function getAllNum () {
    let page = await browser.newPage()
    await page.setRequestInterception(true)
    // 监听请求事件,并对请求进行拦截
    page.on('request', interceptedRequest => {
      // 通过URL模块对请求的地址进行解析
      let urlObj = url.parse(interceptedRequest.url())
      if (urlObj.hostname == 'googleads.g.doubleclick.net') {
        // 拦截谷歌广告请求
        interceptedRequest.abort()
      } else {
        interceptedRequest.continue()
      }
    })

    await page.goto(httpUrl)
    let pageNum = await page.$eval('.pagination li:last-child span', el => {
      let text = el.innerHTML
      text = text.substring(1, text.length - 2).trim()
      return text
    })
    console.log(pageNum)
    page.close()
    return pageNum
  }
  // getAllNum()

  async function pageList (num) {
    let pageListUrl = `https://sobooks.cc/page/${num}`
    // let pageListUrl = `https://www.baidu.com/`
    let page = await browser.newPage()
    await page.setRequestInterception(true)
    page.on('request', interceptedRequest => {
      let urlObj = url.parse(interceptedRequest.url())
      if (urlObj.hostname == 'googleads.g.doubleclick.net') {
        // 拦截谷歌广告请求
        interceptedRequest.abort()
      } else {
        interceptedRequest.continue()
      }
    })
    // 访问列表页地址
    await page.goto(pageListUrl)
    let arrPage = await page.$$eval('.card .card-item .thumb-img>a', el => {
      let arr = []
      el.forEach(e => {
        var obj = {
          href: e.getAttribute('href'),
          title: e.getAttribute('title')
        }
        if (arr.length < 1) {
          arr.push(obj)
        }
      })
      return arr
    })
    page.close()
    // console.log(arrPage)
    arrPage.forEach(e => {
      getPageInfo(e)
    })
  }
  async function getPageInfo (pageObj) {
    console.log(pageObj)
    let page = await browser.newPage()
    await page.setRequestInterception(true)
    page.on('request', interceptedRequest => {
      let urlObj = url.parse(interceptedRequest.url())
      if (urlObj.hostname == 'googleads.g.doubleclick.net') {
        // 拦截谷歌广告请求
        interceptedRequest.abort()
      } else {
        interceptedRequest.continue()
      }
    })
    await page.goto(pageObj.href)
    // let eleA = await page.$('.dltable tr:nth-child(3) a:last-child')
    let eleA = await page.$('.content .article-header h1 a')
    console.log(eleA)
    let aHref = await eleA.getProperty('href')
    console.log(aHref)
    // aHref = aHref._remoteObject.value
    // aHref = aHref.split('?url=')[1]
    // let content = `{"title":${pageObj.title},"href":${pageObj.href}}--\n`
    // fs.writeFile('book.txt', content, { flag: 'a' }, function (err) {
    //   if (!err) {
    //     console.log('ok')
    //   } else {
    //     console.log(err)
    //   }
    // })
    // console.log(aHref)
  }
  // pageList(1)
  const aaa1 = {
    href: 'https://sobooks.cc/books/18845.html',
    title: '猫咪事务所（作家榜经典文库）'
  }
  getPageInfo(aaa1)
  // getPageInfo({ href: 'https://sobooks.cc/books/14620.html' })
})()
