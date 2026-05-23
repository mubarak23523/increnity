import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Increnity Admin</h2>

      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/projects">Manage Projects</Link></li>
        <li><Link to="/services">Manage Services</Link></li>
        <li><Link to="/messages">Messages</Link></li>
        <li><Link to="/users">User Logs</Link></li>
        <li><Link to="/settings">Admin Settings</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;