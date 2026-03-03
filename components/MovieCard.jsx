"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function MovieCard({ movie }) {
  const [hov, setHov] = useState(false);
  const hasPoster = movie.Poster && movie.Poster !== "N/A";

  return (
    <Link
      href={`/movie/${movie.imdbID}`}
      style={{ textDecoration: "none", display: "block" }}
    >
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          borderRadius: "16px",
          overflow: "hidden",
          background: "#111",
          border: hov
            ? "1px solid rgba(41,151,255,0.3)"
            : "1px solid rgba(255,255,255,0.07)",
          transform: hov
            ? "translateY(-6px) scale(1.01)"
            : "translateY(0) scale(1)",
          transition:
            "transform 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.25s, box-shadow 0.35s",
          boxShadow: hov
            ? "0 24px 48px rgba(0,0,0,0.7)"
            : "0 2px 8px rgba(0,0,0,0.3)",
          cursor: "pointer",
        }}
      >
        {/* Poster */}
        <div
          style={{
            position: "relative",
            height: "300px",
            background: "#1a1a1a",
            overflow: "hidden",
          }}
        >
          {hasPoster ? (
            <Image
              src={movie.Poster}
              alt={movie.Title}
              fill
              style={{
                objectFit: "cover",
                transform: hov ? "scale(1.04)" : "scale(1)",
                transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#3a3a3c"
                strokeWidth="1.5"
              >
                <rect x="2" y="2" width="20" height="20" rx="2.18" />
                <line x1="7" y1="2" x2="7" y2="22" />
                <line x1="17" y1="2" x2="17" y2="22" />
                <line x1="2" y1="12" x2="22" y2="12" />
              </svg>
            </div>
          )}
          {/* Gradient */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(17,17,17,1) 0%, rgba(17,17,17,0.3) 50%, transparent 100%)",
            }}
          />

          {/* Rating pill */}
          <div
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              padding: "4px 10px",
              borderRadius: "980px",
              background: "rgba(0,0,0,0.75)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
            }}
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="#f5a623"
              stroke="#f5a623"
              strokeWidth="1"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                color: "#f5a623",
                letterSpacing: "0.02em",
              }}
            >
              {movie.imdbRating}
            </span>
          </div>
        </div>

        {/* Info */}
        <div style={{ padding: "16px 18px 18px" }}>
          <p
            style={{
              fontWeight: 700,
              fontSize: "0.92rem",
              color: hov ? "#2997ff" : "#f5f5f7",
              letterSpacing: "-0.02em",
              lineHeight: 1.3,
              marginBottom: "5px",
              transition: "color 0.2s",
            }}
          >
            {movie.Title}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{ fontSize: "0.72rem", color: "#48484a", fontWeight: 400 }}
            >
              {movie.Year}
            </span>
            {movie.Genre && (
              <>
                <span
                  style={{
                    width: 2,
                    height: 2,
                    borderRadius: "50%",
                    background: "#3a3a3c",
                    display: "inline-block",
                  }}
                />
                <span
                  style={{
                    fontSize: "0.72rem",
                    color: "#48484a",
                    fontWeight: 400,
                  }}
                >
                  {movie.Genre.split(",")[0]}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
