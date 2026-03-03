"use client";
import { useState } from "react";
import Link from "next/link";

function Logo({ size = 28 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      style={{ display: "block", flexShrink: 0 }}
    >
      <defs>
        <linearGradient
          id="cv-g-foot"
          x1="0"
          y1="0"
          x2="40"
          y2="40"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#2997ff" />
          <stop offset="100%" stopColor="#0071e3" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="10" fill="url(#cv-g-foot)" />
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
          opacity="0.85"
          transform={`rotate(${a} 20 20)`}
        />
      ))}
      <rect x="14" y="17.5" width="2.2" height="5" rx="1.1" fill="white" />
      <rect x="17.5" y="15" width="2.2" height="10" rx="1.1" fill="white" />
      <rect x="21" y="16.5" width="2.2" height="7" rx="1.1" fill="white" />
      <rect x="24.5" y="18.5" width="2.2" height="3" rx="1.1" fill="white" />
    </svg>
  );
}

const NAV = [
  { label: "Home", href: "/" },
  { label: "Discover", href: "/discover" },
  { label: "About", href: "/about" },
];
const STACK = [
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
        padding: "clamp(36px,6vw,52px) 20px 28px",
      }}
    >
      <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "32px",
            marginBottom: "36px",
          }}
        >
          {/* Brand */}
          <div style={{ minWidth: "140px" }}>
            <Link
              href="/"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "9px",
                marginBottom: "10px",
              }}
            >
              <Logo size={26} />
              <span
                style={{
                  fontWeight: 800,
                  fontSize: "0.95rem",
                  letterSpacing: "-0.03em",
                  color: "#f5f5f7",
                }}
              >
                Cine<span style={{ color: "#2997ff" }}>Vox</span>
              </span>
            </Link>
            <p
              style={{
                fontSize: "0.76rem",
                color: "#48484a",
                maxWidth: "180px",
                lineHeight: 1.65,
              }}
            >
              AI-powered film sentiment. Built for the Brew internship.
            </p>
          </div>

          {/* Columns */}
          <div style={{ display: "flex", gap: "44px", flexWrap: "wrap" }}>
            <FooterCol title="Navigate" links={NAV} />
            <FooterCol title="Stack" links={STACK} />
          </div>
        </div>

        <div
          style={{
            height: "1px",
            background: "rgba(255,255,255,0.06)",
            marginBottom: "20px",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <p style={{ fontSize: "0.68rem", color: "#48484a" }}>
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
            <span style={{ fontSize: "0.68rem", color: "#48484a" }}>
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
          fontSize: "0.62rem",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#48484a",
          marginBottom: "12px",
        }}
      >
        {title}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
        {links.map((l) => (
          <FLink key={l.label} href={l.href} label={l.label} />
        ))}
      </div>
    </div>
  );
}

function FLink({ href, label }) {
  const [hov, setHov] = useState(false);
  return (
    <Link
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontSize: "0.8rem",
        color: hov ? "#f5f5f7" : "#a1a1a6",
        textDecoration: "none",
        transition: "color 0.15s",
      }}
    >
      {label}
    </Link>
  );
}
