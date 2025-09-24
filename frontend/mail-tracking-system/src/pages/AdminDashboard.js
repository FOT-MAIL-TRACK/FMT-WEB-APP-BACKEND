import React from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import RealNavBar from "../components/realNavBar";
import NavBar from "../components/NavBar";
import Footer from "../components/footer";
import "./AdminDashboard.css"; 

const AdminDashboard = () => {
  return (
    <>
      <RealNavBar />
      <div style={{ marginTop: "100px" }}>
        <NavBar />
      </div>

      <div className="letter-content">
        <Link to="/admin/users" className="letter-card">
          <h2>Manage Users</h2>
          <p>View and manage all system users.</p>
        </Link>

        <Link to="/admin/letters" className="letter-card">
          <h2>Manage Letters</h2>
          <p>Track, monitor, and manage internal & external letters.</p>
        </Link>
      </div>

      <Footer />
    </>
  );
};

export default AdminDashboard;
