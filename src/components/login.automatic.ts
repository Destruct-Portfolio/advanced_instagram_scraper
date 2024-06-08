import PuppeteerScrapper from '../Wrappers/puppetter_service.js'
import ConfigService from '../Wrappers/config_service.js'
import { getRandomDelay } from '../utils/index.js'
import DisableNotification from './disableNotification.js'
import { BaseError } from 'src/errors/index.js'

const config = new ConfigService()

// TODO Close fLag is set to false becuase its DEV enviremnt

export default class LoginAutomatic extends PuppeteerScrapper {
  private username: string
  private password: string
  constructor() {
    super(false, {
      headless: false,
      userDataDir: './userDataDir',
      defaultViewport: { height: 900, width: 1600 },
    })
    this.username = config.get('IG_USERNAME')
    this.password = config.get('IG_PASSWORD')
  }

  protected async $extract(): Promise<void> {
    await this.navigate('https://www.instagram.com/accounts/login/')

    const isUsernameInputavaliable = await this.exists(
      "input[aria-label='Phone number, username, or email']",
    )

    const isPasswordInputAvliable = await this.exists(
      "input[aria-label='Password']",
    )

    if (isUsernameInputavaliable && isPasswordInputAvliable) {
      await this.$page?.type(
        "input[aria-label='Phone number, username, or email']",
        this.username,
        { delay: getRandomDelay() },
      )
      await this.$page?.type("input[aria-label='Password']", this.password, {
        delay: getRandomDelay(),
      })

      await this.$page?.click('button[type=submit]', {
        delay: getRandomDelay(),
      })

      await this.$page
        ?.waitForNavigation({
          timeout: 0,
          waitUntil: 'networkidle2',
        })
        .then(async () => {
          this.logger.info('Successfully Logged in to the account ')
          await DisableNotification(this.$page!)
        })
        .catch((error) => {
          console.log(error)
          this.logger.error(
            'Failed to log in Please Verify your credentials ...',
          )
          throw new BaseError(
            'Login Error',
            'Failed to Log in to the account',
            false,
            'Please Check the credentials in the .env file Or run the manual login via npm run manual login',
          )
        })
      // check if am logged in Correctly
    }
  }
}

