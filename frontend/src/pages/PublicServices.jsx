import { useEffect, useState } from "react";
import axios from "axios";
import PublicNavbar from "../components/PublicNavbar";
import "./Public.css";

function PublicServices() {
  const [services, setServices] = useState([]);

  const fetchServices = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/services"
      );

      setServices(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <>
      <PublicNavbar />

      <main className="public-services">

        <section className="services-header">

          <span className="badge">Services</span>

          <h1>
            Creative Digital Services For Modern Businesses
          </h1>

          <p>
            Increnity helps startups and brands build modern websites,
            admin systems, dashboards, and digital experiences.
          </p>

        </section>

        <section className="services-grid">

          {services.map((service) => (

            <div key={service._id} className="service-card">

              <div className="service-icon">
                ⚡
              </div>

              <h3>{service.title}</h3>

              <p>{service.description}</p>

            </div>

          ))}

        </section>

      </main>
    </>
  );
}

export default PublicServices;