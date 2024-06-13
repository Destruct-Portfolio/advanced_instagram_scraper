import { Browser, Page } from 'puppeteer'
import SearchBar from './SearchBar.js'
import scrapeProfile from './scrapeprofile.js'

export default class Script {
  constructor(
    private browser: Browser,
    private keywords: Array<string>,
  ) {}

  public async extract() {
    const page = await this.browser.newPage()
    await page.setViewport({ height: 900, width: 1600 })

    for (let index = 0; index < this.keywords.length; index++) {
      const keyword = this.keywords[index]
      let SearchUsers = await SearchBar(page, keyword)
      let users = await scrapeProfile(page, [SearchUsers[0].user])

      // I need to write to CSV 
    }
  }
}
