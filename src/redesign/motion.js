import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { MotionConfig } from "framer-motion";

/*
 * Motion preference.
 * By default the site follows the operating system ("reduce motion" setting).
 * Visitors can override it either way with the toggle in the footer; the
 * choice is remembered. Everything that animates reads from here, and CSS
 * animations key off the data-motion attribute on <html>.
 */
const STORAGE_KEY = "sj-motion";
const QUERY = "(prefers-reduced-motion: reduce)";

const MotionPreference = createContext({
  reduced: false,
  choice: "system",
  systemReduced: false,
  setChoice: () => {},
});

function readChoice() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "on" || saved === "off") return saved;
  } catch {
    // storage may be unavailable
  }
  return "system";
}

export function MotionProvider({ children }) {
  const [choice, setChoiceState] = useState(readChoice);
  const [systemReduced, setSystemReduced] = useState(
    () => window.matchMedia(QUERY).matches,
  );

  useEffect(() => {
    const media = window.matchMedia(QUERY);
    const onChange = () => setSystemReduced(media.matches);
    media.addEventListener?.("change", onChange);
    return () => media.removeEventListener?.("change", onChange);
  }, []);

  const reduced = choice === "off" || (choice === "system" && systemReduced);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-motion",
      reduced ? "reduce" : "full",
    );
  }, [reduced]);

  const value = useMemo(
    () => ({
      reduced,
      choice,
      systemReduced,
      setChoice: (next) => {
        setChoiceState(next);
        try {
          if (next === "system") window.localStorage.removeItem(STORAGE_KEY);
          else window.localStorage.setItem(STORAGE_KEY, next);
        } catch {
          // ignore storage errors
        }
      },
    }),
    [reduced, choice, systemReduced],
  );

  return (
    <MotionPreference.Provider value={value}>
      <MotionConfig reducedMotion={reduced ? "always" : "never"}>
        {children}
      </MotionConfig>
    </MotionPreference.Provider>
  );
}

export const useMotionPreference = () => useContext(MotionPreference);
export const useReducedMotion = () => useContext(MotionPreference).reduced;
