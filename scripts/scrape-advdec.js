const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const fs = require("fs");
const path = require("path");

puppeteer.use(StealthPlugin());

(async () => {
  const browser = await puppeteer.launch({
    headless: true, // Use 'new' for better compatibility
    //args: ["--no-sandbox", "--disable-setuid-sandbox"],
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
    await page.goto("https://intradayscreener.com/stock-market-today", {
      waitUntil: "networkidle0",
      timeout: 0,
    });
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Pause for 1.5 seconds
    // Wait for content to load (update selector as per the site structure)
    await page.waitForSelector("span.text-success", { timeout: 180000 });

    const data = await page.evaluate(() => {
      const adv = parseInt(
        document
          .querySelector("span.text-success")
          ?.textContent.trim()
          .replace("|", "")
          .trim()
      );
      const dec = parseInt(
        document.querySelector("span.text-danger")?.textContent.trim()
      );
      // const unchanged = parseInt(
      //   document.querySelector("#cm-unchangedvalue")?.textContent.trim()
      // );
      const total = adv + dec ;//+ unchanged;
      const advPct = ((adv / total) * 100).toFixed(2);
      const decPct = ((dec / total) * 100).toFixed(2);
      return { advPct, adv, decPct, dec };
    });

    fs.writeFileSync(
      path.join(__dirname, "..", "data", "advdec.json"),
      JSON.stringify(data, null, 2)
    );

    console.log("Scraped NSE Advance/Decline:", data);
  } catch (err) {
    console.error("Scraping error:", err);
  }

  await browser.close();
})();
