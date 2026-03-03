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
  let movie = null,
    error = null;
  let sentiment = {
    summary: "Sentiment analysis could not be completed.",
    classification: "mixed",
  };

  try {
    movie = await withTimeout(fetchMovie(id), 5000);
  } catch (e) {
    error =
      e.message === "timeout"
        ? "Request timed out."
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
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "min(700px,100vw)",
            height: "350px",
            background:
              "radial-gradient(ellipse,rgba(41,151,255,0.05) 0%,transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <div
          style={{
            maxWidth: "960px",
            margin: "0 auto",
            padding: "clamp(80px,12vw,128px) 20px clamp(48px,7vw,80px)",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Error */}
          {error && (
            <div
              className="anim-scaleIn"
              style={{
                textAlign: "center",
                padding: "clamp(48px,8vw,80px) 20px",
              }}
            >
              <div style={{ fontSize: "2.6rem", marginBottom: "14px" }}>🎬</div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "clamp(1.3rem,4vw,1.8rem)",
                  color: "#f5f5f7",
                  marginBottom: "10px",
                }}
              >
                Film not found
              </h2>
              <p
                style={{
                  color: "#6e6e73",
                  marginBottom: "28px",
                  fontSize: "0.9rem",
                }}
              >
                {error}
              </p>
              <a
                href="/"
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

          {movie && (
            <>
              {/* Poster + meta — row on desktop, column on mobile */}
              <div
                className="anim-fadeUp"
                style={{
                  display: "flex",
                  gap: "clamp(20px,5vw,48px)",
                  marginBottom: "clamp(36px,6vw,60px)",
                  flexWrap: "wrap",
                }}
              >
                {/* Poster */}
                <div
                  style={{
                    flexShrink: 0,
                    width: "clamp(120px,30vw,190px)",
                    aspectRatio: "2/3",
                    borderRadius: "14px",
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "#111",
                    position: "relative",
                    boxShadow: "0 32px 64px rgba(0,0,0,0.65)",
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
                        fontSize: "0.75rem",
                      }}
                    >
                      No Poster
                    </div>
                  )}
                </div>

                {/* Meta */}
                <div style={{ flex: 1, minWidth: "min(200px,100%)" }}>
                  {/* Genres */}
                  <div
                    style={{
                      display: "flex",
                      gap: "6px",
                      flexWrap: "wrap",
                      marginBottom: "14px",
                    }}
                  >
                    {genres.map((g) => (
                      <span
                        key={g}
                        style={{
                          padding: "3px 9px",
                          borderRadius: "980px",
                          fontSize: "0.6rem",
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

                  <h1
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 900,
                      fontSize: "clamp(1.5rem,4vw,2.6rem)",
                      letterSpacing: "-0.03em",
                      lineHeight: 1.05,
                      color: "#f5f5f7",
                      marginBottom: "14px",
                    }}
                  >
                    {movie.Title}
                  </h1>

                  {/* Stats row */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "18px",
                      flexWrap: "wrap",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <svg
                        width="12"
                        height="12"
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
                          fontSize: "0.875rem",
                        }}
                      >
                        {movie.imdbRating}
                      </span>
                      <span style={{ fontSize: "0.7rem", color: "#3a3a3c" }}>
                        IMDb
                      </span>
                    </div>
                    <Dot />
                    <span style={{ fontSize: "0.78rem", color: "#6e6e73" }}>
                      {movie.Year}
                    </span>
                    <Dot />
                    <span style={{ fontSize: "0.78rem", color: "#6e6e73" }}>
                      {movie.Runtime}
                    </span>
                    {movie.Rated && movie.Rated !== "N/A" && (
                      <>
                        <Dot />
                        <span
                          style={{
                            fontSize: "0.65rem",
                            fontWeight: 600,
                            color: "#6e6e73",
                            border: "1px solid #3a3a3c",
                            padding: "1px 5px",
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
                      fontSize: "clamp(0.82rem,2vw,0.9rem)",
                      color: "#6e6e73",
                      lineHeight: 1.75,
                      marginBottom: "20px",
                      maxWidth: "460px",
                    }}
                  >
                    {movie.Plot}
                  </p>

                  <MetaRow label="Director" value={movie.Director} />
                  <div style={{ marginTop: "12px" }}>
                    <p
                      style={{
                        fontSize: "0.6rem",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#3a3a3c",
                        marginBottom: "7px",
                      }}
                    >
                      Cast
                    </p>
                    <div
                      style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}
                    >
                      {cast.map((a) => (
                        <span
                          key={a}
                          style={{
                            padding: "3px 10px",
                            borderRadius: "980px",
                            fontSize: "0.73rem",
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

              <div
                style={{
                  height: "1px",
                  background: "rgba(255,255,255,0.06)",
                  marginBottom: "36px",
                }}
              />

              {/* Sentiment */}
              <div
                className="anim-fadeUp d-2"
                style={{
                  padding: "clamp(22px,5vw,36px)",
                  borderRadius: "20px",
                  background: sc.bg,
                  border: `1px solid ${sc.border}`,
                  marginBottom: "28px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "12px",
                    flexWrap: "wrap",
                    marginBottom: "16px",
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontSize: "0.6rem",
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "#3a3a3c",
                        marginBottom: "6px",
                      }}
                    >
                      AI Analysis · Groq Llama 3.1
                    </p>
                    <h2
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 800,
                        fontSize: "clamp(1rem,3vw,1.35rem)",
                        color: "#f5f5f7",
                        letterSpacing: "-0.03em",
                      }}
                    >
                      Audience Sentiment
                    </h2>
                  </div>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "7px",
                      padding: "7px 15px",
                      borderRadius: "980px",
                      background: sc.bg,
                      border: `1px solid ${sc.border}`,
                    }}
                  >
                    <span
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        background: sc.color,
                        display: "inline-block",
                        boxShadow: `0 0 8px ${sc.color}`,
                      }}
                    />
                    <span
                      style={{
                        fontSize: "0.73rem",
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
                    fontSize: "clamp(0.84rem,2vw,0.95rem)",
                    color: "#a1a1a6",
                    lineHeight: 1.8,
                  }}
                >
                  {sentiment.summary}
                </p>
              </div>

              {/* Ratings */}
              {movie.Ratings?.length > 0 && (
                <div
                  className="anim-fadeUp d-3"
                  style={{ marginBottom: "clamp(36px,6vw,52px)" }}
                >
                  <p
                    style={{
                      fontSize: "0.6rem",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#3a3a3c",
                      marginBottom: "12px",
                    }}
                  >
                    Critical Ratings
                  </p>
                  <div
                    style={{ display: "flex", gap: "9px", flexWrap: "wrap" }}
                  >
                    {movie.Ratings.map((r) => (
                      <div
                        key={r.Source}
                        style={{
                          padding: "13px 18px",
                          borderRadius: "12px",
                          background: "#111",
                          border: "1px solid rgba(255,255,255,0.06)",
                          minWidth: "100px",
                          flex: "1 1 auto",
                          maxWidth: "180px",
                        }}
                      >
                        <p
                          style={{
                            fontFamily: "var(--font-display)",
                            fontWeight: 800,
                            fontSize: "1.05rem",
                            color: "#f5f5f7",
                            marginBottom: "3px",
                          }}
                        >
                          {r.Value}
                        </p>
                        <p
                          style={{
                            fontSize: "0.67rem",
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

              <a href="/" className="back-link">
                <svg
                  width="15"
                  height="15"
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
          fontSize: "0.6rem",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#3a3a3c",
          marginBottom: "4px",
        }}
      >
        {label}
      </p>
      <p style={{ fontSize: "0.84rem", color: "#a1a1a6" }}>{value}</p>
    </div>
  );
}
