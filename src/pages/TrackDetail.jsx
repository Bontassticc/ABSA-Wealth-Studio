import { useState, useContext } from "react";
import Navbar from "../components/Navbar";
import { UserContext } from "../context/UserContext";

export default function TrackDetail() {

    const milestones = [
  "Build emergency fund",
  "Save property deposit",
  "Improve credit score",
  "Purchase property",
];
  const { income, expenses, savings, available } = useContext(UserContext);
  const [trackStarted, setTrackStarted] = useState(false);
const [currentStep, setCurrentStep] = useState(0);



  // 🧠 ENGINE PARAMETERS
  const savingsRate =
  income > 0 ? (savings / income) * 100 : 0;

  const isReady = available >= 20000 && savingsRate >= 10;
  const isModerate = available >= 10000 && available < 20000;
  const isHighRisk = available < 10000;

  // 🏠 PROPERTY TRACK MODEL (simple simulation)
  const estimatedMonthlyBond = 12000;
  const yearsToDeposit = isReady ? 2 : isModerate ? 3.5 : 5;

  const monthlySurplusAfterCommitment = available - estimatedMonthlyBond;

  return (
    <div>
      <Navbar />

      <div style={{ padding: "40px" }}>
        <h1>First Property Path</h1>

        {/* 🧠 FINANCIAL PROFILE SUMMARY */}
        <div style={{ marginBottom: "20px" }}>
          <h3>Your Financial Profile</h3>
          <p>Income: R{income}</p>
          <p>Expenses: R{expenses}</p>
          <p>Savings: R{savings}</p>
          <p><strong>Available: R{available}</strong></p>
          <p>Savings Rate: {savingsRate.toFixed(1)}%</p>
        </div>

        <hr />

        {/* 🧠 ELIGIBILITY ENGINE */}
        <h3>Track Eligibility</h3>

        {isReady && (
          <p style={{ color: "green" }}>
            ✅ Strong match: You are financially ready to start a property journey.
          </p>
        )}

        {isModerate && (
          <p style={{ color: "orange" }}>
            ⚠️ Possible match: You can start, but expect slower progress and tighter budgets.
          </p>
        )}

        {isHighRisk && (
          <p style={{ color: "red" }}>
            🚨 High financial pressure: Starting this track now may reduce financial flexibility significantly.
          </p>
        )}

        <hr />

        {/* 🧠 RECOMMENDATION ENGINE */}
        <h3>Recommendation</h3>

        {isReady && (
          <p>
            💡 Recommended: Start property savings journey now to maximise long-term asset growth.
          </p>
        )}

        {isModerate && (
          <p>
            💡 Suggested: Begin with emergency fund strengthening before committing fully.
          </p>
        )}

        {isHighRisk && (
          <p>
            💡 Suggested: Focus on increasing disposable income or reducing expenses first.
          </p>
        )}

        <hr />

        {/* 🧠 OUTCOME SIMULATION */}
        <h3>Projected Outcome</h3>

        <p>Estimated time to deposit: {yearsToDeposit} years</p>
        <p>
          Monthly surplus after bond:
          {" "}
          <strong style={{ color: monthlySurplusAfterCommitment < 0 ? "red" : "green" }}>
            R{monthlySurplusAfterCommitment}
          </strong>
        </p>

        <hr />

        {/* 🧠 BEHAVIOURAL INSIGHT LAYER */}
        <h3>Financial Insight</h3>

        <p>
          Property ownership is a long-term commitment that reduces monthly liquidity
          but increases long-term asset stability.
        </p>

        {monthlySurplusAfterCommitment < 0 && (
          <p style={{ color: "red" }}>
            ⚠️ This track would currently place you in monthly deficit territory.
          </p>
        )}

        <hr />

        {/* 🧠 PROGRESS SYSTEM */}
        <h3>Progress</h3>

        <button onClick={() => setTrackStarted(true)}>
         Start Track
        </button>
        <p>
        Status:{" "}
        <strong>
        {trackStarted ? "In Progress" : "Not Started"}
         </strong>
         </p>

         {trackStarted && (
  <div style={{ marginTop: "20px" }}>
    <h3>Your Journey</h3>

    <p>
      Step {currentStep + 1} of {milestones.length}
    </p>

    <h2>{milestones[currentStep]}</h2>

    <button
      onClick={() =>
        setCurrentStep((prev) =>
          prev < milestones.length - 1 ? prev + 1 : prev
        )
      }
    >
      Complete Step
    </button>
  </div>
)}
<div
  style={{
    height: "10px",
    background: "#eee",
    borderRadius: "5px",
    marginTop: "10px",
  }}
>
  <div
    style={{
      width: `${((currentStep + 1) / milestones.length) * 100}%`,
      height: "100%",
      background: "var(--secondary)",
      borderRadius: "5px",
    }}
  />

  {trackStarted && currentStep === milestones.length - 1 && (
  <p style={{ color: "var(--success)" }}>
    🎉 You’ve completed the property track!
  </p>
)}
</div>
      </div>
    </div>
  );
}