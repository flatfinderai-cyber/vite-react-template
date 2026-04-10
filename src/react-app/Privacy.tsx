/*
  Privacy.tsx
  Copyright © 2025–2026 Lila Alexandra Olufemi Inglis Abegunrin
  FlatFinder: Housing Revolutionised Inc.
  Patent Pending (CIPO) | Trademarks Pending (CIPO)
  PROPRIETARY AND CONFIDENTIAL
*/

import { Link } from "react-router-dom";
import "./Legal.css";

export default function Privacy() {
  return (
    <>
      <header className="legal-header">
        <div className="legal-header-inner">
          <Link to="/" className="legal-logo">🐱 FlatFinder™</Link>
        </div>
      </header>

      <div className="legal-container">
        <div className="legal-content">
          <div className="legal-eyebrow">Legal</div>
          <h1>Privacy Policy</h1>
          <p className="legal-date">
            Effective: April 2026 · Compliant with PIPEDA (Canada) &amp; GDPR-adjacent practices
          </p>

          <section>
            <h2>Who We Are</h2>
            <p>
              FlatFinder: Housing Revolutionised Inc. ("FlatFinder™", "we", "us") operates
              flatfinder.io. We are federally incorporated in Canada. Your data controller is
              Lila Alexandra Olufemi Inglis Abegunrin.
            </p>
            <p>
              Privacy questions: <a href="mailto:privacy@flatfinder.io">privacy@flatfinder.io</a>
            </p>
          </section>

          <section>
            <h2>What Data We Collect</h2>
            <p>When you sign up for the beta, we collect:</p>
            <ul>
              <li>Name and email address</li>
              <li>City and country of your housing search</li>
              <li>Bedroom requirements and monthly budget</li>
              <li>Occupation and employment status</li>
              <li>Annual income (optional — you choose whether to provide it)</li>
              <li>Rental history context (denied by income screening, predatory landlord experience)</li>
              <li>How you found us</li>
              <li>Your consent records (terms accepted, privacy accepted, marketing opt-in)</li>
            </ul>
            <p>We also collect standard technical data:</p>
            <ul>
              <li>IP country (not full IP address) for data sovereignty tracking</li>
              <li>Timestamp of signup</li>
            </ul>
          </section>

          <section>
            <h2>What We Do NOT Collect</h2>
            <ul>
              <li>Social Insurance Numbers (SIN) — ever</li>
              <li>Passport, driver's licence, or government ID numbers</li>
              <li>Full bank account or credit card details</li>
              <li>Credit scores or credit bureau data</li>
              <li>Full IP addresses (only country-level)</li>
            </ul>
          </section>

          <section>
            <h2>How We Use Your Data</h2>
            <p>Your data is used to:</p>
            <ul>
              <li>Match you to relevant rental listings when the platform launches</li>
              <li>Run your affordability profile through the Anti-Gatekeeping Affordability Algorithm™</li>
              <li>Improve Benny™'s AI responses (using anonymized, aggregated patterns only)</li>
              <li>Contact you about your beta waitlist status and platform launch</li>
              <li>Conduct internal platform testing and research</li>
            </ul>
            <p>
              We do not use your data for advertising. We do not sell your data. We do not share
              your data with landlords or real estate agents.
            </p>
          </section>

          <section>
            <h2>Where Your Data Lives</h2>
            <p>
              Your data is stored in Canada, in the <strong>ca-central-1</strong> region of
              our database provider. It does not leave Canada. This satisfies Canada's data
              sovereignty requirements under PIPEDA.
            </p>
          </section>

          <section>
            <h2>How Long We Keep It</h2>
            <p>
              Beta signup data is retained for the duration of the beta period plus 12 months.
              You can request deletion at any time (see Your Rights below).
              If you become an active user, your data retention is governed by your account agreement.
            </p>
          </section>

          <section>
            <h2>Cookies</h2>
            <p>We use two types of cookies:</p>
            <ul>
              <li>
                <strong>Essential cookies</strong> — required for the site to function. No consent
                required under PIPEDA.
              </li>
              <li>
                <strong>Analytics cookies</strong> — Plausible Analytics (privacy-first, no
                fingerprinting, no cross-site tracking, GDPR-compliant). Only set if you consent
                during signup.
              </li>
            </ul>
          </section>

          <section>
            <h2>Your Rights Under PIPEDA</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access the personal data we hold about you</li>
              <li>Correct inaccurate information</li>
              <li>Withdraw consent (which may limit your access to the service)</li>
              <li>Request deletion of your data</li>
              <li>File a complaint with the Office of the Privacy Commissioner of Canada</li>
            </ul>
            <p>
              To exercise any of these rights, email{" "}
              <a href="mailto:privacy@flatfinder.io">privacy@flatfinder.io</a>. We will respond
              within 30 days.
            </p>
          </section>

          <section>
            <h2>UK &amp; EU Users</h2>
            <p>
              If you are accessing FlatFinder™ from the UK or EU, we apply GDPR-adjacent practices:
              lawful basis for processing is consent (which you provide at signup) and legitimate
              interests. You have the right to data portability and to lodge a complaint with your
              local supervisory authority.
            </p>
          </section>

          <section>
            <h2>Data Breach Policy</h2>
            <p>
              In the event of a data breach affecting your personal information, we will notify you
              and the Office of the Privacy Commissioner of Canada within 72 hours of becoming aware
              of the breach, as required by PIPEDA's breach of security safeguards provisions.
            </p>
          </section>

          <section>
            <h2>Changes to This Policy</h2>
            <p>
              We may update this policy. Material changes will be communicated to you by email if
              you have opted into updates. The effective date above will be updated.
            </p>
          </section>

          <section>
            <h2>Contact</h2>
            <p>
              Privacy: <a href="mailto:privacy@flatfinder.io">privacy@flatfinder.io</a><br />
              General: <a href="mailto:flat@flatfinder.io">flat@flatfinder.io</a>
            </p>
          </section>

          <p className="legal-copyright">
            © 2025–2026 Lila Alexandra Olufemi Inglis Abegunrin / FlatFinder: Housing Revolutionised Inc.<br />
            All Rights Reserved. PIPEDA Compliant. Data stored in Canada.
          </p>
        </div>
      </div>

      <footer className="legal-footer">
        <div className="legal-footer-inner">
          <p>© 2025–2026 Lila Alexandra Olufemi Inglis Abegunrin · FlatFinder: Housing Revolutionised Inc.</p>
          <div className="legal-footer-links">
            <Link to="/">Home</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
