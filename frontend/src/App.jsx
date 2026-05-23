import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import PublicProjects from "./pages/PublicProjects";
import PublicServices from "./pages/PublicServices";
import Contact from "./pages/Contact";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminRoute from "./components/AdminRoute";
import CreatorHome from "./pages/CreatorHome";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Services from "./pages/Services";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";
import VerifyOtp from "./pages/VerifyOtp";

import UserProjects from "./pages/UserProjects";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/about" element={<About />} />
        <Route path="/projects-public" element={<PublicProjects />} />
        <Route path="/services-public" element={<PublicServices />} />
        <Route path="/contact" element={<Contact />} />
<Route path="/" element={<Home />} />
<Route path="/login" element={<Login />} />
        {/* Auth Routes */}
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route
          path="/dashboard"
          element={
            <AdminRoute>
  <Dashboard />
</AdminRoute>
          }
        />

        <Route
          path="/projects"
          element={
          <AdminRoute>
  <Projects />
</AdminRoute>
          }
        />

        <Route
          path="/services"
          element={
            <AdminRoute>
  <services />
</AdminRoute>
          }
        />

        <Route
          path="/messages"
          element={
            <AdminRoute>
  <messages />
</AdminRoute>
          }
        />

        <Route
          path="/settings"
          element={
           <AdminRoute>
  <Settings />
</AdminRoute>
          }
        />
     
    
<Route
  path="/users"
  element={
<AdminRoute>
  <users />
</AdminRoute>
  }
/>
<Route
  path="/creator-home"
  element={
    <ProtectedRoute>
      <CreatorHome />
    </ProtectedRoute>
  }
/>
  <Route
    path="/my-projects"
    element={
      <ProtectedRoute>
        <UserProjects />
      </ProtectedRoute>
    }
  />
  <Route path="/verify-otp" element={<VerifyOtp />} />
 </Routes>

    </BrowserRouter>
  );
}

export default App;