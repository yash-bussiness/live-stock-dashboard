// components/TradingViewWidget.jsx
import React, { useEffect, useRef } from 'react';

export default function TickerTVWidget() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.type = "text/javascript";
    script.innerHTML = JSON.stringify({
  "symbols": [
    {
      "proName": "FOREXCOM:SPXUSD",
      "title": "S&P 500 Index"
    },
    {
      "description": "NASADAQ",
      "proName": "IG:NASDAQ"
    },
    {
      "description": "USD/INR",
      "proName": "FX_IDC:USDINR"
    },
    {
      "description": "US Dollar Index",
      "proName": "PEPPERSTONE:USDX"
    },
    {
      "description": "GOLD USD",
      "proName": "FXOPEN:XAUUSD"
    },
    {
      "description": "CRUDE OIL USD",
      "proName": "PYTH:WTI3!"
    },
    {
      "description": "NATURAL GAS USD",
      "proName": "FXOPEN:XNGUSD"
    },
        {
      "proName": "BITSTAMP:BTCUSD",
      "title": "Bitcoin"
    },
    {
      "proName": "BITSTAMP:ETHUSD",
      "title": "Ethereum"
    }
    
    // {
    //   "proName": "FOREXCOM:NSXUSD",
    //   "title": "US 100 Cash CFD"
    // },
    // {
    //   "description": "BANK NIFTY",
    //   "proName": "NSE:BANKNIFTY"
    // },
    // {
    //   "description": "",
    //   "proName": "NSE:NIFTY"
    // },
    // {
    //   "description": "NIFTY500",
    //   "proName": "NSE:CNX500"
    // },
    // {
    //   "description": "MCX",
    //   "proName": "NSE:MCX"
    // },

  ],
  "showSymbolLogo": true,
  "isTransparent": false,
  "displayMode": "compact",
  "colorTheme": "dark",
  "locale": "en"
}
 );

    containerRef.current.innerHTML = ""; // Clear existing widget (in case of re-renders)
    containerRef.current.appendChild(script);
  }, []);

  return (
    <div className="tradingview-widget-container" ref={containerRef}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/"
          rel="noopener nofollow"
          target="_blank"
        >
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  );
}
