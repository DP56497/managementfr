import React, { useState, useEffect } from 'react';
import DrawerMenu from "../components/DrawerMenu";
import Header from "../components/Header";
import '../App.css';

function OwnerProfile() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [adminManagers, setAdminManagers] = useState([]);
  const [selectedAdminManager, setSelectedAdminManager] = useState(null);
  const [description, setDescription] = useState('');
  const [pdfFile, setPdfFile] = useState(null);

  const userCategory = localStorage.getItem('category');
  const ownerName = localStorage.getItem('name');
  const ownerEmail = localStorage.getItem('email');

  useEffect(() => {
    if (userCategory !== 'owner') {
      alert("Access Denied: Staff/Admin Manager cannot access this page.");
      window.location.href = '/home';
    }
  }, [userCategory]);

  useEffect(() => {
    const fetchAdminManagers = async () => {
      try {
        const response = await fetch("https://managementba-yq52.onrender.com/api/users");
        const data = await response.json();
        const adminOnly = data.filter(user => user.category === "Admin manager");
        setAdminManagers(adminOnly);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchAdminManagers();
  }, []);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const openAssignWorkForm = (adminManager) => setSelectedAdminManager(adminManager);
  const closeForm = () => {
    setSelectedAdminManager(null);
    setDescription('');
    setPdfFile(null);
  };

  const handleAssignWork = async () => {
    if (!description || !pdfFile || !selectedAdminManager) {
      return alert("All fields required.");
    }

    const formData = new FormData();
    formData.append("adminmanagerName", selectedAdminManager.name);
    formData.append("adminmanagerEmail", selectedAdminManager.email);
    formData.append("description", description);
    formData.append("pdf", pdfFile);

    try {
      const response = await fetch("https://managementba-yq52.onrender.com/api/admin-assigned-work", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      alert(result.message);
      closeForm();
    } catch (error) {
      console.log("Upload error: ", error);
      alert("Failed to assign work");
    }
  };

  return (
    <div style={styles.page}>
      <Header toggleDrawer={toggleDrawer} title="Owner Profile" />
      {drawerOpen && <DrawerMenu closeDrawer={() => setDrawerOpen(false)} />}

      <div style={styles.container}>
        {/* Owner Info Card */}
        <div style={styles.profileCard}>
          <h2 style={styles.heading}>Owner Profile</h2>
          <p style={styles.profileText}><strong>Name:</strong> {ownerName}</p>
          <p style={styles.profileText}><strong>Email:</strong> {ownerEmail}</p>
        </div>

        {/* Admin Managers Table */}
        <h3 style={styles.subHeading}>Admin Managers</h3>
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
              </tr>
            </thead>
            <tbody>
              {adminManagers.map(admin => (
                <tr key={admin.email} style={styles.row}>
                  <td
                    style={styles.clickableCell}
                    onClick={() => openAssignWorkForm(admin)}
                  >
                    {admin.name || 'Unnamed'}
                  </td>
                  <td style={styles.td}>{admin.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selectedAdminManager && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <button onClick={closeForm} style={styles.closeButton}>&times;</button>
            <h3 style={styles.modalHeading}>
              Assign Work to <span style={{ color: "#1d3557" }}>{selectedAdminManager.name}</span>
            </h3>

            <textarea
              placeholder="Work Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={styles.textarea}
            />

            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setPdfFile(e.target.files[0])}
              style={styles.fileInput}
            />

            <div style={styles.modalActions}>
              <button onClick={handleAssignWork} style={styles.submitButton}>
                Submit
              </button>
              <button onClick={closeForm} style={styles.cancelButton}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "Segoe UI, sans-serif",
    backgroundColor: "#f4f6f9",
    minHeight: "100vh",
  },
  container: {
    padding: "30px",
    marginTop: "80px",
  },
  profileCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    marginBottom: "30px",
  },
  heading: {
    fontSize: "22px",
    color: "#1d3557",
    marginBottom: "15px",
    borderBottom: "2px solid #eee",
    paddingBottom: "8px",
  },
  profileText: {
    fontSize: "15px",
    color: "#333",
    marginBottom: "8px",
  },
  subHeading: {
    fontSize: "20px",
    color: "#1d3557",
    marginBottom: "15px",
  },
  tableWrapper: {
    overflowX: "auto",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    padding: "14px",
    backgroundColor: "#1d3557",
    color: "#fff",
    fontWeight: 600,
    textAlign: "left",
    fontSize: "15px",
  },
  td: {
    padding: "14px",
    borderBottom: "1px solid #f0f0f0",
    fontSize: "14px",
    color: "#333",
  },
  row: {
    transition: "background 0.2s",
  },
  clickableCell: {
    padding: "14px",
    color: "#007bff",
    cursor: "pointer",
    fontWeight: 500,
  },
  modalOverlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
    width: "420px",
    position: "relative",
    animation: "fadeIn 0.3s ease",
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'transparent',
    border: 'none',
    fontSize: '22px',
    cursor: 'pointer',
    color: "#555",
  },
  modalHeading: {
    marginBottom: '15px',
    color: "#1d3557",
    fontSize: "18px",
  },
  textarea: {
    width: '100%',
    height: '90px',
    marginBottom: '15px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    resize: 'none',
    fontSize: "14px",
  },
  fileInput: {
    marginBottom: "20px",
  },
  modalActions: {
    textAlign: 'right',
  },
  submitButton: {
    padding: '10px 18px',
    backgroundColor: '#1d3557',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginRight: '10px',
    transition: "background 0.2s",
  },
  cancelButton: {
    padding: '10px 18px',
    backgroundColor: '#ccc',
    color: '#333',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default OwnerProfile;
