import { useState, useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import { UserContext } from "../context/UserContext";

const fmt = (n) =>
  "R" + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

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

  useEffect(() => {
    const savedStep    = localStorage.getItem("trackStep");
    const savedStarted = localStorage.getItem("trackStarted");
    if (savedStep    !== null)    setCurrentStep(Number(savedStep));
    if (savedStarted === "true") setTrackStarted(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("trackStep",    currentStep);
    localStorage.setItem("trackStarted", trackStarted);
  }, [currentStep, trackStarted]);

  const savingsRate = income > 0 ? (savings / income) * 100 : 0;

  const isReady    = available >= 20000 && savingsRate >= 10;
  const isModerate = available >= 10000 && available < 20000;
  const isHighRisk = available < 10000;

  const yearsToDeposit = isReady ? 2 : isModerate ? 3.5 : 5;
  const estimatedMonthlyBond = 12000;
  const monthlySurplus = available - estimatedMonthlyBond;

  const nextStep = () => {
    if (currentStep < milestones.length - 1) setCurrentStep((p) => p + 1);
  };

  const resetTrack = () => {
    setTrackStarted(false);
    setCurrentStep(0);
  };

  return (
    <div>
      <Navbar />

      <div className="page">

        <div className="section">
          <p className="label">Strategy Track</p>
          <h1>First Property Path</h1>
          <p className="muted">A guided 5-year route to your first home deposit.</p>
        </div>

        <div className="simulation-grid section">

          <div className="card">
            <div className="label">Your Profile</div>

            <div className="two-col" style={{ marginTop: "12px", gap: "12px" }}>
              <div style={{ background: "var(--bg)", borderRadius: "10px", padding: "14px" }}>
                <div className="label" style={{ marginBottom: "4px" }}>Income</div>
                <p style={{ fontWeight: 700, fontSize: "18px" }}>{fmt(income)}</p>
              </div>
              <div style={{ background: "var(--bg)", borderRadius: "10px", padding: "14px" }}>
                <div className="label" style={{ marginBottom: "4px" }}>Expenses</div>
                <p style={{ fontWeight: 700, fontSize: "18px" }}>{fmt(expenses)}</p>
              </div>
              <div style={{ background: "var(--bg)", borderRadius: "10px", padding: "14px" }}>
                <div className="label" style={{ marginBottom: "4px" }}>Savings</div>
                <p style={{ fontWeight: 700, fontSize: "18px" }}>{fmt(savings)}</p>
              </div>
              <div style={{ background: "var(--bg)", borderRadius: "10px", padding: "14px" }}>
                <div className="label" style={{ marginBottom: "4px" }}>Savings Rate</div>
                <p style={{ fontWeight: 700, fontSize: "18px" }}>{savingsRate.toFixed(1)}%</p>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "16px",
                paddingTop: "14px",
                borderTop: "1px solid var(--border)",
              }}
            >
              <span className="muted" style={{ fontSize: "13px" }}>Available after commitments</span>
              <span style={{ fontWeight: 700, color: "var(--accent)", fontSize: "16px" }}>
                {fmt(available)}
              </span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

            <div
              className="card"
              style={{
                borderColor: isReady ? "#C3E8CC" : "#FDDDD5",
                background: isReady ? "#F0FBF4" : "#FFF0ED",
              }}
            >
              <div
                className="label"
                style={{ color: isReady ? "#2E7D32" : "#C8553D", marginBottom: "8px" }}
              >
                Track Eligibility
              </div>

              {isReady && (
                <>
                  <p style={{ fontWeight: 600, color: "#2E7D32", fontSize: "15px" }}>
                    Strong match
                  </p>
                  <p className="muted" style={{ marginTop: "4px" }}>
                    You are well positioned to start this track now.
                  </p>
                </>
              )}

              {isModerate && (
                <>
                  <p style={{ fontWeight: 600, color: "#C8553D", fontSize: "15px" }}>
                    High financial pressure
                  </p>
                  <p className="muted" style={{ marginTop: "4px" }}>
                    Starting this track now may reduce your financial flexibility significantly.
                  </p>
                </>
              )}

              {isHighRisk && (
                <>
                  <p style={{ fontWeight: 600, color: "#C8553D", fontSize: "15px" }}>
                    High financial pressure
                  </p>
                  <p className="muted" style={{ marginTop: "4px" }}>
                    Starting this track now may reduce your financial flexibility significantly.
                  </p>
                </>
              )}
            </div>

            <div className="card">
              <div className="label" style={{ marginBottom: "8px" }}>Recommendation</div>
              <p style={{ fontSize: "14px", lineHeight: 1.6 }}>
                {isReady
                  ? "You can start building your emergency fund immediately. Aim for 3–6 months of expenses."
                  : "Focus on increasing disposable income or reducing expenses first."}
              </p>
            </div>

          </div>
        </div>

        <div className="three-col section">

          <div className="card">
            <div className="label">Time to Deposit</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginTop: "8px" }}>
              <span style={{ fontSize: "48px", fontWeight: 700, lineHeight: 1 }}>
                {yearsToDeposit}
              </span>
              <span style={{ fontSize: "16px", color: "var(--muted)" }}>yrs</span>
            </div>
            <div className="progress-bar" style={{ background: "var(--border)", marginTop: "14px" }}>
              <div
                className="progress-fill"
                style={{
                  width: `${((currentStep) / milestones.length) * 100}%`,
                  background: "var(--accent)",
                }}
              />
            </div>
            <p className="muted" style={{ fontSize: "12px" }}>
              {currentStep} / {milestones.length * 12} months
            </p>
          </div>

          <div className="card">
            <div className="label">Surplus After Bond</div>
            <div
              style={{
                fontSize: "40px",
                fontWeight: 700,
                color: monthlySurplus < 0 ? "#C8553D" : "#4CAF50",
                marginTop: "8px",
                lineHeight: 1,
              }}
            >
              {monthlySurplus < 0 ? "–" : ""}{fmt(Math.abs(monthlySurplus))}
            </div>
            <p className="muted" style={{ marginTop: "10px" }}>
              {monthlySurplus < 0
                ? "Would place you in monthly deficit."
                : "Positive monthly surplus after bond payments."}
            </p>
          </div>

          <div className="card card-dark" style={{ position: "relative", overflow: "hidden" }}>
            <div
              style={{
                position: "absolute",
                width: 130,
                height: 130,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.06)",
                bottom: -30,
                right: -20,
                pointerEvents: "none",
              }}
            />
            <div className="label" style={{ color: "rgba(255,255,255,0.45)" }}>
              Financial Insight
            </div>
            <p style={{ fontSize: "14px", lineHeight: 1.6, marginTop: "10px", color: "rgba(255,255,255,0.85)" }}>
              Property ownership reduces monthly liquidity but increases long-term asset stability.
            </p>
            <button
              onClick={() => setTrackStarted(true)}
              style={{
                marginTop: "20px",
                background: "white",
                color: "#1A0A00",
                borderRadius: "10px",
                padding: "10px 18px",
                fontSize: "13px",
              }}
            >
              Start track →
            </button>
          </div>

        </div>

        {trackStarted && (
          <div className="card section">
            <div className="label">Your Journey</div>

            <p style={{ marginTop: "6px", color: "var(--muted)", fontSize: "13px" }}>
              Step {currentStep + 1} of {milestones.length}
            </p>
            <h2 style={{ marginTop: "6px" }}>{milestones[currentStep]}</h2>

            <div style={{ marginTop: "16px" }}>

              {currentStep === 0 && (
                <>
                  <p className="muted">How many months of expenses should your emergency fund cover?</p>
                  <div style={{ display: "flex", gap: "10px", marginTop: "12px", flexWrap: "wrap" }}>
                    <button onClick={nextStep} style={{ background: "var(--bg)", color: "var(--text)", border: "1.5px solid var(--border)" }}>1–2 months</button>
                    <button onClick={nextStep} style={{ background: "var(--accent)", color: "white" }}>3–6 months ✓</button>
                    <button onClick={nextStep} style={{ background: "var(--bg)", color: "var(--text)", border: "1.5px solid var(--border)" }}>12 months</button>
                  </div>
                  <p className="muted" style={{ marginTop: "12px" }}>
                    A 3–6 month buffer protects you from job loss or unexpected costs without disrupting long-term goals.
                  </p>
                </>
              )}

              {currentStep === 1 && (
                <>
                  <p className="muted">What is typically required for a property deposit?</p>
                  <div style={{ display: "flex", gap: "10px", marginTop: "12px", flexWrap: "wrap" }}>
                    <button onClick={nextStep} style={{ background: "var(--bg)", color: "var(--text)", border: "1.5px solid var(--border)" }}>0%</button>
                    <button onClick={nextStep} style={{ background: "var(--accent)", color: "white" }}>10–20% ✓</button>
                    <button onClick={nextStep} style={{ background: "var(--bg)", color: "var(--text)", border: "1.5px solid var(--border)" }}>50%</button>
                  </div>
                  <p className="muted" style={{ marginTop: "12px" }}>
                    A higher deposit reduces your bond cost and increases approval chances.
                  </p>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <p className="muted">What improves your credit score the most?</p>
                  <div style={{ display: "flex", gap: "10px", marginTop: "12px", flexWrap: "wrap" }}>
                    <button onClick={nextStep} style={{ background: "var(--bg)", color: "var(--text)", border: "1.5px solid var(--border)" }}>Taking more loans</button>
                    <button onClick={nextStep} style={{ background: "var(--accent)", color: "white" }}>Paying on time ✓</button>
                    <button onClick={nextStep} style={{ background: "var(--bg)", color: "var(--text)", border: "1.5px solid var(--border)" }}>Closing all accounts</button>
                  </div>
                  <p className="muted" style={{ marginTop: "12px" }}>
                    Consistent repayment history is the strongest signal lenders use.
                  </p>
                </>
              )}

              {currentStep === 3 && (
                <>
                  <p className="muted">Before buying property, what matters most?</p>
                  <div style={{ display: "flex", gap: "10px", marginTop: "12px", flexWrap: "wrap" }}>
                    <button onClick={nextStep} style={{ background: "var(--bg)", color: "var(--text)", border: "1.5px solid var(--border)" }}>Low monthly payment</button>
                    <button onClick={nextStep} style={{ background: "var(--accent)", color: "white" }}>Long-term affordability ✓</button>
                    <button onClick={nextStep} style={{ background: "var(--bg)", color: "var(--text)", border: "1.5px solid var(--border)" }}>Location only</button>
                  </div>
                  <p className="muted" style={{ marginTop: "12px" }}>
                    Sustainability matters more than just qualifying — ownership is a long-term commitment.
                  </p>
                </>
              )}

            </div>

            <div className="progress-bar" style={{ marginTop: "20px" }}>
              <div
                className="progress-fill"
                style={{ width: `${((currentStep + 1) / milestones.length) * 100}%` }}
              />
            </div>
            <p className="muted" style={{ fontSize: "12px", marginTop: "4px" }}>
              {currentStep + 1} / {milestones.length} steps
            </p>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "16px" }}>
              <button
                onClick={resetTrack}
                style={{ background: "var(--bg)", color: "var(--muted)", border: "1.5px solid var(--border)", fontSize: "13px" }}
              >
                Reset
              </button>

              {currentStep === milestones.length - 1 && (
                <p style={{ color: "#4CAF50", fontWeight: 500 }}>
                  You've completed the property track!
                </p>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
