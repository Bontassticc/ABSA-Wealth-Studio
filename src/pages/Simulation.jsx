import { useState, useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import { UserContext } from "../context/UserContext";

export default function Simulation() {
  const { income, expenses, savings, available } = useContext(UserContext);

  const [rent, setRent] = useState(8000);
  const [property, setProperty] = useState(1200000);

  // 🌙 DARK MODE
  useEffect(() => {
    document.body.classList.add("dark");
    return () => document.body.classList.remove("dark");
  }, []);

  // 🧠 Calculations
  const estimatedBond = (property * 0.1) / 12;

  const rentAfter = available - rent;
  const buyAfter = available - estimatedBond;

  const decisionGap = estimatedBond - rent;

  // 🧠 Risk level system (NEW)
  const getRiskLevel = (value) => {
    if (value > 15000) return { label: "Comfortable", color: "var(--glow-green)" };
    if (value > 8000) return { label: "Tight", color: "var(--warning)" };
    return { label: "High Risk", color: "var(--danger)" };
  };

  const rentRisk = getRiskLevel(rentAfter);
  const buyRisk = getRiskLevel(buyAfter);

  return (
    <div>
      <Navbar />

      <div className="page">

        {/* HEADER */}
        <div className="section">
          <h1>Rent vs Buy Simulation</h1>
          <p className="muted">
            Understand how each decision affects your financial flexibility
          </p>
        </div>

        <div className="simulation-grid">

          {/* LEFT: CONTROL PANEL */}
          <div className="card">
            <div className="label">Simulation Inputs</div>

            <p className="muted">Your current position</p>
            <p>Available: <strong>R{available}</strong></p>

            <hr />

            <div className="input-group">
              <label>Monthly Rent</label>
              <div className="big-number" style={{ fontSize: "28px" }}>
                R{rent}
              </div>
              <input
                type="range"
                min="5000"
                max="15000"
                value={rent}
                onChange={(e) => setRent(Number(e.target.value))}
              />
            </div>

            <div className="input-group">
              <label>Property Price</label>
              <div className="big-number" style={{ fontSize: "28px" }}>
                R{property}
              </div>
              <input
                type="range"
                min="500000"
                max="2000000"
                value={property}
                onChange={(e) => setProperty(Number(e.target.value))}
              />
            </div>

            <p className="muted" style={{ marginTop: "12px" }}>
              Adjust values to simulate different financial scenarios in real time.
            </p>
          </div>

          {/* RIGHT: RESULTS */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* RENT CARD */}
            <div className="card">
              <div className="label">Rent Scenario</div>

              <div className="big-number">R{rentAfter}</div>

              <p style={{ color: rentRisk.color }}>
                {rentRisk.label}
              </p>

              <p className="muted">Remaining after rent</p>
            </div>

            {/* BUY CARD */}
            <div className="card">
              <div className="label">Buy Scenario</div>

              <div className="big-number">
                R{buyAfter.toFixed(0)}
              </div>

              <p style={{ color: buyRisk.color }}>
                {buyRisk.label}
              </p>

              <p className="muted">Remaining after bond</p>
            </div>

            {/* 🔥 DECISION BAR (NEW VISUAL) */}
            <div className="card">
              <div className="label">Decision Impact</div>

              <div className="decision-bar">
                <div
                  className="decision-fill"
                  style={{
                    width: `${Math.min(
                      (Math.abs(decisionGap) / 10000) * 100,
                      100
                    )}%`,
                    background:
                      decisionGap > 0
                        ? "var(--danger)"
                        : "var(--glow-green)",
                  }}
                />
              </div>

              <h3
                style={{
                  color:
                    decisionGap > 0 ? "var(--danger)" : "var(--glow-green)",
                }}
              >
                R{Math.abs(decisionGap).toFixed(0)}
              </h3>

              <p className="muted">
                {decisionGap > 0
                  ? "Buying increases monthly cost"
                  : "Buying is financially close to renting"}
              </p>
            </div>

          </div>
        </div>

        {/* INSIGHT */}
        <div className="card section">
          <div className="label">Decision Insight</div>

          {decisionGap > 2000 ? (
            <p>
              Buying significantly increases financial pressure. This reduces
              your flexibility and increases risk in early career stages.
            </p>
          ) : (
            <p>
              Buying is financially comparable to renting. This may be a viable
              long-term wealth-building path.
            </p>
          )}
        </div>

        {/* EDUCATION */}
        <div className="card">
          <div className="label">System Insight</div>

          <p>
            Property decisions are not just about affordability — they affect
            liquidity, emergency resilience, and career mobility.
          </p>

          <p className="muted">
            In early financial life, flexibility is often more valuable than ownership.
          </p>
        </div>

      </div>
    </div>
  );
}