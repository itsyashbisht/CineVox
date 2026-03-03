"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

const STACK = [
  { label: "Framework", value: "Next.js 16 App Router" },
  { label: "AI Model", value: "Groq · Llama 3.1 8B Instant" },
  { label: "Movie Data", value: "OMDB API (free tier)" },
  { label: "Styling", value: "Tailwind CSS v4" },
  { label: "Language", value: "JavaScript (ES2024)" },
  { label: "Deployment", value: "Vercel" },
];

export default function AboutPage() {
  return (
    <div
      style={{
        background: "#000",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />
      <main style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "-5%",
            left: "60%",
            width: "500px",
            height: "500px",
            background:
              "radial-gradient(ellipse,rgba(41,151,255,0.06) 0%,transparent 65%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: "680px",
            margin: "0 auto",
            padding: "clamp(88px,12vw,136px) 20px clamp(60px,9vw,100px)",
            position: "relative",
            zIndex: 1,
          }}
        >
          <p className="anim-fadeUp t-label" style={{ marginBottom: "16px" }}>
            About the project
          </p>

          <h1
            className="anim-fadeUp d-1"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(2.2rem,7vw,4.2rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.0,
              color: "#f5f5f7",
              marginBottom: "clamp(24px,4vw,36px)",
            }}
          >
            Built for film
            <br />
            <span style={{ color: "#2997ff" }}>intelligence.</span>
          </h1>

          <div
            className="anim-fadeUp d-2"
            style={{ marginBottom: "clamp(24px,4vw,36px)" }}
          >
            <div className="accent-line" />
          </div>

          <div
            className="anim-fadeUp d-3"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              marginBottom: "clamp(40px,7vw,60px)",
            }}
          >
            <p
              style={{
                fontSize: "clamp(0.9rem,2.5vw,1.05rem)",
                color: "#a1a1a6",
                lineHeight: 1.8,
              }}
            >
              CineVox is an AI-powered movie sentiment engine built as a Brew
              full-stack developer internship assignment. Enter any IMDb ID and
              the app instantly surfaces how audiences truly responded to a
              film.
            </p>
            <p
              style={{
                fontSize: "clamp(0.9rem,2.5vw,1.05rem)",
                color: "#6e6e73",
                lineHeight: 1.8,
              }}
            >
              Movie metadata is fetched from OMDB, then passed alongside ratings
              to Groq's ultra-fast Llama 3.1 inference engine, which classifies
              sentiment and writes a crisp natural-language summary — in under 2
              seconds.
            </p>
          </div>

          <div className="anim-fadeUp d-4">
            <p
              style={{
                fontSize: "0.63rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#3a3a3c",
                marginBottom: "14px",
              }}
            >
              Technology Stack
            </p>
            {/* 1 col on mobile, 2 col on wider screens */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(min(200px,100%),1fr))",
                gap: "1px",
                background: "rgba(255,255,255,0.06)",
                borderRadius: "16px",
                overflow: "hidden",
              }}
            >
              {STACK.map((item) => (
                <div
                  key={item.label}
                  style={{
                    padding: "clamp(14px,3vw,20px) clamp(16px,3vw,22px)",
                    background: "#000",
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.62rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#3a3a3c",
                      marginBottom: "5px",
                    }}
                  >
                    {item.label}
                  </p>
                  <p
                    style={{
                      fontSize: "0.84rem",
                      color: "#a1a1a6",
                      fontWeight: 500,
                    }}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div
            className="anim-fadeUp d-5"
            style={{
              marginTop: "clamp(36px,6vw,52px)",
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <HoverBtn href="/" primary>
              Try it now
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </HoverBtn>
            <HoverBtn href="/discover">Browse films</HoverBtn>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function HoverBtn({ href, primary, children }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "clamp(11px,2vw,13px) clamp(20px,3vw,26px)",
        borderRadius: "980px",
        textDecoration: "none",
        fontWeight: primary ? 700 : 600,
        fontSize: "clamp(0.82rem,2vw,0.875rem)",
        transition: "background 0.15s",
        ...(primary
          ? {
              background: hov ? "#0a84ff" : "#2997ff",
              color: "#fff",
              boxShadow: "0 4px 18px rgba(41,151,255,0.3)",
            }
          : {
              background: hov
                ? "rgba(255,255,255,0.1)"
                : "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#f5f5f7",
            }),
      }}
    >
      {children}
    </a>
  );
}
