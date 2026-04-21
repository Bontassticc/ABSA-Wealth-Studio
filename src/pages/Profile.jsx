import { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { setIncome } = useContext(UserContext);
  const [name, setName] = useState("");
  const [incomeInput, setIncomeInput] = useState(30000);

  const navigate = useNavigate();

  const handleSubmit = () => {
    setIncome(Number(incomeInput));
    localStorage.setItem("username", name);
    navigate("/dashboard");
  };

  return (
    <div>
      <Navbar />

      <div className="page">
        <div className="card">
          <h1>Welcome to ABSA Wealth Studio</h1>
          <p>Let’s set up your financial profile</p>
        </div>

        <div className="card">
          <label>Your Name</label>
          <input
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="card">
          <label>Monthly Income (ZAR)</label>
          <input
            className="input"
            type="number"
            value={incomeInput}
            onChange={(e) => setIncomeInput(e.target.value)}
          />
        </div>

        <div className="card">
          <button onClick={handleSubmit}>
            Start My Financial Plan
          </button>
        </div>
      </div>
    </div>
  );
}