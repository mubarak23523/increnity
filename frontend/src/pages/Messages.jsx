import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../layouts/AdminLayout";
import "./Dashboard.css";
import { toast } from "react-toastify";
function Messages() {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get("http://localhost:5000/api/messages", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessages(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleMessageDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:5000/api/messages/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Message Deleted Successfully");
      fetchMessages();
    } catch (error) {
      console.log(error);
      toast.error("Message Deleting failed");
    }
  };

  return (
    <AdminLayout>
      <h1>Messages</h1>

      <div className="project-section">
        <div className="project-grid">
          {messages.map((msg) => (
            <div key={msg._id} className="project-card">
              <h3>{msg.name}</h3>
              <p>{msg.email}</p>
              <strong>{msg.subject}</strong>
              <p>{msg.message}</p>

              <button onClick={() => handleMessageDelete(msg._id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}

export default Messages;