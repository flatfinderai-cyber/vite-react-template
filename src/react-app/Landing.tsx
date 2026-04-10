/*
  Landing.tsx
  Copyright © 2025–2026 Lila Alexandra Olufemi Inglis Abegunrin
  FlatFinder: Housing Revolutionised Inc.
  Patent Pending (CIPO) | Trademarks Pending (CIPO)
  PROPRIETARY AND CONFIDENTIAL
*/

import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <>
      {/* ── NAV ── */}
      <nav>
        <Link to="/" className="nav-logo">
          Flat<span>Finder</span>™
        </Link>
        <ul className="nav-links">
          <li><a href="#how">How It Works</a></li>
          <li><a href="#manifesto">Why FlatFinder</a></li>
          <li><a href="mailto:flat@flatfinder.io">Contact Benny</a></li>
        </ul>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-text">
          <div className="eyebrow">Toronto-based · Launching 2026</div>
          <h1>
            Housing<span className="highlight">Revolutionised.</span>
          </h1>
          <p className="tagline">
            FlatFinder does the heavy lifting.<br />
            <strong>Just tell Benny what you need</strong> — he finds your hidden gem.
          </p>
          <p className="sub-tagline">
            <span>No forms</span>
            <span>No gatekeeping</span>
            <span>No nonsense</span>
          </p>
          <div className="btn-group">
            <Link to="/signup" className="btn-primary">Get Early Access →</Link>
            <a href="mailto:flat@flatfinder.io" className="btn-secondary">✉ Contact Benny</a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="benny-wrap">
            <img src="/benny.png" alt="Benny — FlatFinder's AI apartment scout" />
            <div className="benny-badge">
              AI-powered scout<strong>Benny™ is on it.</strong>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="stats-bar">
        <div className="stat">
          <div className="stat-number">70%</div>
          <div className="stat-label">of renters say finding a place is the most stressful thing they do</div>
        </div>
        <div className="stat">
          <div className="stat-number">3×</div>
          <div className="stat-label">income-to-rent screening — a legal grey zone FlatFinder fights</div>
        </div>
        <div className="stat">
          <div className="stat-number">100%</div>
          <div className="stat-label">free for renters during beta — no catches</div>
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <section className="section" id="how">
        <div className="section-label">How It Works</div>
        <h2 className="section-title">Three steps. One conversation. Done.</h2>
        <div className="steps">
          <div className="step">
            <div className="step-num">01</div>
            <h3>Tell Benny what you need</h3>
            <p>Budget, bedrooms, city, move-in date. Say it once in plain language — Benny gets it.</p>
          </div>
          <div className="step">
            <div className="step-num">02</div>
            <h3>Benny scans and filters</h3>
            <p>The Anti-Gatekeeping Affordability Algorithm™ removes predatory listings before you ever see them.</p>
          </div>
          <div className="step">
            <div className="step-num">03</div>
            <h3>You show up. You move in.</h3>
            <p>Real options. Verified compliance badges. Demand letter ready if a landlord oversteps.</p>
          </div>
        </div>
      </section>

      {/* ── MANIFESTO ── */}
      <section className="manifesto" id="manifesto">
        <div className="manifesto-grid">
          <blockquote>
            Renting shouldn't be a<em> battle.</em> We made it a <em>conversation.</em>
          </blockquote>
          <ul className="manifesto-points">
            <li>FlatFinder never charges a working renter to find a place to live.</li>
            <li>Every listing is run through the Anti-Gatekeeping Affordability Algorithm™ before it reaches you.</li>
            <li>Benny knows provincial law. He'll tell you when a landlord is out of line.</li>
            <li>Your data lives in Canada. Ca-central-1. It does not leave.</li>
            <li>This platform was built by a renter. For renters. Full stop.</li>
          </ul>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="cta-section">
        <h2>YOUR NEXT HOME<br />IS WAITING.</h2>
        <p>Join the beta waitlist. Be first. Pay nothing.</p>
        <div className="btn-group">
          <Link to="/signup" className="btn-primary">Get Early Access →</Link>
          <a href="mailto:flat@flatfinder.io" className="btn-secondary">✉ flat@flatfinder.io</a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="footer-logo">Flat<span>Finder</span>™</div>
        <ul className="footer-links">
          <li><Link to="/terms">Terms</Link></li>
          <li><Link to="/privacy">Privacy</Link></li>
          <li><a href="mailto:flat@flatfinder.io">Contact</a></li>
        </ul>
        <div className="footer-legal">
          © 2025–2026 Lila Alexandra Olufemi Inglis Abegunrin<br />
          FlatFinder: Housing Revolutionised Inc. · Patent Pending (CIPO)<br />
          Canadian Kind, Scottish Strong
        </div>
      </footer>
    </>
  );
}
