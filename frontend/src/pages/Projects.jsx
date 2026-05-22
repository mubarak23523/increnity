import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../layouts/AdminLayout";
import "./Dashboard.css";
import { toast } from "react-toastify";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const fetchProjects = async () => {
    try {
      const response = await axios.get("https://increnity.onrender.com/api/projects");
      setProjects(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load projects");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `https://increnity.onrender.com/api/projects/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(`Project ${status}`);
      fetchProjects();
    } catch (error) {
      console.log(error);
      toast.error("Status update failed");
    }
  };

  const openDeleteModal = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteId(null);
    setShowDeleteModal(false);
  };

  const confirmDeleteProject = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`https://increnity.onrender.com/api/projects/${deleteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Project Deleted Successfully");
      fetchProjects();
      closeDeleteModal();
    } catch (error) {
      console.log(error);
      toast.error("Delete failed");
    }
  };

  return (
    <AdminLayout>
      <h1>Project Moderation</h1>

      <div className="project-section">
        <h2>Community Project Submissions</h2>

        <div className="project-grid">
          {projects.map((project) => (
            <div key={project._id} className="project-card">
              {project.image && (
                <img src={project.image} alt={project.title} />
              )}

              <h3>{project.title}</h3>

              <p>{project.description}</p>

              <strong>{project.category}</strong>

              <p
                style={{
                  marginTop: "12px",
                  color: "#64748b",
                  fontWeight: "600",
                }}
              >
                Creator: {project.user?.name || "Unknown"}
              </p>

              <div
                style={{
                  marginTop: "10px",
                  fontWeight: "800",
                  color:
                    project.status === "approved"
                      ? "#16a34a"
                      : project.status === "rejected"
                      ? "#dc2626"
                      : "#f59e0b",
                }}
              >
                Status: {project.status}
              </div>

              <div className="card-actions">
                <button
                  onClick={() => updateStatus(project._id, "approved")}
                  className="edit-btn"
                >
                  Approve
                </button>

                <button
                  onClick={() => updateStatus(project._id, "rejected")}
                  className="delete-btn"
                >
                  Reject
                </button>

                <button
                  onClick={() => openDeleteModal(project._id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="delete-modal">
            <h2>Delete Project?</h2>

            <p>
              This action cannot be undone. Are you sure you want to delete this
              project?
            </p>

            <div className="modal-actions">
              <button onClick={closeDeleteModal} className="modal-cancel">
                Cancel
              </button>

              <button onClick={confirmDeleteProject} className="modal-delete">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default Projects;