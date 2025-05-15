const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const fs = require("fs");
const path = require("path");

puppeteer.use(StealthPlugin());

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new', // Use 'new' for better compatibility
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
    await page.goto(
      "https://www.nseindia.com/market-data/52-week-high-equity-market",
      {
        waitUntil: "networkidle0",
        timeout: 0,
      }
    );
    await new Promise((resolve) => setTimeout(resolve, 2500)); // Pause for 1.5 seconds
    // Wait for content to load (update selector as per the site structure)
    await page.waitForSelector("#mscm-wkhvalue", { timeout: 180000 });

    const data = await page.evaluate(() => {
      const _52Wh = parseInt(
        document.querySelector("#mscm-wkhvalue")?.textContent.trim()
      );
      const _52Wl = parseInt(
        document.querySelector("#mscm-wklvalue")?.textContent.trim()
      );
      const total = _52Wh + _52Wl;
      const highPct = ((_52Wh / total) * 100).toFixed(2);
      const lowPct = ((_52Wl / total) * 100).toFixed(2);
      return {highPct,_52Wh, lowPct, _52Wl };
    });

    fs.writeFileSync(
      path.join(__dirname, "..", "data", "newhl.json"),
      JSON.stringify(data, null, 2)
    );

    console.log("Scraped NSE New Highs and Lows:", data);
  } catch (err) {
    console.error("Scraping error:", err);
  }

  await browser.close();
})();
