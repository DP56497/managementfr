import React from "react";
import { useNavigate } from "react-router-dom";

const NextPage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
        color: "#fff",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: "60px 40px",
      }}
    >
      {/* Back Button */}
      <button
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          padding: "12px 24px",
          backgroundColor: "#2563eb",
          border: "none",
          borderRadius: "8px",
          color: "#fff",
          fontWeight: "600",
          cursor: "pointer",
          transition: "all 0.3s ease",
          boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
        }}
        onClick={() => navigate("/home")}
        onMouseOver={(e) =>
          (e.currentTarget.style.backgroundColor = "#1d4ed8")
        }
        onMouseOut={(e) =>
          (e.currentTarget.style.backgroundColor = "#2563eb")
        }
      >
        ⬅ Back
      </button>

      <div style={{ maxWidth: "1200px", margin: "80px auto 0 auto", textAlign: "center" }}>
        <h1
          style={{
            fontSize: "52px",
            fontWeight: "800",
            marginBottom: "30px",
            textShadow: "2px 2px 10px rgba(0,0,0,0.6)",
            animation: "fadeInDown 1s ease-out",
          }}
        >
          Exclusive Insights & Premium Information
        </h1>

        <p
          style={{
            fontSize: "20px",
            maxWidth: "900px",
            margin: "0 auto 50px auto",
            lineHeight: "1.8",
            color: "#e0e0e0",
            animation: "fadeInUp 1.2s ease-out",
          }}
        >
          Gain access to cutting-edge strategies, curated resources, and industry-leading
          insights designed to take your company management to the next level.
        </p>

        {/* Premium Info Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "30px",
            animation: "fadeIn 1.5s ease-out",
          }}
        >
          {[
            {
              title: "AI-Powered Analytics",
              img: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1000&q=80",
              desc: "Leverage machine learning and AI to predict trends, monitor performance, and optimize company operations with accuracy."
            },
            {
              title: "Seamless Collaboration",
              img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80",
              desc: "Empower teams with real-time communication and project tracking tools that make collaboration smooth and efficient."
            },
            {
              title: "Data Security",
              img: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=1000&q=80",
              desc: "Protect sensitive business data with enterprise-grade encryption, secure backups, and industry-compliant safeguards."
            }
          ].map((item, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "rgba(255,255,255,0.08)",
                borderRadius: "14px",
                boxShadow: "0 6px 18px rgba(0,0,0,0.4)",
                overflow: "hidden",
                transition: "transform 0.3s ease",
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <img
                src={item.img}
                alt={item.title}
                style={{ width: "100%", height: "220px", objectFit: "cover" }}
              />
              <div style={{ padding: "20px" }}>
                <h3 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "12px" }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: "16px", lineHeight: "1.6", color: "#d1d5db" }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
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

export default NextPage;
