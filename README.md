# Indian Stock Market Dashboard

A Next.js application that aggregates key Indian stock market metrics, including:

- Advance vs Decline
- New High vs New Low
- Stocks Above/Below 50-Day SMA
- Stocks Above/Below 200-Day SMA
- Market Sentiment (MMI)
- FII/DII Data
- Market Heat Map


::contentReference[oaicite:0]{index=0}
 
## Directory Structure ( Initial )
```
live-data-aggregator/
├── data/
│   └── scraped.json
├── pages/
│   ├── api/
│   │   └── scrape.js
│   └── index.js
├── public/
├── scripts/
│   └── scrape.js
├── .github/
│   └── workflows/
│       └── scraper.yml
|-- components/
|    |--- wideget.jsx
├── .gitignore
├── package.json
├── README.md
└── next.config.js
```