import {
  RequestDataUserPage,
  Userd,
  ApiUSerResponse,
  User,
} from '../types/index.js'
import ConfigService from '../Wrappers/config_service.js'
import { BaseError } from '../errors/index.js'
import { queryStringToJSON } from '../utils/index.js'
import Queue from '../utils/Queue.js'
const config = new ConfigService()
import fs from 'node:fs'
import { Page } from 'puppeteer'
import { Logger } from '@destruct/logger'

// TODO please Toggle false to true durring production

export default class ScrapUser {
  private results: Set<ApiUSerResponse>
  private users: Queue<User>

  private readonly max_retries: number = 3

  constructor(
    private $page: Page,
    users: Array<User>,
    private logger: Logger = new Logger('ProfileScraper'),
  ) {}

  private async CollectProfileInfor(userId: string): Promise<ApiUSerResponse> {
    await this.$page?.reload()
    return new Promise((resolve, reject) => {
      return this.$page?.on('response', async (respose) => {
        if (respose.url().includes('graphql')) {
          let PostDataFormated = queryStringToJSON<RequestDataUserPage>(
            respose.request().postData()?.toString()!,
          )
          let variableContent = JSON.parse(
            PostDataFormated.variables.toString(),
          )

          if ('id' in variableContent) {
            if (variableContent.id === userId) {
              console.log('REQUEST POST DATA CONTAINS VRIABLE.ID  ===', userId)
              resolve((await respose.json()) as ApiUSerResponse)
            }
          }
        }
      })
    })
  }
  public async $extract() {
    if (!this.$page)
      throw new BaseError(
        'ScraperError',
        'Puppetteer page is undefined',
        true,
        'Please make sure you have a chromuim page allready running ',
      )
    await this.$page.setRequestInterception(true)
    this.$page.on('request', async (request) => {
      if (request.isInterceptResolutionHandled()) return
      await request.continue()
    })

    for (let index = 0; index <= this.users.length(); index++) {
      const user = this.users.dequeue()?.user
      console.log(`scraping this user now :: ${user?.username}`)
      let retries = 0
      while (retries < this.max_retries) {
        try {
          if (!user) return

          await this.$page.goto(`https://instagram.com/${user.username}/`, {
            timeout: 0,
            waitUntil: 'networkidle2',
          })

          let userInfo = await this.CollectProfileInfor(user.pk)

          // this needs to include more human behavior
          //this.results.add()
          userInfo.data.user.lts_post = await this.$page.evaluate(() => {
            return document.querySelector('div._ac7v > div > a')
              ? (
                  document.querySelector(
                    'div._ac7v > div > a',
                  ) as HTMLAnchorElement
                ).href
              : ''
          })
          console.log(userInfo)
          this.results.add(userInfo)
          break
        } catch (error) {
          console.log(error)
          retries++
          this.logger.error(
            `Scrapper Failed to scrape account with user name : ${user?.username}`,
          )
          this.logger.info(
            `Running the Failed Account again Max Retries left ${this.max_retries - retries}`,
          )
          if (retries >= this.max_retries) {
            this.logger.info(
              `Max Retries reached for username : ${user?.username} userID :${user?.pk}`,
            )
            break
          }
        }
      }
    }
    // end of loop here ...
    console.log(this.results.size)
    return Array.from(this.results)
  }
}
const templateData = [
  {
    username: 'suicideboys',
    is_verified: true,
    full_name: 'NEWWORLDDEPRESSION',
    search_social_context: '3.1M followers',
    unseen_count: 0,
    pk: '6234578313',
    live_broadcast_visibility: null,
    live_broadcast_id: null,
    profile_pic_url:
      'https://instagram.falg7-1.fna.fbcdn.net/v/t51.2885-19/379005738_1464921707688737_7353769105733348426_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.falg7-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=uLtDy-5qqYQQ7kNvgH78Glf&edm=AHFUoAoBAAAA&ccb=7-5&oh=00_AYBacV8t46G6Kd_T4aPC-WZu7cPcWzUQ4vqlRLfhk83WKQ&oe=666D5F21&_nc_sid=cf751b',
    hd_profile_pic_url_info: null,
    is_unpublished: null,
    id: null,
  },

  {
    username: 'suicideboysarmy',
    is_verified: false,
    full_name: 'suicideboysarmy',
    search_social_context: null,
    unseen_count: null,
    pk: '35899167366',
    live_broadcast_visibility: null,
    live_broadcast_id: null,
    profile_pic_url:
      'https://instagram.falg7-2.fna.fbcdn.net/v/t51.2885-19/441360091_442217701752671_8594182818943469875_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.falg7-2.fna.fbcdn.net&_nc_cat=111&_nc_ohc=x9p67XFh71wQ7kNvgFWnt1A&edm=AHFUoAoBAAAA&ccb=7-5&oh=00_AYCZxqrJfE1X8yIoEVhWfCoXNPsKfW8u5kbdH4-a0qmOhg&oe=666D872F&_nc_sid=cf751b',
    hd_profile_pic_url_info: null,
    is_unpublished: null,
    id: null,
  },
]

// new ScrapUser(templateData).exec()
