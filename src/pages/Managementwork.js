import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DrawerMenu from "../components/DrawerMenu";
import Header from "../components/Header";
import '../App.css';

function Managementwork() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [staffMembers, setStaffMembers] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [description, setDescription] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
    const userCategory = localStorage.getItem("category");
    if (userCategory === "staff") {
      alert("Access Denied: Staff members cannot access this page.");
      navigate("/home");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await fetch('http://localhost:3050/api/users');
        const data = await response.json();
        const staffOnly = data.filter(user => user.category === 'staff');
        setStaffMembers(staffOnly);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchStaff();
  }, []);

  const openAssignWorkForm = (staff) => {
    setSelectedStaff(staff);
  };

  const closeForm = () => {
    setSelectedStaff(null);
    setDescription("");
    setPdfFile(null);
  };

  const handleSubmitWork = async () => {
    if (!description || !pdfFile || !selectedStaff) {
      alert("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("staffName", selectedStaff.name);
    formData.append("staffEmail", selectedStaff.email);
    formData.append("description", description);
    formData.append("pdfFile", pdfFile);

    try {
      const response = await fetch("http://localhost:3050/api/assign-work", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      alert(result.message);
      closeForm();
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to assign work.");
    }
  };

  //  Function to open Gmail compose when clicking staff email
  const sendEmailToStaff = (staff) => {
    const subject = encodeURIComponent("Work Notification");
    const body = encodeURIComponent(
      `Hello ${staff.name},\n\nPlease check the portal for new work updates.`
    );
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${staff.email}&su=${subject}&body=${body}`;
    window.open(gmailUrl, "_blank"); // opens Gmail in a new tab
  };

  const tableHeader = {
    padding: "12px 20px",
    textAlign: "left",
    fontWeight: "600",
    borderBottom: "2px solid #ccc",
  };

  const tableCell = {
    padding: "14px 20px",
    borderBottom: "1px solid #e5e7eb",
  };

  return (
    <div style={{ fontFamily: "Segoe UI, sans-serif", backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <Header toggleDrawer={toggleDrawer} title="Orders Page" />
      {drawerOpen && <DrawerMenu closeDrawer={() => setDrawerOpen(false)} />}

      <div style={{ padding: "20px", marginTop: "70px", fontFamily: "Segoe UI, sans-serif" }}>
        <h2 style={{ color: "#1d3557", marginBottom: "20px" }}>Registered Staff Members</h2>

        <div style={{ overflowX: "auto" }}>
          <table style={{
            width: "100%",
            borderCollapse: "separate",
            borderSpacing: "0 10px",
            fontSize: "15px"
          }}>
            <thead>
              <tr style={{ backgroundColor: "#1d3557", color: "white" }}>
                <th style={tableHeader}>Name</th>
                <th style={tableHeader}>Email</th>
              </tr>
            </thead>
            <tbody>
              {staffMembers.map((staff, index) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor: "#f9fafb",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                    transition: "transform 0.2s",
                    cursor: "pointer"
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.005)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                >
                  <td
                    style={{ ...tableCell, color: "#2563eb", fontWeight: "bold" }}
                    onClick={() => openAssignWorkForm(staff)}
                  >
                    {staff.name}
                  </td>
                  <td
                    style={{ ...tableCell, color: "#2563eb", cursor: "pointer" }}
                    onClick={() => sendEmailToStaff(staff)} // ✅ opens Gmail
                  >
                    {staff.email}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedStaff && (
        <div style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "#fefefe",
          padding: "25px",
          zIndex: 1000,
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
          borderRadius: "12px",
          width: "400px",
          fontFamily: "Segoe UI, sans-serif"
        }}>
          <h3 style={{
            marginBottom: "15px",
            color: "#1d3557",
            borderBottom: "2px solid #457b9d",
            paddingBottom: "8px"
          }}>
            Assign Work to: {selectedStaff.name}
          </h3>

          <textarea
            placeholder="Enter work description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              width: "100%",
              height: "80px",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "6px",
              border: "1px solid #cbd5e1",
              fontSize: "14px",
              resize: "none",
              backgroundColor: "#f8fafc"
            }}
          />

          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setPdfFile(e.target.files[0])}
            style={{
              marginBottom: "20px",
              padding: "6px 0",
              fontSize: "14px",
              backgroundColor: "#f8fafc"
            }}
          />

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
            <button
              onClick={handleSubmitWork}
              style={{
                backgroundColor: "#1d3557",
                color: "#fff",
                border: "none",
                padding: "8px 16px",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Submit
            </button>
            <button
              onClick={closeForm}
              style={{
                backgroundColor: "#ccc",
                color: "#333",
                border: "none",
                padding: "8px 16px",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Managementwork;
