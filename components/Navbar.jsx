"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function Logo({ size = 32 }) {
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
          id="cv-g-nav"
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
      <rect width="40" height="40" rx="10" fill="url(#cv-g-nav)" />
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

export default function Navbar() {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => setMenuOpen(false), [path]);

  const links = [
    { label: "Home", href: "/" },
    { label: "Discover", href: "/discover" },
    { label: "About", href: "/about" },
  ];

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: "60px",
          background:
            scrolled || menuOpen ? "rgba(0,0,0,0.94)" : "rgba(0,0,0,0.5)",
          backdropFilter: "blur(28px) saturate(1.6)",
          WebkitBackdropFilter: "blur(28px) saturate(1.6)",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.07)"
            : "1px solid transparent",
          transition: "background 0.3s, border-color 0.3s",
        }}
      >
        <div
          style={{
            maxWidth: "1120px",
            margin: "0 auto",
            height: "100%",
            padding: "0 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            href="/"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "9px",
              flexShrink: 0,
            }}
          >
            <Logo size={30} />
            <span
              style={{
                fontWeight: 800,
                fontSize: "1rem",
                letterSpacing: "-0.03em",
                color: "#f5f5f7",
                lineHeight: 1,
              }}
            >
              Cine<span style={{ color: "#2997ff" }}>Vox</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            className="cv-desk"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2px",
              borderRadius: "980px",
            }}
          >
            {links.map(({ label, href }) => (
              <NavLink key={href} href={href} active={path === href}>
                {label}
              </NavLink>
            ))}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Link
              href="/discover"
              className="cv-desk"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "7px 16px",
                borderRadius: "980px",
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.11)",
                color: "#f5f5f7",
                textDecoration: "none",
                fontSize: "0.8rem",
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              Browse Films
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="cv-mob"
              aria-label="Toggle menu"
              style={{
                background: menuOpen ? "rgba(255,255,255,0.08)" : "transparent",
                border: "none",
                cursor: "pointer",
                padding: "8px",
                color: "#f5f5f7",
                lineHeight: 0,
                borderRadius: "8px",
                display: "none",
              }}
            >
              {menuOpen ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                >
                  <line x1="3" y1="7" x2="21" y2="7" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="17" x2="21" y2="17" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        style={{
          position: "fixed",
          top: "60px",
          left: 0,
          right: 0,
          zIndex: 99,
          background: "rgba(4,4,4,0.97)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderBottom: menuOpen ? "1px solid rgba(255,255,255,0.07)" : "none",
          padding: menuOpen ? "6px 20px 20px" : "0 20px",
          maxHeight: menuOpen ? "260px" : "0px",
          overflow: "hidden",
          transition:
            "max-height 0.38s cubic-bezier(0.16,1,0.3,1), padding 0.3s",
        }}
      >
        {links.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "15px 4px",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              color: path === href ? "#2997ff" : "#a1a1a6",
              textDecoration: "none",
              fontWeight: path === href ? 700 : 400,
              fontSize: "1rem",
            }}
          >
            {label}
            {path === href && (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#2997ff"
                strokeWidth="2.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            )}
          </Link>
        ))}
        <Link
          href="/discover"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "14px",
            padding: "14px",
            borderRadius: "14px",
            background: "#2997ff",
            color: "#fff",
            textDecoration: "none",
            fontWeight: 700,
            fontSize: "0.9rem",
          }}
        >
          Browse Films
        </Link>
      </div>

      <style>{`
        @media (max-width: 680px) {
          .cv-desk { display: none !important; }
          .cv-mob  { display: flex !important; }
        }
      `}</style>
    </>
  );
}

function NavLink({ href, active, children }) {
  const [hov, setHov] = useState(false);
  return (
    <Link
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        padding: "8px 16px",
        borderRadius: "980px",
        fontSize: "0.85rem",
        fontWeight: active ? 600 : 400,
        letterSpacing: "-0.01em",
        color: active ? "#f5f5f7" : hov ? "#d1d1d6" : "#a1a1a6",
        background: active
          ? "rgba(255,255,255,0.09)"
          : hov
            ? "rgba(255,255,255,0.05)"
            : "transparent",
        transition: "all 0.15s",
        position: "relative",
        whiteSpace: "nowrap",
      }}
    >
      {children}
      {active && (
        <span
          style={{
            position: "absolute",
            bottom: 3,
            left: "50%",
            transform: "translateX(-50%)",
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: "#2997ff",
          }}
        />
      )}
    </Link>
  );
}
