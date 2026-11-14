import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "./motion";

// Only take over after a mouse movement. Touch, text fields, native dialogs,
// keyboard navigation, and reduced motion retain the platform cursor.
export default function Cursor() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, {
    stiffness: 500,
    damping: 36,
    mass: 0.45
  });
  const sy = useSpring(y, {
    stiffness: 500,
    damping: 36,
    mass: 0.45
  });
  const [state, setState] = useState({
    visible: false,
    kind: "default",
    label: "",
    down: false
  });
  const reduced = useReducedMotion();
  const {
    pathname
  } = useLocation();
  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    let point = null;
    let frame = 0;
    const hide = () => {
      document.documentElement.classList.remove("custom-cursor-active");
      setState(previous => ({
        ...previous,
        visible: false,
        down: false
      }));
    };
    const update = target => {
      if (!media.matches || reduced || !(target instanceof Element) || target.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"]), iframe, dialog[open]')) {
        hide();
        return;
      }
      const labeled = target.closest("[data-cursor]");
      const interactive = target.closest('a[href], button:not(:disabled), summary, [role="button"], [role="switch"]');
      const label = labeled?.getAttribute("data-cursor") || "";
      const kind = label ? "label" : interactive ? "link" : "default";
      document.documentElement.classList.add("custom-cursor-active");
      setState(previous => previous.visible && previous.kind === kind && previous.label === label ? previous : {
        ...previous,
        visible: true,
        kind,
        label
      });
    };
    const move = event => {
      if (event.pointerType && event.pointerType !== "mouse") {
        hide();
        return;
      }
      if (!media.matches || reduced) return;
      point = {
        x: event.clientX,
        y: event.clientY
      };
      if (!document.documentElement.classList.contains("custom-cursor-active")) {
        sx.jump(point.x);
        sy.jump(point.y);
      }
      x.set(point.x);
      y.set(point.y);
      update(event.target);
    };
    const scroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (point) update(document.elementFromPoint(point.x, point.y));
      });
    };
    const down = () => setState(previous => ({
      ...previous,
      down: true
    }));
    const up = () => setState(previous => ({
      ...previous,
      down: false
    }));
    const keyboard = event => {
      if (event.key === "Tab") {
        point = null;
        hide();
      }
    };
    const visibility = () => {
      if (document.hidden) hide();
    };
    window.addEventListener("pointermove", move, {
      passive: true
    });
    window.addEventListener("pointerdown", down, {
      passive: true
    });
    window.addEventListener("pointerup", up, {
      passive: true
    });
    window.addEventListener("scroll", scroll, {
      passive: true,
      capture: true
    });
    window.addEventListener("blur", hide);
    document.addEventListener("keydown", keyboard);
    document.addEventListener("visibilitychange", visibility);
    document.documentElement.addEventListener("pointerleave", hide);
    media.addEventListener?.("change", hide);
    hide();
    return () => {
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("scroll", scroll, true);
      window.removeEventListener("blur", hide);
      document.removeEventListener("keydown", keyboard);
      document.removeEventListener("visibilitychange", visibility);
      document.documentElement.removeEventListener("pointerleave", hide);
      media.removeEventListener?.("change", hide);
    };
  }, [x, y, sx, sy, reduced, pathname]);
  if (reduced) return null;
  const classes = `${state.visible ? "is-visible" : ""} is-${state.kind} ${state.down ? "is-down" : ""}`;
  return <div className={`custom-cursor ${classes}`} aria-hidden="true">
    <motion.div className="cursor-dot-position" style={{
      x,
      y
    }}><span className="cursor-dot" /></motion.div>
    <motion.div className="cursor-ring-position" style={{
      x: sx,
      y: sy
    }}>
      <span className="cursor-ring"><span className="cursor-label">{state.label}<span className="cursor-label-arrow">↗</span></span></span>
    </motion.div>
  </div>;
}
