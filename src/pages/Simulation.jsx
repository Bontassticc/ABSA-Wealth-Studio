import { useState, useContext } from "react";
import Navbar from "../components/Navbar";
import { UserContext } from "../context/UserContext";

export default function Simulation() {
  const { income, expenses, savings, available } = useContext(UserContext);

  const [rent, setRent] = useState(8000);
  const [property, setProperty] = useState(1200000);

  // Monthly bond estimate (simplified model)
  const estimatedBond = (property * 0.1) / 12;

  // System-aware calculations
  const rentAfter = available - rent;
  const buyAfter = available - estimatedBond;

  const decisionGap = estimatedBond - rent;

  return (
    <div>
      <Navbar />

      <div className="page">
        <h1>Rent vs Buy Simulation</h1>

        {/* 🧠 CONTEXT AWARE SUMMARY */}
         <div className="card">
          <h3>Your Financial Context</h3>
          <p>Monthly Income: R{income}</p>
          <p>Expenses: R{expenses}</p>
          <p>Savings: R{savings}</p>
          <p><strong>Available: R{available}</strong></p>
        </div>

        <hr />

        {/* INPUTS */}
        <div className="card">
          <label>Monthly Rent: R{rent}</label>
          <input
            type="range"
            min="5000"
            max="15000"
            value={rent}
            onChange={(e) => setRent(Number(e.target.value))}
          />
        </div>

        <div className="card">
          <label>Property Price: R{property}</label>
          <input
            type="range"
            min="500000"
            max="2000000"
            value={property}
            onChange={(e) => setProperty(Number(e.target.value))}
          />
        </div>

        <hr />

        {/* 🧠 CORE SIMULATION OUTPUT */}
        <h3>Financial Impact</h3>

        <p>Rent After Expenses: R{rentAfter}</p>
        <p>Buy (Bond) After Expenses: R{buyAfter.toFixed(0)}</p>

        <hr />

        {/* 🧠 DECISION LOGIC LAYER */}
         <div className="card">
        <h3>Insight</h3>

        {decisionGap > 2000 ? (
          <p style={{ color: "red" }}>
            ⚠️ Buying increases monthly pressure by R{decisionGap.toFixed(0)}.
            This may reduce flexibility in your early career stage.
          </p>
        ) : (
          <p style={{ color: "green" }}>
            ✅ Buying is financially close to renting in your current situation.
            This could be a viable long-term wealth-building path.
          </p>
        )}
         </div>
        {/* 🧠 UX EDUCATION LAYER (PRD ALIGNMENT) */}
        <div style={{ marginTop: "20px" }}>
          <h4>What this means</h4>

          <p>
            In South Africa, property decisions are not just about affordability
            they affect liquidity, emergency resilience, and career mobility.
          </p>

          <p>
            Your available cash after commitments is more important in your first
            five working years than ownership alone.
          </p>
        </div>
      </div>
    </div>
  );
}