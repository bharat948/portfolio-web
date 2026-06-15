import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Heart, Moon, Sun, Sparkles } from "lucide-react";
import { navigate } from "../lib/router";

// ── Edit these to personalise the question ────────────────────────────────────
const QUESTION = "Will you go on a date with me?";
const DATE_NOTE = "27th July · 7 PM · that little café you love ☕";

// The "No" button gets more desperate the more it runs away.
const NO_LABELS = [
  "No",
  "Are you sure?",
  "Really sure?",
  "Think again!",
  "Last chance…",
  "Pretty please?",
  "Don't be cruel 🥺",
  "You can't catch me!",
];

interface PlayProps {
  darkMode: boolean;
  toggleTheme: () => void;
}

const Play: React.FC<PlayProps> = ({ darkMode, toggleTheme }) => {
  const reduce = useReducedMotion();
  const areaRef = useRef<HTMLDivElement>(null);
  const noRef = useRef<HTMLButtonElement>(null);

  const [accepted, setAccepted] = useState(false);
  const [dodges, setDodges] = useState(0);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  // Yes grows confident, No shrinks as it flees.
  const yesScale = Math.min(1 + dodges * 0.07, 1.9);
  const noScale = Math.max(1 - dodges * 0.05, 0.55);
  const noLabel = NO_LABELS[Math.min(dodges, NO_LABELS.length - 1)];

  const dodge = () => {
    const area = areaRef.current;
    if (!area) return;
    const bw = noRef.current?.offsetWidth ?? 96;
    const bh = noRef.current?.offsetHeight ?? 48;
    const maxX = Math.max(0, area.clientWidth - bw);
    const maxY = Math.max(0, area.clientHeight - bh);

    // Pick a new spot that's a meaningful distance from the current one.
    let x = pos?.x ?? 0;
    let y = pos?.y ?? 0;
    for (let i = 0; i < 8; i++) {
      const nx = Math.random() * maxX;
      const ny = Math.random() * maxY;
      if (Math.hypot(nx - (pos?.x ?? 0), ny - (pos?.y ?? 0)) > Math.min(maxX, maxY) * 0.4) {
        x = nx;
        y = ny;
        break;
      }
      x = nx;
      y = ny;
    }
    setPos({ x, y });
    setDodges((d) => d + 1);
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 py-16">
      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 left-1/4 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-fuchsia-400/25 blur-[120px] animate-aurora-1 dark:bg-fuchsia-500/20" />
        <div className="absolute -bottom-40 right-1/4 h-[30rem] w-[30rem] translate-x-1/2 rounded-full bg-brand-400/25 blur-[120px] animate-aurora-2 dark:bg-brand-500/20" />
      </div>

      {/* Top bar */}
      <div className="absolute inset-x-0 top-0 flex items-center justify-end p-5">
        <button
          onClick={toggleTheme}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          className="rounded-full border border-slate-200 bg-white/60 p-2.5 text-slate-600 backdrop-blur-sm transition-colors hover:text-slate-900 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 dark:hover:text-white"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {accepted ? (
          <SuccessCard key="success" reduce={!!reduce} onReset={() => { setAccepted(false); setDodges(0); }} />
        ) : (
          <motion.div
            key="question"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md"
          >
            {/* Glow ring behind the card */}
            <div className="absolute -inset-px rounded-[1.75rem] bg-gradient-to-br from-brand-500/40 via-fuchsia-500/30 to-brand-400/40 blur-sm" />

            <div className="card-surface relative flex aspect-square flex-col items-center justify-center gap-5 rounded-[1.75rem] p-7 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-fuchsia-500 text-white shadow-lg">
                <Heart size={26} className="fill-current" />
              </span>

              <div>
                <h1 className="font-display text-2xl font-bold leading-snug tracking-tight sm:text-3xl">
                  {QUESTION}
                </h1>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{DATE_NOTE}</p>
              </div>

              {/* Play area: buttons start side by side; "No" flees on hover. */}
              <div
                ref={areaRef}
                className="relative mt-1 flex h-40 w-full items-center justify-center gap-4"
              >
                <motion.button
                  onClick={() => setAccepted(true)}
                  animate={{ scale: yesScale }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className="z-10 rounded-full bg-gradient-to-r from-brand-500 to-fuchsia-500 px-8 py-3 font-semibold text-white shadow-lg shadow-brand-500/30"
                >
                  Yes 💖
                </motion.button>

                <motion.button
                  ref={noRef}
                  onMouseEnter={reduce ? undefined : dodge}
                  onPointerDown={(e) => {
                    if (reduce) return;
                    e.preventDefault(); // dodge before a tap/click can land
                    dodge();
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    dodge();
                  }}
                  animate={
                    pos
                      ? { left: pos.x, top: pos.y, scale: noScale }
                      : { scale: noScale }
                  }
                  transition={{ type: "spring", stiffness: 500, damping: 28 }}
                  style={pos ? { position: "absolute", margin: 0 } : undefined}
                  className="rounded-full border border-slate-300 bg-white/80 px-6 py-3 font-semibold text-slate-600 backdrop-blur-sm dark:border-white/15 dark:bg-white/[0.06] dark:text-slate-300"
                >
                  {noLabel}
                </motion.button>
              </div>

              {dodges > 2 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs font-medium text-slate-400"
                >
                  (the “No” button seems to have other plans…)
                </motion.p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── Celebratory state after "Yes" ─────────────────────────────────────────────
const SuccessCard: React.FC<{ reduce: boolean; onReset: () => void }> = ({ reduce, onReset }) => {
  // Deterministic-ish heart positions (no Math.random at render for SSR safety).
  const hearts = Array.from({ length: 14 }, (_, i) => ({
    left: (i * 37) % 100,
    delay: (i % 7) * 0.3,
    duration: 3 + (i % 4),
    size: 14 + (i % 4) * 6,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-md"
    >
      {/* Floating hearts */}
      {!reduce && (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-0 overflow-visible">
          {hearts.map((h, i) => (
            <motion.span
              key={i}
              className="absolute bottom-0 text-fuchsia-400/80"
              style={{ left: `${h.left}%` }}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: -260, opacity: [0, 1, 0] }}
              transition={{ duration: h.duration, delay: h.delay, repeat: Infinity, ease: "easeOut" }}
            >
              <Heart size={h.size} className="fill-current" />
            </motion.span>
          ))}
        </div>
      )}

      <div className="card-surface relative flex aspect-square flex-col items-center justify-center gap-4 rounded-[1.75rem] p-8 text-center">
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.1 }}
          className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-fuchsia-500 text-white shadow-lg"
        >
          <Sparkles size={30} />
        </motion.span>
        <h2 className="font-display text-3xl font-bold tracking-tight">
          <span className="text-gradient-animated">It's a date!</span>
        </h2>
        <p className="max-w-xs text-slate-600 dark:text-slate-400">
          You just made my day. I'll see you {DATE_NOTE.toLowerCase()}.
        </p>
        <div className="mt-2 flex gap-3">
          <button
            onClick={() => navigate("/")}
            className="rounded-full bg-slate-900 px-6 py-3 font-semibold text-white transition-transform hover:-translate-y-0.5 dark:bg-white dark:text-slate-900"
          >
            Back home
          </button>
          <button
            onClick={onReset}
            className="rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition-colors hover:border-slate-400 dark:border-white/15 dark:text-slate-200"
          >
            Play again
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Play;
