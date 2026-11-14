import React, { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useReducedMotion } from "./motion";
import { Arrow, Button, EASE, Logo, Moon, Sun } from "./ui";
import { email, projects, socials } from "./data";
const LINKS = [{
  to: "/Portfolio",
  label: "Work",
  count: projects.length
}, {
  to: "/Services",
  label: "Services"
}, {
  to: "/Resume",
  label: "Resume"
}, {
  to: "/About",
  label: "About"
}];
const THEME_COLORS = {
  dark: "#0e0f0d",
  light: "#f5f4ef"
};
function readTheme() {
  const preset = document.documentElement.getAttribute("data-theme");
  if (preset === "light" || preset === "dark") return preset;
  try {
    const saved = window.localStorage.getItem("sj-theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    // storage can be unavailable; fall through to the system preference
  }
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}
function ThemeToggle() {
  const [theme, setTheme] = useState(readTheme);
  const reduced = useReducedMotion();
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLORS[theme]);
  }, [theme]);
  const toggle = event => {
    const next = theme === "dark" ? "light" : "dark";
    // Only an explicit choice is remembered; until then the system decides.
    try {
      window.localStorage.setItem("sj-theme", next);
    } catch {
      // ignore storage errors
    }
    // Where supported, the new theme opens out in a circle from the button.
    if (reduced || typeof document.startViewTransition !== "function") {
      setTheme(next);
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(cx, window.innerWidth - cx), Math.max(cy, window.innerHeight - cy));
    const transition = document.startViewTransition(() => {
      flushSync(() => setTheme(next));
      document.documentElement.setAttribute("data-theme", next);
    });
    transition.ready.then(() => {
      document.documentElement.animate({
        clipPath: [`circle(0px at ${cx}px ${cy}px)`, `circle(${radius}px at ${cx}px ${cy}px)`]
      }, {
        duration: 650,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        pseudoElement: "::view-transition-new(root)"
      });
    }).catch(() => {});
  };
  const next = theme === "dark" ? "light" : "dark";
  return <button type="button" className="theme-toggle" onClick={toggle} aria-label={`Switch to ${next} mode`} title={`Switch to ${next} mode`}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={theme} className="theme-toggle-icon" initial={reduced ? false : {
        rotate: -70,
        scale: 0.4,
        opacity: 0
      }} animate={{
        rotate: 0,
        scale: 1,
        opacity: 1
      }} exit={reduced ? undefined : {
        rotate: 70,
        scale: 0.4,
        opacity: 0
      }} transition={{
        duration: 0.28,
        ease: EASE
      }}>
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </motion.span>
      </AnimatePresence>
    </button>;
}
export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const {
    pathname
  } = useLocation();
  const {
    scrollY
  } = useScroll();
  const menuButton = useRef(null);
  const reduced = useReducedMotion();
  useMotionValueEvent(scrollY, "change", value => {
    const isScrolled = value > 12;
    if (isScrolled !== scrolled) setScrolled(isScrolled);
  });
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 861px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener?.("change", closeOnDesktop);
    return () => desktop.removeEventListener?.("change", closeOnDesktop);
  }, []);
  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const background = [...document.querySelectorAll("main, .site-footer")];
    const previousInert = background.map(node => node.inert);
    background.forEach(node => {
      node.inert = true;
    });
    const onKey = event => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
      if (event.key === "Tab") {
        const controls = [...document.querySelectorAll('.site-header a[href], .site-header button:not(:disabled)')].filter(node => node.getClientRects().length > 0);
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus({
            preventScroll: true
          });
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus({
            preventScroll: true
          });
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      background.forEach((node, index) => {
        node.inert = previousInert[index];
      });
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  return <header className={`site-header ${scrolled ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}>
      <div className="nav wrap">
        <Logo onClick={() => setOpen(false)} />

        <nav className="nav-links" aria-label="Main navigation">
          {LINKS.map(link => <NavLink key={link.to} to={link.to} className="nav-link">
              {({
            isActive
          }) => <>
                  <span>{link.label}</span>
                  {link.count ? <sup>{link.count}</sup> : null}
                  {isActive && <motion.i className="nav-link-dot" layoutId="nav-dot" transition={{
              duration: 0.45,
              ease: EASE
            }} aria-hidden="true" />}
                </>}
            </NavLink>)}
        </nav>

        <div className="nav-actions">
          <ThemeToggle />
          <Button to="/Contact" size="sm" className="nav-cta">
            Let’s talk
          </Button>
          <button ref={menuButton} type="button" className={`menu-toggle ${open ? "is-open" : ""}`} onClick={() => setOpen(value => !value)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"}>
            <span />
            <span />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && <motion.div id="mobile-menu" className="mobile-menu" initial={reduced ? false : {
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={reduced ? undefined : {
        opacity: 0
      }} transition={{
        duration: 0.25
      }}>
            <nav className="mobile-menu-links wrap" aria-label="Mobile navigation">
              {[...LINKS, {
            to: "/Contact",
            label: "Contact"
          }].map((link, i) => <motion.div key={link.to} initial={reduced ? false : {
            opacity: 0,
            y: 24
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.55,
            delay: 0.05 + i * 0.05,
            ease: EASE
          }}>
                  <NavLink to={link.to} className="mobile-menu-link" onClick={() => setOpen(false)}>
                    <span>{link.label}</span>
                    <Arrow size={22} />
                  </NavLink>
                </motion.div>)}
            </nav>
            <div className="mobile-menu-foot wrap">
              <a href={`mailto:${email}`}>{email}</a>
              <div>
                {socials.map(social => <a key={social.name} href={social.url} target="_blank" rel="noreferrer">
                    {social.name}
                  </a>)}
              </div>
            </div>
          </motion.div>}
      </AnimatePresence>
    </header>;
}
