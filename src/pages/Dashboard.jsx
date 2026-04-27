
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

// 🌙 DARK MODE ACTIVATION
useEffect(() => {
  document.body.classList.add("dark");

  return () => {
    document.body.classList.remove("dark");
  };
}, []);



  // 🧠 A simple financial health logic
const savingsRate = income > 0 ? (savings / income) * 100 : 0;

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

  {/* 🧠 HEADER */}
  <div className="section">
    <h1>Welcome back{name ? `, ${name}` : ""}</h1>
    <p className="muted">Your monthly financial position at a glance</p>
  </div>

  {/* 💰 HERO CARD */}
  <div className="card card-feature section">
    <div className="label">Available this month</div>
    <div className="big-number">R{available}</div>
    <p>After all commitments</p>
  </div>

  {/* 💳 METRICS GRID */}
  <div className="metrics-grid section">
    <div className="card">
      <div className="label">Income</div>
      <h2>R{income}</h2>
      <p className="muted">Monthly salary</p>
    </div>

    <div className="card">
      <div className="label">Expenses</div>
      <h2>R{expenses}</h2>
      <p className="muted">Fixed + variable</p>
    </div>

    <div className="card">
      <div className="label">Savings</div>
      <h2>R{savings}</h2>
      <p className="muted">Monthly allocation</p>
    </div>
  </div>

  {/* 🧠 INSIGHT + SCORE SIDE BY SIDE */}
  <div
    className="section"
    style={{
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      gap: "16px",
    }}
  >
    {/* INSIGHT */}
    <div className="card">
      <div className="label">Key Insight</div>

      {available > 15000 ? (
        <p>
          You have strong monthly flexibility. You can actively explore
          property or investment strategies.
        </p>
      ) : (
        <p>
          Your financial flexibility is limited. Focus on building
          emergency savings before long-term commitments.
        </p>
      )}

      <hr />

      <p className="muted">
        Savings Rate: {savingsRate.toFixed(1)}%
      </p>
    </div>

    {/* SCORE */}
    <div className="card score-card">
  <div className="label">Health Score</div>

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
  </div>

  {/* 🚀 ACTION */}
  <div className="card section">
    <div className="label">Recommended Next Step</div>

    {available > 15000 ? (
      <p>Explore the Simulation Lab to compare Rent vs Buy scenarios.</p>
    ) : (
      <p>Visit Snapshot to adjust your expenses and improve flexibility.</p>
    )}
  </div>

</div>

</div>

  );
}