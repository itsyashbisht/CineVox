import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Loading() {
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
      <main style={{ flex: 1 }}>
        <div
          style={{
            maxWidth: "960px",
            margin: "0 auto",
            padding: "128px 28px 80px",
          }}
        >
          {/* Analyzing label */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "48px",
            }}
          >
            <div
              style={{
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                border: "2px solid #2997ff",
                borderTopColor: "transparent",
                animation: "spin 0.8s linear infinite",
              }}
            />
            <span
              style={{
                fontSize: "0.82rem",
                color: "#48484a",
                fontWeight: 500,
                letterSpacing: "0.05em",
              }}
            >
              Fetching film data &amp; running AI analysis…
            </span>
          </div>

          <div
            style={{
              display: "flex",
              gap: "52px",
              marginBottom: "64px",
              flexWrap: "wrap",
            }}
          >
            <div
              className="shimmer"
              style={{
                flexShrink: 0,
                width: "200px",
                height: "296px",
                borderRadius: "14px",
              }}
            />
            <div style={{ flex: 1, minWidth: "240px" }}>
              <div
                className="shimmer"
                style={{
                  height: "10px",
                  width: "100px",
                  borderRadius: "5px",
                  marginBottom: "18px",
                }}
              />
              <div
                className="shimmer"
                style={{
                  height: "40px",
                  width: "72%",
                  borderRadius: "10px",
                  marginBottom: "18px",
                }}
              />
              <div
                className="shimmer"
                style={{
                  height: "12px",
                  width: "200px",
                  borderRadius: "5px",
                  marginBottom: "24px",
                }}
              />
              <div
                className="shimmer"
                style={{
                  height: "12px",
                  width: "100%",
                  borderRadius: "5px",
                  marginBottom: "8px",
                }}
              />
              <div
                className="shimmer"
                style={{
                  height: "12px",
                  width: "88%",
                  borderRadius: "5px",
                  marginBottom: "8px",
                }}
              />
              <div
                className="shimmer"
                style={{
                  height: "12px",
                  width: "60%",
                  borderRadius: "5px",
                  marginBottom: "32px",
                }}
              />
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {[80, 100, 72, 92].map((w, i) => (
                  <div
                    key={i}
                    className="shimmer"
                    style={{
                      height: "28px",
                      width: `${w}px`,
                      borderRadius: "980px",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div
            style={{
              height: "1px",
              background: "rgba(255,255,255,0.05)",
              marginBottom: "48px",
            }}
          />
          <div
            className="shimmer"
            style={{
              height: "160px",
              borderRadius: "20px",
              marginBottom: "40px",
            }}
          />
          <div style={{ display: "flex", gap: "12px" }}>
            {[130, 130, 130].map((w, i) => (
              <div
                key={i}
                className="shimmer"
                style={{
                  height: "72px",
                  width: `${w}px`,
                  borderRadius: "12px",
                }}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
