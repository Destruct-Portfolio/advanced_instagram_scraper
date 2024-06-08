import PuppeteerScrapper from '../Wrappers/puppetter_service.js'
import DisableNotification from './disableNotification.js'
import SearchBar from './SearchBar.js'

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

      await DisableNotification(this.$page).catch((err) => {
        console.log('No POP UPs This time')
      })
      let users = await SearchBar(this.$page, 'suicide boys')

      console.log(users[0])
    }
  }
}

new LoginManual().exec()
