"use client";

export function AgricultureIcon() {
  return (
    <g>
      <path
        d="M35 18 C28 25 28 42 35 50"
        stroke="white"
        strokeWidth="2"
        fill="none"
      />

      {[22, 28, 34, 40].map((y) => (
        <g key={y}>
          <circle cx="30" cy={y} r="2" fill="white" />
          <circle cx="40" cy={y} r="2" fill="white" />
        </g>
      ))}
    </g>
  );
}