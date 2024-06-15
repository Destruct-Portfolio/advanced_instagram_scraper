import { Page } from 'puppeteer'
import DisableNotification from './disableNotification.js'

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

