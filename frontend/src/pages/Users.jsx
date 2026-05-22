import { useEffect, useState } from "react";

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
      .catch((err) => console.log(err));
  }, []);
const deleteUser = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this user?"
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
      alert(data.message);
      setUsers(users.filter((user) => user._id !== id));
    } else {
      alert(data.message);
    }
  } catch (error) {
    alert("Failed to delete user");
  }
};
  return (
    <div className="users-page">
      <div className="users-header">
        <h1>Registered Users</h1>
        <p>View all users who created accounts on Increnity.</p>
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
          <button
            className="delete-user-btn"
            onClick={() => deleteUser(user._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="5">No users found</td>
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