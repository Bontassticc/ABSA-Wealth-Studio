import { useState } from "react";
import "./styles/global.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SplashScreen from "./components/SplashScreen";

import Profile from "./pages/Profile";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Snapshot from "./pages/Snapshot";
import TrackDetail from "./pages/TrackDetail";
import Simulation from "./pages/Simulation";

function App() {
  const [loading, setLoading] = useState(true);

 
  if (loading) {
    return <SplashScreen onFinish={() => setLoading(false)} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/snapshot" element={<Snapshot />} />
        <Route path="/tracks/property" element={<TrackDetail />} />
        <Route path="/simulation" element={<Simulation />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;