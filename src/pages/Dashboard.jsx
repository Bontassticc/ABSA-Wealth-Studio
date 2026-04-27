import Navbar from "../components/Navbar";
import { UserContext } from "../context/UserContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const fmt = (n) =>
  "R" +
  Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

export default function Dashboard() {
  const { income, expenses, savings, available } = useContext(UserContext);
  const { score, getScoreLabel } = useContext(UserContext);
  const [name, setName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (storedName) setName(storedName);
  }, []);

  const savingsRate = income > 0 ? (savings / income) * 100 : 0;

  const getStatus = () => {
    if (available > 20000 && savingsRate > 15) return "Strong";
    if (available > 10000) return "Moderate";
    return "At Risk";
  };

  const status = getStatus();

  const statusColor =
    status === "Strong"
      ? "#4CAF50"
      : status === "Moderate"
        ? "#E07A5F"
        : "#C8553D";

  const statusBg =
    status === "Strong"
      ? "#F0FBF4"
      : status === "Moderate"
        ? "#FFF3EE"
        : "#FFF0ED";

  const scoreColor =
    getScoreLabel() === "Strong"
      ? "#4CAF50"
      : getScoreLabel() === "Moderate"
        ? "#F5A623"
        : "#C8553D";

  const expensesPct = income > 0 ? Math.round((expenses / income) * 100) : 0;
  const savingsPct = income > 0 ? Math.round((savings / income) * 100) : 0;
  const availPct = Math.max(0, 100 - expensesPct - savingsPct);

  return (
    <div>
      <Navbar />
      <div className="page">

        <div
          className="section"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div>
            <h1>Welcome back{name ? `, ${name}` : ""}</h1>
            <p className="muted">Your monthly financial position, at a glance.</p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: statusBg,
              border: `1px solid ${statusColor}30`,
              color: statusColor,
              padding: "6px 14px",
              borderRadius: "999px",
              fontSize: "13px",
              fontWeight: 500,
              whiteSpace: "nowrap",
            }}
          >
            Status · {status}
          </div>
        </div>

        <div className="card card-feature section">
          <div className="label" style={{ color: "rgba(255,255,255,0.7)" }}>
            Available this month
          </div>
          <div className="big-number" style={{ margin: "8px 0 4px" }}>
            {fmt(available)}
          </div>
          <p style={{ opacity: 0.85, fontSize: "14px" }}>After all commitments</p>
        </div>

        <div className="three-col section">
          <div className="card">
            <div className="label">Income</div>
            <h2 style={{ fontSize: "28px", marginTop: "6px" }}>{fmt(income)}</h2>
            <p className="muted" style={{ marginTop: "4px" }}>Monthly salary</p>
          </div>
          <div className="card">
            <div className="label">Expenses</div>
            <h2 style={{ fontSize: "28px", marginTop: "6px" }}>{fmt(expenses)}</h2>
            <p className="muted" style={{ marginTop: "4px" }}>Fixed + variable</p>
          </div>
          <div className="card">
            <div className="label">Savings</div>
            <h2 style={{ fontSize: "28px", marginTop: "6px" }}>{fmt(savings)}</h2>
            <p className="muted" style={{ marginTop: "4px" }}>Allocation</p>
          </div>
        </div>

        <div className="card section">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "4px",
            }}
          >
            <div className="label" style={{ margin: 0 }}>Monthly Flow</div>
            <span className="muted">{fmt(income)}</span>
          </div>

          <div className="flow-bar">
            <div className="flow-segment" style={{ width: `${expensesPct}%`, background: "#C8553D" }} />
            <div className="flow-segment" style={{ width: `${savingsPct}%`, background: "#F5A623" }} />
            <div className="flow-segment" style={{ width: `${availPct}%`, background: "#4CAF50" }} />
          </div>

          <div className="flow-legend">
            <div className="flow-legend-item">
              <div className="flow-dot" style={{ background: "#C8553D" }} />
              Expenses {expensesPct}%
            </div>
            <div className="flow-legend-item">
              <div className="flow-dot" style={{ background: "#F5A623" }} />
              Savings {savingsPct}%
            </div>
            <div className="flow-legend-item">
              <div className="flow-dot" style={{ background: "#4CAF50" }} />
              Available {availPct}%
            </div>
          </div>
        </div>

        <div
          className="section"
          style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "16px" }}
        >
          <div className="card">
            <div className="label">Key Insight</div>
            <p style={{ fontSize: "16px", marginTop: "8px" }}>
              {available > 15000 ? (
                <>
                  You have strong monthly flexibility. Consider exploring{" "}
                  <span style={{ color: "var(--accent)", fontWeight: 500 }}>
                    investment strategies
                  </span>{" "}
                  or property paths.
                </>
              ) : (
                <>
                  Your financial flexibility is limited. Focus on{" "}
                  <span style={{ color: "var(--accent)", fontWeight: 500 }}>
                    building emergency savings
                  </span>{" "}
                  before long-term commitments.
                </>
              )}
            </p>

            <div
              style={{
                display: "flex",
                gap: "24px",
                marginTop: "20px",
                paddingTop: "16px",
                borderTop: "1px solid var(--border)",
              }}
            >
              <div>
                <div className="label" style={{ marginBottom: "2px" }}>Savings Rate</div>
                <strong>{savingsRate.toFixed(1)}%</strong>
              </div>
              <div>
                <div className="label" style={{ marginBottom: "2px" }}>Runway</div>
                <strong>{income > 0 ? (available / expenses).toFixed(1) : "—"} mo</strong>
              </div>
              <div>
                <div className="label" style={{ marginBottom: "2px" }}>Debt Load</div>
                <strong>Low</strong>
              </div>
            </div>
          </div>

          <div className="card card-dark score-card">
            <div className="label" style={{ color: "rgba(255,255,255,0.5)" }}>
              Health Score
            </div>
            <div className="score-ring">
              <svg width="120" height="120">
                <circle cx="60" cy="60" r="50" stroke="rgba(255,255,255,0.12)" strokeWidth="10" fill="none" />
                <circle
                  cx="60" cy="60" r="50"
                  stroke={scoreColor}
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={314}
                  strokeDashoffset={314 - (score / 100) * 314}
                  strokeLinecap="round"
                />
              </svg>
              <div className="score-text">{score}</div>
            </div>
            <p style={{ color: scoreColor, fontWeight: 600, marginTop: "4px" }}>
              {getScoreLabel()}
            </p>
          </div>
        </div>

        <div
          className="card section"
          style={{ display: "flex", alignItems: "center", gap: "16px" }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "10px",
              background: "var(--accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              fontSize: "18px",
            }}
          >
            →
          </div>
          <div style={{ flex: 1 }}>
            <div className="label" style={{ marginBottom: "2px" }}>Recommended Next Step</div>
            <p style={{ fontSize: "14px" }}>
              {available > 15000
                ? "Explore the Simulation Lab to compare Rent vs Buy scenarios."
                : "Visit Snapshot to adjust your expenses and improve flexibility."}
            </p>
          </div>
          <Link to={available > 15000 ? "/simulation" : "/snapshot"}>
            <button>
              {available > 15000 ? "Open Simulation" : "Open Snapshot"}
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}
