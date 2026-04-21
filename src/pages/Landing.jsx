import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Landing() {
  return (
    <div>
      <Navbar />

      <div className="page">

        {/* 🧠 HERO */}
        <div className="card">
          <h1>ABSA Wealth Studio</h1>
          <p>
            A financial decision system designed for your first five years of work.
          </p>

          <h2 style={{ marginTop: "20px" }}>
            Not budgeting. Decision intelligence.
          </h2>

          <Link to="/profile">
            <button style={{ marginTop: "20px" }}>
              Start Your Financial Profile
            </button>
          </Link>
        </div>

        {/* 🧠 PROBLEM SECTION */}
        <div className="card">
          <h3>The Problem</h3>
          <p>
            Most young professionals make high-impact financial decisions
            without understanding long-term consequences.
          </p>
          <p>
            Rent vs buy. Cars vs investing. Spending vs saving.
          </p>
        </div>

        {/* 🧠 PRODUCT MODULES */}
        <div className="card">
          <h3>What This System Does</h3>

          <ul>
            <li>📊 Money Snapshot: understand your financial reality</li>
            <li>🧠 Simulation Lab: test financial decisions safely</li>
            <li>🧭 Strategy Tracks: guided 5-year financial paths</li>
            <li>📈 Financial Intelligence Score: measure your stability</li>
          </ul>
        </div>

        {/* 🧠 CTA */}
        <div className="card">
          <h3>Start Your Journey</h3>
          <p>
            Build your financial profile and explore your decision space.
          </p>

          <Link to="/snapshot">
            <button>Begin with Snapshot</button>
          </Link>
        </div>

      </div>
    </div>
  );
}