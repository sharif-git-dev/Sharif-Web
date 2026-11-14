import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Arrow, ArrowUp, LogoMark, Magnetic, RevealLines } from "./ui";
import { email, profile, socials } from "./data";
import { useMotionPreference } from "./motion";

function LocalTime() {
  const format = () =>
    new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: profile.timeZone,
    }).format(new Date());
  const [time, setTime] = useState(format);
  useEffect(() => {
    const timer = setInterval(() => setTime(format()), 20000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <span className="footer-time">{time}</span>;
}

/* Lets anyone turn the animations on or off, whatever their system says. */
function MotionToggle() {
  const { reduced, choice, systemReduced, setChoice } = useMotionPreference();
  const followingSystem = choice === "system" && systemReduced;
  return (
    <button
      type="button"
      className="motion-toggle"
      role="switch"
      aria-checked={!reduced}
      onClick={() => setChoice(reduced ? "on" : "off")}
      title={
        followingSystem
          ? "Your system asks for reduced motion. Click to turn animations on."
          : undefined
      }
    >
      <span className="motion-toggle-track" aria-hidden="true">
        <span className="motion-toggle-thumb" />
      </span>
      Animations {reduced ? "off" : "on"}
      {followingSystem && <span className="motion-toggle-note">system setting</span>}
    </button>
  );
}

export default function Footer() {
  const { reduced } = useMotionPreference();
  const toTop = () =>
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-cta">
          <span className="eyebrow eyebrow-dot">{profile.availability}</span>
          <Link to="/Contact" className="footer-cta-link" data-cursor="Say hello">
            <RevealLines
              as="p"
              className="footer-cta-title"
              lines={[
                "Have something",
                <>
                  <em>in mind?</em>
                </>,
              ]}
            />
          </Link>
          <div className="footer-cta-actions">
            <Magnetic>
              <a className="btn btn-primary btn-lg" href={`mailto:${email}`}>
                <span className="btn-label">{email}</span>
                <span className="btn-icon" aria-hidden="true">
                  <span className="btn-icon-slide">
                    <Arrow size={18} />
                  </span>
                  <span className="btn-icon-slide btn-icon-clone">
                    <Arrow size={18} />
                  </span>
                </span>
              </a>
            </Magnetic>
            <Link className="text-link" to="/Resume">
              <span className="text-link-label">View résumé</span>
              <Arrow size={16} />
            </Link>
          </div>
        </div>

        <div className="footer-grid">
          <div className="footer-brand">
            <LogoMark size={36} />
            <p>
              {profile.name}
              <br />
              <span>{profile.title}</span>
            </p>
          </div>
          <nav className="footer-col" aria-label="Footer navigation">
            <span className="eyebrow">Explore</span>
            <Link to="/Portfolio">Work</Link>
            <Link to="/Services">Services</Link>
            <Link to="/Resume">Resume</Link>
            <Link to="/About">About</Link>
            <Link to="/Contact">Contact</Link>
          </nav>
          <div className="footer-col">
            <span className="eyebrow">Elsewhere</span>
            {socials.map((social) => (
              <a key={social.name} href={social.url} target="_blank" rel="noreferrer">
                {social.name}
                <Arrow size={14} />
              </a>
            ))}
          </div>
          <div className="footer-col">
            <span className="eyebrow">Based in</span>
            <p>
              {profile.location}
              <br />
              <span>{profile.locationNote}</span>
            </p>
            <p className="footer-clock">
              Local time <LocalTime />
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <MotionToggle />
          <button type="button" className="footer-top" onClick={toTop}>
            Back to top <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
