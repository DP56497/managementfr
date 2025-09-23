// src/components/Sidebar.jsx (Ensure consistency in paths and roles)

import React from 'react';
import { Link } from "react-router-dom";
import '../App.css';

function DrawerMenu({ closeDrawer }) {
   

    return (
       <div style={styles.drawer}>
      <button onClick={closeDrawer} style={styles.closeButton}>
        ×
      </button>
      <ul style={styles.menuList}>
          <li style={styles.menuItem}>
          <Link to="/dashboard" style={styles.link}>
            <i className="fas fa-tachometer-alt" style={styles.icon}></i> Dashboard
          </Link>
        </li>
        <li style={styles.menuItem}>
          <Link to="/Management-work" style={styles.link}>
            <i className="fas fa-tachometer-alt" style={styles.icon}></i> Management-work
          </Link>
        </li>
        <li style={styles.menuItem}>
          <Link to="/Staff-Work" style={styles.link}>
            <i className="fas fa-box" style={styles.icon}></i> Satff Work
          </Link>
        </li>
        <li style={styles.menuItem}>
          <Link to="/Staff-Salary" style={styles.link}>
            <i className="fas fa-cog" style={styles.icon}></i> Staff Salary
          </Link>
        </li>
       
         
           <li style={styles.menuItem}>
          <Link to="/Admin-Work" style={styles.link}>
            <i className="fas fa-cog" style={styles.icon}></i> Admin-Work
          </Link>
        </li>
           <li style={styles.menuItem}>
          <Link to="/OwnerProfile" style={styles.link}>
            <i className="fas fa-cog" style={styles.icon}></i> OwnerProfile
          </Link>
        </li>
        
      </ul>
    </div>
    )
}


const styles = {
  drawer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "260px",
    height: "100vh",
    backgroundColor: "#0f172a", // dark navy blue
    color: "#fff",
    padding: "20px",
    boxShadow: "2px 0 10px rgba(0, 0, 0, 0.2)",
    zIndex: 1000,
    display: "flex",
    flexDirection: "column",
  },
  closeButton: {
    fontSize: "24px",
    border: "none",
    background: "none",
    color: "#94a3b8", // slate gray
    alignSelf: "flex-end",
    cursor: "pointer",
    marginBottom: "10px",
    transition: "color 0.3s ease",
  },
  menuList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    flex: 1,
  },
  menuItem: {
    padding: "12px 16px",
    borderRadius: "6px",
    marginBottom: "8px",
    transition: "background-color 0.3s",
  },
  link: {
    textDecoration: "none",
    color: "#e2e8f0", // light slate
    display: "flex",
    alignItems: "center",
    fontWeight: "500",
    fontSize: "15px",
  },
  icon: {
    marginRight: "12px",
    color: "#38bdf8", // cyan highlight for icons
    minWidth: "20px",
  },
};




export default DrawerMenu;