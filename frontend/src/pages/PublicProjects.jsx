import { useEffect, useState } from "react";
import axios from "axios";
import PublicNavbar from "../components/PublicNavbar";
import "./Public.css";

function PublicProjects() {

  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {

      const response = await axios.get(
        "https://increnity.onrender.com/api/projects"
      );

      setProjects(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      <PublicNavbar />

      <main className="public-projects">

        <section className="projects-header">

          <span className="badge">
            Community Projects
          </span>

          <h1>
            Explore Creative Projects Shared By Developers And Designers
          </h1>

          <p>
            Discover innovative applications, websites, UI systems and digital
            experiences created by the Increnity community.
          </p>

        </section>

        <section className="public-project-grid">

          {projects.map((project) => (

            <div
              key={project._id}
              className="public-project-card"
            >

              <img
                src={project.image}
                alt={project.title}
              />

              <div className="project-content">

                <span>{project.category}</span>

                <h3>{project.title}</h3>

                <p>{project.description}</p>

                <div
                  style={{
                    marginTop: "18px",
                    marginBottom: "18px",
                    color: "#64748b",
                    fontWeight: "600",
                  }}
                >
                  Created by{" "}
                  {project.user?.username || "Community User"}
                </div>

                <div className="project-buttons">

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Github
                    </a>
                  )}

                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="live-btn"
                    >
                      View Project
                    </a>
                  )}

                </div>

              </div>

            </div>

          ))}

        </section>

      </main>
    </>
  );
}

export default PublicProjects;