const fs = require('fs');
const puppeteer = require('puppeteer');
const checkMarketCap = async (currency) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(`https://coinmarketcap.com/currencies/${currency}/`)
  const query = await page.$('.cmc-details-panel-stats.k1ayrc-0.OZKKF > li > div > span');
  const result = await page.evaluate(e => e.innerHTML, query)
  await browser.close();
  return Number(result.replace(/\W|USD/g, ''));
};

const checkTotalMarketCap = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(`https://coinmarketcap.com/`)
  const query = await page.$('.sc-1fvy4c5-0.cuhbZt > div.container > div > span.sc-12ja2s9-0.gRrpzm:nth-of-type(3) > a');
  const result = await page.evaluate(e => e.innerHTML, query)
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
  }
  console.log(marketCap)
  fs.writeFileSync('/home/cpustejovsky/dev/Personal/personalWebsite/potsherd/downloads/result.json', JSON.stringify(marketCap), 'utf8')
  process.exit(1)
}
getMarketCapsObj();

// const test = {
//   total: 256985246092,
//   BTC: 170118312094,
//   ETH: 19351135884,
//   XRP: 10349178269,
//   BCH: 7013204853
// }
// const percentage = ((test.BTC + test.ETH + test.XRP + test.BCH) / test.total) * 100
// marketCap.bpShare = Math.ceil(percentage*10)/10;






