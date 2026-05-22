import "./CreatorStudio.css";

function CreatorStudio() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="creator-studio">
      <div className="creator-hero">
        <div>
          <span className="creator-badge">Creator Studio</span>
          <h1>Welcome, {user?.name || "Creator"} 👋</h1>
          <p>Manage your profile, projects, activity, and creative growth.</p>
        </div>

        <button className="upload-btn">Upload Project</button>
      </div>

      <div className="studio-grid">
        <div className="profile-card">
          <div className="avatar">{user?.name?.charAt(0) || "C"}</div>
          <h2>{user?.name || "Creator Name"}</h2>
          <p>{user?.email}</p>
          <span>Rising Creator</span>
        </div>

        <div className="stat-card">
          <h3>Projects</h3>
          <h2>0</h2>
          <p>Total uploads</p>
        </div>

        <div className="stat-card">
          <h3>Profile Views</h3>
          <h2>128</h2>
          <p>This month</p>
        </div>

        <div className="stat-card">
          <h3>Reach</h3>
          <h2>2.4K</h2>
          <p>Community impact</p>
        </div>
      </div>

      <div className="studio-section">
        <h2>Quick Actions</h2>

        <div className="action-grid">
          <button>Edit Profile</button>
          <button>Add Portfolio</button>
          <button>View Public Page</button>
          <button>Account Settings</button>
        </div>
      </div>

      <div className="studio-section">
        <h2>Recent Activity</h2>

        <div className="activity-list">
          <p>✨ Account created successfully</p>
          <p>🚀 Creator Studio unlocked</p>
          <p>📌 Ready to upload your first project</p>
        </div>
      </div>
    </div>
  );
}

export default CreatorStudio;