import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://increnity.onrender.com/api/users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch(() => toast.error("Failed to load users"));
  }, []);

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this user?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `https://increnity.onrender.com/api/users/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "User removed successfully");
        setUsers(users.filter((user) => user._id !== id));
      } else {
        toast.error(data.message || "Failed to remove user");
      }
    } catch (error) {
      toast.error("Failed to remove user");
    }
  };

  return (
    <div className="users-page">
      <div className="users-header">
        <h1>Community Members</h1>
        <p>Manage and monitor creator accounts inside the platform.</p>
      </div>

      <div className="users-card">
        <div className="table-wrapper">
          <table className="users-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
                <th>Verified</th>
              </tr>
            </thead>

            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.name || "No Name"}</td>
                    <td>{user.email}</td>
                    <td>{user.role || "user"}</td>
                    <td>
  {user.isVerified ? "Verified" : "Not Verified"}
</td>
                    <td>
                      <button
                        className="delete-user-btn"
                        onClick={() => deleteUser(user._id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Users;