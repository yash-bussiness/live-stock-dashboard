// components/TradingViewWidget.jsx
import React, { useEffect, useRef } from 'react';

export default function CalanderTVWidget() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-events.js";
    script.async = true;
    script.type = "text/javascript";
    script.innerHTML = JSON.stringify( {
  "colorTheme": "dark",
  "isTransparent": false,
  "width": "100%",
  "height": "550",
  "locale": "en",
  "importanceFilter": "-1,0,1",
  "countryFilter": "us,ca,in,cn"
});

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
