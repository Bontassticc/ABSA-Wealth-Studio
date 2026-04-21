import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      {/* BRAND */}
      <div className="nav-left">
        <h2 className="logo">ABSA Wealth Studio</h2>
      </div>

      {/* NAV LINKS */}
      <div className="nav-center">
        <Link className={isActive("/") ? "active" : ""} to="/">
          Home
        </Link>

        <Link className={isActive("/dashboard") ? "active" : ""} to="/dashboard">
          Dashboard
        </Link>

        <Link className={isActive("/snapshot") ? "active" : ""} to="/snapshot">
          Snapshot
        </Link>

        <Link className={isActive("/simulation") ? "active" : ""} to="/simulation">
          Simulation
        </Link>

        <Link className={isActive("/tracks/property") ? "active" : ""} to="/tracks/property">
          Tracks
        </Link>
      </div>

      {/* RIGHT STATUS AREA */}
      <div className="nav-right">
        <span className="status-pill">Financial Lab</span>
      </div>
    </nav>
  );
}