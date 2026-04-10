/*
  Terms.tsx
  Copyright © 2025–2026 Lila Alexandra Olufemi Inglis Abegunrin
  FlatFinder: Housing Revolutionised Inc.
  Patent Pending (CIPO) | Trademarks Pending (CIPO)
  PROPRIETARY AND CONFIDENTIAL
*/

import { Link } from "react-router-dom";
import "./Legal.css";

export default function Terms() {
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
          <h1>Beta Terms &amp; Conditions</h1>
          <p className="legal-date">Effective: April 2026 · Governing law: Ontario, Canada</p>

          <section>
            <h2>1. Beta Service</h2>
            <p>
              FlatFinder™ is currently in beta. The service is provided "as-is" without warranty of any kind.
              We make no guarantees regarding apartment finding success, listing accuracy, or service availability.
              Beta access may be modified, suspended, or discontinued at any time without notice.
            </p>
          </section>

          <section>
            <h2>2. Eligibility</h2>
            <p>
              You must be 18 years of age or older to use FlatFinder™. By signing up, you confirm you meet
              this requirement and that all information you provide is accurate.
            </p>
          </section>

          <section>
            <h2>3. Your Data</h2>
            <p>
              You grant FlatFinder: Housing Revolutionised Inc. a limited, non-exclusive licence to use your
              data to provide and improve the service. See our{" "}
              <Link to="/privacy">Privacy Policy</Link> for full details.
              Your anonymized, aggregated feedback may be used to improve Benny™ and the platform.
            </p>
          </section>

          <section>
            <h2>4. Prohibited Use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use FlatFinder™ for any unlawful purpose</li>
              <li>Attempt to reverse-engineer any part of the service</li>
              <li>Scrape, copy, or redistribute listings or Benny's™ responses</li>
              <li>Misrepresent yourself or your housing situation</li>
              <li>Interfere with the service's operation or security</li>
            </ul>
          </section>

          <section>
            <h2>5. Intellectual Property</h2>
            <p>
              FlatFinder™, Benny™, Housing Revolutionised™, and the Anti-Gatekeeping Affordability
              Algorithm™ are proprietary and confidential. All rights reserved.
              Trademark applications are pending with the Canadian Intellectual Property Office (CIPO).
              Patent application pending (CIPO). No part of this service may be reproduced without
              written consent from Lila Alexandra Olufemi Inglis Abegunrin.
            </p>
          </section>

          <section>
            <h2>6. Limitation of Liability</h2>
            <p>
              FlatFinder: Housing Revolutionised Inc. is not liable for any direct, indirect, incidental,
              or consequential damages arising from your use of the service. Our maximum liability is
              limited to the amount you paid us in the 30 days preceding the claim (which during free beta
              is $0).
            </p>
          </section>

          <section>
            <h2>7. Beta Access Revocation</h2>
            <p>
              We reserve the right to revoke beta access at any time, with or without cause, with or
              without notice. If your access is revoked for a terms violation, you may not re-register.
            </p>
          </section>

          <section>
            <h2>8. Changes to These Terms</h2>
            <p>
              We may update these terms at any time. Continued use of the service after an update
              constitutes acceptance of the new terms. Material changes will be communicated by email
              if you have opted into updates.
            </p>
          </section>

          <section>
            <h2>9. Governing Law</h2>
            <p>
              These terms are governed by the laws of the Province of Ontario and the federal laws of
              Canada applicable therein. Any disputes shall be resolved in the courts of Ontario.
            </p>
          </section>

          <section>
            <h2>10. Contact</h2>
            <p>
              Questions about these terms? Email{" "}
              <a href="mailto:flat@flatfinder.io">flat@flatfinder.io</a>
            </p>
          </section>

          <p className="legal-copyright">
            © 2025–2026 Lila Alexandra Olufemi Inglis Abegunrin / FlatFinder: Housing Revolutionised Inc.<br />
            All Rights Reserved. Patent Pending (CIPO). Trademarks Pending (CIPO).
          </p>
        </div>
      </div>

      <footer className="legal-footer">
        <div className="legal-footer-inner">
          <p>© 2025–2026 Lila Alexandra Olufemi Inglis Abegunrin · FlatFinder: Housing Revolutionised Inc.</p>
          <div className="legal-footer-links">
            <Link to="/">Home</Link>
            <Link to="/privacy">Privacy</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
