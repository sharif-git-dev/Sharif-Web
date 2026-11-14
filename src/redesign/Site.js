import React, { useEffect, useRef } from "react";
import {
  HashRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { MotionProvider, useReducedMotion } from "./motion";
import Navigation from "./Navigation";
import Footer from "./Footer";
import Cursor from "./Cursor";
import Home from "./Home";
import Work from "./Work";
import About from "./About";
import Services from "./Services";
import Contact from "./Contact";
import Resume from "./Resume";
import Project from "./Project";
import { profile, projectRedirects, projects } from "./data";
import { Button, EASE, PageIntro } from "./ui";
import "./styles.css";

const PAGE_TITLES = {
  "/": profile.title,
  "/portfolio": "Work",
  "/resume": "Resume",
  "/about": "About",
  "/services": "Services",
  "/contact": "Contact",
};

function NotFound() {
  return (
    <>
      <PageIntro
        eyebrow="404 — Page not found"
        lines={["A little", <em>off track.</em>]}
        description="That page isn’t here, but there’s plenty of work to explore."
      >
        <Button to="/Portfolio">See the work</Button>
        <Button to="/" variant="ghost">
          Back home
        </Button>
      </PageIntro>
    </>
  );
}

function Shell() {
  const { pathname } = useLocation();
  const firstRender = useRef(true);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  const key = pathname.toLowerCase();
  const project = projects.find((item) => `/${item.slug}`.toLowerCase() === key);

  useEffect(() => {
    const title = project
      ? `${project.name} — ${project.title}`
      : PAGE_TITLES[key] || "Page not found";
    document.title =
      key === "/" ? `${profile.name} — ${title}` : `${title} — ${profile.name}`;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    if (!firstRender.current) {
      document.getElementById("main-content")?.focus({ preventScroll: true });
    }
    firstRender.current = false;
  }, [key, project]);

  return (
    <>
      {/* The hash router owns the URL hash, so the skip link moves focus itself. */}
      <a
        className="skip-link"
        href="#main-content"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById("main-content")?.focus();
        }}
      >
        Skip to content
      </a>
      <div className="backdrop" aria-hidden="true" />
      <motion.div
        className="progress-bar"
        style={{ scaleX: reduced ? scrollYProgress : progress }}
        aria-hidden="true"
      />
      <Cursor />
      <Navigation />
      <motion.main
        id="main-content"
        tabIndex={-1}
        key={key}
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Portfolio" element={<Work />} />
          <Route path="/Resume" element={<Resume />} />
          <Route path="/About" element={<About />} />
          <Route path="/Services" element={<Services />} />
          <Route path="/Contact" element={<Contact />} />
          {projects.map((item) => (
            <Route
              key={item.slug}
              path={`/${item.slug}`}
              element={<Project key={item.slug} project={item} />}
            />
          ))}
          {Object.entries(projectRedirects).map(([from, to]) => (
            <Route key={from} path={from} element={<Navigate to={to} replace />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.main>
      <Footer />
    </>
  );
}

export default function Site() {
  return (
    <MotionProvider>
      <HashRouter>
        <Shell />
      </HashRouter>
    </MotionProvider>
  );
}
