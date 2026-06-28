import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import ScrambleText from './ScrambleText';
import './preloader.css';

interface PreloaderProps {
  /** Loading progress 0-100 — drives the progress bar width */
  progress: number;
  /** When true the exit sequence begins */
  isComplete: boolean;
  /** Fires after the curtain wipe transition ends */
  onExitComplete: () => void;
}

export default function Preloader({
  progress,
  isComplete,
  onExitComplete,
}: PreloaderProps) {
  /* ── refs ── */
  const rootRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const markTLRef = useRef<HTMLSpanElement>(null);
  const markTRRef = useRef<HTMLSpanElement>(null);
  const markBLRef = useRef<HTMLSpanElement>(null);
  const markBRRef = useRef<HTMLSpanElement>(null);

  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const exitRanRef = useRef(false);
  const [hidden, setHidden] = useState(false);

  /* ── Intro timeline (Phase A → C) ── */
  useEffect(() => {
    const marks = [
      markTLRef.current,
      markTRRef.current,
      markBLRef.current,
      markBRRef.current,
    ];
    if (marks.some((m) => !m)) return;

    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    tlRef.current = tl;

    /* Phase A — initial spread positions (percentage of viewport) */
    gsap.set(markTLRef.current, { top: '-60%', left: '-60%' });
    gsap.set(markTRRef.current, { top: '-60%', right: '-60%' });
    gsap.set(markBLRef.current, { bottom: '-60%', left: '-60%' });
    gsap.set(markBRRef.current, { bottom: '-60%', right: '-60%' });

    /* Phase B (0 – 0.7s): Marks converge to frame corners */
    tl.to(
      markTLRef.current,
      { top: '-7px', left: '-7px', duration: 0.7 },
      0
    )
      .to(
        markTRRef.current,
        { top: '-7px', right: '-7px', duration: 0.7 },
        0
      )
      .to(
        markBLRef.current,
        { bottom: '-7px', left: '-7px', duration: 0.7 },
        0
      )
      .to(
        markBRRef.current,
        { bottom: '-7px', right: '-7px', duration: 0.7 },
        0
      );

    /* Phase C (0.7s – ~2.5s): frame, logo, tagline, counter fade in */
    tl.to(borderRef.current, { opacity: 1, duration: 0.4 }, 0.7)
      .to(counterRef.current, { opacity: 1, duration: 0.3 }, 0.8)
      .to(
        logoRef.current,
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.4)' },
        1.0
      )
      .to(taglineRef.current, { opacity: 1, duration: 0.5 }, 1.4);

    /* Logo starts slightly scaled down */
    gsap.set(logoRef.current, { scale: 0.88 });

    return () => {
      tl.kill();
    };
  }, []);

  /* ── Sync progress bar width ── */
  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.width = `${progress}%`;
    }
  }, [progress]);

  /* ── Phase D — exit sequence ── */
  const runExit = useCallback(() => {
    if (exitRanRef.current) return;
    exitRanRef.current = true;

    const marks = [
      markTLRef.current,
      markTRRef.current,
      markBLRef.current,
      markBRRef.current,
    ];

    // Rotate marks + → ×
    gsap.to(marks, {
      rotation: 45,
      duration: 0.3,
      ease: 'power2.inOut',
      onComplete: () => {
        // Short pause then curtain wipe
        setTimeout(() => {
          rootRef.current?.classList.add('preloader--done');

          // After the CSS transition (700ms) finishes, signal parent
          setTimeout(() => {
            setHidden(true);
            onExitComplete();
          }, 720);
        }, 300);
      },
    });
  }, [onExitComplete]);

  useEffect(() => {
    if (isComplete) {
      runExit();
    }
  }, [isComplete, runExit]);

  /* ── Don't render after fully hidden ── */
  if (hidden) return null;

  const counterText = String(Math.round(progress)).padStart(3, '0');

  return (
    <div
      ref={rootRef}
      className="preloader"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Loading portfolio"
    >
      {/* Centered square frame */}
      <div className="preloader__frame">
        {/* Square border */}
        <div ref={borderRef} className="preloader__border">
          {/* Top progress bar */}
          <div ref={progressRef} className="preloader__progress" />
        </div>

        {/* Crosshair marks */}
        <span ref={markTLRef} className="preloader__mark">+</span>
        <span ref={markTRRef} className="preloader__mark">+</span>
        <span ref={markBLRef} className="preloader__mark">+</span>
        <span ref={markBRRef} className="preloader__mark">+</span>

        {/* Logo */}
        <div ref={logoRef} className="preloader__logo">
          Bharat.
        </div>

        {/* Tagline */}
        <div ref={taglineRef} className="preloader__tagline">
          DESIGN&nbsp;&middot;&nbsp;DEVELOP&nbsp;&middot;&nbsp;DELIVER
        </div>

        {/* Counter */}
        <div ref={counterRef} className="preloader__counter">
          <ScrambleText
            targetText={counterText}
            duration={0.35}
            className="preloader__counter-value"
          />
        </div>
      </div>
    </div>
  );
}
