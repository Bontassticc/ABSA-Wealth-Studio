import { useEffect, useState } from "react";

export default function SplashScreen({ onFinish }) {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    setTimeout(() => setFade(true), 1500); // start fade
    setTimeout(() => onFinish(), 2200); // remove splash
  }, []);

  return (
   <div className={`splash ${fade ? "fade-out" : ""}`}>
  <div className="splash-logo">
    <h1>ABSA</h1>
    <p>Wealth Studio</p>
  </div>
</div>
  );
}