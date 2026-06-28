import { useEffect, useRef, useState, useCallback } from 'react';

const CHARSET = '!@#$%^&*()_+-=[]{}|;\':",./<>?0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

interface ScrambleTextProps {
  /** The final text to reveal */
  targetText: string;
  /** Duration of the full scramble-to-reveal cycle in seconds */
  duration?: number;
  /** Additional CSS class names */
  className?: string;
  /** Called once every character has locked into place */
  onComplete?: () => void;
}

function randomChar(): string {
  return CHARSET[Math.floor(Math.random() * CHARSET.length)];
}

export default function ScrambleText({
  targetText,
  duration = 1.5,
  className = '',
  onComplete,
}: ScrambleTextProps) {
  const [display, setDisplay] = useState<string>(() =>
    Array.from({ length: targetText.length }, () => randomChar()).join('')
  );

  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const completedRef = useRef(false);

  const animate = useCallback(
    (timestamp: number) => {
      if (startRef.current === null) {
        startRef.current = timestamp;
      }

      const elapsed = (timestamp - startRef.current) / 1000; // seconds
      const totalDuration = duration;
      const len = targetText.length;

      // How many characters should be locked by now (left-to-right)
      const lockedCount = Math.min(
        len,
        Math.floor((elapsed / totalDuration) * (len + 1))
      );

      const chars: string[] = [];
      for (let i = 0; i < len; i++) {
        if (i < lockedCount) {
          chars.push(targetText[i]);
        } else {
          chars.push(randomChar());
        }
      }

      setDisplay(chars.join(''));

      if (lockedCount >= len) {
        // Fully resolved
        if (!completedRef.current) {
          completedRef.current = true;
          onComplete?.();
        }
        return; // stop the loop
      }

      rafRef.current = requestAnimationFrame(animate);
    },
    [targetText, duration, onComplete]
  );

  useEffect(() => {
    // Reset on targetText / duration change
    completedRef.current = false;
    startRef.current = null;
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [animate]);

  return (
    <span
      className={className}
      style={{ fontFamily: '"Fira Code", "Courier New", monospace' }}
      aria-label={targetText}
    >
      {display}
    </span>
  );
}
