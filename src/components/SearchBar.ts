import { Browser, HTTPRequest, HTTPResponse, Page } from 'puppeteer'
import { queryStringToJSON } from '../utils/index.js'
import { QueryParams, ApiResponse, User } from '../types/index.js'

export default async function SearchBar(page: Page, keyword: string) {
  try {
    page.setRequestInterception(true)

    page.on('request', async (request: HTTPRequest) => {
      if (request.isInterceptResolutionHandled()) return
      await request.continue()
    })

    // needs to return something or return [] incase nothing comes up and throws if something goes wrong
    async function waitForQuery() {
      return new Promise((resolve, reject) => {
        try {
          return page.on('response', async (response: HTTPResponse) => {
            if (response.url().includes('graphql')) {
              // converting String PostData to JSON format
              console.log('Query Response Collected starting Filtering ...')
              let QueryParamss = queryStringToJSON<QueryParams>(
                response.request().postData()?.toString()!,
              )

              let variableContent = JSON.parse(QueryParamss.variables)
              // checking if query exists in variables key from the json
              if (variableContent.data) {
                if ('query' in variableContent.data) {
                  // checking if the query value is exactly what we are looking for ?
                  if (variableContent.data.query === keyword) {
                    //  console.log(await response.json())
                    let responseCorrect: ApiResponse = await response.json()

                    // console.log(responseCorrect.users)
                    resolve(
                      responseCorrect.data
                        .xdt_api__v1__fbsearch__topsearch_connection.users,
                    )
                  }
                }
              }
            }
          })
        } catch (error) {
          reject(error)
        }
      })
    }
    await page.click(
      'div.x1iyjqo2.xh8yej3 > div:nth-child(2) > span > div > a',
      {
        delay: 100,
      },
    )
    // need to check if the input exists
    await page.type("input[aria-label='Search input']", keyword, { delay: 99 })

    let users = (await waitForQuery()) as Array<User>
    await page.setRequestInterception(false)

    return users
  } catch (error) {
    return [] as Array<User>
  }
}
