import { useEffect, useState } from "react";

// Minimal client-side router for this SPA — no external dependency.
// `navigate` pushes a new path and notifies subscribers; `useRoute` returns the
// current pathname and re-renders on back/forward or navigate().

export function navigate(path: string): void {
  if (window.location.pathname === path) return;
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo({ top: 0 });
}

export function useRoute(): string {
  const [path, setPath] = useState(() => window.location.pathname);

  useEffect(() => {
    const onChange = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onChange);
    return () => window.removeEventListener("popstate", onChange);
  }, []);

  return path;
}
