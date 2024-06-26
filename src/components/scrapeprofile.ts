import { HTTPRequest, Page } from 'puppeteer'
import { BaseError } from '../errors/index.js'
import {
  ApiUSerResponse,
  RequestDataUserPage,
  User,
} from '../types/index.js'
import ConfigService from '../Wrappers/config_service.js'
import { queryStringToJSON } from '../utils/index.js'

const maxRetries = eval(new ConfigService().get('MAX_RETRIES'))

export default async function scrapeProfile(page: Page, users: Array<User>) {
  let resuluts: Set<ApiUSerResponse> = new Set()
  let results: Array<ApiUSerResponse> = []

  async function CollectProfileInfo(userId: string): Promise<ApiUSerResponse> {
    await page.reload()
    return new Promise((resolve, reject) => {
      return page.on('response', async (response) => {
        if (response.url().includes('graphql')) {
          let postDataFormated = queryStringToJSON<RequestDataUserPage>(
            response.request().postData()?.toString()!,
          )

          if ('variables' in postDataFormated) {
            let variableContent = JSON.parse(
              postDataFormated.variables.toString(),
            )
            if ('id' in variableContent) {
              if (variableContent.id === userId) {
                console.log(`Request post data contains userID :: ${userId}`)
                resolve((await response.json()) as ApiUSerResponse)
              }
            }
          }
        }
      })
    })
  }

  if (!page)
    throw new BaseError(
      'ScrapperError',
      'puppeteer page not found',
      false,
      'Please make sure you have a page instance running',
    )
  console.log('Starting to scrape The user Profiles Form here ... ')
  await page.setRequestInterception(true)

  for (let index = 0; index <= 10; index++) {
    const user = users[index].user
    console.log(user.full_name)
    
    page.on('request', async (request: HTTPRequest) => {
      if (request.isInterceptResolutionHandled()) return
      await request.continue()
    })

    let retries = 0
    while (retries < maxRetries) {
      try {
        if (!user) return
        await page.goto(`https://instagram.com/${user.username}/`, {
          waitUntil: 'networkidle2',
          timeout: 0,
        })
        let userInfo = await CollectProfileInfo(user.pk)
        console.log(userInfo)
        userInfo.data.user.lts_post = await page.evaluate(() => {
          return document.querySelector('div._ac7v > div > a')
            ? (
                document.querySelector(
                  'div._ac7v > div > a',
                ) as HTMLAnchorElement
              ).href
            : ''
        })

        console.log(userInfo)
        resuluts.add(userInfo)
        results.push(userInfo)
        break
      } catch (error) {
        console.log(error)
        retries++
        console.log(
          `Scraper failed to scrape account with username: ${user.username}`,
        )
        if (retries >= maxRetries) {
          console.log(`Max retries reached for username :: ${user.username}`)
          break
        }
        console.log(
          `Running the Failed account Again Max retrries left ${maxRetries - retries}`,
        )
      }
    }
  }
  return results
}
