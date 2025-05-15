const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const fs = require("fs");
const path = require("path");

puppeteer.use(StealthPlugin());

(async () => {
  const browser = await puppeteer.launch({
    headless: true, // Use 'new' for better compatibility
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    defaultViewport: null,
  });

  const page = await browser.newPage();

  // Set required headers and user-agent to avoid blocking
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0 Safari/537.36"
  );
  await page.setExtraHTTPHeaders({
    "accept-language": "en-US,en;q=0.9",
  });

  try {
    sma50Urls = [
      "https://www.screener.in/screens/2740089/stocks-above-50-day-sma/",
      "https://www.screener.in/screens/2740092/stocks-below-50-day-sma/",
    ];

    numbers = []

    for(let i=0;i<2; i++){
        await page.goto(
          sma50Urls[i],
          {
            waitUntil: "domcontentloaded",
            timeout: 30000,
          }
        );
        
        await new Promise((resolve) => setTimeout(resolve, 1500)); // Pause for 1.5 seconds
        // Wait for content to load (update selector as per the site structure)
        await page.waitForSelector(".sub[data-page-info]", { timeout: 15000 });

        const nofStocks = await page.evaluate(() => {
            return parseInt(document.querySelector(".sub[data-page-info]")?.textContent.trim().split(' ')[0]);
        });
        numbers.push(nofStocks)
    }
    const adv = numbers[0];
    const dec = numbers[1]
    const total = adv + dec;
    const advPct = ((adv / total) * 100).toFixed(2);
    const decPct = ((dec/ total) * 100).toFixed(2);
    data =  {advPct, adv, decPct, dec };

    fs.writeFileSync(
      path.join(__dirname, "..", "data", "sma50.json"),
      JSON.stringify(data, null, 2)
    );

    console.log("Scraped Above & Below 50 SMA:", data);
  } catch (err) {
    console.error("Scraping error:", err);
  }

  await browser.close();
})();
