import { WebSocketServer } from 'ws'
import { BrowserConnection } from './utils/index.js'
import InitialPage from './components/AppPage.js'
import Script from './components/script.js'
import scrapeProfile from './components/scrapeprofile.js'
import fs from 'node:fs'
import LoginManual from './components/login.manual.js'

type WsEventTypes = 'NewSearch' | 'LogIn'

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
      console.log(message)

      switch (message.event) {
        case 'NewSearch':
          await new Script(browser.browser!, message.payload).extract()
          break
        case 'LogIn':
          const loginPage = await browser.browser?.newPage()
          await loginPage?.setViewport({ height: 900, width: 1600 })
          await new LoginManual(loginPage!).$extract()
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
