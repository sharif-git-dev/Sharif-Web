import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Arrow,
  ArrowLeft,
  Button,
  Close,
  Eyebrow,
  ProjectCover,
  Reveal,
  RevealLines,
  Tags,
} from "./ui";
import { projects } from "./data";

const pad = (value) => String(value).padStart(2, "0");

/*
 * Every case study renders through this one template, in this order:
 * intro → facts → cover → overview → what I delivered → gallery → next.
 */
export default function Project({ project }) {
  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const gallery = [...(project.gallery || [])].sort((a, b) =>
    project.deliverables.findIndex(item => item.title === a.relatedTo) -
    project.deliverables.findIndex(item => item.title === b.relatedTo));

  const dialog = useRef(null);
  const [active, setActive] = useState(null);
  const isOpen = active !== null;

  const close = useCallback(() => {
    dialog.current?.close?.();
    setActive(null);
  }, []);
  const step = useCallback(
    (direction) =>
      setActive((value) =>
        value === null
          ? value
          : (value + direction + gallery.length) % gallery.length,
      ),
    [gallery.length],
  );

  useEffect(() => {
    if (!isOpen) return undefined;
    const node = dialog.current;
    if (node && !node.open) node.showModal?.();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event) => {
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen, step]);

  const facts = [
    { label: "Role", value: project.role },
    { label: "Client", value: project.client },
    { label: "Year", value: project.year },
    { label: "Platform", value: project.platform },
  ];

  return (
    <article className="case">
      <header className="case-intro wrap">
        <Reveal className="case-nav" y={10}>
          <Link className="back-link" to="/Portfolio">
            <ArrowLeft size={16} /> All work
          </Link>
          <span className="eyebrow">
            {pad(index + 1)} / {pad(projects.length)}
          </span>
        </Reveal>
        <Reveal y={10} delay={0.05}>
          <Eyebrow dot>{project.discipline}</Eyebrow>
        </Reveal>
        <RevealLines
          as="h1"
          className="case-title"
          immediate
          delay={0.1}
          lines={[
            <>
              {project.name}
              <span className="accent">.</span>
            </>,
          ]}
        />
        <Reveal className="case-summary" delay={0.3}>
          <p>{project.summary}</p>
          <div className="case-links">
            {project.links.github && (
              <Button href={project.links.github} external variant="ghost">
                View on GitHub
              </Button>
            )}
            {project.links.live && (
              <Button href={project.links.live} external>
                Visit live site
              </Button>
            )}
            {project.links.behance && (
              <Button href={project.links.behance} external variant="ghost">
                Case study on Behance
              </Button>
            )}
          </div>
        </Reveal>
      </header>

      <Reveal as="dl" className="case-facts wrap" delay={0.35}>
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt>{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </Reveal>

      <Reveal className="case-cover wrap" delay={0.1}>
        <ProjectCover project={project} eager />
        {project.coverCaption && <p className="case-cover-caption">{project.coverCaption}</p>}
      </Reveal>

      <section className="case-section wrap" aria-label="Overview">
        <Reveal className="section-label">
          <span className="section-index">01</span>
          <span>Overview</span>
        </Reveal>
        <div className="case-body">
          <Reveal as="p" className="case-lede">
            {project.overview}
          </Reveal>
          <div className="case-columns">
            <Reveal delay={0.05}>
              <h2>The challenge</h2>
              <p>{project.challenge}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2>The approach</h2>
              <p>{project.approach}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="case-section wrap" aria-label="What I delivered">
        <Reveal className="section-label">
          <span className="section-index">02</span>
          <span>What I delivered</span>
        </Reveal>
        <div className="case-body">
          <ol className="deliverables case-story">
            {project.deliverables.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 0.05}>
                <span className="deliverable-index">{pad(i + 1)}</span>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
                {gallery.some(image => image.relatedTo === item.title) && <div className="story-media">
                {gallery.filter(image => image.relatedTo === item.title).map(image => (
                  <figure className="story-figure" key={image.title}>
                    <button type="button" className="gallery-image" style={{ "--cover": project.color }} onClick={() => setActive(gallery.indexOf(image))} aria-label={`Enlarge image: ${image.title}`} data-cursor="Enlarge">
                      <img src={image.src} alt={image.caption} loading="lazy" />
                    </button>
                    <figcaption><strong>{image.title}</strong><span>{image.caption}</span></figcaption>
                  </figure>
                ))}
                </div>}
              </Reveal>
            ))}
          </ol>
          <Reveal className="case-stack">
            <span className="eyebrow">Tools &amp; methods</span>
            <Tags items={project.stack} />
          </Reveal>
        </div>
      </section>

      {gallery.some(image => !image.relatedTo) && (
        <section className="case-section wrap" aria-label="Gallery">
          <Reveal className="section-label">
            <span className="section-index">03</span>
            <span>A closer look</span>
          </Reveal>
          <div className="gallery">
            {gallery.filter(image => !image.relatedTo).map((item, i) => (
              <Reveal
                as="figure"
                className="gallery-item"
                key={item.title}
                delay={(i % 2) * 0.08}
              >
                <button
                  type="button"
                  className="gallery-image"
                  style={{ "--cover": project.color }}
                  onClick={() => setActive(gallery.indexOf(item))}
                  aria-label={`Enlarge image: ${item.title}`}
                  data-cursor="Enlarge"
                >
                  <img src={item.src} alt={item.caption} loading="lazy" />
                </button>
                <figcaption>
                  <strong>{item.title}</strong>
                  <span>{item.caption}</span>
                </figcaption>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <nav className="case-next wrap" aria-label="More projects">
        <Link className="case-prev-link" to={`/${previous.slug}`}>
          <ArrowLeft size={16} /> Previous: {previous.name}
        </Link>
        <Link className="case-next-link" to={`/${next.slug}`} data-cursor="Next">
          <span className="eyebrow">Next project</span>
          <span className="case-next-title">
            {next.name}
            <Arrow size={44} />
          </span>
          <span className="case-next-sub">{next.title}</span>
        </Link>
      </nav>

      {isOpen && (
        <dialog
          className="lightbox"
          ref={dialog}
          aria-label={gallery[active].title}
          onCancel={(event) => {
            event.preventDefault();
            close();
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <div className="lightbox-bar">
            <span>
              {pad(active + 1)} / {pad(gallery.length)} — {gallery[active].title}
            </span>
            <button type="button" onClick={close} aria-label="Close image">
              Close <Close size={16} />
            </button>
          </div>
          <img src={gallery[active].src} alt={gallery[active].caption} />
          {gallery.length > 1 && (
            <div className="lightbox-nav">
              <button type="button" onClick={() => step(-1)} aria-label="Previous image">
                <ArrowLeft size={18} />
              </button>
              <button type="button" onClick={() => step(1)} aria-label="Next image">
                <Arrow diagonal={false} size={18} />
              </button>
            </div>
          )}
        </dialog>
      )}
    </article>
  );
}
