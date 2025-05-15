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
      "https://www.tickertape.in/market-mood-index",
      {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      }
    );
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Pause for 1.5 seconds
    // Wait for content to load (update selector as per the site structure)
    await page.waitForSelector(
      "h3.jsx-3769769187.text-primary.desktop--only.text-18.font-medium",
      { timeout: 15000 }
    );

    const data = await page.evaluate(() => {
      const natureStr = document
          .querySelectorAll(
            "h3.jsx-3769769187.text-primary.desktop--only.text-18.font-medium"
          );
          
      const nature = natureStr[natureStr.length-1].textContent.trim()

      const levelStr = document.querySelectorAll(
        "p.value.typography-body-regular-xs.text-teritiary.pt8.lh-100"
      );
      const level = parseInt(
        levelStr[levelStr.length-1].textContent.trim()
      );

      return { nature, level };
    });

    fs.writeFileSync(
      path.join(__dirname, "..", "data", "sentiment.json"),
      JSON.stringify(data, null, 2)
    );

    console.log("Scraped IND Market Sentiment", data);
  } catch (err) {
    console.error("Scraping error:", err);
  }

  await browser.close();
})();
