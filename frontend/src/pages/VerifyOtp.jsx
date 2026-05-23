import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./Public.css";

function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState(location.state?.email || "");
  const [otp, setOtp] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://increnity.onrender.com/api/users/verify-otp",
        { email, otp }
      );

      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-info">
        <Link to="/" className="back-home">
          ← Back to Increnity
        </Link>

        <span className="badge">Email Verification</span>

        <h1>Verify Your Email</h1>

        <p>
          Enter the 6-digit OTP sent to your email address to activate your account.
        </p>
      </div>

      <form onSubmit={handleVerify} className="login-card">
        <h2>Enter OTP</h2>

        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter OTP"
          maxLength="6"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button type="submit">Verify Account</button>
      </form>
    </div>
  );
}

export default VerifyOtp;