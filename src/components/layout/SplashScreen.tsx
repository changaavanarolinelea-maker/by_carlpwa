"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";

const CLE_SESSION = "by-carl-splash-vu";
const DUREE_ANIMATION_S = 5;
const DUREE_FADE_MS = 400;
const DURATION_STR = `${DUREE_ANIMATION_S}s`;
const EASE_BOX = "cubic-bezier(0.65, 0, 0.35, 1)";
const EASE_ITEM = "cubic-bezier(0.45, 0, 0.3, 1)";

const GOLD = "#F4D67A";

// ---- Données de base (valeurs à échelle 1) — la mise à l'échelle réelle se
// fait dans useMemo ci-dessous, selon la largeur de l'écran. ----

const BASE_BILLS = [
  { value: "1000", top: "#6E8C74", bottom: "#3F5747", dx: -150, dy: -170, dx2: -100, dy2: -200, rot: -12 },
  { value: "2000", top: "#C68A3E", bottom: "#7A4A18", dx: 140, dy: -190, dx2: 90, dy2: -150, rot: 10 },
  { value: "5000", top: "#C97A57", bottom: "#8A4530", dx: -100, dy: -230, dx2: -160, dy2: -180, rot: 8 },
  { value: "10000", top: "#B85A50", bottom: "#6E2E28", dx: 110, dy: -240, dx2: 160, dy2: -190, rot: -9 },
];

const BASE_COINS = [
  { value: "100", size: 30, top: "#F4D67A", bottom: "#A66A28", dx: -60, dy: -260, rot: 30 },
  { value: "50", size: 24, top: "#F7E7A6", bottom: "#B9852E", dx: 60, dy: -270, rot: -25 },
  { value: "25", size: 20, top: "#F4D67A", bottom: "#A66A28", dx: 0, dy: -300, rot: 45 },
];

const SPARKLE_COUNT = 10;

// Échelle responsive : plus petit sur mobile, plus grand sur desktop/tablette.
function computeScale(viewportWidth: number): number {
  if (viewportWidth <= 360) return 0.8;
  if (viewportWidth <= 400) return 0.9;
  if (viewportWidth <= 480) return 1.0;
  if (viewportWidth <= 640) return 1.15;
  return 1.35;
}

function useResponsiveScale() {
  const [scale, setScale] = useState(1); // valeur neutre avant la première mesure (évite tout flash au montage)

  useEffect(() => {
    function update() {
      setScale(computeScale(window.innerWidth));
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return scale;
}

function useDims(S: number) {
  return useMemo(() => {
    const BOX_W = 260 * S;
    const BOX_H = 160 * S;
    const LID_W = 260 * S;
    const LID_H = 90 * S;
    const BOX_FRONT_TOP = 70 * S; // bord de la boîte, dérivé du viewBox 260x160
    const LID_TOP = BOX_FRONT_TOP - LID_H - 2 * S; // couvercle collé au bord (+léger recouvrement)

    const BILL_W = 150 * S;
    const BILL_H = 75 * S;
    const BILL_BOTTOM = 78 * S;
    const BILL_LEFT = (BOX_W - BILL_W) / 2;

    const COIN_BOTTOM = 90 * S;
    const COIN_LEFT_BASE = BOX_W / 2;

    const SPARKLE_BOTTOM = 95 * S;
    const SPARKLE_LEFT_BASE = BOX_W / 2;

    const BILLS = BASE_BILLS.map((b) => ({
      ...b,
      dx: b.dx * S,
      dy: b.dy * S,
      dx2: b.dx2 * S,
      dy2: b.dy2 * S,
    }));

    const COINS = BASE_COINS.map((c) => ({
      ...c,
      size: c.size * S,
      dx: c.dx * S,
      dy: c.dy * S,
    }));

    const SPARKLES = Array.from({ length: SPARKLE_COUNT }, (_, i) => {
      const angle = (i / SPARKLE_COUNT) * Math.PI * 2;
      const radius = (90 + (i % 3) * 30) * S;
      return {
        dx: Math.cos(angle) * radius,
        dy: Math.sin(angle) * radius - 120 * S,
        size: (6 + (i % 3) * 4) * S,
        delay: (i % 5) * 0.08, // petit décalage, indépendant de l'échelle
      };
    });

    const GLOW_BOTTOM = BOX_FRONT_TOP - 30 * S;
    const GLOW_SIZE = 220 * S;
    const SHADOW_BOTTOM = 28 * S;
    const SHADOW_W = 220 * S;
    const SHADOW_H = 26 * S;

    return {
      BOX_W, BOX_H, LID_W, LID_H, LID_TOP,
      BILL_W, BILL_H, BILL_BOTTOM, BILL_LEFT,
      COIN_BOTTOM, COIN_LEFT_BASE,
      SPARKLE_BOTTOM, SPARKLE_LEFT_BASE,
      BILLS, COINS, SPARKLES,
      GLOW_BOTTOM, GLOW_SIZE,
      SHADOW_BOTTOM, SHADOW_W, SHADOW_H,
    };
  }, [S]);
}

type Dims = ReturnType<typeof useDims>;
type BillDef = Dims["BILLS"][number];
type CoinDef = Dims["COINS"][number];
type SparkDef = Dims["SPARKLES"][number];

function BillFace({ bill, width, height }: { bill: BillDef; width: number; height: number }) {
  const id = `grad-bill-${bill.value}`;
  return (
    <svg viewBox="0 0 220 110" width={width} height={height} style={{ display: "block" }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={bill.top} />
          <stop offset="100%" stopColor={bill.bottom} />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="216" height="106" rx="10" fill={`url(#${id})`} stroke={GOLD} strokeWidth="2" />
      <rect x="7" y="7" width="206" height="96" rx="7" fill="none" stroke={GOLD} strokeWidth="1" opacity="0.6" />
      <path d="M0 30 Q 20 20 40 30 T 80 30 T 120 30 T 160 30 T 200 30 T 240 30" fill="none" stroke="rgba(244,214,122,0.25)" strokeWidth="1" />
      <path d="M0 82 Q 20 92 40 82 T 80 82 T 120 82 T 160 82 T 200 82 T 240 82" fill="none" stroke="rgba(244,214,122,0.25)" strokeWidth="1" />
      <circle cx="42" cy="55" r="27" fill="rgba(244,214,122,0.18)" stroke={GOLD} strokeWidth="1.5" />
      <path
        d="M22 62 c2 -10 8 -16 20 -16 c9 0 14 4 17 10 c2 4 1 6 -2 6 c-2 0 -3 -2 -5 -2 c0 3 -1 5 -3 6 l1 6 h-5 l-1 -5 c-2 1 -4 1 -6 0 l-1 5 h-5 l1 -6 c-6 -1 -10 -4 -11 -4z"
        fill="rgba(244,214,122,0.55)"
      />
      <path d="M198 18 l2.6 5.4 5.9 0.8 -4.3 4.2 1 5.9 -5.2 -2.8 -5.2 2.8 1 -5.9 -4.3 -4.2 5.9 -0.8z" fill={GOLD} opacity="0.85" />
      <text x="120" y="48" fontFamily="Georgia, serif" fontSize="26" fontWeight={700} fill={GOLD} textAnchor="middle">{bill.value}</text>
      <text x="120" y="70" fontFamily="Arial, sans-serif" fontSize="12" letterSpacing="3" fill={GOLD} textAnchor="middle">FRANCS CFA</text>
      <text x="205" y="16" fontFamily="Arial, sans-serif" fontSize="10" fill={GOLD} textAnchor="end">{bill.value}</text>
      <text x="15" y="100" fontFamily="Arial, sans-serif" fontSize="10" fill={GOLD}>{bill.value}</text>
    </svg>
  );
}

function Bill({
  bill, index, play, width, height, bottom, left,
}: { bill: BillDef; index: number; play: boolean; width: number; height: number; bottom: number; left: number }) {
  const style = {
    position: "absolute",
    bottom,
    left,
    opacity: 0,
    transform: "translate(0, 0) scale(0.5) rotate(0deg)",
    filter: "drop-shadow(0 8px 10px rgba(43,27,22,0.45))",
    animationName: "billFloat",
    animationDuration: DURATION_STR,
    animationTimingFunction: EASE_ITEM,
    animationFillMode: "both",
    animationIterationCount: 1,
    animationDelay: play ? `${index * 0.12}s` : "0s",
    animationPlayState: play ? "running" : "paused",
    zIndex: 10 + index,
    "--dx": `${bill.dx}px`,
    "--dy": `${bill.dy}px`,
    "--dx2": `${bill.dx2}px`,
    "--dy2": `${bill.dy2}px`,
    "--rot": `${bill.rot}deg`,
  } as CSSProperties;
  return (
    <div style={style}>
      <BillFace bill={bill} width={width} height={height} />
    </div>
  );
}

function Coin({
  coin, index, play, bottom, leftBase,
}: { coin: CoinDef; index: number; play: boolean; bottom: number; leftBase: number }) {
  const id = `grad-coin-${coin.value}-${index}`;
  const style = {
    position: "absolute",
    bottom,
    left: leftBase - coin.size / 2,
    opacity: 0,
    transform: "translate(0, 0) scale(0.4) rotate(0deg)",
    filter: "drop-shadow(0 8px 10px rgba(43,27,22,0.45))",
    animationName: "coinFloat",
    animationDuration: DURATION_STR,
    animationTimingFunction: EASE_ITEM,
    animationFillMode: "both",
    animationIterationCount: 1,
    animationDelay: play ? `${0.15 + index * 0.1}s` : "0s",
    animationPlayState: play ? "running" : "paused",
    zIndex: 20 + index,
    "--dx": `${coin.dx}px`,
    "--dy": `${coin.dy}px`,
    "--rot": `${coin.rot}deg`,
  } as CSSProperties;
  return (
    <div style={style}>
      <svg viewBox="0 0 60 60" width={coin.size} height={coin.size} style={{ display: "block" }}>
        <defs>
          <radialGradient id={id} cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor={coin.top} />
            <stop offset="100%" stopColor={coin.bottom} />
          </radialGradient>
        </defs>
        <circle cx="30" cy="30" r="28" fill={`url(#${id})`} stroke="#5A382B" strokeWidth="2" />
        <circle cx="30" cy="30" r="21" fill="none" stroke="#5A382B" strokeWidth="1.5" opacity="0.7" />
        <text x="30" y="37" fontFamily="Georgia, serif" fontSize="16" fontWeight={700} fill="#5A382B" textAnchor="middle">{coin.value}</text>
      </svg>
    </div>
  );
}

function Sparkle({
  spark, index, play, bottom, leftBase,
}: { spark: SparkDef; index: number; play: boolean; bottom: number; leftBase: number }) {
  const style = {
    position: "absolute",
    bottom,
    left: leftBase - spark.size / 2,
    opacity: 0,
    transform: "translate(0, 0) scale(0.3)",
    animationName: "sparkleFloat",
    animationDuration: DURATION_STR,
    animationTimingFunction: "linear",
    animationFillMode: "both",
    animationIterationCount: 1,
    animationDelay: play ? `${spark.delay}s` : "0s",
    animationPlayState: play ? "running" : "paused",
    zIndex: 30 + index,
    "--dx": `${spark.dx}px`,
    "--dy": `${spark.dy}px`,
  } as CSSProperties;
  return (
    <div style={style}>
      <svg viewBox="0 0 20 20" width={spark.size} height={spark.size} style={{ display: "block" }}>
        <path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z" fill={GOLD} />
      </svg>
    </div>
  );
}

export function SplashScreen() {
  const [visible, setVisible] = useState(false);
  const [enSortie, setEnSortie] = useState(false);
  const [play, setPlay] = useState(false);

  const scale = useResponsiveScale();
  const d = useDims(scale);

  useEffect(() => {
    const dejaVu = sessionStorage.getItem(CLE_SESSION);
    if (dejaVu) return;

    setVisible(true);

    const raf = requestAnimationFrame(() => setPlay(true));

    const timerFinAnimation = setTimeout(() => {
      setEnSortie(true);
      setTimeout(() => {
        setVisible(false);
        sessionStorage.setItem(CLE_SESSION, "1");
      }, DUREE_FADE_MS);
    }, DUREE_ANIMATION_S * 1000);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timerFinAnimation);
    };
  }, []);

  if (!visible) return null;

  const sceneStyle: CSSProperties = {
    width: d.BOX_W,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    overflow: "visible",
    position: "relative",
  };

  const stageStyle: CSSProperties = {
    position: "relative",
    width: d.BOX_W,
    height: d.BOX_H,
    overflow: "visible",
  };

  const boxWrapStyle: CSSProperties = {
    position: "absolute",
    bottom: 0,
    left: 0,
    zIndex: 5,
    perspective: 800 * scale,
    perspectiveOrigin: "50% 100%",
  };

  const lidStyle: CSSProperties = {
    position: "absolute",
    top: d.LID_TOP,
    left: 0,
    transformOrigin: "50% 100%",
    animationName: "lidMove",
    animationDuration: DURATION_STR,
    animationTimingFunction: EASE_BOX,
    animationFillMode: "both",
    animationIterationCount: 1,
    display: "block",
  };

  const glowStyle: CSSProperties = {
    position: "absolute",
    bottom: d.GLOW_BOTTOM,
    left: "50%",
    width: d.GLOW_SIZE,
    height: d.GLOW_SIZE,
    marginLeft: -d.GLOW_SIZE / 2,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(184,102,72,0.55) 0%, rgba(184,102,72,0.2) 35%, rgba(184,102,72,0) 70%)",
    opacity: 0,
    zIndex: 6,
    animationName: "glowFlash",
    animationDuration: DURATION_STR,
    animationTimingFunction: EASE_ITEM,
    animationFillMode: "both",
    animationIterationCount: 1,
    pointerEvents: "none",
  };

  const groundShadowStyle: CSSProperties = {
    position: "absolute",
    bottom: d.SHADOW_BOTTOM,
    left: "50%",
    width: d.SHADOW_W,
    height: d.SHADOW_H,
    marginLeft: -d.SHADOW_W / 2,
    borderRadius: "50%",
    background: "radial-gradient(ellipse, rgba(43,27,22,0.5) 0%, rgba(43,27,22,0) 72%)",
    zIndex: 1,
    animationName: "shadowPulse",
    animationDuration: DURATION_STR,
    animationTimingFunction: EASE_BOX,
    animationFillMode: "both",
    animationIterationCount: 1,
  };

  return (
    <div
      className={`fixed inset-0 z-[100] bg-espresso flex flex-col items-center justify-end pb-[14vh] gap-6 transition-opacity duration-400 ${
        enSortie ? "opacity-0" : "opacity-100"
      }`}
    >
      <div style={sceneStyle}>
        <div style={stageStyle}>
          <div style={glowStyle} />

          {d.SPARKLES.map((spark, i) => (
            <Sparkle key={`spark-${i}`} spark={spark} index={i} play={play} bottom={d.SPARKLE_BOTTOM} leftBase={d.SPARKLE_LEFT_BASE} />
          ))}
          {d.COINS.map((coin, i) => (
            <Coin key={`coin-${coin.value}-${i}`} coin={coin} index={i} play={play} bottom={d.COIN_BOTTOM} leftBase={d.COIN_LEFT_BASE} />
          ))}
          {d.BILLS.map((bill, i) => (
            <Bill key={bill.value} bill={bill} index={i} play={play} width={d.BILL_W} height={d.BILL_H} bottom={d.BILL_BOTTOM} left={d.BILL_LEFT} />
          ))}

          <div style={boxWrapStyle}>
            <svg viewBox="0 0 260 160" width={d.BOX_W} height={d.BOX_H} style={{ display: "block" }}>
              <rect x="10" y="70" width="240" height="80" rx="14" fill="#5A382B" stroke="#2B1B16" strokeWidth="4" />
              <rect x="10" y="70" width="240" height="18" fill="#2B1B16" />
              <rect x="118" y="95" width="24" height="18" rx="4" fill="#EAD8C7" stroke="#2B1B16" strokeWidth="2" />
            </svg>
            <svg viewBox="0 0 260 90" width={d.LID_W} height={d.LID_H} style={lidStyle}>
              <rect x="10" y="10" width="240" height="60" rx="14" fill="#B86648" stroke="#2B1B16" strokeWidth="4" />
              <rect x="10" y="55" width="240" height="15" fill="#8A4A34" />
            </svg>
          </div>

          <div style={groundShadowStyle} />
        </div>
      </div>

      <h1 className="font-display text-headline-md text-cream">By_Carl</h1>
      <p className="font-sans text-body-sm text-cream/60">Ton carnet financier</p>

      {/* Uniquement les @keyframes ici : style global classique, pas de styled-jsx */}
      <style>{`
        @keyframes lidMove {
          0%, 4%     { transform: rotateX(-112deg); }
          6%         { transform: rotateX(-118deg); }
          9%         { transform: rotateX(-98deg); }
          18%        { transform: rotateX(0deg); }
          82%        { transform: rotateX(0deg); }
          90%        { transform: rotateX(-94deg); }
          93%        { transform: rotateX(-120deg); }
          96%        { transform: rotateX(-107deg); }
          98%        { transform: rotateX(-114deg); }
          100%       { transform: rotateX(-112deg); }
        }

        @keyframes glowFlash {
          0%, 8%   { opacity: 0; transform: scale(0.6); }
          16%      { opacity: 1; transform: scale(1.1); }
          26%      { opacity: 0.35; transform: scale(1); }
          82%      { opacity: 0.15; transform: scale(1); }
          90%      { opacity: 0; transform: scale(0.7); }
          100%     { opacity: 0; transform: scale(0.6); }
        }

        @keyframes shadowPulse {
          0%, 4%   { transform: scaleX(1); opacity: 0.9; }
          9%       { transform: scaleX(0.9); opacity: 0.6; }
          18%      { transform: scaleX(1.1); opacity: 0.4; }
          82%      { transform: scaleX(1.1); opacity: 0.4; }
          90%      { transform: scaleX(0.85); opacity: 0.7; }
          94%      { transform: scaleX(1.15); opacity: 0.95; }
          100%     { transform: scaleX(1); opacity: 0.9; }
        }

        @keyframes billFloat {
          0%, 12%  { opacity: 0; transform: translate(0, 0) scale(0.5) rotate(0deg); }
          18%      { opacity: 1; transform: translate(0, -55px) scale(0.85) rotate(0deg); }
          38%      { opacity: 1; transform: translate(var(--dx), var(--dy)) scale(1) rotate(var(--rot)); }
          56%      { opacity: 1; transform: translate(var(--dx2), var(--dy2)) scale(1) rotate(calc(var(--rot) * -1)); }
          70%      { opacity: 1; transform: translate(0, -45px) scale(0.8) rotate(0deg); }
          78%, 100%{ opacity: 0; transform: translate(0, 0) scale(0.4) rotate(0deg); }
        }

        @keyframes coinFloat {
          0%, 16%  { opacity: 0; transform: translate(0, 0) scale(0.3) rotate(0deg); }
          24%      { opacity: 1; transform: translate(0, -45px) scale(0.9) rotate(var(--rot)); }
          46%      { opacity: 1; transform: translate(var(--dx), var(--dy)) scale(1) rotate(calc(var(--rot) * 2)); }
          70%      { opacity: 1; transform: translate(0, -35px) scale(0.8) rotate(calc(var(--rot) * 3)); }
          80%, 100%{ opacity: 0; transform: translate(0, 0) scale(0.3) rotate(calc(var(--rot) * 4)); }
        }

        @keyframes sparkleFloat {
          0%, 14%  { opacity: 0; transform: translate(0, 0) scale(0.2); }
          22%      { opacity: 1; transform: translate(calc(var(--dx) * 0.3), calc(var(--dy) * 0.3)) scale(1); }
          34%      { opacity: 0.4; transform: translate(calc(var(--dx) * 0.6), calc(var(--dy) * 0.6)) scale(0.6); }
          46%      { opacity: 1; transform: translate(var(--dx), var(--dy)) scale(1.1); }
          58%      { opacity: 0.3; transform: translate(var(--dx), var(--dy)) scale(0.5); }
          68%      { opacity: 1; transform: translate(calc(var(--dx) * 0.4), calc(var(--dy) * 0.4)) scale(0.9); }
          78%, 100%{ opacity: 0; transform: translate(0, 0) scale(0.2); }
        }
      `}</style>
    </div>
  );
}