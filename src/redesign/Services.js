import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "./motion";
import {
  Button,
  EASE,
  PageIntro,
  Plus,
  Reveal,
  SectionHeading,
  Tags,
  TextLink,
  VideoSample,
} from "./ui";
import { email, faqs, process, services } from "./data";

function Faq({ item, isOpen, onToggle, id }) {
  const reduced = useReducedMotion();
  return (
    <div className={`faq ${isOpen ? "is-open" : ""}`}>
      <h3>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={id}
          onClick={onToggle}
        >
          <span>{item.q}</span>
          <span className="faq-icon" aria-hidden="true">
            <Plus size={18} />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={id}
            role="region"
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduced ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <p>{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Services() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <>
      <PageIntro
        eyebrow="Services — Design, development & AI"
        lines={["Thoughtfully designed,", <em>properly built.</em>]}
        description="Four ways I can help, on their own or together. Each one comes from work I’ve already shipped."
      >
        <Button to="/Contact">Start a project</Button>
        <Button href={`mailto:${email}`} variant="ghost">
          {email}
        </Button>
      </PageIntro>

      <section className="wrap service-details" aria-label="Services">
        {services.map((service, i) => (
          <Reveal as="article" className="service-detail" key={service.id}>
            <span className="service-detail-index">0{i + 1}</span>
            <div className="service-detail-head">
              <h2>{service.title}</h2>
              <p>{service.subtitle}</p>
            </div>
            <div className="service-detail-body">
              <p>{service.description}</p>
              <Tags items={service.items} />
              {service.video && <VideoSample video={service.video} />}
            </div>
          </Reveal>
        ))}
      </section>

      <section className="wrap section" aria-label="Process">
        <SectionHeading
          index="01"
          label="How it works"
          lines={["From first call", <em>to handover.</em>]}
        />
        <ol className="process">
          {process.map((step, i) => (
            <Reveal as="li" className="process-step" key={step.title} delay={i * 0.07}>
              <span className="process-index">0{i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="wrap section faq-section" aria-label="Frequently asked questions">
        <SectionHeading
          index="02"
          label="Before we begin"
          lines={["A few good", <em>questions.</em>]}
        >
          <p>Something else on your mind?</p>
          <TextLink href={`mailto:${email}`}>{email}</TextLink>
        </SectionHeading>
        <Reveal className="faq-list">
          {faqs.map((item, i) => (
            <Faq
              key={item.q}
              item={item}
              id={`faq-${i}`}
              isOpen={openFaq === i}
              onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
            />
          ))}
        </Reveal>
      </section>
    </>
  );
}
