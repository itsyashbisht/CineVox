import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MovieCard from "@/components/MovieCard";
import { fetchPopularMovies } from "@/lib/omdb";

export default async function DiscoverPage() {
  let movies = [];
  try {
    movies = await fetchPopularMovies();
  } catch {}

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
        {/* Ambient */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "800px",
            height: "400px",
            background:
              "radial-gradient(ellipse, rgba(41,151,255,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <div
          style={{
            maxWidth: "1120px",
            margin: "0 auto",
            padding: "0 28px",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Header */}
          <div
            style={{
              paddingTop: "136px",
              paddingBottom: "64px",
              textAlign: "center",
            }}
          >
            <p
              className="anim-fadeUp t-label"
              style={{ marginBottom: "16px", color: "#48484a" }}
            >
              Curated Selection
            </p>
            <h1
              className="anim-fadeUp d-1"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "clamp(2.4rem, 6vw, 4rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                color: "#f5f5f7",
                marginBottom: "18px",
              }}
            >
              Popular Films
            </h1>
            <p
              className="anim-fadeUp d-2"
              style={{
                fontSize: "1rem",
                color: "#6e6e73",
                maxWidth: "380px",
                margin: "0 auto",
                lineHeight: 1.65,
                fontWeight: 400,
              }}
            >
              Click any film to generate its full AI sentiment report instantly.
            </p>
          </div>

          {/* Grid */}
          {movies.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "80px 0",
                color: "#3a3a3c",
              }}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                style={{ margin: "0 auto 16px", display: "block" }}
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p style={{ fontSize: "0.9rem" }}>
                Could not load movies. Check your OMDB API key.
              </p>
            </div>
          ) : (
            <div
              className="anim-fadeUp d-3"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "18px",
                paddingBottom: "100px",
              }}
            >
              {movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
