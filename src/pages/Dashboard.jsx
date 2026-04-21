
import Navbar from "../components/Navbar";
import { UserContext } from "../context/UserContext";
import { useContext, useEffect, useState } from "react";


export default function Dashboard() {

  const { income, expenses, savings, available } = useContext(UserContext);
  const { score, getScoreLabel } = useContext(UserContext);
  const [name, setName] = useState("");

useEffect(() => {
  const storedName = localStorage.getItem("username");
  if (storedName) {
    setName(storedName);
  }
}, []);



  // 🧠 simple financial health logic
  const savingsRate = (savings / income) * 100;

  const getStatus = () => {
    if (available > 20000 && savingsRate > 15) return "Strong";
    if (available > 10000) return "Moderate";
    return "At Risk";
  };

  const status = getStatus();

  return (
    <div>
      <Navbar />

      <div className="page">
        {/* 🧠 HEADER SECTION */}
        <div className="card">
          <h1>Welcome back{name ? `, ${name}` : ""}</h1>
          <p>Your monthly financial position at a glance</p>

          <h2>
            Status:{" "}
            <span
              style={{
                color:
                  status === "Strong"
                    ? "var(--success)"
                    : status === "Moderate"
                    ? "var(--warning)"
                    : "var(--danger)",
              }}
            >
              {status}
            </span>
          </h2>
        </div>

        {/* 💳 MAIN METRICS GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
          }}
        >
          <div className="card">
            <h3>Income</h3>
            <h2>R{income}</h2>
            <p className="muted">Monthly salary</p>
          </div>

          <div className="card">
            <h3>Expenses</h3>
            <h2>R{expenses}</h2>
            <p className="muted">Fixed + variable costs</p>
          </div>

          <div className="card">
            <h3>Savings</h3>
            <h2>R{savings}</h2>
            <p className="muted">Monthly allocation</p>
          </div>
        </div>

        {/* 🧠 KEY INSIGHT PANEL */}
        <div className="card" style={{ marginTop: "16px" }}>
          <h3>Key Insight</h3>

          {available > 15000 ? (
            <p>
              ✅ You have strong monthly flexibility. You can actively explore
              property or investment strategies.
            </p>
          ) : (
            <p>
              ⚠️ Your financial flexibility is limited. Focus on building
              emergency savings before long-term commitments.
            </p>
          )}
        </div>

        {/* 📊 SUMMARY STRIP */}
        <div className="card" style={{ marginTop: "16px" }}>
          <h3>Monthly Position</h3>
          <p>
            Available after commitments:{" "}
            <strong
              style={{
                color: available > 15000 ? "var(--success)" : "var(--warning)",
              }}
            >
              R{available}
            </strong>
          </p>
        </div>

        {/* 🚀 ACTION SECTION */}
        <div className="card" style={{ marginTop: "16px" }}>
          <h3>Recommended Next Step</h3>

          {available > 15000 ? (
            <p>
              👉 Explore the Simulation Lab to compare Rent vs Buy scenarios.
            </p>
          ) : (
            <p>
              👉 Visit Snapshot to adjust your expenses and improve flexibility.
            </p>
          )}
        </div>

        <div className="card">
       <h3>Financial Health Score</h3>

       <h1 style={{ fontSize: "48px", margin: "10px 0" }}>
        {score}
       </h1>

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
    This score represents your overall financial stability based on income,
    expenses, and savings behaviour.
  </p>
</div>
      </div>
    </div>

  );
}