import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../layouts/AdminLayout";
import "./Dashboard.css";
import { toast } from "react-toastify";

function Settings() {

  const [profileData, setProfileData] = useState({
    name: "",
    bio: "",
    profileImage: "",
    github: "",
    linkedin: "",
    website: "",
    skills: "",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const fetchProfile = async () => {
    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "https://increnity.onrender.com/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const user = response.data;

      setProfileData({
        name: user.name || "",
        bio: user.bio || "",
        profileImage: user.profileImage || "",
        github: user.github || "",
        linkedin: user.linkedin || "",
        website: user.website || "",
        skills: user.skills?.join(", ") || "",
      });

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      await axios.put(
        "https://increnity.onrender.com/api/users/profile",
        {
          ...profileData,
          skills: profileData.skills
            .split(",")
            .map((skill) => skill.trim()),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Profile updated successfully");

    } catch (error) {

      toast.error("Profile update failed");

    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      const response = await axios.put(
        "https://increnity.onrender.com/api/users/change-password",
        passwordData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message);

      setPasswordData({
        oldPassword: "",
        newPassword: "",
      });

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Password update failed"
      );

    }
  };

  return (
    <AdminLayout>

      <h1>Creator Settings</h1>

      <form
        onSubmit={handleProfileSubmit}
        className="project-form"
      >

        <h2>Profile Information</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={profileData.name}
          onChange={handleProfileChange}
        />

        <textarea
          name="bio"
          placeholder="Short Bio"
          value={profileData.bio}
          onChange={handleProfileChange}
        />

        <input
          type="text"
          name="profileImage"
          placeholder="Profile Image URL"
          value={profileData.profileImage}
          onChange={handleProfileChange}
        />

        <input
          type="text"
          name="github"
          placeholder="Github Profile"
          value={profileData.github}
          onChange={handleProfileChange}
        />

        <input
          type="text"
          name="linkedin"
          placeholder="LinkedIn Profile"
          value={profileData.linkedin}
          onChange={handleProfileChange}
        />

        <input
          type="text"
          name="website"
          placeholder="Portfolio Website"
          value={profileData.website}
          onChange={handleProfileChange}
        />

        <input
          type="text"
          name="skills"
          placeholder="Skills (React, UI Design, Node.js)"
          value={profileData.skills}
          onChange={handleProfileChange}
        />

        <button type="submit">
          Save Profile
        </button>

      </form>

      <form
        onSubmit={handlePasswordSubmit}
        className="project-form"
      >

        <h2>Change Password</h2>

        <input
          type="password"
          name="oldPassword"
          placeholder="Current Password"
          value={passwordData.oldPassword}
          onChange={handlePasswordChange}
        />

        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={passwordData.newPassword}
          onChange={handlePasswordChange}
        />

        <button type="submit">
          Change Password
        </button>

      </form>

    </AdminLayout>
  );
}

export default Settings;