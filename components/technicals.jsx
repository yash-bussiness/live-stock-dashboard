// components/TradingViewWidget.jsx
import React, { useEffect, useRef } from 'react';

export default function TechnicalTVWidget() {
    const containerRef = useRef(null);


  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.style.display = "flex";
    containerRef.current.style.flexDirection = "row";
    containerRef.current.style.justifyContent = "left";
    containerRef.current.style.gap = "20px";

    const height = 400; const width = "100%"; const interval = "1D";
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js";
    script.async = true;
    script.type = "text/javascript";
    script.innerHTML = JSON.stringify({
        "interval": interval,
        "width": width,
        "isTransparent": false,
        "height": height,
        "symbol": "NSE:NIFTY",
        "showIntervalTabs": true,
        "displayMode": "single",
        "locale": "en",
        "colorTheme": "dark"
    });
    const script1 = document.createElement("script");
    script1.src = "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js";
    script1.async = true;
    script1.type = "text/javascript";
    script1.innerHTML = JSON.stringify({
        "interval": interval,
        "width": width,
        "isTransparent": false,
        "height": height,
        "symbol": "NSE:BANKNIFTY",
        "showIntervalTabs": true,
        "displayMode": "single",
        "locale": "en",
        "colorTheme": "dark"
    });
    const script2 = document.createElement("script");
    script2.src = "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js";
    script2.async = true;
    script2.type = "text/javascript";
    script2.innerHTML = JSON.stringify({
        "interval": interval,
        "width": width,
        "isTransparent": false,
        "height": height,
        "symbol": "SP:SPX",
        "showIntervalTabs": true,
        "displayMode": "single",
        "locale": "en",
        "colorTheme": "dark"
    });
    const script3 = document.createElement("script");
    script3.src = "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js";
    script3.async = true;
    script3.type = "text/javascript";
    script3.innerHTML = JSON.stringify({
        "interval": interval,
        "width": width,
        "isTransparent": false,
        "height": height,
        "symbol": "NASDAQ:NDX",
        "showIntervalTabs": true,
        "displayMode": "single",
        "locale": "en",
        "colorTheme": "dark"
    });


    containerRef.current.innerHTML = ""; // Clear existing widget (in case of re-renders)
    containerRef.current.appendChild(script);
    containerRef.current.appendChild(script1);
    containerRef.current.appendChild(script2);
    containerRef.current.appendChild(script3);
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
