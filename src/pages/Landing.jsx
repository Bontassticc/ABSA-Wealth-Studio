import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState, useContext, useEffect } from "react";

export default function Landing() {

useEffect(() => {
  document.body.classList.add("dark");
  return () => document.body.classList.remove("dark");
}, []);
  
  return (

    
   <div>
  <Navbar />

  

  <div className="page">

    {/* 🔥 HERO */}
    <div className="hero section">
      <div>
        <p className="label">Financial Decision System • First 5 Years</p>

        <h1 className="hero-title">
          Not budgeting.
          <br />
          Decision intelligence.
        </h1>

        <p className="hero-sub">
          Rent vs buy. Car vs invest. Spend vs save.
          <br />
          Understand the 5-year impact before you commit.
        </p>

        <div style={{ marginTop: "20px" }}>
          <Link to="/profile">
            <button>Start Your Financial Profile →</button>
          </Link>
        </div>
      </div>
    </div>

    {/* 🧠 PROBLEM + SOLUTION */}
    <div className="two-col section">

      <div className="card">
        <div className="label">The Problem</div>
        <h2>
          Most young professionals make high-impact financial decisions
          without understanding long-term consequences.
        </h2>

        <p className="muted">
          rent_vs_buy · cars_vs_investing · spending_vs_saving
        </p>
      </div>

      <div className="card">
        <div className="label">What This System Does</div>

        <ul className="feature-list">
          <li><strong>Money Snapshot</strong> — understand your financial reality</li>
          <li><strong>Simulation Lab</strong> — test decisions safely</li>
          <li><strong>Strategy Tracks</strong> — guided 5-year paths</li>
          <li><strong>Intelligence Score</strong> — measure your stability</li>
        </ul>
      </div>

    </div>

    {/* 🚀 FINAL CTA */}
    <div className="card section">
      <div className="label">Start Your Journey</div>

      <h2>Build your financial profile and explore your decision space.</h2>

      <Link to="/snapshot">
        <button style={{ marginTop: "16px" }}>
          Begin with Snapshot
        </button>
      </Link>
    </div>

  </div>
</div>
  );
}