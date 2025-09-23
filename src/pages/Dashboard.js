import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DrawerMenu from "../components/DrawerMenu";
import Header from "../components/Header";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from "recharts";
import "../App.css";

function Dashboard() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [stats, setStats] = useState({
    totalStaff: 0,
    adminManagers: 0,
    staffTasks: 0,
    adminTasks: 0,
    completedadminTasks: 0,
    completedStaffTasks: 0,
  });

  const [monthlyData, setMonthlyData] = useState([]);
  const [dailyData, setDailyData] = useState([]);
  const [yearlyData, setYearlyData] = useState([]);
  const [liveData, setLiveData] = useState([]);

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

  // Fetch Quick Stats data
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:3050/api/stats");
        const data = await res.json();
        setStats({
          totalStaff: data.totalStaff || 0,
          adminManagers: data.adminManagers || 0,
          staffTasks: data.staffTasks || 0,
          adminTasks: data.adminTasks || 0,
          completedadminTasks: data.completedadminTasks || 0,
          completedStaffTasks: data.completedStaffTasks || 0,
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };
    fetchStats();
  }, []);

  // Live update completed counts
  useEffect(() => {
    const handleStatsUpdate = async () => {
      try {
        const res1 = await fetch(
          "http://localhost:3050/api/work/count?status=Done&category=staff"
        );
        const staffDone = await res1.json();

        const res2 = await fetch(
          "http://localhost:3050/api/adminwork/count?status=Done"
        );
        const adminDone = await res2.json();

        setStats((prev) => ({
          ...prev,
          completedStaffTasks: staffDone.count || 0,
          completedadminTasks: adminDone.count || 0,
        }));
      } catch (err) {
        console.error("Error fetching live stats:", err);
      }
    };

    window.addEventListener("statsUpdated", handleStatsUpdate);
    handleStatsUpdate();
    return () =>
      window.removeEventListener("statsUpdated", handleStatsUpdate);
  }, []);

  // Update liveData whenever stats change
  useEffect(() => {
    setLiveData([
      {
        name: "Completed Tasks",
        staffCompleted: stats.completedStaffTasks,
        adminCompleted: stats.completedadminTasks,
      },
    ]);
  }, [stats]);

  // Fetch Monthly/Daily/Yearly Completed Tasks
  useEffect(() => {
    const fetchLineData = async () => {
      try {
        const resM = await fetch(
          "http://localhost:3050/api/stats/monthly-completed"
        );
        const dataM = await resM.json();
        setMonthlyData(dataM || []);

        const resD = await fetch(
          "http://localhost:3050/api/stats/daily-completed"
        );
        const dataD = await resD.json();
        setDailyData(dataD || []);

        const resY = await fetch(
          "http://localhost:3050/api/stats/yearly-completed"
        );
        const dataY = await resY.json();
        setYearlyData(dataY || []);
      } catch (err) {
        console.error("Error fetching line data:", err);
      }
    };
    fetchLineData();
  }, []);

  const pieData = [
    { name: "Staff Tasks", value: stats.staffTasks },
    { name: "Admin Tasks", value: stats.adminTasks },
  ];
  const COLORS = ["#82ca9d", "#8884d8"];

  return (
    <div
      style={{
        fontFamily: "Segoe UI, sans-serif",
        backgroundColor: "#f4f6f9",
        minHeight: "100vh",
      }}
    >
      <Header toggleDrawer={toggleDrawer} title="Dashboard" />
      {drawerOpen && <DrawerMenu closeDrawer={() => setDrawerOpen(false)} />}

      <div style={{ padding: "40px", marginTop: "70px" }}>
        <h2
          style={{
            color: "#062d58",
            marginBottom: "40px",
            fontWeight: "600",
            fontSize: "28px",
          }}
        >
          Company Dashboard Overview
        </h2>

        {/* Charts Section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "30px",
            marginBottom: "40px",
          }}
        >
          {/* Pie Chart */}
          <div
            style={{
              background: "#fff",
              padding: "25px",
              borderRadius: "16px",
              boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
              transition: "transform 0.2s",
            }}
          >
            <h4 style={{ color: "#062d58", marginBottom: "20px" }}>
              Staff Tasks vs Admin Manager Tasks
            </h4>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div
            style={{
              background: "#fff",
              padding: "25px",
              borderRadius: "16px",
              boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
              transition: "transform 0.2s",
            }}
          >
            <h4 style={{ color: "#062d58", marginBottom: "20px" }}>
              Total Staff vs Admin Managers
            </h4>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={[
                  { name: "Staff", Staff: stats.totalStaff },
                  { name: "Admin Managers", Admin: stats.adminManagers },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Staff" fill="#82ca9d" />
                <Bar dataKey="Admin" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Live Line Chart */}
      {/* Live Area Chart (Wave Style) */}
{/* Live Area Chart (Wave Style) */}
<div
  style={{
    background: "#fff",
    padding: "25px",
    borderRadius: "16px",
    boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
    transition: "transform 0.2s",
  }}
>
  <h4 style={{ color: "#062d58", marginBottom: "20px" }}>
    Live Completed Tasks
  </h4>
  <ResponsiveContainer width="100%" height={250}>
    <AreaChart data={liveData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis allowDecimals={false} />
      <Tooltip />
      <Legend />
      <Area
        type="monotone"
        dataKey="staffCompleted"
        stroke="#82ca9d"
        fill="#82ca9d"
        fillOpacity={0.4}
      />
      <Area
        type="monotone"
        dataKey="adminCompleted"
        stroke="#8884d8"
        fill="#8884d8"
        fillOpacity={0.4}
      />
    </AreaChart>
  </ResponsiveContainer>
</div>


        </div>

        {/* Quick Stats */}
        <div
          style={{
            background: "#fff",
            padding: "30px",
            borderRadius: "16px",
            boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
          }}
        >
          <h4 style={{ color: "#062d58", marginBottom: "25px" }}>
            Quick Stats
          </h4>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "20px",
            }}
          >
            <div
              style={{
                background: "#f9fafc",
                padding: "15px",
                borderRadius: "12px",
              }}
            >
              <strong>Total Staff:</strong>
              <p style={{ margin: 0, fontSize: "18px", color: "#062d58" }}>
                {stats.totalStaff}
              </p>
            </div>
            <div
              style={{
                background: "#f9fafc",
                padding: "15px",
                borderRadius: "12px",
              }}
            >
              <strong>Admin Managers:</strong>
              <p style={{ margin: 0, fontSize: "18px", color: "#062d58" }}>
                {stats.adminManagers}
              </p>
            </div>
            <div
              style={{
                background: "#f9fafc",
                padding: "15px",
                borderRadius: "12px",
              }}
            >
              <strong>Assigned Tasks for Staff:</strong>
              <p style={{ margin: 0, fontSize: "18px", color: "#062d58" }}>
                {stats.staffTasks}
              </p>
            </div>
            <div
              style={{
                background: "#f9fafc",
                padding: "15px",
                borderRadius: "12px",
              }}
            >
              <strong>Assigned Tasks for Admin Managers:</strong>
              <p style={{ margin: 0, fontSize: "18px", color: "#062d58" }}>
                {stats.adminTasks}
              </p>
            </div>
            <div
              style={{
                background: "#f9fafc",
                padding: "15px",
                borderRadius: "12px",
              }}
            >
              <strong>Total Completed Admin Tasks:</strong>
              <p style={{ margin: 0, fontSize: "18px", color: "#28a745" }}>
                {stats.completedadminTasks}
              </p>
            </div>
            <div
              style={{
                background: "#f9fafc",
                padding: "15px",
                borderRadius: "12px",
              }}
            >
              <strong>Total Completed Staff Tasks:</strong>
              <p style={{ margin: 0, fontSize: "18px", color: "#28a745" }}>
                {stats.completedStaffTasks}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
