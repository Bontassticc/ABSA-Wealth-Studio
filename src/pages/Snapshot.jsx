import { useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import { UserContext } from "../context/UserContext";

export default function Snapshot() {
  const { score, getScoreLabel } = useContext(UserContext);
  const {
    income,
    setIncome,
    expenses,
    setExpenses,
    savings,
    setSavings,
    available,
  } = useContext(UserContext);

  // 🌙 DARK MODE
  useEffect(() => {
    document.body.classList.add("dark");
    return () => document.body.classList.remove("dark");
  }, []);

  return (
    <div>
      <Navbar />

      <div className="page">

        {/* HEADER */}
        <div className="section">
          <h1>Financial Snapshot</h1>
          <p className="muted">
            Adjust your financial inputs and see real-time impact
          </p>
        </div>

        {/* MAIN GRID */}
        <div className="snapshot-grid">

          {/* LEFT: INPUT PANEL */}
          <div className="card">
            <div className="label">Monthly Inputs</div>

            <div className="input-group">
              <label>Income</label>
              <input
                className="input"
                type="number"
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
              />
            </div>

            <div className="input-group">
              <label>Expenses</label>
              <input
                className="input"
                type="number"
                value={expenses}
                onChange={(e) => setExpenses(Number(e.target.value))}
              />
            </div>

            <div className="input-group">
              <label>Savings</label>
              <input
                className="input"
                type="number"
                value={savings}
                onChange={(e) => setSavings(Number(e.target.value))}
              />
            </div>

            <p className="muted" style={{ marginTop: "12px" }}>
              Changes here dynamically affect your simulations, tracks, and financial score.
            </p>
          </div>

          {/* RIGHT: LIVE SYSTEM */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* 💰 AVAILABLE (HERO) */}
            <div className="card card-feature">
              <div className="label">Available Balance</div>
              <div className="big-number">R{available}</div>
              <p>After all commitments</p>
            </div>

            {/* 🔵 SCORE WITH RING */}
            <div className="card score-card">
              <div className="label">Financial Health</div>

              <div className="score-ring">
                <svg width="120" height="120">
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="10"
                    fill="none"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="url(#gradient)"
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray={314}
                    strokeDashoffset={314 - (score / 100) * 314}
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="gradient">
                      <stop offset="0%" stopColor="#4A90E2" />
                      <stop offset="100%" stopColor="#7B61FF" />
                    </linearGradient>
                  </defs>
                </svg>

                <div className="score-text">{score}</div>
              </div>

              <p
                style={{
                  color:
                    getScoreLabel() === "Strong"
                      ? "var(--glow-green)"
                      : getScoreLabel() === "Moderate"
                      ? "var(--warning)"
                      : "var(--danger)",
                }}
              >
                {getScoreLabel()}
              </p>
            </div>

            {/* 🧠 INSIGHT */}
            <div className="card">
              <div className="label">System Insight</div>

              {available > 15000 ? (
                <p>
                  You are in a strong liquidity position. This allows you to explore
                  asset-building strategies such as property or investing.
                </p>
              ) : (
                <p>
                  Your liquidity is constrained. Focus on reducing fixed costs or
                  improving your savings rate before major financial commitments.
                </p>
              )}

              <hr />

              <p className="muted">
                Your available balance is the most critical metric in early financial life.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}