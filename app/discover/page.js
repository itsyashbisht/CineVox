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
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "min(800px,100vw)",
            height: "40vh",
            background:
              "radial-gradient(ellipse,rgba(41,151,255,0.06) 0%,transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <div
          style={{
            maxWidth: "1120px",
            margin: "0 auto",
            padding: "0 20px",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Header */}
          <div
            style={{
              paddingTop: "clamp(88px,12vw,128px)",
              paddingBottom: "clamp(36px,6vw,56px)",
              textAlign: "center",
            }}
          >
            <p className="anim-fadeUp t-label" style={{ marginBottom: "12px" }}>
              Curated Selection
            </p>
            <h1
              className="anim-fadeUp d-1"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "clamp(1.9rem,6vw,3.8rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                color: "#f5f5f7",
                marginBottom: "14px",
              }}
            >
              Popular Films
            </h1>
            <p
              className="anim-fadeUp d-2"
              style={{
                fontSize: "clamp(0.85rem,2vw,1rem)",
                color: "#6e6e73",
                maxWidth: "320px",
                margin: "0 auto",
                lineHeight: 1.65,
              }}
            >
              Click any film to generate its AI sentiment report instantly.
            </p>
          </div>

          {/* Grid */}
          {movies.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                color: "#3a3a3c",
              }}
            >
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                style={{ margin: "0 auto 14px", display: "block" }}
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p style={{ fontSize: "0.88rem" }}>
                Could not load movies. Check your OMDB API key.
              </p>
            </div>
          ) : (
            <div
              className="anim-fadeUp d-3"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, 170px)",
                justifyContent: "center",
                gap: "16px",
                padding: "0 8px clamp(60px,9vw,100px)", // ← 8px side padding for breathing room
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
