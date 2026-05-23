import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Public.css";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
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
  const response = await axios.post(
    "https://increnity.onrender.com/api/users/register",
    formData
  );

  toast.success(response.data.message);

  navigate("/verify-otp", {
    state: {
      email: formData.email,
    },
  });
} catch (error) {
  toast.error(
    error.response?.data?.message ||
    "Registration failed"
  );
}
  };

  return (
    <div className="login-page">

      <div className="login-info">

        <Link to="/" className="back-home">
          ← Back to Increnity
        </Link>

        <span className="badge">
          Join Community
        </span>

        <h1>
          Build, Share & Collaborate On Creative Projects
        </h1>

        <p>
          Join the Increnity community platform to upload
          projects, share ideas and collaborate with creators.
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="login-card"
      >

        <h2>Create Account</h2>

        <p>
          Start your creator journey with Increnity.
        </p>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">
          Create Account
        </button>

      </form>

    </div>
  );
}

export default Register;