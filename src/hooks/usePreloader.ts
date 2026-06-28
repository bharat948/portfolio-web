import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Attempt at a realistic loading curve:
 *  0-60%   → fast ramp    (first ~30% of time)
 *  60-90%  → medium       (next ~40% of time)
 *  90-95%  → slow crawl   (next ~20% of time)
 *  95-100% → final jump   (last ~10% of time)
 */
function easedProgress(t: number): number {
  // t is 0..1 representing elapsed / simulatedDuration
  if (t >= 1) return 100;
  if (t < 0.3) {
    // 0→60 in first 30% of time
    return (t / 0.3) * 60;
  }
  if (t < 0.7) {
    // 60→90 in next 40% of time
    return 60 + ((t - 0.3) / 0.4) * 30;
  }
  if (t < 0.9) {
    // 90→95 in next 20% of time
    return 90 + ((t - 0.7) / 0.2) * 5;
  }
  // 95→100 in last 10% of time
  return 95 + ((t - 0.9) / 0.1) * 5;
}

export interface UsePreloaderReturn {
  /** Current progress value 0-100 */
  progress: number;
  /** True when progress has reached 100 AND minimumDuration has elapsed */
  isComplete: boolean;
  /** Force the preloader to complete immediately */
  dismiss: () => void;
}

export function usePreloader(minimumDuration = 3000): UsePreloaderReturn {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const startTimeRef = useRef<number>(Date.now());
  const rafRef = useRef<number | null>(null);
  const minTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const minElapsedRef = useRef(false);
  const progressDoneRef = useRef(false);
  const dismissedRef = useRef(false);

  // The simulated loading takes slightly less than minimumDuration so progress
  // reaches 100 just around the time the minimum elapses.
  const simulatedDuration = minimumDuration * 0.95;

  const tryComplete = useCallback(() => {
    if (
      (progressDoneRef.current && minElapsedRef.current) ||
      dismissedRef.current
    ) {
      setProgress(100);
      setIsComplete(true);
    }
  }, []);

  const tick = useCallback(() => {
    if (dismissedRef.current) return;

    const elapsed = Date.now() - startTimeRef.current;
    const t = Math.min(1, elapsed / simulatedDuration);
    const p = Math.round(easedProgress(t));

    setProgress(p);

    if (p >= 100) {
      progressDoneRef.current = true;
      tryComplete();
      return; // stop RAF loop
    }

    rafRef.current = requestAnimationFrame(tick);
  }, [simulatedDuration, tryComplete]);

  useEffect(() => {
    startTimeRef.current = Date.now();
    rafRef.current = requestAnimationFrame(tick);

    // Minimum duration guarantee
    minTimerRef.current = setTimeout(() => {
      minElapsedRef.current = true;
      tryComplete();
    }, minimumDuration);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (minTimerRef.current !== null) clearTimeout(minTimerRef.current);
    };
  }, [tick, minimumDuration, tryComplete]);

  const dismiss = useCallback(() => {
    dismissedRef.current = true;
    setProgress(100);
    setIsComplete(true);
  }, []);

  return { progress, isComplete, dismiss };
}
