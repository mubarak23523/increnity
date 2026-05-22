import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function AdminLayout({ children }) {
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <div className="dashboard-content">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;