"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const QUICK = [
  { label: "Shawshank", id: "tt0111161" },
  { label: "Godfather", id: "tt0068646" },
  { label: "Dark Knight", id: "tt0468569" },
  { label: "Inception", id: "tt1375666" },
  { label: "Interstellar", id: "tt0816692" },
];

const FEATURES = [
  {
    num: "01",
    title: "Sentiment Intelligence",
    desc: "Groq Llama 3 processes audience data to surface the true emotional reception of any film.",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#2997ff"
        strokeWidth="1.8"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Classification Engine",
    desc: "Positive, Mixed, or Negative — with nuanced reasoning, not just a number.",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#2997ff"
        strokeWidth="1.8"
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Groq-Speed Results",
    desc: "Sub-second AI inference. The world's fastest LLM API delivers results before the trailer ends.",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#2997ff"
        strokeWidth="1.8"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
];

export default function HomePage() {
  const [id, setId] = useState("");
  const [error, setError] = useState("");
  const [focused, setFocused] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  const validate = (v) => /^tt\d{7,8}$/.test(v.trim());

  const handleSubmit = () => {
    if (!id.trim()) {
      setError("Please enter an IMDb ID");
      return;
    }
    if (!validate(id)) {
      setError("Format: tt followed by 7–8 digits (e.g. tt0111161)");
      return;
    }
    setError("");
    router.push(`/movie/${id.trim()}`);
  };

  if (!mounted) return null;

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
        {/* Ambient glow */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-20%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "900px",
              height: "600px",
              background:
                "radial-gradient(ellipse, rgba(41,151,255,0.09) 0%, transparent 65%)",
              animation: "pulse-glow 6s ease-in-out infinite",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "10%",
              right: "-5%",
              width: "500px",
              height: "500px",
              background:
                "radial-gradient(ellipse, rgba(41,151,255,0.05) 0%, transparent 60%)",
            }}
          />
        </div>

        {/* Hero */}
        <section
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "820px",
            margin: "0 auto",
            padding: "148px 28px 80px",
            textAlign: "center",
          }}
        >
          {/* Status badge */}
          <div
            className="anim-fadeUp"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "9px",
              padding: "7px 20px",
              borderRadius: "980px",
              marginBottom: "44px",
              background: "rgba(41,151,255,0.08)",
              border: "1px solid rgba(41,151,255,0.2)",
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#2997ff",
            }}
          >
            <span
              style={{
                position: "relative",
                display: "inline-flex",
                width: 7,
                height: 7,
              }}
            >
              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  background: "#2997ff",
                  opacity: 0.7,
                  animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite",
                }}
              />
              <span
                style={{
                  position: "relative",
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#2997ff",
                  display: "inline-block",
                }}
              />
            </span>
            CineVox · Powered by Groq AI
          </div>

          {/* Headline — no italics, straight bold */}
          <h1
            className="anim-fadeUp d-1"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(3.2rem, 8vw, 6rem)",
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              color: "#f5f5f7",
              marginBottom: "28px",
              fontStyle: "normal",
            }}
          >
            Every film has
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #2997ff 0%, #64b5ff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontStyle: "normal",
              }}
            >
              a story to tell.
            </span>
          </h1>

          {/* Sub — no italics */}
          <p
            className="anim-fadeUp d-2"
            style={{
              fontSize: "clamp(1rem, 2.2vw, 1.15rem)",
              fontWeight: 400,
              fontStyle: "normal",
              color: "#a1a1a6",
              lineHeight: 1.75,
              maxWidth: "520px",
              margin: "0 auto 56px",
            }}
          >
            Enter any IMDb ID. Our AI reads audience reviews and reveals what
            people really felt.
          </p>

          {/* Search box */}
          <div
            className="anim-fadeUp d-3"
            style={{ maxWidth: "560px", margin: "0 auto" }}
          >
            <div
              style={{
                borderRadius: "22px", // ← more curved
                padding: "3px",
                background: focused
                  ? "linear-gradient(135deg, rgba(41,151,255,0.6), rgba(41,151,255,0.2))"
                  : "rgba(255,255,255,0.07)",
                transition: "background 0.3s ease",
                boxShadow: focused ? "0 0 40px rgba(41,151,255,0.12)" : "none",
              }}
            >
              <div
                style={{
                  borderRadius: "19px", // ← more curved inner
                  background: "#111",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 4px 0 20px",
                  gap: "12px",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={focused ? "#2997ff" : "#48484a"}
                  strokeWidth="2.2"
                  style={{ flexShrink: 0, transition: "stroke 0.2s" }}
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  value={id}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  onChange={(e) => {
                    setId(e.target.value);
                    setError("");
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  placeholder="tt0111161"
                  style={{
                    flex: 1,
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    color: "#f5f5f7",
                    fontSize: "1rem",
                    fontWeight: 500,
                    fontFamily: "var(--font-body)",
                    padding: "18px 0",
                    letterSpacing: "0.02em",
                    fontStyle: "normal",
                  }}
                />
                {id && (
                  <button
                    onClick={() => {
                      setId("");
                      setError("");
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "6px",
                      color: "#48484a",
                      lineHeight: 0,
                      transition: "color 0.15s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#a1a1a6")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#48484a")
                    }
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                  </button>
                )}
                <button
                  onClick={handleSubmit}
                  style={{
                    margin: "5px",
                    padding: "13px 26px",
                    borderRadius: "16px", // ← more curved
                    background: "#2997ff",
                    border: "none",
                    cursor: "pointer",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "0.875rem",
                    fontFamily: "var(--font-body)",
                    letterSpacing: "-0.01em",
                    whiteSpace: "nowrap",
                    transition: "background 0.15s, transform 0.1s",
                    boxShadow: "0 4px 20px rgba(41,151,255,0.35)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#0a84ff")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#2997ff")
                  }
                  onMouseDown={(e) =>
                    (e.currentTarget.style.transform = "scale(0.96)")
                  }
                  onMouseUp={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  Analyze
                </button>
              </div>
            </div>

            {error && (
              <div
                style={{
                  marginTop: "12px",
                  padding: "11px 16px",
                  borderRadius: "14px",
                  background: "rgba(255,69,58,0.08)",
                  border: "1px solid rgba(255,69,58,0.2)",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#ff453a">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
                <span
                  style={{
                    fontSize: "0.8rem",
                    color: "#ff453a",
                    fontWeight: 500,
                  }}
                >
                  {error}
                </span>
              </div>
            )}

            <p
              style={{
                marginTop: "12px",
                fontSize: "0.75rem",
                color: "#48484a",
                letterSpacing: "0.02em",
              }}
            >
              Format:{" "}
              <code
                style={{
                  fontFamily: "monospace",
                  color: "#636366",
                  fontStyle: "normal",
                }}
              >
                tt
              </code>{" "}
              followed by 7–8 digits
            </p>
          </div>

          {/* Quick picks */}
          <div
            className="anim-fadeUp d-4"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              flexWrap: "wrap",
              marginTop: "28px",
            }}
          >
            <span
              style={{
                fontSize: "0.72rem",
                color: "#3a3a3c",
                fontWeight: 500,
                marginRight: "4px",
              }}
            >
              Try →
            </span>
            {QUICK.map((m) => (
              <QuickPill
                key={m.id}
                label={m.label}
                onClick={() => {
                  setId(m.id);
                  setError("");
                }}
              />
            ))}
          </div>
        </section>

        {/* Divider */}
        <div
          style={{ maxWidth: "1120px", margin: "0 auto", padding: "0 28px" }}
        >
          <div
            style={{ height: "1px", background: "rgba(255,255,255,0.06)" }}
          />
        </div>

        {/* Features */}
        <section
          style={{
            maxWidth: "1120px",
            margin: "0 auto",
            padding: "80px 28px 100px",
          }}
        >
          <div
            className="anim-fadeUp d-2"
            style={{ textAlign: "center", marginBottom: "60px" }}
          >
            <p
              style={{
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#48484a",
                marginBottom: "12px",
              }}
            >
              How it works
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                color: "#f5f5f7",
                letterSpacing: "-0.03em",
                fontStyle: "normal",
              }}
            >
              Intelligence at every frame.
            </h2>
          </div>

          {/* Cards grid — each card is individually bordered now */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "16px", // ← gap instead of 1px border trick
            }}
          >
            {FEATURES.map((f, i) => (
              <FeatureCard key={i} {...f} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function QuickPill({ label, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "6px 16px",
        borderRadius: "980px",
        cursor: "pointer",
        background: hov ? "rgba(41,151,255,0.1)" : "rgba(255,255,255,0.04)",
        border: hov
          ? "1px solid rgba(41,151,255,0.3)"
          : "1px solid rgba(255,255,255,0.07)",
        color: hov ? "#2997ff" : "#6e6e73",
        fontSize: "0.76rem",
        fontWeight: 500,
        fontFamily: "var(--font-body)",
        transition: "all 0.15s",
      }}
    >
      {label}
    </button>
  );
}

function FeatureCard({ num, title, desc, icon }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "36px 32px",
        borderRadius: "20px",
        background: hov ? "#0d0d0d" : "#0a0a0a",
        border: hov
          ? "1px solid rgba(41,151,255,0.3)"
          : "1px solid rgba(255,255,255,0.1)",
        transition: "background 0.3s, border-color 0.3s, transform 0.3s",
        transform: hov ? "translateY(-4px)" : "translateY(0)",
        cursor: "default",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "28px",
        }}
      >
        <span
          style={{
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            color: "#3a3a3c",
          }}
        >
          {num}
        </span>
        <div
          style={{
            padding: "10px",
            borderRadius: "14px",
            background: hov
              ? "rgba(41,151,255,0.12)"
              : "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.07)",
            transition: "background 0.2s",
          }}
        >
          {icon}
        </div>
      </div>

      <h3
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 700,
          fontSize: "1rem",
          letterSpacing: "-0.02em",
          marginBottom: "10px",
          fontStyle: "normal",
          color: hov ? "#2997ff" : "#f5f5f7",
          transition: "color 0.2s",
        }}
      >
        {title}
      </h3>

      <p
        style={{
          fontSize: "0.85rem",
          color: "#48484a",
          lineHeight: 1.7,
          fontWeight: 400,
          fontStyle: "normal",
        }}
      >
        {desc}
      </p>

      <div
        style={{
          marginTop: "28px",
          height: "1px",
          background: hov ? "rgba(41,151,255,0.35)" : "rgba(255,255,255,0.05)",
          transition: "background 0.3s",
        }}
      />
    </div>
  );
}
