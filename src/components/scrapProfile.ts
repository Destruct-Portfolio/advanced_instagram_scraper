import { Page } from 'puppeteer'
import { RequestDataUserPage, Userd } from '../types/index.js'
import PuppeteerScrapper from '../Wrappers/puppetter_service.js'
import ConfigService from '../Wrappers/config_service.js'
import { BaseError } from '../errors/index.js'
import { queryStringToJSON } from '../utils/index.js'

const config = new ConfigService()

// TODO please Toggle false to true durring production

export default class ScrapUser extends PuppeteerScrapper {
  private results: Set<any>
  constructor(private readonly users: Array<Userd>) {
    super(false, {
      headless: false,
      userDataDir: config.get('USER_DATA_PATH'),
    })
    this.users = users
    this.results = new Set()
  }

  private async CollectProfileInfor(userId: string) {
    await this.$page?.reload()
    return new Promise((resolve, reject) => {
      this.$page?.on('response', async (respose) => {
        if (respose.url().includes('graphql')) {
          // console.log(
          //   queryStringToJSON(respose.request().postData()?.toString()!),
          // )
          let PostDataFormated = queryStringToJSON<RequestDataUserPage>(
            respose.request().postData()?.toString()!,
          )
          //log(PostDataFormated)
          let variableContent = JSON.parse(
            PostDataFormated.variables.toString(),
          )

          if ('id' in variableContent) {
            console.log('ID AVALIABLE IN VARIABLES ...')
            if (variableContent.id === userId) {
              console.log('GOT A VRIABLE.ID  ===', userId)
              console.log(await respose.json())
              return await respose.json()
            }
          }
        }
      })
    })
  }
  protected async $extract(): Promise<void> {
    if (!this.$page)
      throw new BaseError(
        'ScraperError',
        'Puppetteer page is undefined',
        true,
        'Please make sure you have a chromuim page allready running ',
      )

    try {
      for (let index = 0; index < this.users.length; index++) {
        await this.$page.setRequestInterception(true)

        this.$page.on('request', async (request) => {
          await request.continue()
        })
        const user = this.users[index]
        await this.navigate(`https://instagram.com/${user.username}/`)
        await this.CollectProfileInfor(user.pk)
        //this.results.add()
      }
    } catch (error) {
      console.log(error)
    }
  }
}

new ScrapUser([
  {
    username: 'itsmariyaxo',
    is_verified: true,
    full_name: 'NEWWORLDDEPRESSION',
    search_social_context: '3.1M followers',
    unseen_count: null,
    pk: '2906667017',
    live_broadcast_visibility: null,
    live_broadcast_id: null,
    profile_pic_url:
      'https://instagram.falg6-2.fna.fbcdn.net/v/t51.2885-19/379005738_1464921707688737_7353769105733348426_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.falg6-2.fna.fbcdn.net&_nc_cat=1&_nc_ohc=ac9qjigenMAQ7kNvgG5ia_y&edm=AHFUoAoBAAAA&ccb=7-5&oh=00_AYDZQwgyGyK7FaB1xq_Ip_fntx6l7FFMnB40R6xZqa2EYQ&oe=666A1361&_nc_sid=cf751b',
    hd_profile_pic_url_info: null,
    is_unpublished: null,
    id: null,
  },
]).exec()
