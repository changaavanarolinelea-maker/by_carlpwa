"use client";

import React from "react";

type Props = {
  value: string;
  color1: string;
  color2: string;
  icon: React.ReactNode;
};

export function BanknoteFrame({
  value,
  color1,
  color2,
  icon,
}: Props) {
  const gradientId = `gradient-${value}`;

  return (
    <svg width="140" height="70" viewBox="0 0 140 70">
      <defs>
        <linearGradient
          id={gradientId}
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop offset="0%" stopColor={color1} />
          <stop offset="100%" stopColor={color2} />
        </linearGradient>

        <pattern
          id={`pattern-${value}`}
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <circle
            cx="4"
            cy="4"
            r="1"
            fill="rgba(255,255,255,0.08)"
          />
        </pattern>
      </defs>

      {/* Fond */}

      <rect
        width="140"
        height="70"
        rx="10"
        fill={`url(#${gradientId})`}
      />

      {/* Texture */}

      <rect
        width="140"
        height="70"
        rx="10"
        fill={`url(#pattern-${value})`}
      />

      {/* Bordure */}

      <rect
        x="4"
        y="4"
        width="132"
        height="62"
        rx="8"
        fill="none"
        stroke="rgba(255,255,255,0.4)"
      />

      {/* Bande sécurité */}

      <rect
        x="108"
        y="0"
        width="12"
        height="70"
        fill="rgba(255,255,255,0.18)"
      />

      {/* Filigrane */}

      <circle
        cx="35"
        cy="35"
        r="20"
        fill="rgba(255,255,255,0.12)"
      />

      {/* Illustration */}

      {icon}

      {/* Valeur */}

      <text
        x="82"
        y="38"
        textAnchor="middle"
        fill="white"
        fontSize="22"
        fontWeight="bold"
      >
        {value}
      </text>

      <text
        x="82"
        y="54"
        textAnchor="middle"
        fill="rgba(255,255,255,0.8)"
        fontSize="10"
      >
        FCFA
      </text>

      {/* Série */}

      <text
        x="8"
        y="12"
        fill="rgba(255,255,255,0.65)"
        fontSize="6"
      >
        BYCARL-{value}
      </text>

      {/* Coins */}

      <circle cx="10" cy="10" r="3" fill="white" opacity="0.25" />
      <circle cx="130" cy="10" r="3" fill="white" opacity="0.25" />
      <circle cx="10" cy="60" r="3" fill="white" opacity="0.25" />
      <circle cx="130" cy="60" r="3" fill="white" opacity="0.25" />
    </svg>
  );
}