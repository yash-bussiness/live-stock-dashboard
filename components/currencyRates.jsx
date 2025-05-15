// components/TradingViewWidget.jsx
import React, { useEffect, useRef } from 'react';

export default function CurTVWidget() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-forex-cross-rates.js";
    script.async = true;
    script.type = "text/javascript";
    script.innerHTML = JSON.stringify( {
  "width": "100%",
  "height": 600,
  "currencies": [
    "EUR",
    "USD",
    "JPY",
    "GBP",
    "CHF",
    "AUD",
    "CAD",
    "NZD",
    "CNY",
    "INR",
    "AED"
  ],
  "isTransparent": false,
  "colorTheme": "dark",
  "locale": "en",
  "backgroundColor": "#000000"
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
