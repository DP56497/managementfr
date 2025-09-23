import React from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage:
          "linear-gradient(to bottom right, rgba(0,0,0,0.75), rgba(0,0,0,0.45)), url('https://images.unsplash.com/photo-1581092580505-999c4556b08b?auto=format&fit=crop&w=1950&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#f0f0f0",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "40px",
        }}
      >
        <h1
          style={{
            fontSize: "58px",
            fontWeight: "800",
            marginBottom: "20px",
            textShadow: "3px 3px 8px rgba(0,0,0,0.6)",
            letterSpacing: "1px",
            animation: "fadeInDown 1s ease-out",
          }}
        >
          Welcome to Company Management 
        </h1>

        <p
          style={{
            fontSize: "22px",
            maxWidth: "850px",
            margin: "0 auto 40px auto",
            lineHeight: "1.8",
            backgroundColor: "rgba(0, 0, 0, 0.35)",
            padding: "25px 30px",
            borderRadius: "14px",
            boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
            animation: "fadeInUp 1.2s ease-out",
          }}
        >
          Seamlessly manage employees, assign responsibilities, and monitor
          company-wide progress — all in one powerful and easy-to-use dashboard.
        </p>

        <div style={{ display: "flex", gap: "20px", animation: "fadeIn 1.5s ease-out" }}>
          <button
            style={{
              padding: "14px 28px",
              fontSize: "18px",
              fontWeight: "600",
              backgroundColor: "#2563eb",
              border: "none",
              borderRadius: "10px",
              color: "#fff",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
            }}
            onClick={() => navigate("/next")}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#1d4ed8")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#2563eb")
            }
          >
            Get Started
          </button>

        <button
  style={{
    padding: "14px 28px",
    fontSize: "18px",
    fontWeight: "600",
    backgroundColor: "rgba(255,255,255,0.15)",
    border: "2px solid #f0f0f0",
    borderRadius: "10px",
    color: "#f0f0f0",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
  }}
  onClick={() => navigate("/learn-more")}   
  onMouseOver={(e) =>
    (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.25)")
  }
  onMouseOut={(e) =>
    (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.15)")
  }
>
  Learn More
</button>

        </div>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes fadeInDown {
            from { opacity: 0; transform: translateY(-30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default Home;
