import React, { useId, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "./motion";
import { EASE, Plus, Reveal, Tags } from "./ui";
import { experience } from "./data";

const MONTHS = [
  "jan", "feb", "mar", "apr", "may", "jun",
  "jul", "aug", "sep", "oct", "nov", "dec",
];

function parsePoint(text, now) {
  if (/present/i.test(text)) return { year: now.getFullYear(), month: now.getMonth(), exact: true };
  const parts = text.trim().split(/\s+/);
  if (parts.length === 1) return { year: Number(parts[0]), month: null, exact: false };
  return {
    year: Number(parts[1]),
    month: MONTHS.indexOf(parts[0].slice(0, 3).toLowerCase()),
    exact: true,
  };
}

/* "4 yrs 7 mos" — counted inclusively, the way LinkedIn does. */
export function formatDuration(start, end, now = new Date()) {
  const a = parsePoint(start, now);
  const b = parsePoint(end, now);
  if (!a.exact || !b.exact) {
    const years = Math.max(1, b.year - a.year);
    return `${years} ${years === 1 ? "yr" : "yrs"}`;
  }
  const total = (b.year - a.year) * 12 + (b.month - a.month) + 1;
  const years = Math.floor(total / 12);
  const months = total % 12;
  const out = [];
  if (years) out.push(`${years} ${years === 1 ? "yr" : "yrs"}`);
  if (months) out.push(`${months} ${months === 1 ? "mo" : "mos"}`);
  return out.join(" ");
}

function TimelineItem({ item, index, isOpen, onToggle }) {
  const reduced = useReducedMotion();
  const panelId = useId();
  return (
    <Reveal
      as="li"
      className={`tl-item ${isOpen ? "is-open" : ""} ${item.current ? "is-current" : ""}`}
      delay={Math.min(index, 3) * 0.06}
    >
      {/* The rail shows where a role ends (top) and where it started (bottom). */}
      <div className="tl-rail" aria-hidden="true">
        <span className="tl-date">{item.end}</span>
        <span className="tl-track">
          <motion.span
            className="tl-track-fill"
            initial={reduced ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.1, delay: 0.15, ease: EASE }}
          />
        </span>
        <span className="tl-date">{item.start}</span>
      </div>

      <article className="tl-card">
        <h3 className="tl-heading">
          <button
            type="button"
            className="tl-trigger"
            aria-expanded={isOpen}
            aria-controls={panelId}
            onClick={onToggle}
          >
            <span className="tl-title">
              <span className="tl-role">{item.role}</span>
              <span className="tl-company">
                {item.company}
                <span className="tl-location"> · {item.location}</span>
              </span>
            </span>
            <span className="tl-side">
              <span className="tl-duration">
                {formatDuration(item.start, item.end)}
              </span>
              <span className="tl-toggle" aria-hidden="true">
                <Plus size={16} />
              </span>
            </span>
          </button>
        </h3>
        <p className="tl-period">
          {item.start} — {item.end}
        </p>
        <p className="tl-summary">{item.summary}</p>
        <Tags items={item.tags} className="tl-tags" />

        <div className="tl-details" id={panelId} role="region" aria-label={`${item.role} details`}>
          <div className="tl-details-inner">
            <ul>
              {item.highlights.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function Timeline({ items = experience }) {
  const [open, setOpen] = useState(() => new Set());
  const toggle = (id) =>
    setOpen((previous) => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  const allOpen = open.size === items.length;

  return (
    <div className="timeline-wrap">
      <div className="timeline-tools">
        <span className="eyebrow">Select a role for the details</span>
        <button
          type="button"
          className="chip-button"
          onClick={() =>
            setOpen(allOpen ? new Set() : new Set(items.map((item) => item.id)))
          }
        >
          {allOpen ? "Collapse all" : "Expand all"}
        </button>
      </div>
      <ol className="timeline">
        {items.map((item, index) => (
          <TimelineItem
            key={item.id}
            item={item}
            index={index}
            isOpen={open.has(item.id)}
            onToggle={() => toggle(item.id)}
          />
        ))}
      </ol>
    </div>
  );
}
