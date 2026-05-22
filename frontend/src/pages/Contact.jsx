import { useState } from "react";
import axios from "axios";
import PublicNavbar from "../components/PublicNavbar";
import "./Public.css";
import { toast } from "react-toastify";
function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await axios.post(
        "https://increnity.onrender.com/api/messages",
        formData
      );

      toast.success("Message Send Successfully");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

    } catch (error) {

      console.log(error);

      toast.error("Message action failed");

    }
  };

  return (
    <>
      <PublicNavbar />

      <main className="contact-page">

        <section className="contact-left">

          <span className="badge">
            Contact Increnity
          </span>

          <h1>
            Let’s Build Something Creative Together
          </h1>

          <p>
            Reach out to discuss websites, dashboards,
            creative branding, startup platforms,
            and digital solutions for your business.
          </p>

          <div className="contact-info">

            <div>
              <h3>Email</h3>
              <p>hello@increnity.com</p>
            </div>

            <div>
              <h3>Location</h3>
              <p>India</p>
            </div>

          </div>

        </section>

        <form
          onSubmit={handleSubmit}
          className="contact-form"
        >

          <h2>Send Message</h2>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
          />

          <textarea
            name="message"
            placeholder="Write your message..."
            value={formData.message}
            onChange={handleChange}
          />

          <button type="submit">
            Send Message
          </button>

        </form>

      </main>
    </>
  );
}

export default Contact;