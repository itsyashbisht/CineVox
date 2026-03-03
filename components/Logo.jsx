export default function Logo({ size = 32 }) {
  const r = size / 40; // scale ratio

  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <defs>
        <linearGradient
          id="cv-g"
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

      {/* Rounded square bg */}
      <rect width="40" height="40" rx="10" fill="url(#cv-g)" />

      {/* Film strip corner perforations */}
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

      {/* Camera aperture — dark inner circle */}
      <circle cx="20" cy="20" r="8.5" fill="rgba(0,0,0,0.3)" />

      {/* Aperture blades — 6 rotated rects */}
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <rect
          key={angle}
          x="18.5"
          y="12.5"
          width="3"
          height="6"
          rx="1.5"
          fill="white"
          opacity="0.85"
          transform={`rotate(${angle} 20 20)`}
        />
      ))}

      {/* Voice waveform bars — overlaid, represent "Vox" */}
      <rect x="14" y="17.5" width="2.2" height="5" rx="1.1" fill="white" />
      <rect x="17.5" y="15" width="2.2" height="10" rx="1.1" fill="white" />
      <rect x="21" y="16.5" width="2.2" height="7" rx="1.1" fill="white" />
      <rect x="24.5" y="18.5" width="2.2" height="3" rx="1.1" fill="white" />
    </svg>
  );
}
