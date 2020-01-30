const fs = require('fs');
const puppeteer = require('puppeteer');
const checkMarketCap = async (currency) => {
  const browser = await puppeteer.launch({ args: ["--disable-dev-shm-usage"] })
  const page = await browser.newPage()
  await page.goto(`https://coinmarketcap.com/currencies/${currency}/`)
  const query = await page.$('.cmc-details-panel-stats.k1ayrc-0.OZKKF > li > div > span');
  const result = await page.evaluate(e => e.innerHTML, query)
  console.log(`Scraped ${currency} page`)
  await browser.close();
  return Number(result.replace(/\W|USD/g, ''));
};

const checkTotalMarketCap = async () => {
  const browser = await puppeteer.launch({ args: ["--disable-dev-shm-usage"] })
  const page = await browser.newPage()
  await page.goto(`https://coinmarketcap.com/`)
  const query = await page.$('.sc-1fvy4c5-0.cuhbZt > div.container > div > span.sc-12ja2s9-0.gRrpzm:nth-of-type(3) > a');
  const result = await page.evaluate(e => e.innerHTML, query)
  console.log(`Scraped total marketcap page`)
  await browser.close();
  return Number(result.replace(/\W|USD/g, ''));
};
const getMarketCapsObj = async () => {
  const marketCap = {
    total: await checkTotalMarketCap(),
    BTC: await checkMarketCap("bitcoin"),
    ETH: await checkMarketCap("ethereum"),
    XRP: await checkMarketCap("xrp"),
    BCH: await checkMarketCap("bitcoin-cash"),
    BSV: await checkMarketCap("bitcoin-sv")
  }
  fs.writeFileSync('downloads/result.json', JSON.stringify(marketCap), 'utf8')
  console.log(marketCap)
  process.exit(1)
}
getMarketCapsObj();






