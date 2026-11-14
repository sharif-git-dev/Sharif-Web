import React from "react";
import {
  Arrow,
  Button,
  PageIntro,
  Reveal,
  RevealLines,
  SectionHeading,
  Testimonial,
} from "./ui";
import Orbit from "./Orbit";
import { email, profile, socials, testimonials, values } from "./data";
import portrait from "../assets/image.png";

export default function About() {
  return (
    <>
      <PageIntro
        eyebrow={`About — ${profile.title}`}
        lines={["Design, code", <em>&amp; AI, together.</em>]}
        description={profile.bio}
      >
        <Button to="/Resume">View résumé</Button>
        <Button to="/Contact" variant="ghost">
          Get in touch
        </Button>
      </PageIntro>

      <section className="wrap section about-story" aria-label="My story">
        <Reveal className="portrait">
          <div className="portrait-frame">
            <img
              src={portrait}
              alt="Portrait of Sharif Jamo"
              width="322"
              height="362"
            />
          </div>
          <p className="portrait-caption">
            <span>{profile.name}</span>
            <span>{profile.location}</span>
          </p>
        </Reveal>

        <div className="about-copy">
          <Reveal className="section-label">
            <span className="section-index">01</span>
            <span>Hello, I’m Sharif</span>
          </Reveal>
          <RevealLines lines={["I build where design,", <em>code and AI meet.</em>]} />
          <Reveal delay={0.1}>
            <p className="lead">{profile.bioExtended}</p>
            <p>
              Along the way I’ve designed enterprise SaaS and life-sciences
              products, shipped Flutter and React front-ends through Git, and
              built bilingual Arabic and English interfaces. Most recently I’ve
              been building AI workflows with Claude and GPT, and directing
              generative video.
            </p>
            <blockquote className="pull-quote">{profile.edge}</blockquote>
            <ul className="social-list">
              {socials.map((social) => (
                <li key={social.name}>
                  <a href={social.url} target="_blank" rel="noreferrer">
                    <span>{social.name}</span>
                    <span>{social.handle}</span>
                    <Arrow size={16} />
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${email}`}>
                  <span>Email</span>
                  <span>{email}</span>
                  <Arrow size={16} />
                </a>
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="wrap section" aria-label="How I work">
        <SectionHeading
          index="02"
          label="How I work"
          lines={["Three things", <em>I care about.</em>]}
        />
        <div className="value-grid">
          {values.map((value, i) => (
            <Reveal className="panel value" key={value.title} delay={i * 0.07}>
              <span className="value-index">0{i + 1}</span>
              <h3>{value.title}</h3>
              <p>{value.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="wrap section toolkit" aria-label="Toolkit">
        <SectionHeading
          index="03"
          label="Toolkit"
          lines={["The tools", <em>I reach for.</em>]}
        >
          <p>Hover or tap a tool to see what I use it for.</p>
        </SectionHeading>
        <Reveal>
          <Orbit />
        </Reveal>
      </section>

      <section className="wrap section" aria-label="Testimonials">
        <SectionHeading
          index="04"
          label="Kind words"
          lines={["From people", <em>I’ve worked with.</em>]}
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
