import { Link } from "react-router-dom";
import { useState } from "react";

function PublicNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="public-navbar">
      <h2>Increnity</h2>

      <button className="menu-btn" onClick={() => setOpen(!open)}>
        ☰
      </button>

      <div className={open ? "nav-menu active" : "nav-menu"}>
        <Link to="/">Home</Link>
        <Link to="/projects-public">Explore</Link>
        <Link to="/services-public">Community</Link>
        <Link to="/about">Creators</Link>
        <Link to="/contact">Support</Link>
        <Link to="/register" className="admin-link">Join Now</Link>
        <Link to="/login" className="admin-link">Admin Login</Link>
      </div>
    </nav>
  );
}

export default PublicNavbar;