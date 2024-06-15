import puppeteer, { Browser, Page } from 'puppeteer'
import ConfigService from '../Wrappers/config_service.js'

let URL = new ConfigService().get('WEB_PAGE')

export default class InitialPage {
  public browser: Browser | null
  public page: Page | null
  constructor(private readonly webSocketUrl: string) {}

  public async Display(): Promise<this> {
    this.browser = await puppeteer.connect({
      browserWSEndpoint: this.webSocketUrl,
    })
    this.page = await this.browser.newPage()
    await this.page.setViewport({height:900, width:1600})
    await this.page.goto(URL, { timeout: 0, waitUntil: 'networkidle2' })
    await this.page.reload()
    return this;
  }
}

//
// let BrowserURL = await BrowserConnection()
//
// await new InitialPage(BrowserURL).Display()
