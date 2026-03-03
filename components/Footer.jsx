"use client";
import { useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Discover", href: "/discover" },
  { label: "About", href: "/about" },
];

const STACK_LINKS = [
  { label: "Next.js 16", href: "#" },
  { label: "Groq AI", href: "#" },
  { label: "OMDB API", href: "#" },
];

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(255,255,255,0.07)",
        background: "#000",
        padding: "56px 28px 40px",
      }}
    >
      <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
        {/* Top */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "40px",
            marginBottom: "48px",
          }}
        >
          {/* Brand */}
          <div>
            <Link
              href="/"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "14px",
              }}
            >
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "8px",
                  background: "linear-gradient(145deg, #2997ff, #0071e3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
                  <path d="M18 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3ZM8 17H6v-2h2v2Zm0-4H6v-2h2v2Zm0-4H6V7h2v2Zm6 8h-4v-2h4v2Zm0-4h-4v-2h4v2Zm0-4h-4V7h4v2Zm4 8h-2v-2h2v2Zm0-4h-2v-2h2v2Zm0-4h-2V7h2v2Z" />
                </svg>
              </div>
              <span
                style={{
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  letterSpacing: "-0.02em",
                  color: "#f5f5f7",
                }}
              >
                Cine<span style={{ color: "#2997ff" }}>Vox</span>
              </span>
            </Link>
            <p
              style={{
                fontSize: "0.8rem",
                color: "#48484a",
                maxWidth: "200px",
                lineHeight: 1.6,
              }}
            >
              AI-powered film sentiment analysis. Built for the Brew internship.
            </p>
          </div>

          {/* Link columns */}
          <div style={{ display: "flex", gap: "64px", flexWrap: "wrap" }}>
            <FooterCol title="Navigate" links={NAV_LINKS} />
            <FooterCol title="Stack" links={STACK_LINKS} />
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "rgba(255,255,255,0.07)",
            marginBottom: "28px",
          }}
        />

        {/* Bottom */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <p style={{ fontSize: "0.72rem", color: "#48484a" }}>
            © 2026 CineVox. Crafted for Brew internship review.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#30d158",
                display: "inline-block",
                boxShadow: "0 0 6px #30d158",
              }}
            />
            <span style={{ fontSize: "0.72rem", color: "#48484a" }}>
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <p
        style={{
          fontSize: "0.68rem",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#48484a",
          marginBottom: "16px",
        }}
      >
        {title}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {links.map((l) => (
          <FooterLink key={l.label} href={l.href} label={l.label} />
        ))}
      </div>
    </div>
  );
}

function FooterLink({ href, label }) {
  const [hov, setHov] = useState(false);
  return (
    <Link
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontSize: "0.82rem",
        color: hov ? "#f5f5f7" : "#a1a1a6",
        textDecoration: "none",
        fontWeight: 400,
        transition: "color 0.15s",
      }}
    >
      {label}
    </Link>
  );
}
