import React, { useState, useEffect } from "react";
import DrawerMenu from "../components/DrawerMenu";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

function AdminWork() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [assignedWork, setAssignedWork] = useState([]);
  const navigate = useNavigate();

  const userCategory = localStorage.getItem("category");

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  //  Staff block
  useEffect(() => {
    if (userCategory === "staff") {
      alert("Access Denied: Staff cannot access this page.");
      navigate("/Staff-Work");
    }
  }, [navigate, userCategory]);

  //  Fetch work
  useEffect(() => {
    const fetchWork = async () => {
      try {
        const category = localStorage
          .getItem("category")
          ?.toLowerCase()
          .trim();
        const email = localStorage.getItem("email")?.toLowerCase().trim();
        const name = localStorage.getItem("name");

        const res = await fetch(
          "http://localhost:3050/api/admin-assigned-work/admin"
        );
        const data = await res.json();

        if (category === "admin manager") {
          const filteredWork = data.filter(
            (work) => work?.adminmanagerEmail?.toLowerCase().trim() === email
          );
          const filledData = filteredWork.map((work) => ({
            ...work,
            adminmanagerName: work.adminmanagerName || name,
            adminmanagerEmail: work.adminmanagerEmail || email,
            status: work.status || "Pending",
          }));
          setAssignedWork(filledData);
        } else {
          const allData = data.map((work) => ({
            ...work,
            adminmanagerName: work.adminmanagerName || "N/A",
            adminmanagerEmail: work.adminmanagerEmail || "N/A",
            status: work.status || "Pending",
          }));
          setAssignedWork(allData);
        }
      } catch (error) {
        console.error("Failed to fetch work:", error);
        setAssignedWork([]);
      }
    };

    fetchWork();
  }, []);

  // ✅ Updated: Same style as Work page
  // ✅ Status update (optimized: only update that work item in state)
const handleStatusChange = async (index, id, newStatus) => {
  try {
    // Optimistic update
    setAssignedWork(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], status: newStatus };
      return updated;
    });

    const res = await fetch(`http://localhost:3050/api/adminwork/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!res.ok) throw new Error("Failed to update status");

    // ✅ Only refresh stats once (not entire list again)
    const statsRes = await fetch("http://localhost:3050/api/stats");
    const statsData = await statsRes.json();
    localStorage.setItem("dashboardStats", JSON.stringify(statsData));
    window.dispatchEvent(new Event("statsUpdated"));
  } catch (err) {
    console.error("Failed to update status:", err);
  }
};

// ✅ File re-upload (optimized: update only that file, no full remap)
const handleFileUpload = async (id, file, index) => {
  if (!file) return;

  const formData = new FormData();
  formData.append("completedPdf", file);

  try {
    const res = await fetch(`http://localhost:3050/api/reupload/${id}`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Re-upload failed");

    const updated = await res.json();

    // Update only that item instead of mapping all
    setAssignedWork(prev => {
      const updatedList = [...prev];
      updatedList[index] = { ...updatedList[index], pdf: updated.pdf };
      return updatedList;
    });
  } catch (err) {
    console.error("Failed to upload file:", err);
  }
};


  //  Status color function
  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return { color: "#d9534f", fontWeight: "600" };
      case "Progressing":
        return { color: "#f0ad4e", fontWeight: "600" };
      case "Done":
        return { color: "#5cb85c", fontWeight: "600" };
      default:
        return { color: "#333" };
    }
  };

  return (
    <div
      style={{
        fontFamily: "Segoe UI, sans-serif",
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
      }}
    >
      <Header toggleDrawer={toggleDrawer} title="Admin Work" />
      {drawerOpen && <DrawerMenu closeDrawer={() => setDrawerOpen(false)} />}

      <div style={styles.container}>
        <h2 style={styles.heading}>
          {userCategory === "owner" ? "All Assigned Work" : "My Assigned Work"}
        </h2>

        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                {userCategory === "owner" && (
                  <>
                    <th style={styles.th}>Name</th>
                    <th style={styles.th}>Email</th>
                  </>
                )}
                <th style={styles.th}>Description</th>
                <th style={styles.th}>Work PDF</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {assignedWork.length === 0 ? (
                <tr>
                  <td
                    colSpan={userCategory === "owner" ? 5 : 3}
                    style={styles.emptyRow}
                  >
                    No work assigned yet.
                  </td>
                </tr>
              ) : (
                assignedWork.map((work, index) => (
                  <tr key={work._id || index} style={styles.tr}>
                    {userCategory === "owner" && (
                      <>
                        <td style={styles.td}>{work.adminmanagerName}</td>
                        <td style={styles.td}>{work.adminmanagerEmail}</td>
                      </>
                    )}
                    <td style={styles.td}>{work.description}</td>
                    <td style={styles.td}>
                      {work.pdf ? (
                        <a
                          href={`http://localhost:3050/admin-uploads/${work.pdf}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={styles.link}
                        >
                          View PDF
                        </a>
                      ) : (
                        <span style={{ color: "#888" }}>No File</span>
                      )}
                    </td>

                    {/* ✅ Fixed: use index in handleStatusChange */}
                    <td style={styles.td}>
                      {userCategory === "admin manager" ? (
                        <>
                          <div style={getStatusStyle(work.status)}>
                            <select
                              value={work.status || "Pending"}
                              onChange={(e) =>
                                handleStatusChange(index, work._id, e.target.value)
                              }
                              style={{
                                ...getStatusStyle(work.status),
                                padding: "4px",
                                borderRadius: "4px",
                                border: "1px solid #ccc",
                                fontWeight: "600",
                              }}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Progressing">Progressing</option>
                              <option value="Done">Done</option>
                            </select>
                          </div>

                          {work.status === "Done" && (
                            <input
                              type="file"
                              accept="application/pdf"
                              onChange={(e) =>
                                handleFileUpload(
                                  work._id,
                                  e.target.files[0],
                                  index
                                )
                              }
                              style={{ marginTop: "8px" }}
                            />
                          )}
                        </>
                      ) : (
                        <span style={getStatusStyle(work.status)}>
                          {work.status || "Pending"}
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    marginTop: "80px",
    fontFamily: "'Segoe UI', sans-serif",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#062d58",
    borderBottom: "2px solid #ccc",
    paddingBottom: "10px",
  },
  tableWrapper: {
    overflowX: "auto",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    backgroundColor: "#062d58",
    color: "#fff",
    padding: "12px 16px",
    textAlign: "left",
    fontWeight: "600",
    fontSize: "15px",
  },
  td: {
    padding: "12px 16px",
    borderBottom: "1px solid #eee",
    fontSize: "14px",
    color: "#333",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
    fontWeight: "500",
  },
  tr: {
    transition: "background-color 0.3s",
  },
  emptyRow: {
    textAlign: "center",
    padding: "20px",
    fontStyle: "italic",
    color: "#666",
    background: "#fafafa",
  },
};

export default AdminWork;
