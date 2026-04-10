/*
  Signup.tsx
  Copyright © 2025–2026 Lila Alexandra Olufemi Inglis Abegunrin
  FlatFinder: Housing Revolutionised Inc.
  Patent Pending (CIPO) | Trademarks Pending (CIPO)
  PROPRIETARY AND CONFIDENTIAL
*/

import { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";

type Plan = "pro" | "max" | "ultra";
type Step = 0 | 1 | 2 | 3 | 4;

interface FormData {
  plan: Plan | null;
  city: string;
  country: string;
  province: string;
  bedrooms: string;
  currency: string;
  budget: string;
  people: string;
  income: string;
  budgetRange: string;
  occupation: string;
  employment: string;
  urgency: string;
  denied: string;
  predatory: string;
  source: string;
  email: string;
  name: string;
  terms: boolean;
  privacy: boolean;
  cookies: boolean;
  updates: boolean;
}

const EMPTY_FORM: FormData = {
  plan: null,
  city: "",
  country: "",
  province: "",
  bedrooms: "",
  currency: "CAD",
  budget: "",
  people: "1",
  income: "",
  budgetRange: "",
  occupation: "",
  employment: "",
  urgency: "",
  denied: "",
  predatory: "",
  source: "",
  email: "",
  name: "",
  terms: false,
  privacy: false,
  cookies: false,
  updates: true,
};

export default function Signup() {
  const [step, setStep] = useState<Step>(0);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  function set<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validateStep1() {
    const e: typeof errors = {};
    if (!form.city.trim()) e.city = "City is required";
    if (!form.country) e.country = "Country is required";
    if (!form.bedrooms) e.bedrooms = "Number of bedrooms is required";
    if (!form.budget.trim()) e.budget = "Budget is required";
    if (!form.people.trim()) e.people = "Number of people is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validateStep2() {
    const e: typeof errors = {};
    if (!form.occupation.trim()) e.occupation = "Occupation is required";
    if (!form.employment) e.employment = "Employment status is required";
    if (!form.urgency) e.urgency = "Search urgency is required";
    if (!form.denied) e.denied = "Please answer the income screening question";
    if (!form.predatory) e.predatory = "Please answer the predatory landlord question";
    if (!form.source) e.source = "Please tell us how you heard about FlatFinder™";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validateStep3() {
    const e: typeof errors = {};
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Valid email is required";
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.terms) e.terms = "You must agree to the Terms & Conditions";
    if (!form.privacy) e.privacy = "You must agree to the Privacy Policy";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (step === 0 && !form.plan) {
      setErrors({ plan: "Please select a plan to continue" });
      return;
    }
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setStep((s) => (s + 1) as Step);
    window.scrollTo(0, 0);
  }

  function back() {
    setStep((s) => (s - 1) as Step);
    window.scrollTo(0, 0);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateStep3()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          name: form.name,
          plan: form.plan || "pro",
          city: form.city,
          country: form.country,
          bedrooms: form.bedrooms,
          currency: form.currency,
          budget: form.budget ? Number(form.budget) : null,
          people: Number(form.people),
          income: form.income ? Number(form.income) : null,
          employment: form.employment,
          predatory_landlord: form.predatory,
          urgency: form.urgency,
          denied_rental: form.denied,
          terms_accepted: form.terms,
          privacy_accepted: form.privacy,
          updates_opted_in: form.updates,
          source: "beta-signup",
        }),
      });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
      window.scrollTo(0, 0);
    }
  }

  const stepLabels = ["Plans", "Search", "About You", "Confirm"];

  return (
    <>
      {/* ── HEADER ── */}
      <header className="signup-header">
        <div className="signup-header-inner">
          <Link to="/" className="signup-logo">
            <span className="signup-logo-cat">🐱</span>
            <span>FlatFinder™</span>
          </Link>
          <p className="signup-tagline">Canadian Kind, Scottish Strong</p>
        </div>
      </header>

      {/* ── PROGRESS BAR ── */}
      {!submitted && (
        <div className="progress-container">
          <div className="progress-bar">
            {stepLabels.map((label, idx) => (
              <div key={idx} className="progress-row">
                {idx > 0 && (
                  <div className={`progress-connector${idx <= step ? " done" : ""}`} />
                )}
                <div
                  className={`progress-step${idx === step ? " active" : ""}${idx < step ? " completed" : ""}`}
                >
                  <div className="progress-circle">{idx < step ? "✓" : idx + 1}</div>
                  <div className="progress-step-label">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="signup-container">
        {submitted ? (
          /* ── SUCCESS SCREEN ── */
          <div className="success-screen">
            <div className="success-icon">🐱</div>
            <div className="success-message">Benny's got you. You're on the list.</div>
            <div className="success-detail">
              You're on the beta waitlist for FlatFinder™. We'll be in touch when your spot opens up.
            </div>
            <div className="success-email">{form.email}</div>
            <p className="success-detail">
              Keep an eye on your inbox. In the meantime, questions? Email{" "}
              <a href="mailto:flat@flatfinder.io">flat@flatfinder.io</a>
            </p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => { setSubmitted(false); setForm(EMPTY_FORM); setStep(0); }}
            >
              Sign Up Another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>

            {/* ── STEP 0: PLANS ── */}
            {step === 0 && (
              <section className="plans-section">
                <div className="plans-heading">
                  <h2>Choose Your Plan</h2>
                  <p>Pick the plan that works for you. Upgrade anytime.</p>
                </div>
                {errors.plan && <p className="error-banner">{errors.plan}</p>}
                <div className="plans-grid">
                  {/* Pro */}
                  <div
                    className={`plan-card${form.plan === "pro" ? " selected" : ""}`}
                    onClick={() => set("plan", "pro")}
                  >
                    <span className="plan-badge free">FREE during beta!</span>
                    <h3 className="plan-title">Pro Plan</h3>
                    <p className="plan-subtitle">The Essential</p>
                    <div className="plan-price">
                      <div className="price-normal">$29 CAD/mo normally</div>
                      <div className="price-beta">FREE</div>
                    </div>
                    <ul className="plan-features">
                      <li>Listing search with affordability filtering</li>
                      <li>Benny AI chat assistant</li>
                      <li>Compliance badges on agents</li>
                      <li>Basic demand letter (1/month)</li>
                    </ul>
                    <button type="button" className="plan-select-btn" onClick={() => set("plan", "pro")}>
                      {form.plan === "pro" ? "✓ Selected" : "Select Plan"}
                    </button>
                  </div>

                  {/* Max */}
                  <div
                    className={`plan-card${form.plan === "max" ? " selected" : ""}`}
                    onClick={() => set("plan", "max")}
                  >
                    <span className="plan-badge">50% off — beta deal</span>
                    <h3 className="plan-title">Max Plan</h3>
                    <p className="plan-subtitle">The Advocate</p>
                    <div className="plan-price">
                      <div className="price-normal">$79 CAD/mo normally</div>
                      <div className="price-beta">$39.50 CAD/mo</div>
                    </div>
                    <ul className="plan-features">
                      <li>Everything in Pro +</li>
                      <li>Unlimited demand letters</li>
                      <li>Agent report submissions</li>
                      <li>City-specific legal templates</li>
                      <li>Priority Benny responses</li>
                    </ul>
                    <button type="button" className="plan-select-btn" onClick={() => set("plan", "max")}>
                      {form.plan === "max" ? "✓ Selected" : "Select Plan"}
                    </button>
                  </div>

                  {/* Ultra */}
                  <div
                    className={`plan-card ultra${form.plan === "ultra" ? " selected" : ""}`}
                    onClick={() => set("plan", "ultra")}
                  >
                    <span className="plan-badge best-value">⭐ Best Value</span>
                    <span className="plan-badge">50% off — and it's a damn good deal</span>
                    <h3 className="plan-title">Ultra Plan</h3>
                    <p className="plan-subtitle">The Full Armour</p>
                    <div className="plan-price">
                      <div className="price-normal">$149 CAD/mo normally</div>
                      <div className="price-beta">$74.50 CAD/mo</div>
                    </div>
                    <ul className="plan-features">
                      <li>Everything in Max +</li>
                      <li>Triple-checked apartment finding</li>
                      <li>Personal apartment scout</li>
                      <li>Dedicated compliance review</li>
                      <li>Pre-move-in inspection checklist</li>
                      <li>Direct escalation support</li>
                    </ul>
                    <button type="button" className="plan-select-btn" onClick={() => set("plan", "ultra")}>
                      {form.plan === "ultra" ? "✓ Selected" : "Select Plan"}
                    </button>
                  </div>
                </div>
                <div className="form-actions">
                  <button type="button" className="btn btn-primary" onClick={next}>
                    Continue to Your Search
                  </button>
                </div>
              </section>
            )}

            {/* ── STEP 1: SEARCH ── */}
            {step === 1 && (
              <section className="form-section">
                <h2>Step 1: Your Search</h2>
                <p className="form-section-subtitle">Tell us where you're looking and what you need.</p>

                <div className="form-row">
                  <div className={`form-group required${errors.city ? " error" : ""}`}>
                    <label htmlFor="city">What city are you looking in?</label>
                    <input
                      type="text" id="city" placeholder="e.g., Toronto, London"
                      value={form.city} onChange={(e) => set("city", e.target.value)}
                    />
                    {errors.city && <span className="field-error">{errors.city}</span>}
                  </div>

                  <div className={`form-group required${errors.country ? " error" : ""}`}>
                    <label htmlFor="country">Country</label>
                    <select id="country" value={form.country} onChange={(e) => set("country", e.target.value)}>
                      <option value="">Select a country</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="France">France</option>
                      <option value="Germany">Germany</option>
                      <option value="Spain">Spain</option>
                      <option value="Netherlands">Netherlands</option>
                      <option value="Belgium">Belgium</option>
                      <option value="Switzerland">Switzerland</option>
                    </select>
                    <p className="form-note">FlatFinder™ currently operates in Canada, UK, France, and select European cities.</p>
                    {errors.country && <span className="field-error">{errors.country}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="province">State or Province (optional)</label>
                    <input
                      type="text" id="province" placeholder="e.g., Ontario, CA"
                      value={form.province} onChange={(e) => set("province", e.target.value)}
                    />
                  </div>

                  <div className={`form-group required${errors.bedrooms ? " error" : ""}`}>
                    <label htmlFor="bedrooms">How many bedrooms?</label>
                    <select id="bedrooms" value={form.bedrooms} onChange={(e) => set("bedrooms", e.target.value)}>
                      <option value="">Select bedrooms</option>
                      <option value="studio">Studio</option>
                      <option value="1">1 Bedroom</option>
                      <option value="2">2 Bedrooms</option>
                      <option value="3">3 Bedrooms</option>
                      <option value="4+">4+ Bedrooms</option>
                    </select>
                    {errors.bedrooms && <span className="field-error">{errors.bedrooms}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className={`form-group required${errors.budget ? " error" : ""}`}>
                    <label htmlFor="budget">Monthly apartment budget</label>
                    <div className="currency-input-group">
                      <select value={form.currency} onChange={(e) => set("currency", e.target.value)}>
                        <option value="CAD">CAD</option>
                        <option value="GBP">GBP</option>
                        <option value="EUR">EUR</option>
                      </select>
                      <input
                        type="number" id="budget" placeholder="e.g., 1500" min="0"
                        value={form.budget} onChange={(e) => set("budget", e.target.value)}
                      />
                    </div>
                    {errors.budget && <span className="field-error">{errors.budget}</span>}
                  </div>

                  <div className={`form-group required${errors.people ? " error" : ""}`}>
                    <label htmlFor="people">How many people are moving in?</label>
                    <input
                      type="number" id="people" min="1"
                      value={form.people} onChange={(e) => set("people", e.target.value)}
                    />
                    {errors.people && <span className="field-error">{errors.people}</span>}
                  </div>
                </div>

                <div className="form-actions">
                  <button type="button" className="btn btn-secondary" onClick={back}>Back</button>
                  <button type="button" className="btn btn-primary" onClick={next}>Continue</button>
                </div>
              </section>
            )}

            {/* ── STEP 2: ABOUT YOU ── */}
            {step === 2 && (
              <section className="form-section">
                <h2>Step 2: About You</h2>
                <p className="form-section-subtitle">Help us understand your situation better.</p>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="income">Annual income (optional)</label>
                    <input
                      type="number" id="income" placeholder="e.g., 45000" min="0"
                      value={form.income} onChange={(e) => set("income", e.target.value)}
                    />
                    <p className="form-note">Used only to calculate your affordability range. Never shared.</p>
                  </div>

                  <div className={`form-group required${errors.budgetRange ? " error" : ""}`}>
                    <label htmlFor="budgetRange">Budget for plan fees?</label>
                    <select id="budgetRange" value={form.budgetRange} onChange={(e) => set("budgetRange", e.target.value)}>
                      <option value="">Select budget</option>
                      <option value="free-only">Free only</option>
                      <option value="under-50">Under $50/mo</option>
                      <option value="50-100">$50–$100/mo</option>
                      <option value="100-200">$100–$200/mo</option>
                      <option value="no-limit">No limit</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className={`form-group required${errors.occupation ? " error" : ""}`}>
                    <label htmlFor="occupation">Occupation / Job title</label>
                    <input
                      type="text" id="occupation" placeholder="e.g., Nurse, Student, Freelancer"
                      value={form.occupation} onChange={(e) => set("occupation", e.target.value)}
                    />
                    {errors.occupation && <span className="field-error">{errors.occupation}</span>}
                  </div>

                  <div className={`form-group required${errors.employment ? " error" : ""}`}>
                    <label htmlFor="employment">Employment status</label>
                    <select id="employment" value={form.employment} onChange={(e) => set("employment", e.target.value)}>
                      <option value="">Select status</option>
                      <option value="employed-full-time">Employed full-time</option>
                      <option value="employed-part-time">Employed part-time</option>
                      <option value="self-employed">Self-employed/freelance</option>
                      <option value="student">Student</option>
                      <option value="between-jobs">Between jobs</option>
                      <option value="retired">Retired</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.employment && <span className="field-error">{errors.employment}</span>}
                  </div>
                </div>

                <div className={`form-group required${errors.urgency ? " error" : ""}`}>
                  <label>How urgent is your search?</label>
                  {[
                    ["immediately", "Immediately (within 2 weeks)"],
                    ["1-3-months", "1–3 months"],
                    ["3-6-months", "3–6 months"],
                    ["exploring", "Just exploring"],
                  ].map(([val, label]) => (
                    <div className="radio-option" key={val}>
                      <input
                        type="radio" id={`urgency-${val}`} name="urgency" value={val}
                        checked={form.urgency === val}
                        onChange={() => set("urgency", val)}
                      />
                      <label htmlFor={`urgency-${val}`}>{label}</label>
                    </div>
                  ))}
                  {errors.urgency && <span className="field-error">{errors.urgency}</span>}
                </div>

                <div className={`form-group required${errors.denied ? " error" : ""}`}>
                  <label>Have you been denied a rental due to income screening?</label>
                  {[["yes", "Yes"], ["no", "No"], ["prefer-not", "Prefer not to say"]].map(([val, label]) => (
                    <div className="radio-option" key={val}>
                      <input
                        type="radio" id={`denied-${val}`} name="denied" value={val}
                        checked={form.denied === val}
                        onChange={() => set("denied", val)}
                      />
                      <label htmlFor={`denied-${val}`}>{label}</label>
                    </div>
                  ))}
                  {errors.denied && <span className="field-error">{errors.denied}</span>}
                </div>

                <div className={`form-group required${errors.predatory ? " error" : ""}`}>
                  <label>Have you dealt with a predatory landlord or agent?</label>
                  {[["yes", "Yes"], ["no", "No"]].map(([val, label]) => (
                    <div className="radio-option" key={val}>
                      <input
                        type="radio" id={`predatory-${val}`} name="predatory" value={val}
                        checked={form.predatory === val}
                        onChange={() => set("predatory", val)}
                      />
                      <label htmlFor={`predatory-${val}`}>{label}</label>
                    </div>
                  ))}
                  {errors.predatory && <span className="field-error">{errors.predatory}</span>}
                </div>

                <div className={`form-group required${errors.source ? " error" : ""}`}>
                  <label htmlFor="source">How did you hear about FlatFinder™?</label>
                  <select id="source" value={form.source} onChange={(e) => set("source", e.target.value)}>
                    <option value="">Select source</option>
                    <option value="social-media">Social media</option>
                    <option value="word-of-mouth">Word of mouth</option>
                    <option value="news">News article</option>
                    <option value="google">Google search</option>
                    <option value="referred">Referred by someone</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.source && <span className="field-error">{errors.source}</span>}
                </div>

                <div className="form-actions">
                  <button type="button" className="btn btn-secondary" onClick={back}>Back</button>
                  <button type="button" className="btn btn-primary" onClick={next}>Continue</button>
                </div>
              </section>
            )}

            {/* ── STEP 3: CONFIRM ── */}
            {step === 3 && (
              <section className="form-section">
                <h2>Step 3: Confirm & Agree</h2>
                <p className="form-section-subtitle">Almost there! Just a few final details.</p>

                <div className="form-row">
                  <div className={`form-group required${errors.email ? " error" : ""}`}>
                    <label htmlFor="email">Email address</label>
                    <input
                      type="email" id="email" placeholder="you@example.com"
                      value={form.email} onChange={(e) => set("email", e.target.value)}
                    />
                    {errors.email && <span className="field-error">{errors.email}</span>}
                  </div>

                  <div className={`form-group required${errors.name ? " error" : ""}`}>
                    <label htmlFor="name">Full name</label>
                    <input
                      type="text" id="name" placeholder="Your name"
                      value={form.name} onChange={(e) => set("name", e.target.value)}
                    />
                    {errors.name && <span className="field-error">{errors.name}</span>}
                  </div>
                </div>

                <div className={`form-group checkbox-group${errors.terms ? " error" : ""}`}>
                  <div className="checkbox-option">
                    <input
                      type="checkbox" id="terms" checked={form.terms}
                      onChange={(e) => set("terms", e.target.checked)}
                    />
                    <label htmlFor="terms">
                      I agree to the{" "}
                      <button type="button" className="btn-link" onClick={() => setShowTermsModal(true)}>
                        FlatFinder™ Beta Terms &amp; Conditions
                      </button>
                    </label>
                  </div>
                  {errors.terms && <span className="field-error">{errors.terms}</span>}
                </div>

                <div className={`form-group checkbox-group${errors.privacy ? " error" : ""}`}>
                  <div className="checkbox-option">
                    <input
                      type="checkbox" id="privacy" checked={form.privacy}
                      onChange={(e) => set("privacy", e.target.checked)}
                    />
                    <label htmlFor="privacy">
                      I agree to the{" "}
                      <button type="button" className="btn-link" onClick={() => setShowPrivacyModal(true)}>
                        Privacy Policy
                      </button>
                    </label>
                  </div>
                  {errors.privacy && <span className="field-error">{errors.privacy}</span>}
                </div>

                <div className="form-group checkbox-group">
                  <div className="checkbox-option">
                    <input
                      type="checkbox" id="cookies" checked={form.cookies}
                      onChange={(e) => set("cookies", e.target.checked)}
                    />
                    <label htmlFor="cookies">I consent to cookies for analytics</label>
                  </div>
                </div>

                <div className="form-group checkbox-group">
                  <div className="checkbox-option">
                    <input
                      type="checkbox" id="updates" checked={form.updates}
                      onChange={(e) => set("updates", e.target.checked)}
                    />
                    <label htmlFor="updates">I'd like to receive updates about FlatFinder™ launches</label>
                  </div>
                </div>

                <div className="form-actions">
                  <button type="button" className="btn btn-secondary" onClick={back}>Back</button>
                  <button type="submit" className="btn btn-primary" disabled={submitting}>
                    {submitting ? "Submitting…" : "Complete Sign-Up"}
                  </button>
                </div>
              </section>
            )}
          </form>
        )}
      </div>

      {/* ── FOOTER ── */}
      <footer className="signup-footer">
        <div className="signup-footer-inner">
          <p>
            © 2025–2026 Lila Alexandra Olufemi Inglis Abegunrin. All Rights Reserved.<br />
            FlatFinder™: Housing Revolutionised™ | Canadian Kind, Scottish Strong
          </p>
          <div className="signup-footer-links">
            <Link to="/terms">Terms</Link>
            <Link to="/privacy">Privacy</Link>
            <a href="mailto:flat@flatfinder.io">Contact</a>
          </div>
        </div>
      </footer>

      {/* ── TERMS MODAL ── */}
      {showTermsModal && (
        <div className="modal active" onClick={(e) => { if (e.target === e.currentTarget) setShowTermsModal(false); }}>
          <div className="modal-content">
            <button type="button" className="modal-close" onClick={() => setShowTermsModal(false)}>×</button>
            <h3>FlatFinder™ Beta Terms &amp; Conditions</h3>
            <p><strong>1. Beta Service</strong></p>
            <p>FlatFinder™ is provided as-is during beta. We make no guarantees regarding apartment finding success or listing accuracy.</p>
            <p><strong>2. Data Usage</strong></p>
            <p>Your data is used solely to match you with relevant listings, improve Benny AI responses, and conduct internal platform testing.</p>
            <p><strong>3. Anonymized Feedback</strong></p>
            <p>You grant FlatFinder™ the right to use your anonymized feedback to improve the platform and services.</p>
            <p><strong>4. Beta Access Revocation</strong></p>
            <p>Beta access may be revoked if terms are violated.</p>
            <p><strong>5. Liability</strong></p>
            <p>FlatFinder™ has no financial liability for listing accuracy or unsuccessful apartment searches during beta.</p>
            <p><strong>6. Governing Law</strong></p>
            <p>These terms are governed by Canadian law (Province of Ontario).</p>
            <p><strong>© 2025–2026 Lila Alexandra Olufemi Inglis Abegunrin. All Rights Reserved.</strong></p>
          </div>
        </div>
      )}

      {/* ── PRIVACY MODAL ── */}
      {showPrivacyModal && (
        <div className="modal active" onClick={(e) => { if (e.target === e.currentTarget) setShowPrivacyModal(false); }}>
          <div className="modal-content">
            <button type="button" className="modal-close" onClick={() => setShowPrivacyModal(false)}>×</button>
            <h3>Privacy Policy</h3>
            <p><strong>What Data We Collect</strong></p>
            <ul>
              <li>Name and email address</li>
              <li>Income range (optional)</li>
              <li>Occupation and employment status</li>
              <li>City and search preferences</li>
            </ul>
            <p><strong>What We DON'T Collect</strong></p>
            <ul>
              <li>Social Insurance Numbers (SIN)</li>
              <li>Passport or ID numbers</li>
              <li>Full financial records</li>
            </ul>
            <p><strong>How We Use Your Data</strong></p>
            <ul>
              <li>Match you to relevant listings</li>
              <li>Improve Benny AI responses</li>
              <li>Internal testing and platform improvement</li>
            </ul>
            <p><strong>Data Security &amp; Storage</strong></p>
            <p>Your data is stored securely in Canada (Supabase, ca-central-1 region).</p>
            <p><strong>We Never Sell Your Data</strong></p>
            <p>Ever.</p>
            <p><strong>Your Rights</strong></p>
            <p>You can request data deletion at any time: <strong>privacy@flatfinder.io</strong></p>
            <p><strong>Compliance</strong></p>
            <ul>
              <li>PIPEDA compliant</li>
              <li>GDPR-adjacent practices for UK/EU users</li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
