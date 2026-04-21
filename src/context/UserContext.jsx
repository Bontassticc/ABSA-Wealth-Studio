import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [income, setIncome] = useState(45000);
  const [expenses, setExpenses] = useState(28000);
  const [savings, setSavings] = useState(10000);

  const available = income - expenses - savings;

  // 🧠 FINANCIAL HEALTH SCORE ENGINE
  const savingsRate = (savings / income) * 100;

  let score = 50;

  if (available > 20000) score += 20;
  else if (available < 10000) score -= 20;

  if (savingsRate > 15) score += 20;
  else if (savingsRate < 5) score -= 20;

  if (expenses / income > 0.7) score -= 15;

  score = Math.max(0, Math.min(100, score));

  const getScoreLabel = () => {
    if (score >= 75) return "Strong";
    if (score >= 50) return "Moderate";
    return "At Risk";
  };

  return (
    <UserContext.Provider
      value={{
        income,
        setIncome,
        expenses,
        setExpenses,
        savings,
        setSavings,
        available,
        score,
        getScoreLabel,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}