"use client";
import { useEffect, useState } from "react";

export default function AppLoader({ children }) {
  const [phase, setPhase] = useState("loading"); // loading → exit → done

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("exit"), 1800);
    const t2 = setTimeout(() => setPhase("done"), 2550);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <>
      {/* Page — fades in after loader exits */}
      <div
        style={{
          opacity: phase === "done" ? 1 : 0,
          transform: phase === "done" ? "scale(1)" : "scale(0.985)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
          pointerEvents: phase === "done" ? "auto" : "none",
        }}
      >
        {children}
      </div>

      {/* Loader */}
      {phase !== "done" && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "#000",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            transform: phase === "exit" ? "translateY(-100%)" : "translateY(0)",
            transition:
              phase === "exit"
                ? "transform 0.72s cubic-bezier(0.76,0,0.24,1)"
                : "none",
          }}
        >
          {/* Scanlines */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.012) 2px, rgba(255,255,255,0.012) 4px)",
            }}
          />

          {/* Film corner marks */}
          {[
            {
              top: 28,
              left: 28,
              borderTop: "1.5px solid rgba(255,255,255,0.15)",
              borderLeft: "1.5px solid rgba(255,255,255,0.15)",
            },
            {
              top: 28,
              right: 28,
              borderTop: "1.5px solid rgba(255,255,255,0.15)",
              borderRight: "1.5px solid rgba(255,255,255,0.15)",
            },
            {
              bottom: 28,
              left: 28,
              borderBottom: "1.5px solid rgba(255,255,255,0.15)",
              borderLeft: "1.5px solid rgba(255,255,255,0.15)",
            },
            {
              bottom: 28,
              right: 28,
              borderBottom: "1.5px solid rgba(255,255,255,0.15)",
              borderRight: "1.5px solid rgba(255,255,255,0.15)",
            },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: 22,
                height: 22,
                ...s,
                animation: `cv-fadein 0.4s ease ${i * 0.06}s both`,
              }}
            />
          ))}

          {/* Center content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "24px",
              animation: "cv-fadein 0.5s ease 0.1s both",
            }}
          >
            {/* Logo with pulse rings */}
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {[84, 112, 140].map((d, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    width: d,
                    height: d,
                    borderRadius: "50%",
                    border: `1px solid rgba(41,151,255,${0.22 - i * 0.06})`,
                    animation: `cv-ring 2.2s ease-out ${i * 0.35}s infinite`,
                  }}
                />
              ))}

              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "18px",
                  position: "relative",
                  zIndex: 1,
                  background: "linear-gradient(145deg, #2997ff, #0071e3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow:
                    "0 0 48px rgba(41,151,255,0.5), 0 0 100px rgba(41,151,255,0.18)",
                  animation: "cv-glow 2s ease-in-out infinite",
                }}
              >
                {/* Inline SVG — animated waveform bars */}
                <svg width="34" height="34" viewBox="0 0 40 40" fill="none">
                  <rect
                    x="5"
                    y="5"
                    width="4"
                    height="4"
                    rx="1"
                    fill="rgba(255,255,255,0.28)"
                  />
                  <rect
                    x="31"
                    y="5"
                    width="4"
                    height="4"
                    rx="1"
                    fill="rgba(255,255,255,0.28)"
                  />
                  <rect
                    x="5"
                    y="31"
                    width="4"
                    height="4"
                    rx="1"
                    fill="rgba(255,255,255,0.28)"
                  />
                  <rect
                    x="31"
                    y="31"
                    width="4"
                    height="4"
                    rx="1"
                    fill="rgba(255,255,255,0.28)"
                  />
                  <circle cx="20" cy="20" r="8.5" fill="rgba(0,0,0,0.3)" />
                  {[0, 60, 120, 180, 240, 300].map((a) => (
                    <rect
                      key={a}
                      x="18.5"
                      y="12.5"
                      width="3"
                      height="6"
                      rx="1.5"
                      fill="white"
                      opacity="0.82"
                      transform={`rotate(${a} 20 20)`}
                    />
                  ))}
                  {/* Animated waveform */}
                  <rect
                    x="14"
                    y="18"
                    width="2.2"
                    height="4"
                    rx="1.1"
                    fill="white"
                  >
                    <animate
                      attributeName="height"
                      values="4;9;4"
                      dur="1.1s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="y"
                      values="18;15.5;18"
                      dur="1.1s"
                      repeatCount="indefinite"
                    />
                  </rect>
                  <rect
                    x="17.5"
                    y="15"
                    width="2.2"
                    height="10"
                    rx="1.1"
                    fill="white"
                  >
                    <animate
                      attributeName="height"
                      values="10;14;10"
                      dur="0.85s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="y"
                      values="15;13;15"
                      dur="0.85s"
                      repeatCount="indefinite"
                    />
                  </rect>
                  <rect
                    x="21"
                    y="16.5"
                    width="2.2"
                    height="7"
                    rx="1.1"
                    fill="white"
                  >
                    <animate
                      attributeName="height"
                      values="7;11;7"
                      dur="1.25s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="y"
                      values="16.5;14.5;16.5"
                      dur="1.25s"
                      repeatCount="indefinite"
                    />
                  </rect>
                  <rect
                    x="24.5"
                    y="19"
                    width="2.2"
                    height="2"
                    rx="1.1"
                    fill="white"
                  >
                    <animate
                      attributeName="height"
                      values="2;6;2"
                      dur="0.75s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="y"
                      values="19;17;19"
                      dur="0.75s"
                      repeatCount="indefinite"
                    />
                  </rect>
                </svg>
              </div>
            </div>

            {/* Wordmark */}
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "var(--font-display), sans-serif",
                  fontWeight: 800,
                  fontSize: "1.75rem",
                  letterSpacing: "-0.04em",
                  color: "#f5f5f7",
                  lineHeight: 1,
                }}
              >
                Cine<span style={{ color: "#2997ff" }}>Vox</span>
              </div>
              <div
                style={{
                  fontSize: "0.6rem",
                  fontWeight: 600,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#3a3a3c",
                  marginTop: "8px",
                }}
              >
                Film Intelligence
              </div>
            </div>

            {/* Progress bar */}
            <div
              style={{
                width: 128,
                height: 2,
                background: "rgba(255,255,255,0.06)",
                borderRadius: 1,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  borderRadius: 1,
                  background: "linear-gradient(90deg, #2997ff, #64b5ff)",
                  boxShadow: "0 0 8px rgba(41,151,255,0.6)",
                  animation:
                    "cv-progress 1.7s cubic-bezier(0.4,0,0.2,1) forwards",
                }}
              />
            </div>
          </div>

          {/* Bottom label */}
          <div
            style={{
              position: "absolute",
              bottom: 32,
              fontSize: "0.6rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#2a2a2a",
              animation: "cv-fadein 0.5s ease 0.6s both",
            }}
          >
            Powered by Groq AI
          </div>

          <style>{`
            @keyframes cv-fadein {
              from { opacity:0; transform:translateY(6px); }
              to   { opacity:1; transform:translateY(0); }
            }
            @keyframes cv-ring {
              0%   { transform:scale(0.8); opacity:0; }
              40%  { opacity:1; }
              100% { transform:scale(1.35); opacity:0; }
            }
            @keyframes cv-glow {
              0%,100% { box-shadow:0 0 48px rgba(41,151,255,0.5),0 0 100px rgba(41,151,255,0.18); }
              50%     { box-shadow:0 0 64px rgba(41,151,255,0.7),0 0 130px rgba(41,151,255,0.28); }
            }
            @keyframes cv-progress {
              from { width:0%; }
              to   { width:100%; }
            }
          `}</style>
        </div>
      )}
    </>
  );
}
