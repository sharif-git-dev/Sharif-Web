import React, { useEffect, useRef, useState } from "react";
import { Arrow, Button, Check, PageIntro, Reveal } from "./ui";
import { email, profile, socials } from "./data";
import { newRequestId, sendInquiry } from "./contactDelivery";

const TOPICS = [
  "Product design",
  "Web development",
  "Mobile app",
  "AI automation",
  "AI video",
  "Something else",
];

export default function Contact() {
  const [interest, setInterest] = useState([]);
  const [status, setStatus] = useState("");
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef(null);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const pending = useRef(false);
  const request = useRef(null);
  const controller = useRef(null);

  useEffect(() => () => { clearTimeout(copyTimer.current); controller.current?.abort(); }, []);

  const toggleInterest = (item) =>
    setInterest((previous) =>
      previous.includes(item)
        ? previous.filter((value) => value !== item)
        : [...previous, item],
    );

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (pending.current) return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    const payload = {
      name: String(fields.get("name") || "").trim(),
      replyTo: String(fields.get("email") || "").trim(),
      message: String(fields.get("message") || "").trim(),
      interest,
      website: String(fields.get("website") || ""),
    };
    const serialized = JSON.stringify(payload);
    if (request.current?.serialized !== serialized) {
      request.current = { serialized, id: newRequestId() };
    }
    pending.current = true;
    setSending(true);
    setFailed(false);
    setStatus("");
    const abort = new AbortController();
    controller.current = abort;
    const timeout = setTimeout(() => abort.abort(), 35000);
    try {
      const result = await sendInquiry({ ...payload, requestId: request.current.id }, abort.signal);
      if (abort.signal.aborted) return;
      setStatus(result.message || "Your message has been sent. Thank you for getting in touch.");
      form.reset();
      setInterest([]);
      request.current = null;
    } catch (error) {
      setFailed(true);
      setStatus(error.name === "AbortError"
        ? `The request timed out. Your message may have been sent. You can retry safely or email ${email} directly.`
        : error.message || `We could not send your message. Please email ${email} directly.`);
    } finally {
      clearTimeout(timeout);
      pending.current = false;
      setSending(false);
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2200);
    } catch {
      setStatus(`Couldn’t copy automatically — the address is ${email}.`);
    }
  };

  return (
    <>
      <PageIntro
        eyebrow={`Contact — ${profile.availability}`}
        lines={["A good idea starts", <em>with hello.</em>]}
        description="Tell me about your project, ask a question, or just say hi. Email is the quickest way to reach me."
      />

      <section className="wrap contact" aria-label="Contact">
        <Reveal as="aside" className="contact-aside">
          <span className="eyebrow">Email</span>
          <a className="contact-email" href={`mailto:${email}`}>
            {email}
            <Arrow size={22} />
          </a>
          <button
            type="button"
            className={`chip-button ${copied ? "is-done" : ""}`}
            onClick={copyEmail}
          >
            {copied ? (
              <>
                <Check size={14} /> Copied
              </>
            ) : (
              "Copy address"
            )}
          </button>
          <span className="sr-only" role="status">
            {copied ? "Email address copied" : ""}
          </span>

          <span className="eyebrow contact-aside-label">Elsewhere</span>
          <ul className="contact-links">
            {socials.map((social) => (
              <li key={social.name}>
                <a href={social.url} target="_blank" rel="noreferrer">
                  <span>{social.name}</span>
                  <span>{social.handle}</span>
                  <Arrow size={16} />
                </a>
              </li>
            ))}
          </ul>

          <span className="eyebrow contact-aside-label">Based in</span>
          <p className="contact-location">
            {profile.location}
            <br />
            <span>{profile.locationNote}</span>
          </p>
        </Reveal>

        <Reveal as="form" className="contact-form" onSubmit={handleSubmit} delay={0.08} aria-busy={sending}>
          <div className="contact-honeypot" aria-hidden="true"><label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
          <fieldset disabled={sending}>
            <legend>
              What can I help with? <span>Optional — pick any</span>
            </legend>
            <div className="topic-options">
              {TOPICS.map((item) => {
                const selected = interest.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    className="topic"
                    aria-pressed={selected}
                    onClick={() => toggleInterest(item)}
                  >
                    <span className="topic-check" aria-hidden="true">
                      <Check size={12} />
                    </span>
                    {item}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="form-row">
            <label className="field">
              <span>Your name</span>
              <input
                required
                disabled={sending}
                minLength={2}
                maxLength={100}
                autoComplete="name"
                name="name"
                placeholder="Jane Doe"
              />
            </label>
            <label className="field">
              <span>Email address</span>
              <input
                required
                disabled={sending}
                type="email"
                name="email"
                autoComplete="email"
                maxLength={254}
                placeholder="you@company.com"
              />
            </label>
          </div>
          <label className="field">
            <span>About your project</span>
            <textarea
              required
              disabled={sending}
              minLength={10}
              maxLength={4000}
              rows={5}
              name="message"
              placeholder="What are you building, and where could I help?"
            />
          </label>

          <div className="form-submit">
            <p>
              Your message goes directly to my inbox.
              <br />
              I’ll reply to the email you provide.
            </p>
            <Button type="submit" size="lg" disabled={sending}>
              {sending ? "Sending…" : "Send message"}
            </Button>
          </div>
          <p className={`form-status ${failed ? "is-error" : ""}`} role={failed ? "alert" : "status"}>
            {status}
          </p>
        </Reveal>
      </section>
    </>
  );
}
