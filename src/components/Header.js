// src/components/Header.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DrawerMenu from "./DrawerMenu";
import '../App.css';

function Header({ onLogout = () => {} }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    onLogout();
    navigate('/');
  };

  return (
    <header style={styles.header}>
      <div style={styles.leftSection}>
        <button onClick={toggleDrawer} style={styles.menuButton}>☰</button>
        <span style={styles.logo}>🏢 Company Management</span>
      </div>

      <div style={styles.rightSection}>
        <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
      </div>

      {isOpen && <DrawerMenu closeDrawer={() => setIsOpen(false)} />}
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: "#0f172a", // dark blue-gray
    color: "#fff",
    padding: "12px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  leftSection: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  menuButton: {
    fontSize: "24px",
    background: "none",
    border: "none",
    color: "white",
    cursor: "pointer",
    padding: "6px 10px",
    transition: "background 0.3s",
  },
  logo: {
    fontSize: "20px",
    fontWeight: "bold",
    letterSpacing: "0.5px",
    color: "#e2e8f0",
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
  },
  logoutBtn: {
    padding: "8px 16px",
    backgroundColor: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px",
    transition: "background 0.3s ease",
  },
};

export default Header;
