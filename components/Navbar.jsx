"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const path = usePathname();

  const links = [
    { label: "Home", href: "/" },
    { label: "Discover", href: "/discover" },
    { label: "About", href: "/about" },
  ];

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: "72px",
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        background: "rgba(8,9,10,0.80)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* ── Logo ── */}
        <Link
          href="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #4f8ef7 0%, #7c6af7 100%)",
              boxShadow: "0 0 20px rgba(79,142,247,0.35)",
              flexShrink: 0,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M18 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3ZM8 17H6v-2h2v2Zm0-4H6v-2h2v2Zm0-4H6V7h2v2Zm6 8h-4v-2h4v2Zm0-4h-4v-2h4v2Zm0-4h-4V7h4v2Zm4 8h-2v-2h2v2Zm0-4h-2v-2h2v2Zm0-4h-2V7h2v2Z" />
            </svg>
          </div>
          <span
            style={{
              fontWeight: 700,
              fontSize: "1.05rem",
              letterSpacing: "-0.03em",
              color: "#f5f5f7",
              lineHeight: 1,
            }}
          >
            Cine<span style={{ color: "#2997ff" }}>Vox</span>
          </span>
        </Link>

        {/* ── Nav links ── */}
        <nav style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          {links.map(({ label, href }) => {
            const active = path === href;
            return (
              <Link
                key={href}
                href={href}
                style={{
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "7px 16px",
                  borderRadius: "8px",
                  fontSize: "0.875rem",
                  lineHeight: 1,
                  whiteSpace: "nowrap",
                  fontWeight: active ? 600 : 400,
                  letterSpacing: "0.01em",
                  color: active ? "#f0f2f5" : "#6b7280",
                  background: active ? "rgba(255,255,255,0.07)" : "transparent",
                  border: active
                    ? "1px solid rgba(255,255,255,0.08)"
                    : "1px solid transparent",
                  transition: "color 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.color = "#d1d5db";
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.color = "#6b7280";
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
