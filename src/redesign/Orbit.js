import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "./motion";
import { EASE } from "./ui";
import { toolkit } from "./data";

/*
 * Two slowly turning rings of tools. Labels counter-rotate so they always
 * read upright, the whole thing pauses on hover, and below 760px it becomes
 * a simple list.
 */
export default function Orbit() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    if (locked || reduced) return undefined;
    const timer = setInterval(
      () => setActive((value) => (value + 1) % toolkit.length),
      3600,
    );
    return () => clearInterval(timer);
  }, [locked, reduced]);

  const current = toolkit[active];
  const rings = [1, 2].map((ring) =>
    toolkit
      .map((tool, index) => ({ ...tool, index }))
      .filter((tool) => tool.ring === ring),
  );

  return (
    <div
      className="orbit"
      onPointerLeave={() => setLocked(false)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setLocked(false);
      }}
    >
      <div className="orbit-stage">
        {rings.map((tools, ringIndex) => (
          <div
            key={ringIndex}
            className={`orbit-ring orbit-ring-${ringIndex + 1}`}
          >
            {tools.map((tool, i) => {
              const angle = (360 / tools.length) * i + ringIndex * 26;
              return (
                <div
                  key={tool.label}
                  className="orbit-arm"
                  style={{ "--angle": `${angle}deg` }}
                >
                  <div className="orbit-upright">
                    <button
                      type="button"
                      className={`orbit-node ${
                        tool.index === active ? "is-active" : ""
                      }`}
                      aria-pressed={tool.index === active}
                      onPointerEnter={() => {
                        setActive(tool.index);
                        setLocked(true);
                      }}
                      onFocus={() => {
                        setActive(tool.index);
                        setLocked(true);
                      }}
                      onClick={() => {
                        setActive(tool.index);
                        setLocked(true);
                      }}
                    >
                      <i aria-hidden="true" />
                      {tool.label}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ))}

        <div className="orbit-core" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.label}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <span className="eyebrow">{current.group}</span>
              <strong>{current.label}</strong>
              <p>{current.note}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
