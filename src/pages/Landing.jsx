import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Landing() {
  return (
    <div>
      <Navbar />

      <div className="page">

        <div className="hero section">
          <p className="label" style={{ color: "rgba(255,255,255,0.7)" }}>
            Financial Decision System · First 5 Years
          </p>

          <h1 className="hero-title">
            Not budgeting.
            <br />
            Decision intelligence.
          </h1>

          <p className="hero-sub">
            Rent vs buy. Car vs invest. Spend vs save. Boni shows you the five-year shape of every call before you commit.
          </p>

          <div style={{ display: "flex", gap: "12px", marginTop: "28px", flexWrap: "wrap" }}>
            <Link to="/profile">
              <button style={{ background: "white", color: "#1A0A00" }}>
                Start your financial profile →
              </button>
            </Link>
            <Link to="/dashboard">
              <button className="btn-outline">Preview dashboard</button>
            </Link>
          </div>
        </div>

        <div className="two-col section">

          <div className="card">
            <div className="label">The Problem</div>
            <h2 style={{ marginTop: "8px", marginBottom: "16px", lineHeight: "1.4" }}>
              Most young professionals make high-impact financial decisions without understanding long-term consequences.
            </h2>
            <p className="muted">
              rent_vs_buy · cars_vs_investing · spending_vs_saving
            </p>
          </div>

          <div className="card">
            <div className="label">What This System Does</div>
            <ul className="feature-list" style={{ marginTop: "8px" }}>
              <li>
                <span className="feature-num">01</span>
                <span><strong>Money Snapshot</strong> — understand your financial reality</span>
              </li>
              <li>
                <span className="feature-num">02</span>
                <span><strong>Simulation Lab</strong> — test decisions safely</span>
              </li>
              <li>
                <span className="feature-num">03</span>
                <span><strong>Strategy Tracks</strong> — guided 5-year paths</span>
              </li>
              <li>
                <span className="feature-num">04</span>
                <span><strong>Intelligence Score</strong> — measure your stability</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}
