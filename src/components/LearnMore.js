import React from "react";

import { useNavigate } from "react-router-dom";

const LearnMore = () => {

     const navigate = useNavigate(); 

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        color: "#f8fafc",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        display: "flex",
        flexDirection: "column",
        animation: "pageFadeIn 1s ease-out", // ✅ Page fade-in
      }}
    >
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
   

      {/* Hero Section */}
      <div
        style={{
          textAlign: "center",
          padding: "60px 20px",
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1950&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "0 0 40px 40px",
          boxShadow: "0 6px 30px rgba(0,0,0,0.6)",
          animation: "slideDown 1s ease-out", // ✅ Slide down entry
        }}
      >
        <h1
          style={{
            fontSize: "54px",
            fontWeight: "800",
            marginBottom: "20px",
            textShadow: "3px 3px 8px rgba(0,0,0,0.8)",
            animation: "fadeIn 1.5s ease-out", // ✅ Text fade
          }}
        >
          Discover Our Company
        </h1>
        <p
          style={{
            fontSize: "22px",
            maxWidth: "900px",
            margin: "0 auto",
            lineHeight: "1.8",
            animation: "fadeIn 2s ease-out",
          }}
        >
          We combine innovation, technology, and creativity to build
          future-ready solutions. Explore our culture, achievements, and
          world-class services.
        </p>
      </div>

      {/* Image Gallery */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "25px",
          padding: "60px 40px",
          animation: "fadeUp 1.5s ease-out", // ✅ Smooth rise
        }}
      >
        {[
          {
            img: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=800&q=80",
            title: "Modern Workspace",
            desc: "A luxurious and innovative office space that inspires creativity and collaboration.",
          },
          {
            img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
            title: "Global Team",
            desc: "Our diverse and talented workforce drives excellence across industries worldwide.",
          },
          {
            img: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80",
            title: "Cutting-edge Technology",
            desc: "Equipped with the latest tools and innovations to deliver unmatched performance.",
          },
        ].map((item, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#1e293b",
              borderRadius: "18px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
              overflow: "hidden",
              transition: "transform 0.3s ease",
              animation: `cardFadeIn 0.8s ease-out ${index * 0.3}s both`, // ✅ Staggered animation
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src={item.img}
              alt={item.title}
              style={{ width: "100%", height: "240px", objectFit: "cover" }}
            />
            <div style={{ padding: "20px" }}>
              <h2 style={{ fontSize: "24px", fontWeight: "700" }}>{item.title}</h2>
              <p style={{ marginTop: "10px", fontSize: "16px", lineHeight: "1.6" }}>
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Mission Section */}
      <div
        style={{
          padding: "60px 40px",
          backgroundColor: "#1e293b",
          textAlign: "center",
          animation: "fadeUp 2s ease-out",
        }}
      >
        <h2 style={{ fontSize: "36px", fontWeight: "800", marginBottom: "20px" }}>
          Our Mission
        </h2>
        <p
          style={{
            fontSize: "20px",
            maxWidth: "900px",
            margin: "0 auto",
            lineHeight: "1.8",
          }}
        >
          Our mission is to empower businesses and individuals through innovation,
          delivering value and creating impact globally. We believe in excellence,
          trust, and a better tomorrow.
        </p>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes pageFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-40px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes cardFadeIn {
            from { opacity: 0; transform: translateY(50px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default LearnMore;
