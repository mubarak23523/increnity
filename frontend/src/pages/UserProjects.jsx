import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../layouts/AdminLayout";
import { toast } from "react-toastify";
import "./Dashboard.css";

function UserProjects() {

  const [uploading, setUploading] = useState(false);  

  const [projects, setProjects] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    image: "",
    github: "",
    live: "",
  });

  const fetchProjects = async () => {
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

      setProjects(response.data);

    } catch (error) {

      console.log(error);

      toast.error("Failed to load projects");

    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      await axios.post(
        "https://increnity.onrender.com/api/projects",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Project Submitted");

      setFormData({
        title: "",
        description: "",
        category: "",
        image: "",
        github: "",
        live: "",
      });

      fetchProjects();

    } catch (error) {

      console.log(error);

      toast.error("Submission failed");

    }
  };

  return (
    <AdminLayout>

      <h1>My Projects</h1>

      <form
        onSubmit={handleSubmit}
        className="project-form"
      >

        <h2>Submit New Project</h2>

        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={formData.title}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Project Description"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />

      <div style={{ marginTop: "18px" }}>

  <label
    style={{
      fontWeight: "700",
      display: "block",
      marginBottom: "10px",
    }}
  >
    Upload Project Image
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={async (e) => {

      const file = e.target.files[0];

      if (!file) return;

      try {

        setUploading(true);

        const uploadData = new FormData();

        uploadData.append("image", file);

        const response = await axios.post(
          "https://increnity.onrender.com/api/upload",
          uploadData
        );

        setFormData({
          ...formData,
          image: response.data.imageUrl,
        });

        toast.success("Image Uploaded");

      } catch (error) {

        console.log(error);

        toast.error("Image upload failed");

      } finally {

        setUploading(false);

      }

    }}
  />

</div>
        <input
          type="text"
          name="github"
          placeholder="Github Link"
          value={formData.github}
          onChange={handleChange}
        />

        <input
          type="text"
          name="live"
          placeholder="Live Demo Link"
          value={formData.live}
          onChange={handleChange}
        />
        {formData.image && (
  <img
    src={formData.image}
    alt="preview"
    style={{
      width: "100%",
      height: "220px",
      objectFit: "cover",
      borderRadius: "18px",
      marginTop: "20px",
    }}
  />
)}

       <button
  type="submit"
  disabled={uploading}
>
  {uploading
    ? "Uploading..."
    : "Submit Project"}
</button>
      </form>

      <div className="project-section">

        <h2>My Submitted Projects</h2>

        <div className="project-grid">

          {projects.map((project) => (

            <div
              key={project._id}
              className="project-card"
            >

              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                />
              )}

              <h3>{project.title}</h3>

              <p>{project.description}</p>

              <strong>
                Status: {project.status}
              </strong>

            </div>

          ))}

        </div>

      </div>

    </AdminLayout>
  );
}

export default UserProjects;