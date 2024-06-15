import { Browser, Page } from 'puppeteer'
import SearchBar from './SearchBar.js'
import scrapeProfile from './scrapeprofile.js'
import fs from 'node:fs'

export default class Script {
  constructor(
    private browser: Browser,
    private keywords: Array<string>,
  ) {}

  public async extract() {
    for (let index = 0; index < this.keywords.length; index++) {
      const page = await this.browser.newPage()
      await page.setViewport({ height: 900, width: 1600 })
      await page.goto('https://instagram.com/', {
        waitUntil: 'networkidle2',
        timeout: 0,
      })
      const keyword = this.keywords[index]
      console.log(`Searching ${keyword}`)

      let SearchUsers = await SearchBar(page, keyword)
      await page.close()
      const newPage = await this.browser.newPage()

      await newPage.setViewport({ height: 900, width: 1600 })
      let users = await scrapeProfile(newPage, SearchUsers)
      await newPage.close()
      fs.writeFileSync(`${keyword}.json`, JSON.stringify(users))
    }
  }
}
