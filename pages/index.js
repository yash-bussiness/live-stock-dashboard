import { useEffect, useState } from "react";
import USDTradingViewWidget from "../components/tvS&PHeatmap";
import INDTradingViewWidget from "../components/tvBSEHeatmap";
import CalanderTVWidget from "../components/calander";
import CurTVWidget from "../components/currencyRates";
import CurHeatTVWidget from "../components/currencyHeat";
import TechnicalTVWidget from "../components/technicals";
import TickerTVWidget from "../components/ticker";

export default function Home() {
  const [advdec, setAdvdec] = useState(null);
  const [newhl, setNewhl] = useState(null);
  const [sma50, setSma50] = useState(null);
  const [sma200, setSma200] = useState(null);
  const [sentiment, setSentiment] = useState(null);
 // const [fii, setFii] = useState(null);
  const [heatmap, setHeatmap] = useState(null);

  useEffect(() => {
    fetch("/api/advdec")
      .then((res) => res.json())
      .then(setAdvdec);
    // fetch("/api/newhl")
    //   .then((res) => res.json())
    //   .then(setNewhl);
    fetch("/api/sma50")
      .then((res) => res.json())
      .then(setSma50);
    fetch("/api/sma200")
      .then((res) => res.json())
      .then(setSma200);
    fetch("/api/sentiment")
      .then((res) => res.json())
      .then(setSentiment);
    // fetch("/api/fii")
    //   .then((res) => res.json())
    //   .then(setFii);
    fetch("/api/heatmap")
      .then((res) => res.json())
      .then(setHeatmap);
  }, []);

  const cardStyle = {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "1rem",
    marginBottom: "1.5rem",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
  };

  const headingStyle = {
    fontSize: "1.25rem",
    fontWeight: "600",
    marginBottom: "0.5rem",
    color: "#333",
  };

  return (
    <main
      style={{ padding: "2rem", background: "#f4f6f8", minHeight: "100vh" }}
    >
      <h1 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "2rem" }}>
        Stock Market Dashboard
      </h1>
      <section style={cardStyle}>
        <h2 style={headingStyle}> Tickers (TV) </h2>
        <TickerTVWidget />
      </section>
      {/* <section style={cardStyle}>
        <h2 style={headingStyle}>FII/DII Data</h2>
        {fii ? (
          <p>
            <strong>FII Net:</strong> {fii.fiiNet} | <strong>DII Net:</strong>{" "}
            {fii.diiNet}
          </p>
        ) : (
          <p>Loading...</p>
        )}
      </section> */}

      <section style={cardStyle}>
        <h2 style={headingStyle}>Market Stats</h2>
        {heatmap ? (
          <iframe
            src="https://intradayscreener.com/stock-market-today" //"https://www.moneycontrol.com/stocksmarketsindia/360-degree-market-view-heat-map"
            width="100%"
            height="600px"
            title="Market Heat Map"
            style={{ border: "none", borderRadius: "8px" }}
          ></iframe>
        ) : (
          <p>Loading...</p>
        )}
      </section>

      <section style={cardStyle}>
        <h2 style={headingStyle}> Business News </h2>
        {heatmap ? (
          <iframe
            src="https://www.moneycontrol.com/news/business/"
            width="100%"
            height="600px"
            title="Market Heat Map"
            style={{ border: "none", borderRadius: "8px" }}
          ></iframe>
        ) : (
          <p>Loading...</p>
        )}
      </section>

      <section style={cardStyle}>
        <h2 style={headingStyle}>Market Heat Map</h2>
        {heatmap ? (
          <iframe
            src="https://www.moneycontrol.com/stocksmarketsindia/360-degree-market-view-heat-map"
            width="100%"
            height="600px"
            title="Market Heat Map"
            style={{ border: "none", borderRadius: "8px" }}
          ></iframe>
        ) : (
          <p>Loading...</p>
        )}
      </section>
      <section style={cardStyle}>
        <h2 style={headingStyle}>Advancing vs Declining</h2>
        {advdec ? (
          <p>
            <strong style={{ color: "#7fff00" }}>Advancing:</strong>{" "}
            {advdec.advPct}% ({advdec.adv}) |{" "}
            <strong style={{ color: "#b22222" }}>Declining:</strong>{" "}
            {advdec.decPct}% ({advdec.dec})
          </p>
        ) : (
          <p>Loading...</p>
        )}
      </section>

      {/* <section style={cardStyle}>
        <h2 style={headingStyle}>New Highs vs New Lows</h2>
        {newhl ? (
          <p>
            <strong style={{ color: "#7fff00" }}>New Highs:</strong>{" "}
            {newhl.highPct}% ({newhl._52Wh}) |{" "}
            <strong style={{ color: "#b22222" }}>New Lows:</strong>{" "}
            {newhl.lowPct}% ({newhl._52Wl})
          </p>
        ) : (
          <p>Loading...</p>
        )}
      </section> */}

      <section style={cardStyle}>
        <h2 style={headingStyle}>Stocks Above/Below 50-Day SMA</h2>
        {sma50 ? (
          <p>
            <strong style={{ color: "#7fff00" }}>Above:</strong> {sma50.advPct}%
            ({sma50.adv}) | <strong style={{ color: "#b22222" }}>Below:</strong>{" "}
            {sma50.decPct}% ({sma50.dec})
          </p>
        ) : (
          <p>Loading...</p>
        )}
      </section>

      <section style={cardStyle}>
        <h2 style={headingStyle}>Stocks Above/Below 200-Day SMA</h2>
        {sma200 ? (
          <p>
            <strong style={{ color: "#7fff00" }}>Above:</strong> {sma200.advPct}
            % ({sma200.adv}) |{" "}
            <strong style={{ color: "#b22222" }}>Below:</strong> {sma200.decPct}
            % ({sma200.dec})
          </p>
        ) : (
          <p>Loading...</p>
        )}
      </section>

      <section style={cardStyle}>
        <h2 style={headingStyle}>Market Sentiment 🧐 </h2>
        {sentiment ? (
          <p style={{ color: sentiment.nature === "Greed" ? "green" : "red" }}>
            {sentiment.nature} at {sentiment.level}%
          </p>
        ) : (
          <p>Loading...</p>
        )}
      </section>
      <section style={cardStyle}>
        <h2 style={headingStyle}> Technicals (TV) </h2>
        <TechnicalTVWidget />
      </section>
      <section style={cardStyle}>
        <h2 style={headingStyle}> US & IND Market Heat Map 🗺️ 🔥 (TV) </h2>
        <USDTradingViewWidget />
        <INDTradingViewWidget />
      </section>
      <section style={cardStyle}>
        <h2 style={headingStyle}> Economic Calender 🗓️ (TV) </h2>
        <CalanderTVWidget />
      </section>
      <section style={cardStyle}>
        <h2 style={headingStyle}> Currencies 💸 (TV) </h2>
        <CurHeatTVWidget />
        <CurTVWidget />
      </section>
      <section style={cardStyle}>
        <h2 style={headingStyle}>India Inflation Rate (TE)</h2>
        {heatmap ? (
          <iframe
            src="https://tradingeconomics.com/embed/?s=incpiiny&v=202505131107V20230410&h=300&w=600&ref=/india/inflation-cpi"
            height="400"
            width="600"
            frameborder="0"
            scrolling="no"
          ></iframe>
        ) : (
          <p>Loading...</p>
        )}
      </section>
      <section style={cardStyle}>
        <h2 style={headingStyle}>US Inflation Rate (TE)</h2>
        {heatmap ? (
          <iframe
            src="https://tradingeconomics.com/embed/?s=cpi+yoy&v=202505131239V20230410&h=300&w=600&ref=/united-states/inflation-cpi"
            height="400"
            width="600"
            frameborder="0"
            scrolling="no"
          ></iframe>
        ) : (
          <p>Loading...</p>
        )}
      </section>
    </main>
  );
}
