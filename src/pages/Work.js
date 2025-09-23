import React, { useState, useEffect } from 'react';
import DrawerMenu from "../components/DrawerMenu";
import Header from "../components/Header";

function Work() {
  const [workList, setWorkList] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const userCategory = localStorage.getItem("category"); 

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  useEffect(() => {
    const fetchWork = async () => {
      try {
        const category = localStorage.getItem("category")?.toLowerCase();
        const email = localStorage.getItem("email")?.toLowerCase().trim();
        const name = localStorage.getItem("name");

        const res = await fetch("http://localhost:3050/api/assigned-work");
        const data = await res.json();

        if (category === "staff") {
          const filtered = data
            .filter(item => item.staffEmail?.toLowerCase().trim() === email)
            .map(item => ({
              ...item,
              staffName: item.staffName || name,
              status: item.status || "Pending"
            }));
          setWorkList(filtered);
        } else {
          const adminData = data.map(item => ({
            ...item,
            status: item.status || "Pending"
          }));
          setWorkList(adminData);
        }
      } catch (err) {
        console.error("Failed to fetch work", err);
      }
    };

    fetchWork();
  }, []);

  const handleFileUpload = async (e, itemId, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("completedPdf", file);

    try {
      const res = await fetch(`http://localhost:3050/api/assigned-work/${itemId}/complete-pdf`, {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (result.completedPdfPath) {
        const updated = [...workList];
        updated[index].completedPdfPath = result.completedPdfPath;
        setWorkList(updated);
      }
    } catch (err) {
      console.error("Failed to upload completed PDF:", err);
    }
  };

  return (
    <div style={{ fontFamily: "Segoe UI, sans-serif", backgroundColor: "#f9fafb", minHeight: "100vh" }}>
      <Header toggleDrawer={toggleDrawer} title="Staff Work" />
      {drawerOpen && <DrawerMenu closeDrawer={() => setDrawerOpen(false)} />}

      <div style={{ padding: "40px", marginTop: "80px" }}>
        <h2 style={{ color: "#1d3557", marginBottom: "25px", fontSize: "24px", fontWeight: "600" }}>
          {userCategory === "staff" ? "📋 My Assigned Work" : "👥 All Staff Work"}
        </h2>





        <div style={{
          overflowX: "auto",
          backgroundColor: "white",
          borderRadius: "12px",
          boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
          border: "1px solid #e5e7eb"
        }}>
          <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0 }}>
            <thead>
              <tr style={{ backgroundColor: "#062d58", color: "white" }}>
                {userCategory !== "staff" && (
                  <>
                    <th style={thStyle}>Name</th>
                    <th style={thStyle}>Email</th>
                  </>
                )}
                <th style={thStyle}>Description</th>
                <th style={thStyle}>Assigned PDF</th>
                {userCategory === "staff" && <th style={thStyle}>Progress</th>}
                {userCategory !== "staff" && (
                  <>
                    <th style={thStyle}>Status</th>
                    <th style={thStyle}>Completed File</th>
                  </>
                )}
                {userCategory === "staff" && <th style={thStyle}>Upload Completed PDF</th>}
              </tr>
            </thead>
            <tbody>
              {workList.length === 0 ? (
                <tr>
                  <td colSpan={userCategory === "staff" ? 4 : 6} style={{ textAlign: "center", padding: "25px", color: "#666" }}>
                    No work found.
                  </td>
                </tr>
              ) : (
                workList.map((item, index) => (
                  <tr key={index} style={index % 2 === 0 ? rowStyle : { ...rowStyle, backgroundColor: "#f9fafb" }}>
                    {userCategory !== "staff" && (
                      <>
                        <td style={tdStyle}>{item.staffName}</td>
                        <td style={tdStyle}>{item.staffEmail}</td>
                      </>
                    )}
                    <td style={tdStyle}>{item.description}</td>
                    <td style={tdStyle}>
                      <a href={`http://localhost:3050${item.pdfPath}`} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                        View PDF
                      </a>
                    </td>
                    {userCategory === "staff" && (
                      <td style={tdStyle}>
                        <span style={badgeStyle(item.status)}>{item.status}</span>
                        <br />
                        <select
                          value={item.status}
                          onChange={e => updateStatus(index, item._id, e.target.value)}
                          style={selectStyle(item.status)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Working">Working</option>
                          <option value="Done">Done</option>
                        </select>
                      </td>
                    )}
                    {userCategory !== "staff" && (
                      <>
                        <td style={{ ...tdStyle, fontWeight: "600", color: statusColor(item.status) }}>
                          {item.status}
                        </td>
                        <td style={tdStyle}>
                          {item.status === "Done" && item.pdfPath ? (
                            <a href={`http://localhost:3050${item.pdfPath}`} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                              View Completed PDF
                            </a>
                          ) : (
                            <span style={{ color: "#999" }}>Not uploaded</span>
                          )}
                        </td>
                      </>
                    )}
                    {userCategory === "staff" && (
                      <td style={tdStyle}>
                        {item.status === "Done" && !item.completedPdfPath ? (
                          <label style={uploadBtnStyle}>
                            Upload PDF
                            <input
                              type="file"
                              accept="application/pdf"
                              style={{ display: "none" }}
                              onChange={e => handleFileUpload(e, item._id, index)}
                            />
                          </label>
                        ) : item.completedPdfPath ? (
                          <span style={{ color: "#16a34a", fontWeight: "600" }}>✔ Uploaded</span>
                        ) : (
                          <span style={{ color: "#999" }}>Upload when Done</span>
                        )}
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  function updateStatus(index, id, newStatus) {
    const updatedList = [...workList];
    updatedList[index].status = newStatus;
    setWorkList(updatedList);

    fetch(`http://localhost:3050/api/assigned-work/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus })
    })
    .then(res => res.json())
    .then(() => {
      fetch("http://localhost:3050/api/stats")
        .then(res => res.json())
        .then(data => {
          localStorage.setItem("dashboardStats", JSON.stringify(data));
          window.dispatchEvent(new Event("statsUpdated"));
        });
    })
    .catch(err => console.error("Failed to update status:", err));
  }

  function selectStyle(status) {
    return {
      padding: "6px 12px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      fontWeight: "500",
      backgroundColor:
        status === "Pending" ? "#fffbea" :
        status === "Working" ? "#e3f2fd" :
        "#e8f5e9",
      color:
        status === "Pending" ? "#92400e" :
        status === "Working" ? "#1e40af" :
        "#166534",
      cursor: "pointer"
    };
  }

  function badgeStyle(status) {
    return {
      display: "inline-block",
      padding: "4px 10px",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: "600",
      marginBottom: "6px",
      backgroundColor:
        status === "Pending" ? "#fff3cd" :
        status === "Working" ? "#e3f2fd" :
        "#d1fae5",
      color:
        status === "Pending" ? "#856404" :
        status === "Working" ? "#1e40af" :
        "#065f46",
    };
  }

  function statusColor(status) {
    return status === "Done" ? "#065f46" : status === "Working" ? "#1e40af" : "#b91c1c";
  }
}

const thStyle = {
  padding: "14px",
  borderBottom: "2px solid #ddd",
  textAlign: "left",
  fontSize: "15px",
  fontWeight: "600"
};

const tdStyle = {
  padding: "14px",
  borderBottom: "1px solid #eee",
  fontSize: "14px",
  color: "#374151"
};

const rowStyle = {
  backgroundColor: "#fff",
  transition: "background 0.2s",
};

const linkStyle = {
  color: "#1d4ed8",
  fontWeight: "500",
  textDecoration: "none"
};

const uploadBtnStyle = {
  display: "inline-block",
  backgroundColor: "#2563eb",
  color: "#fff",
  padding: "6px 14px",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "13px",
  fontWeight: "500",
  transition: "background 0.2s"
};

export default Work;
