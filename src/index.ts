import { userInfo } from 'os'
import SearchBar from './components/SearchBar.js'
import LoginManual from './components/login.manual.js'
import ScrapUser from './components/scrapProfile.js'
import scrapeProfile from './components/scrapeprofile.js'
import fs from 'node:fs'
//
// try {
//   // make sure you are logged in here; or log in here;
//
//   // make the search result here;
//
//   // make the profile scraping here;
//   const login = new LoginManual()
//   await login.exec()
//   const page = login.$page ? login.$page : null
//
//   if (page) {
//     let accounts = await SearchBar(page, 'suicide boys')
//     await login._cleanup()
//     console.log([accounts[0].user, accounts[1].user, accounts[2].user])
//
//     let profiles = await new ScrapUser([
//       accounts[0].user,
//       accounts[1].user,
//       accounts[2].user,
//     ]).exec()
//
//     fs.writeFileSync('test_data.json', JSON.stringify(Array.from(profiles)))
//   }
// } catch (error) {
//   console.log(error)
// }

// Function To get BrowserURL WS
// change the scrappers to start using Debugger WS

import { WebSocketServer } from 'ws'
import { BrowserConnection } from './utils/index.js'
import InitialPage from './components/AppPage.js'
import Script from './components/script.js'

type WsEventTypes = 'NewSearch' | 'LogIn' | 'LoggedIN' | 'SingleProfile'

try {
  const wsServer = new WebSocketServer({ port: 3002 })
  let BrowserURL = await BrowserConnection()
  //const server = http.createServer()
  let browser = await new InitialPage(BrowserURL).Display()

  wsServer.on('connection', (ws) => {
    console.log('First Web Socket Established with status 200 ')

    ws.on('message', async (data) => {
      let message: { event: WsEventTypes; payload: any } = JSON.parse(
        data.toString(),
      )
      console.log(message);
      
      switch (message.event) {
        case 'NewSearch':
          let page = await browser.browser?.newPage()
          await page?.setViewport({ height: 900, width: 1600 })
          await page?.goto('https://www.instagram.com')
          console.log(message.event)
          await new Script(browser.browser!, message.payload).extract()
          break
        case 'LogIn':
          break
        case 'LoggedIN':
          break
        case 'SingleProfile':
          break
        default:
          ws.send('1')
          break
      }
    })
  })
} catch (error) {
  console.log(error)
}

process.on('uncaughtException', () => {})

process.on('unhandledRejection', () => {})
