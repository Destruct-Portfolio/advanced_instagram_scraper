import { Page } from 'puppeteer'

export default async function DisableNotification(page: Page): Promise<void> {
  if (!page) {
    throw new Error('Page Does not exist')
  } else {
    await page
      .waitForSelector('button._a9--._ap36._a9_0', { timeout: 5000 })
      .then(async () => {
        await page.click('button._a9--._ap36._a9_0', { delay: 100 })
      })
      .catch(() => {
        return
      })
  }
}
