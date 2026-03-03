import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { fetchMovie } from "@/lib/omdb";
import { analyzeSentiment } from "@/lib/groq";

function withTimeout(p, ms) {
  return Promise.race([
    p,
    new Promise((_, r) => setTimeout(() => r(new Error("timeout")), ms)),
  ]);
}

const SENTIMENT = {
  positive: {
    label: "Positive",
    color: "#30d158",
    bg: "rgba(48,209,88,0.07)",
    border: "rgba(48,209,88,0.18)",
  },
  mixed: {
    label: "Mixed",
    color: "#ffd60a",
    bg: "rgba(255,214,10,0.07)",
    border: "rgba(255,214,10,0.18)",
  },
  negative: {
    label: "Negative",
    color: "#ff453a",
    bg: "rgba(255,69,58,0.07)",
    border: "rgba(255,69,58,0.18)",
  },
};

export default async function MoviePage({ params }) {
  const { id } = await params;
  let movie = null;
  let sentiment = {
    summary: "Sentiment analysis could not be completed.",
    classification: "mixed",
  };
  let error = null;

  try {
    movie = await withTimeout(fetchMovie(id), 5000);
  } catch (e) {
    error =
      e.message === "timeout"
        ? "Request timed out. Please try again."
        : e.message || "Movie not found.";
  }

  if (movie) {
    try {
      sentiment = await withTimeout(
        analyzeSentiment(movie.Title, movie.Plot, movie.Ratings),
        8000,
      );
    } catch {}
  }

  const sc = SENTIMENT[sentiment?.classification] || SENTIMENT.mixed;
  const hasPoster = movie?.Poster && movie.Poster !== "N/A";
  const cast = movie?.Actors?.split(", ") || [];
  const genres = movie?.Genre?.split(", ") || [];

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

      <main style={{ flex: 1, position: "relative" }}>
        {/* Subtle top glow */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "700px",
            height: "350px",
            background:
              "radial-gradient(ellipse, rgba(41,151,255,0.05) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <div
          style={{
            maxWidth: "960px",
            margin: "0 auto",
            padding: "128px 28px 80px",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* ── Error state ── */}
          {error && (
            <div
              className="anim-scaleIn"
              style={{ textAlign: "center", padding: "80px 0" }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "20px" }}>🎬</div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "1.8rem",
                  color: "#f5f5f7",
                  marginBottom: "12px",
                }}
              >
                Film not found
              </h2>
              <p
                style={{
                  color: "#6e6e73",
                  marginBottom: "32px",
                  fontSize: "0.95rem",
                }}
              >
                {error}
              </p>
              <a
                href="/"
                className="back-link"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 24px",
                  borderRadius: "980px",
                  background: "#2997ff",
                  color: "#fff",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                }}
              >
                ← Back to search
              </a>
            </div>
          )}

          {/* ── Movie content ── */}
          {movie && (
            <>
              {/* Top: poster + meta */}
              <div
                className="anim-fadeUp"
                style={{
                  display: "flex",
                  gap: "52px",
                  marginBottom: "64px",
                  flexWrap: "wrap",
                }}
              >
                {/* Poster */}
                <div
                  style={{
                    flexShrink: 0,
                    width: "200px",
                    height: "296px",
                    borderRadius: "14px",
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "#111",
                    position: "relative",
                    boxShadow: "0 40px 80px rgba(0,0,0,0.7)",
                  }}
                >
                  {hasPoster ? (
                    <Image
                      src={movie.Poster}
                      alt={movie.Title}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#3a3a3c",
                        fontSize: "0.8rem",
                      }}
                    >
                      No Poster
                    </div>
                  )}
                </div>

                {/* Meta */}
                <div style={{ flex: 1, minWidth: "240px" }}>
                  {/* Genres */}
                  <div
                    style={{
                      display: "flex",
                      gap: "6px",
                      flexWrap: "wrap",
                      marginBottom: "18px",
                    }}
                  >
                    {genres.map((g) => (
                      <span
                        key={g}
                        style={{
                          padding: "3px 10px",
                          borderRadius: "980px",
                          fontSize: "0.65rem",
                          fontWeight: 600,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          color: "#6e6e73",
                        }}
                      >
                        {g}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h1
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 900,
                      fontSize: "clamp(1.9rem, 4vw, 2.8rem)",
                      letterSpacing: "-0.03em",
                      lineHeight: 1.05,
                      color: "#f5f5f7",
                      marginBottom: "18px",
                    }}
                  >
                    {movie.Title}
                  </h1>

                  {/* Stats */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      marginBottom: "22px",
                      flexWrap: "wrap",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="#f5a623"
                        stroke="#f5a623"
                        strokeWidth="1"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      <span
                        style={{
                          fontWeight: 700,
                          color: "#f5a623",
                          fontSize: "0.9rem",
                        }}
                      >
                        {movie.imdbRating}
                      </span>
                      <span style={{ fontSize: "0.75rem", color: "#3a3a3c" }}>
                        IMDb
                      </span>
                    </div>
                    <Dot />
                    <span style={{ fontSize: "0.82rem", color: "#6e6e73" }}>
                      {movie.Year}
                    </span>
                    <Dot />
                    <span style={{ fontSize: "0.82rem", color: "#6e6e73" }}>
                      {movie.Runtime}
                    </span>
                    {movie.Rated && movie.Rated !== "N/A" && (
                      <>
                        <Dot />
                        <span
                          style={{
                            fontSize: "0.72rem",
                            fontWeight: 600,
                            color: "#6e6e73",
                            border: "1px solid #3a3a3c",
                            padding: "1px 6px",
                            borderRadius: "4px",
                          }}
                        >
                          {movie.Rated}
                        </span>
                      </>
                    )}
                  </div>

                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "#6e6e73",
                      lineHeight: 1.75,
                      fontWeight: 400,
                      marginBottom: "28px",
                      maxWidth: "460px",
                    }}
                  >
                    {movie.Plot}
                  </p>

                  <MetaRow label="Director" value={movie.Director} />

                  {/* Cast chips */}
                  <div style={{ marginTop: "14px" }}>
                    <p
                      style={{
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#3a3a3c",
                        marginBottom: "8px",
                      }}
                    >
                      Cast
                    </p>
                    <div
                      style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}
                    >
                      {cast.map((a) => (
                        <span
                          key={a}
                          style={{
                            padding: "4px 12px",
                            borderRadius: "980px",
                            fontSize: "0.78rem",
                            fontWeight: 400,
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.07)",
                            color: "#a1a1a6",
                          }}
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div
                style={{
                  height: "1px",
                  background: "rgba(255,255,255,0.06)",
                  marginBottom: "48px",
                }}
              />

              {/* ── AI Sentiment Panel ── */}
              <div
                className="anim-fadeUp d-2"
                style={{
                  padding: "40px",
                  borderRadius: "20px",
                  background: sc.bg,
                  border: `1px solid ${sc.border}`,
                  marginBottom: "40px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "16px",
                    flexWrap: "wrap",
                    marginBottom: "22px",
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "#3a3a3c",
                        marginBottom: "8px",
                      }}
                    >
                      AI Analysis · Groq Llama 3.1
                    </p>
                    <h2
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 800,
                        fontSize: "1.4rem",
                        color: "#f5f5f7",
                        letterSpacing: "-0.03em",
                      }}
                    >
                      Audience Sentiment
                    </h2>
                  </div>

                  {/* Badge */}
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "8px 18px",
                      borderRadius: "980px",
                      background: sc.bg,
                      border: `1px solid ${sc.border}`,
                    }}
                  >
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: sc.color,
                        display: "inline-block",
                        boxShadow: `0 0 10px ${sc.color}`,
                      }}
                    />
                    <span
                      style={{
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        color: sc.color,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                      }}
                    >
                      {sc.label}
                    </span>
                  </div>
                </div>

                <p
                  style={{
                    fontSize: "0.975rem",
                    color: "#a1a1a6",
                    lineHeight: 1.8,
                    fontWeight: 400,
                    maxWidth: "660px",
                  }}
                >
                  {sentiment.summary}
                </p>
              </div>

              {/* ── Critical Ratings ── */}
              {movie.Ratings?.length > 0 && (
                <div
                  className="anim-fadeUp d-3"
                  style={{ marginBottom: "56px" }}
                >
                  <p
                    style={{
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#3a3a3c",
                      marginBottom: "16px",
                    }}
                  >
                    Critical Ratings
                  </p>
                  <div
                    style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
                  >
                    {movie.Ratings.map((r) => (
                      <div
                        key={r.Source}
                        style={{
                          padding: "16px 22px",
                          borderRadius: "12px",
                          background: "#111",
                          border: "1px solid rgba(255,255,255,0.06)",
                          minWidth: "120px",
                        }}
                      >
                        <p
                          style={{
                            fontFamily: "var(--font-display)",
                            fontWeight: 800,
                            fontSize: "1.15rem",
                            color: "#f5f5f7",
                            marginBottom: "4px",
                          }}
                        >
                          {r.Value}
                        </p>
                        <p
                          style={{
                            fontSize: "0.7rem",
                            color: "#48484a",
                            fontWeight: 500,
                          }}
                        >
                          {r.Source}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Back */}
              <a href="/" className="back-link">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Analyze another film
              </a>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Dot() {
  return (
    <span
      style={{
        width: 3,
        height: 3,
        borderRadius: "50%",
        background: "#3a3a3c",
        display: "inline-block",
      }}
    />
  );
}

function MetaRow({ label, value }) {
  return (
    <div>
      <p
        style={{
          fontSize: "0.65rem",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#3a3a3c",
          marginBottom: "5px",
        }}
      >
        {label}
      </p>
      <p style={{ fontSize: "0.875rem", color: "#a1a1a6", fontWeight: 400 }}>
        {value}
      </p>
    </div>
  );
}
