import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../layouts/AdminLayout";
import "./Dashboard.css";
import { toast } from "react-toastify";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [myProjects, setMyProjects] = useState([]);
  const [communityProjects, setCommunityProjects] = useState([]);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get("https://increnity.onrender.com/api/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load profile");
    }
  };

  const fetchMyProjects = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "https://increnity.onrender.com/api/projects/my-projects",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMyProjects(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load your projects");
    }
  };

  const fetchCommunityProjects = async () => {
    try {
      const response = await axios.get("https://increnity.onrender.com/api/projects");
      setCommunityProjects(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchMyProjects();
    fetchCommunityProjects();
  }, []);

  return (
    <AdminLayout>
      <div className="dashboard-welcome">
        <span className="dashboard-badge">Creator Dashboard</span>

        <h1>
          Welcome back, {user?.name || "Creator"} 👋
        </h1>

        <p>
          Manage your projects, track your submissions, and explore what the
          Increnity community is building.
        </p>
      </div>

      <div className="stats">
        <div className="card">
          <h2>{myProjects.length}</h2>
          <p>My Projects</p>
        </div>

        <div className="card">
          <h2>{communityProjects.length}</h2>
          <p>Approved Community Projects</p>
        </div>

        <div className="card">
          <h2>{user?.role || "user"}</h2>
          <p>Account Role</p>
        </div>
      </div>

      <div className="project-section">
        <h2>My Recent Projects</h2>

        <div className="project-grid">
          {myProjects.slice(0, 3).map((project) => (
            <div key={project._id} className="project-card">
              {project.image && (
                <img src={project.image} alt={project.title} />
              )}

              <h3>{project.title}</h3>
              <p>{project.description}</p>

              <strong>Status: {project.status}</strong>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}

export default Dashboard;