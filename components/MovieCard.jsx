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
            ? "1px solid rgba(41,151,255,0.35)"
            : "1px solid rgba(255,255,255,0.08)",
          transform: hov
            ? "translateY(-6px) scale(1.01)"
            : "translateY(0) scale(1)",
          transition:
            "transform 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.25s, box-shadow 0.35s",
          boxShadow: hov
            ? "0 24px 48px rgba(0,0,0,0.75)"
            : "0 2px 12px rgba(0,0,0,0.4)",
          cursor: "pointer",
        }}
      >
        {/* Poster */}
        <div
          style={{
            position: "relative",
            aspectRatio: "2/3",
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
                transform: hov ? "scale(1.05)" : "scale(1)",
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

          {/* Bottom gradient for text readability */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(17,17,17,0.98) 0%, rgba(17,17,17,0.3) 45%, transparent 100%)",
            }}
          />

          {/* Subtle blue tint on hover */}
          {hov && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(41,151,255,0.06)",
                transition: "opacity 0.3s",
              }}
            />
          )}

          {/* Rating pill */}
          <div
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              display: "flex",
              alignItems: "center",
              gap: "4px",
              padding: "4px 9px",
              borderRadius: "980px",
              background: "rgba(0,0,0,0.82)",
              border: "1px solid rgba(255,255,255,0.12)",
              backdropFilter: "blur(12px)",
            }}
          >
            <svg
              width="9"
              height="9"
              viewBox="0 0 24 24"
              fill="#f5a623"
              stroke="#f5a623"
              strokeWidth="1"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span
              style={{ fontSize: "0.68rem", fontWeight: 700, color: "#f5a623" }}
            >
              {movie.imdbRating}
            </span>
          </div>
        </div>

        {/* Info — fixed 82px height keeps every card identical */}
        <div
          style={{
            padding: "14px 16px 16px",
            height: "82px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <p
            style={{
              fontWeight: 700,
              fontSize: "0.875rem",
              color: hov ? "#2997ff" : "#f5f5f7",
              letterSpacing: "-0.02em",
              lineHeight: 1.3,
              transition: "color 0.2s",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {movie.Title}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span
              style={{
                fontSize: "0.68rem",
                color: "#48484a",
                whiteSpace: "nowrap",
              }}
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
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: "0.68rem",
                    color: "#48484a",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
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
