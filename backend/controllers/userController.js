const generateToken = require("../config/generateToken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const sendEmail = require("../config/sendEmail");

/* ================= REGISTER USER ================= */
const registerUser = async (req, res) => {
  try {
    const { username, name, email, password } = req.body;

    if (!username || !name || !email || !password) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({
        message: "Please enter a valid email address",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const existingEmail = await User.findOne({ email: cleanEmail });

    if (existingEmail) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const existingUsername = await User.findOne({ username });

    if (existingUsername) {
      return res.status(400).json({
        message: "Username already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    const user = await User.create({
      username,
      name,
      email: cleanEmail,
      password: hashedPassword,
      role: "user",
      isVerified: false,
      verificationOtp: otp,
      verificationOtpExpires: otpExpiry,
    });

    await sendEmail(cleanEmail, otp);

    res.status(201).json({
      message: "OTP sent to your email. Please verify your account.",
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* ================= VERIFY OTP ================= */
const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required",
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    const user = await User.findOne({ email: cleanEmail });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        message: "Account already verified",
      });
    }

    if (
      user.verificationOtp !== otp ||
      user.verificationOtpExpires < Date.now()
    ) {
      return res.status(400).json({
        message: "Invalid or expired OTP",
      });
    }

    user.isVerified = true;
    user.verificationOtp = null;
    user.verificationOtpExpires = null;

    await user.save();

    res.status(200).json({
      message: "Email verified successfully. You can now login.",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* ================= LOGIN USER ================= */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    const user = await User.findOne({ email: cleanEmail });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        message: "Please verify your email before login",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    res.status(200).json({
      message: "Login successful",
      token: generateToken(user._id),
      user: {
        id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* ================= CHANGE PASSWORD ================= */
const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Old password is incorrect",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "New password must be at least 6 characters",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* ================= UPDATE PROFILE ================= */
const updateProfile = async (req, res) => {
  try {
    const {
      name,
      bio,
      profileImage,
      github,
      linkedin,
      website,
      skills,
    } = req.body;

    const user = await User.findById(req.user._id);

    user.name = name || user.name;
    user.bio = bio || user.bio;
    user.profileImage = profileImage || user.profileImage;
    user.github = github || user.github;
    user.linkedin = linkedin || user.linkedin;
    user.website = website || user.website;

    if (skills) {
      user.skills = skills;
    }

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role,
        bio: user.bio,
        profileImage: user.profileImage,
        github: user.github,
        linkedin: user.linkedin,
        website: user.website,
        skills: user.skills,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  verifyOtp,
  loginUser,
  changePassword,
  updateProfile,
};