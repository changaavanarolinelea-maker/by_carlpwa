export function Banknote10000() {
  return (
    <svg width="140" height="70" viewBox="0 0 140 70">
      <defs>
        <linearGradient id="bg10000" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#A78BFA" />
        </linearGradient>

        <linearGradient id="holo" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      <rect
        width="140"
        height="70"
        rx="10"
        fill="url(#bg10000)"
      />

      <rect
        x="4"
        y="4"
        width="132"
        height="62"
        rx="8"
        fill="none"
        stroke="rgba(255,255,255,0.4)"
      />

      {/* Bande holographique */}
      <rect
        x="108"
        y="0"
        width="12"
        height="70"
        fill="url(#holo)"
      />

      {/* Motif central */}
      <circle
        cx="40"
        cy="35"
        r="18"
        fill="rgba(255,255,255,0.15)"
      />

      <circle
        cx="40"
        cy="35"
        r="10"
        fill="rgba(255,255,255,0.10)"
      />

      {/* Numéro */}
      <text
        x="78"
        y="40"
        textAnchor="middle"
        fill="white"
        fontSize="24"
        fontWeight="bold"
      >
        10000
      </text>

      {/* FCFA */}
      <text
        x="78"
        y="58"
        textAnchor="middle"
        fill="rgba(255,255,255,0.8)"
        fontSize="10"
      >
        FCFA
      </text>

      {/* Numéro de série */}
      <text
        x="10"
        y="14"
        fill="rgba(255,255,255,0.7)"
        fontSize="7"
      >
        BC-2026-10000
      </text>

      {/* Coins décoratifs */}
      <circle cx="10" cy="10" r="3" fill="white" opacity="0.3" />
      <circle cx="130" cy="10" r="3" fill="white" opacity="0.3" />
      <circle cx="10" cy="60" r="3" fill="white" opacity="0.3" />
      <circle cx="130" cy="60" r="3" fill="white" opacity="0.3" />
    </svg>
  );
}