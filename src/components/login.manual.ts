import { Page } from 'puppeteer'
import PuppeteerScrapper from '../Wrappers/puppetter_service.js'
import DisableNotification from './disableNotification.js'
import scrapeProfile from './scrapeprofile.js'
import SearchBar from './SearchBar.js'

// DEV ONLY
import fs from 'node:fs'

export default class LoginManual {
  constructor(private page: Page) {}

  public async $extract(): Promise<void> {
    await this.page.goto('https://www.instagram.com/accounts/login/', {
      waitUntil: 'networkidle2',
      timeout: 0,
    })
    await DisableNotification(this.page)
  }
}

// new LoginManual().exec()
