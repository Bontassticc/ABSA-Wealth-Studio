import { useState, useContext, useEffect } from "react";
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


  // 🌙 DARK MODE
  useEffect(() => {
    document.body.classList.add("dark");
    return () => document.body.classList.remove("dark");
  }, []);


  // 🧠 LOAD SAVED STATE (runs once)
  useEffect(() => {
    const savedStep = localStorage.getItem("trackStep");
    const savedStarted = localStorage.getItem("trackStarted");

    if (savedStep !== null) setCurrentStep(Number(savedStep));
    if (savedStarted === "true") setTrackStarted(true);
  }, []);

  // 🧠 SAVE STATE (runs when values change)
  useEffect(() => {
    localStorage.setItem("trackStep", currentStep);
    localStorage.setItem("trackStarted", trackStarted);
  }, [currentStep, trackStarted]);

  // 🧠 ENGINE PARAMETERS
  const savingsRate = income > 0 ? (savings / income) * 100 : 0;

  const isReady = available >= 20000 && savingsRate >= 10;
  const isModerate = available >= 10000 && available < 20000;
  const isHighRisk = available < 10000;

  // 🏠 PROPERTY TRACK MODEL
  const estimatedMonthlyBond = 12000;
  const yearsToDeposit = isReady ? 2 : isModerate ? 3.5 : 5;

  const monthlySurplusAfterCommitment = available - estimatedMonthlyBond;

  // 🧠 ACTIONS
  const nextStep = () => {
    if (currentStep < milestones.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const resetTrack = () => {
    setTrackStarted(false);
    setCurrentStep(0);
  };

  return (
    <div>
      <Navbar />

      <div className="page">

        {/* 🧠 HEADER */}
        <div className="section">
          <h1>First Property Path</h1>
          <p className="muted">
            A guided 5-year journey toward property ownership
          </p>
        </div>

        {/* 🧠 MAIN GRID */}
        <div className="simulation-grid">

          {/* LEFT SIDE */}
          <div className="card">

            <div className="label">Your Financial Profile</div>
            <p>Income: R{income}</p>
            <p>Expenses: R{expenses}</p>
            <p>Savings: R{savings}</p>
            <p><strong>Available: R{available}</strong></p>
            <p className="muted">
              Savings Rate: {savingsRate.toFixed(1)}%
            </p>

            <hr />

            <div className="label">Track Eligibility</div>

            {isReady && (
              <p style={{ color: "var(--success)" }}>
                Strong match — you are ready to start
              </p>
            )}

            {isModerate && (
              <p style={{ color: "var(--warning)" }}>
                Moderate match — progress may be slower
              </p>
            )}

            {isHighRisk && (
              <p style={{ color: "var(--danger)" }}>
                High risk — improve finances before starting
              </p>
            )}

            <hr />

            <div className="label">Projected Outcome</div>
            <p>Deposit timeline: {yearsToDeposit} years</p>

            <p>
              Monthly surplus:
              <strong
                style={{
                  color:
                    monthlySurplusAfterCommitment < 0
                      ? "var(--danger)"
                      : "var(--success)",
                }}
              >
                {" "}R{monthlySurplusAfterCommitment}
              </strong>
            </p>

          </div>

          {/* RIGHT SIDE */}
          <div className="card">

  <div className="label">Your Journey</div>

  {!trackStarted ? (
    <>
      <p>Start your structured financial path.</p>

      <button onClick={() => setTrackStarted(true)}>
        Start Track
      </button>
    </>
  ) : (
    <>
      <p>
        Step {currentStep + 1} of {milestones.length}
      </p>

      <h2>{milestones[currentStep]}</h2>

      {/* 🧠 STEP CONTENT (QUIZ STYLE) */}
      <div style={{ marginTop: "16px" }}>

        {/* STEP 1 */}
        {currentStep === 0 && (
          <>
            <p className="muted">
              How many months of expenses should your emergency fund cover?
            </p>

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button onClick={() => nextStep()}>1–2 months</button>
              <button onClick={() => nextStep()}>3–6 months ✅</button>
              <button onClick={() => nextStep()}>12 months</button>
            </div>

            <p className="muted" style={{ marginTop: "10px" }}>
              A 3–6 month buffer protects you from job loss or unexpected costs without disrupting long-term goals.
            </p>
          </>
        )}

        {/* STEP 2 */}
        {currentStep === 1 && (
          <>
            <p className="muted">
              What is typically required for a property deposit?
            </p>

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button onClick={() => nextStep()}>0%</button>
              <button onClick={() => nextStep()}>10–20% ✅</button>
              <button onClick={() => nextStep()}>50%</button>
            </div>

            <p className="muted" style={{ marginTop: "10px" }}>
              A higher deposit reduces your bond cost and increases approval chances.
            </p>
          </>
        )}

        {/* STEP 3 */}
        {currentStep === 2 && (
          <>
            <p className="muted">
              What improves your credit score the most?
            </p>

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button onClick={() => nextStep()}>Taking more loans</button>
              <button onClick={() => nextStep()}>Paying on time ✅</button>
              <button onClick={() => nextStep()}>Closing all accounts</button>
            </div>

            <p className="muted" style={{ marginTop: "10px" }}>
              Consistent repayment history is the strongest signal lenders use.
            </p>
          </>
        )}

        {/* STEP 4 */}
        {currentStep === 3 && (
          <>
            <p className="muted">
              Before buying property, what matters most?
            </p>

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button onClick={() => nextStep()}>Low monthly payment</button>
              <button onClick={() => nextStep()}>Long-term affordability ✅</button>
              <button onClick={() => nextStep()}>Location only</button>
            </div>

            <p className="muted" style={{ marginTop: "10px" }}>
              Sustainability matters more than just qualifying — ownership is a long-term commitment.
            </p>
          </>
        )}

      </div>

      {/* PROGRESS BAR */}
      <div
        style={{
          height: "10px",
          background: "#eee",
          borderRadius: "5px",
          marginTop: "20px",
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
      </div>

      {/* ACTIONS */}
      <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
        <button
          onClick={resetTrack}
          style={{ background: "#ccc", color: "#000" }}
        >
          Reset
        </button>
      </div>

      {/* COMPLETION */}
      {currentStep === milestones.length - 1 && (
        <p style={{ color: "var(--success)", marginTop: "10px" }}>
          🎉 You’ve completed the property track!
        </p>
      )}
    </>
  )}

</div>
        </div>

      </div>
    </div>
  );
}