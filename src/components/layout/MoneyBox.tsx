"use client";

import { motion } from "framer-motion";

function Banknote({
  value,
  color,
  delay,
  x,
  y,
  rotate,
}: {
  value: string;
  color: string;
  delay: number;
  x: number;
  y: number;
  rotate: number;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.2,
        x: 0,
        y: 0,
        rotate: 0,
      }}
      animate={{
        opacity: [0, 1, 1, 1, 0],
        scale: [0.2, 1, 1, 0.8, 0.05],
        x: [0, x, x, x / 2, 0],
        y: [0, y, y - 20, y / 2, 70],
        rotate: [0, rotate, rotate, rotate / 2, 0],
      }}
      transition={{
        duration: 5,
        delay,
        times: [0, 0.25, 0.55, 0.8, 1],
        ease: "easeInOut",
      }}
      style={{
        left: "50%",
        bottom: "120px",
      }}
      className="absolute z-10 -translate-x-1/2"
    >
      <svg width="130" height="65" viewBox="0 0 130 65">
        <rect
          width="130"
          height="65"
          rx="8"
          fill={color}
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="2"
        />

        <rect
          x="6"
          y="6"
          width="118"
          height="53"
          rx="6"
          fill="transparent"
          stroke="rgba(255,255,255,0.25)"
        />

        <circle
          cx="20"
          cy="20"
          r="8"
          fill="rgba(255,255,255,0.3)"
        />

        <circle
          cx="110"
          cy="45"
          r="8"
          fill="rgba(255,255,255,0.3)"
        />

        <text
          x="65"
          y="38"
          textAnchor="middle"
          fill="white"
          fontSize="22"
          fontWeight="bold"
        >
          {value}
        </text>
      </svg>
    </motion.div>
  );
}

export function MoneyBox() {
  return (
    <div
      className="relative w-[360px] h-[360px] flex items-center justify-center"
      style={{
        perspective: "1200px",
      }}
    >
      {/* Lumière */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 1, 0.6],
          scale: [0.5, 1.5, 1.2, 1],
        }}
        transition={{
          duration: 7,
        }}
        className="absolute bottom-[90px] w-60 h-60 rounded-full bg-yellow-400/50 blur-3xl"
      />

      {/* Particules */}

      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: [0, 1, 0],
            x: Math.cos(i) * 120,
            y: -Math.sin(i) * 120,
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 4,
            delay: 1,
          }}
          className="absolute left-1/2 bottom-[120px] w-2 h-2 rounded-full bg-yellow-300"
        />
      ))}

      {/* Billets */}

      <Banknote
        value="10000"
        color="#8b5cf6"
        delay={1.3}
        x={-140}
        y={-170}
        rotate={-25}
      />

      <Banknote
        value="5000"
        color="#22c55e"
        delay={1.6}
        x={140}
        y={-180}
        rotate={20}
      />

      <Banknote
        value="2000"
        color="#f59e0b"
        delay={1.9}
        x={60}
        y={-230}
        rotate={12}
      />

      <Banknote
        value="1000"
        color="#3b82f6"
        delay={2.2}
        x={-60}
        y={-230}
        rotate={-12}
      />

      {/* Battant gauche */}

      <motion.div
        initial={{
          rotateY: 0,
        }}
        animate={{
          rotateY: [0, -110, -110, 0],
        }}
        transition={{
          duration: 8,
          times: [0, 0.15, 0.8, 1],
          ease: "easeInOut",
        }}
        style={{
          transformOrigin: "right center",
          transformStyle: "preserve-3d",
        }}
        className="absolute z-20 bottom-[160px] left-[70px]"
      >
        <svg width="110" height="70" viewBox="0 0 110 70">
          <rect
            width="110"
            height="70"
            rx="8"
            fill="#007A3D"
          />

          <rect
            x="45"
            y="0"
            width="20"
            height="70"
            fill="#CE1126"
          />

          <rect
            x="0"
            y="0"
            width="110"
            height="8"
            fill="#FCD116"
          />
        </svg>
      </motion.div>

      {/* Battant droit */}

      <motion.div
        initial={{
          rotateY: 0,
        }}
        animate={{
          rotateY: [0, 110, 110, 0],
        }}
        transition={{
          duration: 8,
          times: [0, 0.15, 0.8, 1],
          ease: "easeInOut",
        }}
        style={{
          transformOrigin: "left center",
          transformStyle: "preserve-3d",
        }}
        className="absolute z-20 bottom-[160px] right-[70px]"
      >
        <svg width="110" height="70" viewBox="0 0 110 70">
          <rect
            width="110"
            height="70"
            rx="8"
            fill="#007A3D"
          />

          <rect
            x="45"
            y="0"
            width="20"
            height="70"
            fill="#CE1126"
          />

          <rect
            x="0"
            y="0"
            width="110"
            height="8"
            fill="#FCD116"
          />
        </svg>
      </motion.div>

      {/* Boîte */}

      <svg
        width="260"
        height="180"
        viewBox="0 0 260 180"
        className="absolute bottom-0"
      >
        <rect
          x="20"
          y="20"
          width="220"
          height="140"
          rx="16"
          fill="#007A3D"
        />

        <rect
          x="105"
          y="20"
          width="50"
          height="140"
          fill="#CE1126"
        />

        <rect
          x="20"
          y="20"
          width="220"
          height="15"
          fill="#FCD116"
        />

        <rect
          x="45"
          y="35"
          width="170"
          height="35"
          rx="6"
          fill="#111827"
        />

        <rect
          x="115"
          y="70"
          width="30"
          height="35"
          rx="6"
          fill="#FCD116"
        />
      </svg>
    </div>
  );
}