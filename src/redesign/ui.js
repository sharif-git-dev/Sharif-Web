import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useVelocity,
} from "framer-motion";
import { useReducedMotion } from "./motion";

export const EASE = [0.16, 1, 0.3, 1];

/* -------------------------------------------------------------------------- */
/* Icons                                                                      */
/* -------------------------------------------------------------------------- */
function Svg({ children, className = "", size = 20, ...rest }) {
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export function Arrow({ diagonal = true, ...rest }) {
  return (
    <Svg {...rest}>
      <path d={diagonal ? "M7 17 17 7M8 7h9v9" : "M5 12h14M13 6l6 6-6 6"} />
    </Svg>
  );
}
export const ArrowLeft = (props) => (
  <Svg {...props}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </Svg>
);
export const ArrowUp = (props) => (
  <Svg {...props}>
    <path d="M12 19V5M6 11l6-6 6 6" />
  </Svg>
);
export const Plus = (props) => (
  <Svg {...props}>
    <path d="M12 5v14M5 12h14" />
  </Svg>
);
export const Close = (props) => (
  <Svg {...props}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Svg>
);
export const Check = (props) => (
  <Svg {...props}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Svg>
);
export const Play = (props) => (
  <Svg {...props} fill="currentColor" stroke="none">
    <path d="M8 5.6v12.8a.6.6 0 0 0 .92.5l10-6.4a.6.6 0 0 0 0-1L8.92 5.1A.6.6 0 0 0 8 5.6Z" />
  </Svg>
);
export const Sun = (props) => (
  <Svg {...props}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
  </Svg>
);
export const Moon = (props) => (
  <Svg {...props}>
    <path d="M20 14.2A8 8 0 0 1 9.8 4a8 8 0 1 0 10.2 10.2Z" />
  </Svg>
);
export const Printer = (props) => (
  <Svg {...props}>
    <path d="M7 8V4h10v4M7 17H5a1 1 0 0 1-1-1v-6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1h-2M7 14h10v6H7z" />
  </Svg>
);

/* -------------------------------------------------------------------------- */
/* Logo: a geometric "S" with the accent full stop used across the headlines.  */
/* -------------------------------------------------------------------------- */
export function LogoMark({ size = 30, className = "" }) {
  return (
    <svg
      className={`logo-mark ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
    >
      <rect className="logo-mark-bg" width="64" height="64" rx="18" />
      <path
        className="logo-mark-s"
        d="M40.5 23.5A9 9 0 1 0 31.5 32.5A9 9 0 1 1 22.5 41.5"
        fill="none"
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      <circle className="logo-mark-dot" cx="45.5" cy="45" r="4" />
    </svg>
  );
}

export function Logo({ onClick }) {
  return (
    <Link className="logo" to="/" aria-label="Sharif Jamo — home" onClick={onClick}>
      <LogoMark />
      <span className="logo-word">
        Sharif <em>Jamo</em>
      </span>
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* Motion primitives                                                          */
/* -------------------------------------------------------------------------- */
export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 28,
  as = "div",
  amount = 0.15,
  ...rest
}) {
  const reduced = useReducedMotion();
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={className}
      // With reduced motion the content still fades in; it just doesn't move.
      initial={reduced ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* Headline whose lines rise out of a mask, one after another. */
export function RevealLines({
  as: Tag = "h2",
  className = "",
  lines,
  delay = 0,
  immediate = false,
}) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const show = immediate || inView;
  return (
    <Tag ref={ref} className={`reveal-lines ${className}`}>
      {lines.map((line, i) => (
        <span className="reveal-line" key={i}>
          <motion.span
            className="reveal-line-inner"
            initial={reduced ? { opacity: 0 } : { y: "115%" }}
            animate={
              reduced
                ? { opacity: show ? 1 : 0 }
                : { y: show ? "0%" : "115%" }
            }
            transition={{ duration: 1, delay: delay + i * 0.09, ease: EASE }}
          >
            {line}
          </motion.span>
          {/* Keeps the words separate for screen readers and copy/paste. */}
          {i < lines.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}

/* Pulls its child a little toward the pointer. */
export function Magnetic({ children, strength = 0.28, className = "" }) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 180, damping: 14, mass: 0.35 };
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);
  const onMove = (event) => {
    if (reduced || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <motion.span
      className={`magnetic ${className}`}
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.span>
  );
}

/* -------------------------------------------------------------------------- */
/* Buttons and links                                                          */
/* -------------------------------------------------------------------------- */
function ButtonInner({ children, icon }) {
  return (
    <>
      <span className="btn-label">{children}</span>
      {icon !== false && (
        <span className="btn-icon" aria-hidden="true">
          <span className="btn-icon-slide">{icon || <Arrow size={18} />}</span>
          <span className="btn-icon-slide btn-icon-clone">
            {icon || <Arrow size={18} />}
          </span>
        </span>
      )}
    </>
  );
}

export function Button({
  to,
  href,
  variant = "primary",
  size = "md",
  icon,
  children,
  className = "",
  external = false,
  ...rest
}) {
  const cls = `btn btn-${variant} btn-${size} ${className}`;
  if (to) {
    return (
      <Link className={cls} to={to} {...rest}>
        <ButtonInner icon={icon}>{children}</ButtonInner>
      </Link>
    );
  }
  if (href) {
    const extra = external ? { target: "_blank", rel: "noreferrer" } : {};
    return (
      <a className={cls} href={href} {...extra} {...rest}>
        <ButtonInner icon={icon}>{children}</ButtonInner>
      </a>
    );
  }
  return (
    <button className={cls} type="button" {...rest}>
      <ButtonInner icon={icon}>{children}</ButtonInner>
    </button>
  );
}

export function TextLink({ to, href, children, className = "", external = false, ...rest }) {
  const inner = (
    <>
      <span className="text-link-label">{children}</span>
      <Arrow size={16} />
    </>
  );
  if (to) {
    return (
      <Link className={`text-link ${className}`} to={to} {...rest}>
        {inner}
      </Link>
    );
  }
  const extra = external ? { target: "_blank", rel: "noreferrer" } : {};
  return (
    <a className={`text-link ${className}`} href={href} {...extra} {...rest}>
      {inner}
    </a>
  );
}

/* -------------------------------------------------------------------------- */
/* Section scaffolding                                                        */
/* -------------------------------------------------------------------------- */
export function Eyebrow({ children, dot = false, className = "" }) {
  return (
    <span className={`eyebrow ${dot ? "eyebrow-dot" : ""} ${className}`}>
      {children}
    </span>
  );
}

export function SectionHeading({ index, label, lines, children, as = "h2" }) {
  return (
    <header className="section-heading">
      <Reveal className="section-label">
        {index && <span className="section-index">{index}</span>}
        <span>{label}</span>
      </Reveal>
      <div className="section-heading-main">
        <RevealLines as={as} lines={lines} />
        {children && (
          <Reveal className="section-heading-aside" delay={0.15}>
            {children}
          </Reveal>
        )}
      </div>
    </header>
  );
}

export function PageIntro({ eyebrow, lines, description, children }) {
  return (
    <section className="page-intro wrap">
      <Reveal y={12}>
        <Eyebrow dot>{eyebrow}</Eyebrow>
      </Reveal>
      <RevealLines as="h1" className="page-title" lines={lines} immediate delay={0.05} />
      <Reveal className="page-intro-bottom" delay={0.25}>
        <p className="lead">{description}</p>
        {children && <div className="page-intro-actions">{children}</div>}
      </Reveal>
    </section>
  );
}

export function Tags({ items, className = "" }) {
  return (
    <ul className={`tags ${className}`}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

/* -------------------------------------------------------------------------- */
/* Projects                                                                   */
/* -------------------------------------------------------------------------- */
export function ProjectCover({ project, eager = false, layered = false }) {
  const supportingImage = project.gallery?.[0];
  return (
    <div
      className={`cover cover-focused${layered && supportingImage ? " cover-layered" : ""}`}
      style={{ "--cover": project.color }}
    >
      {layered && supportingImage && <img className="cover-support" src={supportingImage.src} alt="" aria-hidden="true" loading="lazy" decoding="async" />}
      <img src={project.image} alt={project.coverCaption || `${project.name} — ${project.title}`} loading={eager ? "eager" : "lazy"} decoding="async" />
    </div>
  );
}

/*
 * `onMount` animates the card as soon as it renders (used by the filterable
 * work index); otherwise it waits until it scrolls into view.
 */
export function ProjectCard({
  project,
  index = 0,
  delay = 0,
  heading: Heading = "h3",
  onMount = false,
}) {
  const reduced = useReducedMotion();
  const Wrapper = onMount ? motion.div : Reveal;
  const wrapperProps = onMount
    ? {
        initial: reduced ? { opacity: 0 } : { opacity: 0, y: 28 },
        animate: reduced ? { opacity: 1 } : { opacity: 1, y: 0 },
        transition: { duration: 0.7, delay, ease: EASE },
      }
    : { delay };
  return (
    <Wrapper className="project-card" {...wrapperProps}>
      <Link
        to={`/${project.slug}`}
        className="project-card-link"
        aria-label={`${project.name} — ${project.title}`}
        data-cursor="View"
      >
        <ProjectCover project={project} eager={index < 2} layered />
        <div className="project-card-body">
          <div className="project-card-title">
            <Heading>{project.name}</Heading>
            <span className="project-card-arrow" aria-hidden="true">
              <Arrow size={18} />
            </span>
          </div>
          <p className="project-card-sub">{project.title}</p>
          <div className="project-card-meta">
            <span>{project.discipline}</span>
            <span>{project.year}</span>
          </div>
        </div>
      </Link>
    </Wrapper>
  );
}

/* -------------------------------------------------------------------------- */
/* Testimonial                                                                */
/* -------------------------------------------------------------------------- */
export function Testimonial({ item, delay = 0 }) {
  return (
    <Reveal as="figure" className="quote" delay={delay}>
      <span className="quote-mark" aria-hidden="true">
        “
      </span>
      <blockquote>{item.quote}</blockquote>
      <figcaption>
        <img src={item.avatar} alt="" width="48" height="48" loading="lazy" />
        <span>
          <strong>{item.name}</strong>
          <span>{item.role}</span>
        </span>
      </figcaption>
    </Reveal>
  );
}

/* -------------------------------------------------------------------------- */
/* Marquee whose speed and direction follow the scroll                         */
/* -------------------------------------------------------------------------- */
export function Marquee({ items, label, speed = 46 }) {
  const reduced = useReducedMotion();
  const wrapRef = useRef(null);
  const groupRef = useRef(null);
  const inView = useInView(wrapRef, { margin: "100px" });
  const [groupWidth, setGroupWidth] = useState(0);
  const offset = useMotionValue(0);
  const direction = useRef(-1);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, { damping: 50, stiffness: 300 });

  useEffect(() => {
    const el = groupRef.current;
    if (!el) return undefined;
    const measure = () => setGroupWidth(el.getBoundingClientRect().width);
    measure();
    if (typeof ResizeObserver === "undefined") return undefined;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    if (reduced || !inView || !groupWidth) return;
    const v = smoothVelocity.get();
    if (v > 20) direction.current = -1;
    else if (v < -20) direction.current = 1;
    const boost = 1 + Math.min(Math.abs(v) / 350, 5);
    let next = offset.get() + direction.current * speed * boost * (delta / 1000);
    if (next <= -groupWidth) next += groupWidth;
    if (next > 0) next -= groupWidth;
    offset.set(next);
  });

  const group = (hidden) => (
    <ul
      className="marquee-group"
      ref={hidden ? undefined : groupRef}
      aria-hidden={hidden || undefined}
    >
      {items.map((item) => (
        <li key={item}>
          <span>{item}</span>
          <i aria-hidden="true" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="marquee" ref={wrapRef} aria-label={label} role="group">
      <motion.div className="marquee-track" style={{ x: offset }}>
        {group(false)}
        {group(true)}
        {group(true)}
        {group(true)}
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Click-to-load video. Nothing is fetched from YouTube until play is pressed. */
/* -------------------------------------------------------------------------- */
export function VideoSample({ video }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className={`video ${playing ? "is-playing" : ""}`}>
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          className="video-poster"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${video.title}`}
          data-cursor="Play"
        >
          <span className="video-poster-glow" aria-hidden="true" />
          <span className="video-play" aria-hidden="true">
            <Play size={22} />
          </span>
          <span className="video-caption">
            <strong>{video.title}</strong>
            <span>{video.note}</span>
          </span>
        </button>
      )}
    </div>
  );
}
