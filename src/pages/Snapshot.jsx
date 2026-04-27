import { useContext } from "react";
import Navbar from "../components/Navbar";
import { UserContext } from "../context/UserContext";

const fmt = (n) =>
  "R" + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

export default function Snapshot() {
  const { score, getScoreLabel } = useContext(UserContext);
  const {
    income, setIncome,
    expenses, setExpenses,
    savings, setSavings,
    available,
  } = useContext(UserContext);

  const isLow = available < 10000;

  return (
    <div>
      <Navbar />

      <div className="page">

        <div className="section">
          <p className="label">Snapshot</p>
          <h1>Financial profile</h1>
          <p className="muted">Three numbers that shape every decision.</p>
        </div>

        <div className="snapshot-grid">

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            <div className="card">
              <div className="input-group">
                <label>
                  <span className="dot dot-green" />
                  Monthly income
                </label>
                <p className="muted" style={{ marginBottom: "8px", fontSize: "12px" }}>
                  Take-home after PAYE
                </p>
                <div className="input-row">
                  <input
                    type="number"
                    value={income}
                    onChange={(e) => setIncome(Number(e.target.value))}
                  />
                  <span className="input-suffix">/ mo</span>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="input-group">
                <label>
                  <span className="dot dot-orange" />
                  Monthly expenses
                </label>
                <p className="muted" style={{ marginBottom: "8px", fontSize: "12px" }}>
                  Fixed + variable
                </p>
                <div className="input-row">
                  <input
                    type="number"
                    value={expenses}
                    onChange={(e) => setExpenses(Number(e.target.value))}
                  />
                  <span className="input-suffix">/ mo</span>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="input-group">
                <label>
                  <span className="dot dot-amber" />
                  Monthly savings
                </label>
                <p className="muted" style={{ marginBottom: "8px", fontSize: "12px" }}>
                  Automatic allocation
                </p>
                <div className="input-row">
                  <input
                    type="number"
                    value={savings}
                    onChange={(e) => setSavings(Number(e.target.value))}
                  />
                  <span className="input-suffix">/ mo</span>
                </div>
              </div>
            </div>

          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            <div className="card card-dark">
              <div className="label" style={{ color: "rgba(255,255,255,0.45)" }}>
                Live Summary
              </div>

              <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                  <span style={{ color: "rgba(255,255,255,0.6)" }}>Income</span>
                  <span style={{ color: "white", fontWeight: 500 }}>{fmt(income)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                  <span style={{ color: "rgba(255,255,255,0.6)" }}>Expenses</span>
                  <span style={{ color: "#E07A5F", fontWeight: 500 }}>-{fmt(expenses)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                  <span style={{ color: "rgba(255,255,255,0.6)" }}>Savings</span>
                  <span style={{ color: "#E07A5F", fontWeight: 500 }}>-{fmt(savings)}</span>
                </div>
              </div>

              <div
                style={{
                  marginTop: "20px",
                  paddingTop: "16px",
                  borderTop: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <div className="label" style={{ color: "rgba(255,255,255,0.45)", marginBottom: "6px" }}>
                  Available Balance
                </div>
                <div
                  className="big-number"
                  style={{ color: "#E07A5F", fontSize: "36px" }}
                >
                  {fmt(available)}
                </div>
              </div>

              <button
                style={{
                  width: "100%",
                  marginTop: "20px",
                  background: "white",
                  color: "#1A0A00",
                  borderRadius: "10px",
                  padding: "12px",
                }}
              >
                Save profile →
              </button>
            </div>

            {isLow && (
              <div className="alert alert-warning">
                Your financial flexibility is limited. Consider reducing expenses or increasing savings rate.
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
