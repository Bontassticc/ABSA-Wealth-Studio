import { useState, useContext } from "react";
import Navbar from "../components/Navbar";
import { UserContext } from "../context/UserContext";

const fmt = (n) =>
  "R" + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

export default function Simulation() {
  const { income, expenses, savings, available } = useContext(UserContext);

  const [rent, setRent] = useState(8000);
  const [property, setProperty] = useState(1200000);

  const estimatedBond = (property * 0.1) / 12;
  const rentAfter = available - rent;
  const buyAfter  = available - estimatedBond;
  const decisionGap = estimatedBond - rent;

  const getRiskLabel = (value) => {
    if (value > 15000) return { label: "Comfortable", color: "#4CAF50" };
    if (value > 5000)  return { label: "Tight",       color: "#F5A623" };
    return                    { label: "High Risk",   color: "#C8553D" };
  };

  const rentRisk = getRiskLabel(rentAfter);
  const buyRisk  = getRiskLabel(buyAfter);

  return (
    <div>
      <Navbar />

      <div className="page">

        <div className="section">
          <p className="label">Simulation Lab</p>
          <h1>
            <span style={{ fontWeight: 400 }}>Rent</span>
            {" vs "}
            <span>Buy</span>
          </h1>
          <p className="muted">Feel the decision before you commit.</p>
        </div>

        <div className="four-col section">
          <div className="card" style={{ padding: "16px" }}>
            <div className="label">Income</div>
            <p style={{ fontWeight: 700, fontSize: "18px", marginTop: "4px" }}>{fmt(income)}</p>
          </div>
          <div className="card" style={{ padding: "16px" }}>
            <div className="label">Expenses</div>
            <p style={{ fontWeight: 700, fontSize: "18px", marginTop: "4px" }}>{fmt(expenses)}</p>
          </div>
          <div className="card" style={{ padding: "16px" }}>
            <div className="label">Savings</div>
            <p style={{ fontWeight: 700, fontSize: "18px", marginTop: "4px" }}>{fmt(savings)}</p>
          </div>
          <div
            className="card"
            style={{ padding: "16px", borderColor: "#E07A5F30", background: "#FFF6F3" }}
          >
            <div className="label">Available</div>
            <p style={{ fontWeight: 700, fontSize: "18px", color: "var(--accent)", marginTop: "4px" }}>
              {fmt(available)}
            </p>
          </div>
        </div>

        <div className="simulation-grid section">
          <div className="card">
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}
            >
              <label style={{ fontWeight: 500 }}>Monthly rent</label>
              <span style={{ fontWeight: 700, fontSize: "18px", color: "var(--accent)" }}>
                {fmt(rent)}
              </span>
            </div>
            <input
              type="range"
              min="5000"
              max="15000"
              step="500"
              value={rent}
              onChange={(e) => setRent(Number(e.target.value))}
            />
          </div>

          <div className="card">
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}
            >
              <label style={{ fontWeight: 500 }}>Property price</label>
              <span style={{ fontWeight: 700, fontSize: "18px", color: "var(--accent)" }}>
                {fmt(property)}
              </span>
            </div>
            <input
              type="range"
              min="500000"
              max="2000000"
              step="50000"
              value={property}
              onChange={(e) => setProperty(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="simulation-grid section">
          <div className="card">
            <div className="label">Rent, after expenses</div>
            <div
              className="big-number"
              style={{
                color: rentAfter < 0 ? "#C8553D" : "var(--text)",
                margin: "8px 0 4px",
              }}
            >
              {rentAfter < 0 ? "-" : ""}{fmt(Math.abs(rentAfter))}
            </div>
            <p className="muted">
              {rentAfter < 0 ? "Monthly deficit." : "Small monthly deficit, recoverable."}
            </p>
          </div>

          <div className="card">
            <div className="label">Buy (bond), after expenses</div>
            <div
              className="big-number"
              style={{
                color: buyAfter < 0 ? "#C8553D" : "var(--text)",
                margin: "8px 0 4px",
              }}
            >
              {buyAfter < 0 ? "-" : ""}{fmt(Math.abs(buyAfter))}
            </div>
            <p className="muted">Deeper pressure, long-term upside.</p>
          </div>
        </div>

        <div className="card card-feature section" style={{ position: "relative", overflow: "hidden" }}>
          <div
            style={{
              position: "absolute",
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.08)",
              top: -60,
              right: -40,
              pointerEvents: "none",
            }}
          />
          <p className="label" style={{ color: "rgba(255,255,255,0.65)" }}>Insight</p>
          <p style={{ fontSize: "18px", fontWeight: 500, marginTop: "6px", lineHeight: 1.5 }}>
            {Math.abs(decisionGap) < 2000
              ? "Buying is financially close to renting in your current situation. This could be a viable long-term wealth-building path."
              : decisionGap > 0
              ? "Buying would significantly increase your monthly costs. Consider improving your available balance first."
              : "Renting gives you more flexibility right now. You can revisit buying as your income grows."}
          </p>
        </div>

        <div className="card">
          <div className="label">What This Means</div>
          <p style={{ marginTop: "8px", lineHeight: 1.6 }}>
            Property decisions are not just about affordability — they affect liquidity,
            emergency resilience, and career mobility.{" "}
            <span className="muted">
              In early financial life, flexibility is often more valuable than ownership.
            </span>
          </p>
        </div>

      </div>
    </div>
  );
}
