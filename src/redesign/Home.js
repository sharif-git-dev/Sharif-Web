import React from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "./motion";
import {
  Arrow,
  Button,
  Eyebrow,
  Magnetic,
  Marquee,
  ProjectCard,
  Reveal,
  RevealLines,
  SectionHeading,
  Testimonial,
  TextLink,
} from "./ui";
import Timeline from "./Timeline";
import {
  collaborators,
  email,
  profile,
  projects,
  services,
  testimonials,
} from "./data";
import portrait from "../assets/image.png";

const DISCIPLINES = [
  { title: "Product design", note: "SaaS, dashboards & mobile apps" },
  { title: "Front-end development", note: "React & Flutter" },
  { title: "AI systems", note: "LLM automation & generative video" },
];

const FEATURED_ORDER = ["Civic-Sol", "WhisperLM", "Speed-of-Light", "Adeptia", "J-Tak"];

export default function Home() {
  const featured = projects.filter((project) => project.featured)
    .sort((a, b) => FEATURED_ORDER.indexOf(a.slug) - FEATURED_ORDER.indexOf(b.slug));
  const reduced = useReducedMotion();
  // The headline drifts and softens a little as the page scrolls past it.
  const { scrollY } = useScroll();
  const titleY = useTransform(scrollY, [0, 700], [0, 110]);
  const titleOpacity = useTransform(scrollY, [0, 520], [1, 0.2]);

  return (
    <>
      {/* Hero */}
      <section className="hero wrap">
        <div className="hero-top">
          <Reveal y={10}>
            <Eyebrow>
              {profile.name} — {profile.title}
            </Eyebrow>
          </Reveal>
          <Reveal y={10} delay={0.08}>
            <Eyebrow dot className="is-live">
              {profile.availability}
            </Eyebrow>
          </Reveal>
        </div>

        <motion.div
          className="hero-title-wrap"
          style={reduced ? undefined : { y: titleY, opacity: titleOpacity }}
        >
          <RevealLines
            as="h1"
            className="hero-title"
            immediate
            delay={0.1}
            lines={[
              "Intelligent",
              <>
                <em>systems</em> &amp; web apps<span className="accent">.</span>
              </>,
            ]}
          />
        </motion.div>

        <div className="hero-bottom">
          <Reveal className="hero-lead" delay={0.4}>
            <p className="lead">{profile.intro}</p>
            <div className="hero-actions">
              <Magnetic>
                <Button to="/Portfolio" size="lg">
                  View work
                </Button>
              </Magnetic>
              <Button to="/Resume" variant="ghost" size="lg">
                Resume
              </Button>
            </div>
          </Reveal>

          <Reveal as="ul" className="hero-disciplines" delay={0.5}>
            {DISCIPLINES.map((item, i) => (
              <li key={item.title}>
                <Link to="/Services">
                  <span className="hero-discipline-index">0{i + 1}</span>
                  <span className="hero-discipline-text">
                    <strong>{item.title}</strong>
                    <span>{item.note}</span>
                  </span>
                  <Arrow size={16} />
                </Link>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <Marquee items={collaborators} label="Companies and organisations I’ve worked with" />

      {/* Selected work */}
      <section className="wrap section" aria-label="Selected work">
        <SectionHeading
          index="01"
          label="Selected work"
          lines={["Recent", <em>case studies.</em>]}
        >
          <TextLink to="/Portfolio">
            All projects <sup>{projects.length}</sup>
          </TextLink>
        </SectionHeading>
        <div className="project-grid project-grid-offset">
          {featured.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={i}
              delay={(i % 2) * 0.1}
            />
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="wrap section" aria-label="What I do">
        <SectionHeading
          index="02"
          label="What I do"
          lines={["One person,", <em>the whole build.</em>]}
        >
          <p>{profile.edge}</p>
        </SectionHeading>
        <ul className="service-list">
          {services.map((service, i) => (
            <Reveal as="li" key={service.id} delay={i * 0.05}>
              <Link to="/Services" className="service-row">
                <span className="service-row-index">0{i + 1}</span>
                <span className="service-row-text">
                  <strong>{service.title}</strong>
                  <span>{service.subtitle}</span>
                </span>
                <span className="service-row-arrow" aria-hidden="true">
                  <Arrow size={20} />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Experience timeline */}
      <section className="wrap section" aria-label="Experience">
        <SectionHeading
          index="03"
          label="Experience · 2019 — Present"
          lines={["From pixels", <em>to pipelines.</em>]}
        >
          <TextLink to="/Resume">Full résumé</TextLink>
        </SectionHeading>
        <Timeline />
      </section>

      {/* About */}
      <section className="wrap section about-teaser" aria-label="About">
        <Reveal className="portrait">
          <div className="portrait-frame">
            <img
              src={portrait}
              alt="Portrait of Sharif Jamo"
              width="322"
              height="362"
              loading="lazy"
            />
          </div>
          <p className="portrait-caption">
            <span>{profile.name}</span>
            <span>{profile.location}</span>
          </p>
        </Reveal>
        <div className="about-teaser-copy">
          <Reveal className="section-label">
            <span className="section-index">04</span>
            <span>About</span>
          </Reveal>
          <RevealLines
            lines={["Designer who codes,", <em>developer who designs.</em>]}
          />
          <Reveal delay={0.1}>
            <p className="lead">{profile.bio}</p>
            <p>{profile.bioExtended}</p>
            <div className="link-row">
              <TextLink to="/About">More about me</TextLink>
              <TextLink href={`mailto:${email}`}>{email}</TextLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="wrap section" aria-label="Testimonials">
        <SectionHeading
          index="05"
          label="Kind words"
          lines={["In their", <em>words.</em>]}
        />
        <div className="quote-grid">
          {testimonials.map((item, i) => (
            <Testimonial key={item.name} item={item} delay={i * 0.1} />
          ))}
        </div>
      </section>
    </>
  );
}
