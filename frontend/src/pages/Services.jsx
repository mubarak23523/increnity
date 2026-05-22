import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../layouts/AdminLayout";
import "./Dashboard.css";
import { toast } from "react-toastify";
function Services() {
  const [services, setServices] = useState([]);
  const [serviceEditId, setServiceEditId] = useState(null);

  const [serviceForm, setServiceForm] = useState({
    title: "",
    description: "",
    icon: "",
  });

  const fetchServices = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/services");
      setServices(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleServiceChange = (e) => {
    setServiceForm({
      ...serviceForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleServiceSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (serviceEditId) {
        await axios.put(
          `http://localhost:5000/api/services/${serviceEditId}`,
          serviceForm,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("Service Updated Successfully");
        setServiceEditId(null);
      } else {
        await axios.post("http://localhost:5000/api/services", serviceForm, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        toast.success("Service Updated Successfully");
      }

      fetchServices();

      setServiceForm({
        title: "",
        description: "",
        icon: "",
      });
    } catch (error) {
      console.log(error);
      toast.error("Service action failed");
    }
  };

  const handleServiceEdit = (service) => {
    setServiceForm({
      title: service.title,
      description: service.description,
      icon: service.icon,
    });

    setServiceEditId(service._id);
  };

  const handleServiceDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:5000/api/services/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Service Deleted");
      fetchServices();
    } catch (error) {
      console.log(error);
      alert("Service delete failed");
    }
  };

  return (
    <AdminLayout>
      <h1>Services Management</h1>

      <form onSubmit={handleServiceSubmit} className="project-form">
        <h2>{serviceEditId ? "Edit Service" : "Add Service"}</h2>

        <input
          type="text"
          name="title"
          placeholder="Service Title"
          value={serviceForm.title}
          onChange={handleServiceChange}
        />

        <textarea
          name="description"
          placeholder="Service Description"
          value={serviceForm.description}
          onChange={handleServiceChange}
        />

        <input
          type="text"
          name="icon"
          placeholder="Icon Name"
          value={serviceForm.icon}
          onChange={handleServiceChange}
        />

        <button type="submit">
          {serviceEditId ? "Update Service" : "Add Service"}
        </button>
      </form>

      <div className="project-section">
        <h2>Services</h2>

        <div className="project-grid">
          {services.map((service) => (
            <div key={service._id} className="project-card">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <strong>{service.icon}</strong>

              <div style={{ marginTop: "15px" }}>
                <button
                  onClick={() => handleServiceEdit(service)}
                  style={{
                    marginRight: "10px",
                    background: "#2563eb",
                    color: "white",
                    border: "none",
                    padding: "10px 15px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>

                <button onClick={() => handleServiceDelete(service._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}

export default Services;