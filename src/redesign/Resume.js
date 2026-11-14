import React from "react";
import {
  Button,
  PageIntro,
  Printer,
  Reveal,
  SectionHeading,
  Tags,
} from "./ui";
import Timeline from "./Timeline";
import { email, profile, resume, socials, testimonials } from "./data";

export default function Resume() {
  return (
    <div className="resume">
      {/* Shown only on paper, so the printed CV starts with a proper header. */}
      <header className="print-header">
        <h1>{profile.name}</h1>
        <p>{profile.title}</p>
        <p>
          {profile.location} · {email} · {profile.website.replace(/^https?:\/\/|\/$/g, "")}
        </p>
        <p>{resume.summary}</p>
      </header>

      <PageIntro
        eyebrow={`Resume — ${profile.location}`}
        lines={["Curriculum", <em>vitae.</em>]}
        description={resume.summary}
      >
        <Button onClick={() => window.open(`${process.env.PUBLIC_URL}/resume/Sharif-Jamo-Resume.pdf`, "_blank", "noopener,noreferrer")} icon={<Printer size={18} />}>
          Print / save as PDF
        </Button>
        <Button href={`mailto:${email}`} variant="ghost">
          {email}
        </Button>
      </PageIntro>

      <section className="wrap section" aria-label="Experience">
        <SectionHeading
          index="01"
          label="Experience"
          lines={["Where I’ve", <em>worked.</em>]}
        />
        <Timeline />
      </section>

      <section className="wrap section" aria-label="Skills">
        <SectionHeading
          index="02"
          label="Skills"
          lines={["What I", <em>work with.</em>]}
        />
        <div className="skill-grid">
          {resume.skillGroups.map((group, i) => (
            <Reveal className="panel" key={group.title} delay={i * 0.05}>
              <h3>{group.title}</h3>
              <Tags items={group.skills} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="wrap section" aria-label="Education and credentials">
        <SectionHeading
          index="03"
          label="Education & more"
          lines={["Learning,", <em>and giving back.</em>]}
        />
        <div className="credential-grid">
          <Reveal className="panel">
            <h3>Education</h3>
            <ul className="record-list">
              {resume.education.map((item) => (
                <li key={item.title}>
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.place}</span>
                  </div>
                  <span className="record-date">{item.period}</span>
                </li>
              ))}
            </ul>
            <h3 className="panel-subheading">Languages</h3>
            <ul className="language-list">
              {resume.languages.map((item) => (
                <li key={item.language}>
                  <strong>{item.language}</strong>
                  <span>{item.level}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="panel" delay={0.06}>
            <h3>Certifications</h3>
            <ul className="record-list">
              {resume.certifications.map((item) => (
                <li key={item.name}>
                  <div>
                    <strong>{item.name}</strong>
                    <span>{item.issuer}</span>
                  </div>
                  <span className="record-date">{item.year}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="panel" delay={0.04}>
            <h3>Volunteering</h3>
            <ul className="record-list">
              {resume.volunteering.map((item) => (
                <li key={item.title}>
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.place}</span>
                    <p>{item.detail}</p>
                  </div>
                  <span className="record-date">{item.period}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="panel" delay={0.1}>
            <h3>References</h3>
            <ul className="record-list">
              {testimonials.map((item) => (
                <li key={item.name}>
                  <div>
                    <strong>{item.name}</strong>
                    <span>{item.role}</span>
                  </div>
                </li>
              ))}
            </ul>
            <h3 className="panel-subheading">Links</h3>
            <ul className="language-list">
              {socials.map((item) => (
                <li key={item.name}>
                  <strong>{item.name}</strong>
                  <a href={item.url} target="_blank" rel="noreferrer">
                    {item.handle}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
