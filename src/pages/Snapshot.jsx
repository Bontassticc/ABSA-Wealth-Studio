import { useContext } from "react";
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

  return (
    <div>
      <Navbar />

      <div className="page">
        {/* 🧠 HEADER */}
        <div className="card">
          <h1>Financial Snapshot</h1>
          <p>Update your monthly financial profile</p>
        </div>

        {/* 💳 FORM SECTION */}
        <div className="card">
          <h3>Monthly Income</h3>
          <input
            className="input"
            type="number"
            value={income}
            onChange={(e) => setIncome(Number(e.target.value))}
          />
        </div>

        <div className="card">
          <h3>Monthly Expenses</h3>
          <input
            className="input"
            type="number"
            value={expenses}
            onChange={(e) => setExpenses(Number(e.target.value))}
          />
        </div>

        <div className="card">
          <h3>Monthly Savings</h3>
          <input
            className="input"
            type="number"
            value={savings}
            onChange={(e) => setSavings(Number(e.target.value))}
          />
        </div>
        

        {/* 🧠 LIVE FINANCIAL SUMMARY */}
        <div className="card">
          <h3>Live Summary</h3>

          <p>Income: R{income}</p>
          <p>Expenses: R{expenses}</p>
          <p>Savings: R{savings}</p>

          <hr />

          <h2>
            Available Balance:{" "}
            <span
              style={{
                color: available > 15000 ? "var(--success)" : "var(--warning)",
              }}
            >
              R{available}
            </span>
          </h2>
        </div>

        {/* 🧠 GUIDANCE LAYER */}
        <div className="card">
          <h3>Insight</h3>

          {available > 15000 ? (
            <p>
              ✅ You have strong financial flexibility. You can actively explore
              investment or property strategies.
            </p>
          ) : (
            <p>
              ⚠️ Your financial flexibility is limited. Consider reducing
              expenses or increasing savings rate.
            </p>
          )}
        </div>

        {/* 🔐 BANKING UX FEEL */}
        <div className="card">
          <p style={{ fontSize: "13px", color: "var(--muted)" }}>
            Your data is used to simulate financial decision-making scenarios
            within ABSA Wealth Studio.
          </p>
        </div>

        <div className="card">
  <h3>Impact of Your Changes</h3>

  <p>
    Financial Health Score: <strong>{score}</strong>
  </p>

  <p>
    Status:{" "}
    <span
      style={{
        color:
          getScoreLabel() === "Strong"
            ? "var(--success)"
            : getScoreLabel() === "Moderate"
            ? "var(--warning)"
            : "var(--danger)",
      }}
    >
      {getScoreLabel()}
    </span>
  </p>

  <p className="muted">
    Changes you make here directly affect your simulation outcomes and track recommendations.
  </p>
</div>
      </div>
    </div>
  );
}