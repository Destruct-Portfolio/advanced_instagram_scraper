import PuppeteerScrapper from '../Wrappers/puppetter_service.js'
import DisableNotification from './disableNotification.js'
import scrapeProfile from './scrapeprofile.js'
import SearchBar from './SearchBar.js'

// DEV ONLY
import fs from 'node:fs'

export default class LoginManual extends PuppeteerScrapper {
  constructor() {
    super(false, {
      headless: false,
      userDataDir: './userDataDir',
      defaultViewport: { height: 900, width: 1600 },
    })
  }

  protected async $extract(): Promise<void> {
    if (this.$page === null) {
    } else {
      await this.navigate('https://www.instagram.com/accounts/login/')
      await DisableNotification(this.$page)
    }
  }
}

// new LoginManual().exec()
