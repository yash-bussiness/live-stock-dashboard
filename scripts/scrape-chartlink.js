const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const axios = require("axios");
const { DisposableStack } = require("puppeteer");

// const fs = require("fs");
// const path = require("path");
const DISCORD_WEBHOOK_URL =
  "https://discord.com/api/webhooks/1370405134273613826/BamNfUQ67Clv2YzqkYJn46WoMY5IVR2g9wvgOHS_6-MNxuWBeXmn05bVtjuvBRGfvMIl";

puppeteer.use(StealthPlugin());

// Target site and attribute selector

const TABLE_SELECTOR = "#DataTables_Table_0"; // Change to your attribute selector

const sendMessages = async (scanType, scanPath, colorCode) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const TARGET_URL = `https://chartink.com/screener/${scanPath}`;
  try {
    await page.goto(TARGET_URL, { waitUntil: "networkidle0" });

    const tableData = await page.$$eval(`${TABLE_SELECTOR} tbody tr`, (rows) =>
      rows.map((row) => {
        const cols = Array.from(row.querySelectorAll("td")).map((col) =>
          col.innerText.trim()
        );
        return {
          symbol: cols[2],
          change: cols[4],
          price: cols[5],
          volume: cols[6],
        };
      })
    );
    console.log(tableData)

    for (let i = 0; i < tableData.length; i++) {
      const stock = tableData[i];

      const embed = {
        title: `#${i + 1} | ${stock.symbol}`,
        url: `https://www.tradingview.com/symbols/NSE-${stock.symbol}/news/`,
        fields: [
          { name: "% Chg", value: stock.change, inline: true },
          { name: "Price", value: stock.price, inline: true },
          { name: "Volume", value: stock.volume, inline: true },
        ],
        color: colorCode,
      };
      const payload = {
        username: scanType,
        embeds: [embed],
      };

      await axios.post(
        DISCORD_WEBHOOK_URL,
        payload
        //     {
        //     //embeds: [embed],
        //   }
      );
    }
    console.log(`${scanType} messages sent`);
  } catch (err) {
    console.log(`Scan: ${scanType} shown no Stocks`)
    //console.error("❌ Error:", err);
  } finally {
    await browser.close();
  }
};
async function runAllMessages() {
  await sendMessages("Stocks Up-trending", "swing-scan-160172", 0x57f287);
  await sendMessages(
    "Stocks Down-trending",
    "swing-scan-stock-downtrending",
    0xed4245
  );
  await sendMessages(
    "Stocks Reversal Top to Down",
    "swing-scan-reversal-trend-top-to-down",
    0xed4245
  );
  await sendMessages(
    "Stocks Reversal Down to Up",
    "swing-scan-reversal-trend-down-to-up",
    0x57f287
  );
}

runAllMessages();
// async function scrapeFormattedTable() {
//   const browser = await puppeteer.launch({ headless: true });
//   const page = await browser.newPage();

//   try {
//     await page.goto(TARGET_URL, { waitUntil: "domcontentloaded" });

//    const tableData = await page.$$eval(`${TABLE_SELECTOR} tbody tr`, (rows) =>
//      rows.map((row) => {
//        const cols = Array.from(row.querySelectorAll("td")).map((col) =>
//          col.innerText.trim()
//        );
//        return {
//          symbol: cols[1],
//          change: cols[2],
//          price: cols[3],
//          volume: cols[4],
//        };
//      })
//    );

//     console.log(tableData)

//     // Adjusted headers and column widths
//     const headers = ["Sr.", "Symbol", "% Chg", "Price", "Volume"];
//     const colWidths = [4, 12, 7, 8, 12];

//     const pad = (str, len) => str.padEnd(len, " ");
//     const formatRow = (row) =>
//       row.map((col, i) => pad(col, colWidths[i])).join(" | ");

//     // Process and format table
//     let formattedTable = "```md\n";
//     formattedTable += formatRow(headers) + "\n";
//     formattedTable += colWidths.map((w) => "-".repeat(w)).join("-+-") + "\n";

//     const rowsWithLinks = tableData.map((row, idx) => {
//       const [sr, _name, symbol, _links, chg, price, volume] = row;
//       const formattedRow = formatRow([sr, symbol, chg, price, volume]);
//       const link = `https://www.tradingview.com/symbols/NSE-${symbol}/news/`;
//       return `${formattedRow}\n🔗 ${link}`;
//     });

//     formattedTable += rowsWithLinks.join("\n") + "\n```";

//     // Send to Discord
//     await fetch(DISCORD_WEBHOOK_URL, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         content: `📊 **Scraped Table:**\n${formattedTable}`,
//       }),
//     });

//     console.log("✅ Table sent to Discord.");
//   } catch (err) {
//     console.error("❌ Error:", err);
//   } finally {
//     await browser.close();
//   }
// }

//scrapeFormattedTable();

// const stockData = [
//   { symbol: "EDELWEISS", change: "2.84%", price: "78.6", volume: "81,75,889" },
//   { symbol: "JINDWORLD", change: "2.78%", price: "65.9", volume: "51,19,540" },
//   { symbol: "ATL", change: "2.71%", price: "24.3", volume: "5,16,396" },
// ];

// function generateTable(data) {
//   const header = `\`\`\`\nSymbol     % Chg   Price   Volume\n-------------------------------`;
//   const rows = data.map(
//     (stock) =>
//       `${stock.symbol.padEnd(10)} ${stock.change.padEnd(
//         7
//       )} ${stock.price.padEnd(7)} ${stock.volume}`
//   );
//   return header + "\n" + rows.join("\n") + "\n```";
// }
// const payload = {
//   username: "Captain Hook",
//   embeds: [
//     {
//       title: "📊 Stock Table",
//       description: generateTable(stockData),
//       color: 3447003,
//     },
//   ],
// };

// axios.post(DISCORD_WEBHOOK_URL, payload).then(() => {
//   console.log("Message sent");
// });
