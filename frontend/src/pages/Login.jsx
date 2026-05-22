import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Public.css";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
    "https://increnity.onrender.com/api/users/login",
    formData
  );

  localStorage.setItem("token", response.data.token);

  toast.success("Login Successful");

  navigate("/dashboard");

} catch (error) {

  toast.error(
    error.response?.data?.message || "Login failed"
  );

}
  };

  return (
    <div className="login-page">
      <div className="login-info">
        <Link to="/" className="back-home">
          ← Back to Increnity
        </Link>

        <span className="badge">Admin Access</span>

        <h1>Manage Your Creative Studio</h1>

        <p>
          Login to control projects, services, messages and website content
          through the Increnity admin dashboard.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="login-card">
        <h2>Welcome Back</h2>
        <p>Enter your admin credentials to continue.</p>

        <input
          type="email"
          name="email"
          placeholder="Admin email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Admin password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">Login Dashboard</button>
      </form>
    </div>
  );
}

export default Login;