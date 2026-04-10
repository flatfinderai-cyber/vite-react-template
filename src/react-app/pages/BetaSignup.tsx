import { useState, useEffect, useCallback, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import styles from "./BetaSignup.module.css";

type Plan = "pro" | "max" | "ultra";

interface FormData {
	plan: Plan;
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

const INITIAL: FormData = {
	plan: "pro",
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

const PLANS: { id: Plan; badge: string; badgeClass: string; title: string; subtitle: string; priceNormal: string; priceBeta: string; features: string[] }[] = [
	{
		id: "pro",
		badge: "FREE during beta!",
		badgeClass: "free",
		title: "Pro Plan",
		subtitle: "The Essential",
		priceNormal: "$29 CAD/mo normally",
		priceBeta: "FREE",
		features: [
			"Listing search with affordability filtering",
			"Benny™ AI chat assistant",
			"Compliance badges on agents",
			"Basic demand letter (1/month)",
		],
	},
	{
		id: "max",
		badge: "50% off — beta deal",
		badgeClass: "orange",
		title: "Max Plan",
		subtitle: "The Advocate",
		priceNormal: "$79 CAD/mo normally",
		priceBeta: "$39.50 CAD/mo",
		features: [
			"Everything in Pro +",
			"Unlimited demand letters",
			"Agent report submissions",
			"City-specific legal templates",
			"Priority Benny™ responses",
		],
	},
	{
		id: "ultra",
		badge: "⭐ Best Value",
		badgeClass: "best",
		title: "Ultra Plan",
		subtitle: "The Full Armour",
		priceNormal: "$149 CAD/mo normally",
		priceBeta: "$74.50 CAD/mo",
		features: [
			"Everything in Max +",
			"Triple-checked apartment finding",
			"Personal apartment scout",
			"Dedicated compliance review",
			"Pre-move-in inspection checklist",
			"Direct escalation support",
		],
	},
];

export default function BetaSignup() {
	const [searchParams] = useSearchParams();
	const [step, setStep] = useState(0);
	const [form, setForm] = useState<FormData>(INITIAL);
	const [errors, setErrors] = useState<Set<string>>(new Set());
	const [submitting, setSubmitting] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [modal, setModal] = useState<"terms" | "privacy" | null>(null);

	useEffect(() => {
		const planParam = searchParams.get("plan");
		if (planParam && ["pro", "max", "ultra"].includes(planParam)) {
			setForm((f) => ({ ...f, plan: planParam as Plan }));
		}
	}, [searchParams]);

	const set = useCallback(
		(field: keyof FormData, value: string | boolean) => {
			setForm((f) => ({ ...f, [field]: value }));
			setErrors((e) => {
				const next = new Set(e);
				next.delete(field);
				return next;
			});
		},
		[],
	);

	const validateStep = (s: number): boolean => {
		const errs = new Set<string>();

		if (s === 1) {
			if (!form.city.trim()) errs.add("city");
			if (!form.country) errs.add("country");
			if (!form.bedrooms) errs.add("bedrooms");
			if (!form.budget) errs.add("budget");
		}

		if (s === 2) {
			if (!form.budgetRange) errs.add("budgetRange");
			if (!form.occupation.trim()) errs.add("occupation");
			if (!form.employment) errs.add("employment");
			if (!form.urgency) errs.add("urgency");
			if (!form.denied) errs.add("denied");
			if (!form.predatory) errs.add("predatory");
			if (!form.source) errs.add("source");
		}

		if (s === 3) {
			if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
				errs.add("email");
			if (!form.name.trim()) errs.add("name");
			if (!form.terms) errs.add("terms");
			if (!form.privacy) errs.add("privacy");
		}

		setErrors(errs);
		return errs.size === 0;
	};

	const next = () => {
		if (step === 0) {
			setStep(1);
		} else if (validateStep(step)) {
			setStep(step + 1);
		}
		window.scrollTo(0, 0);
	};

	const back = () => {
		setStep(Math.max(0, step - 1));
		window.scrollTo(0, 0);
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (!validateStep(3)) return;

		setSubmitting(true);

		const payload = {
			email: form.email,
			name: form.name,
			plan: form.plan,
			city: form.city,
			country: form.country,
			province: form.province,
			bedrooms: form.bedrooms,
			currency: form.currency,
			budget: form.budget,
			people: form.people,
			income: form.income,
			occupation: form.occupation,
			employment: form.employment,
			urgency: form.urgency,
			denied: form.denied,
			predatory_landlord: form.predatory,
			source: form.source,
			terms_accepted: form.terms,
			privacy_accepted: form.privacy,
			updates_opted_in: form.updates,
		};

		try {
			const res = await fetch("/api/beta-signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});

			if (!res.ok) {
				const data = await res.json().catch(() => ({}));
				throw new Error((data as { error?: string }).error || `Server error: ${res.status}`);
			}

			setSubmitted(true);
			createConfetti();
		} catch (err) {
			console.error("Submission error:", err);
			alert(
				"Something went wrong. Please try again or email flat@flatfinder.io",
			);
		} finally {
			setSubmitting(false);
		}
	};

	const err = (field: string) => (errors.has(field) ? styles.error : "");

	if (submitted) {
		return (
			<>
				<Nav />
				<div className={styles.container}>
					<div className={styles.successScreen}>
						<div className={styles.successIcon}>🐱</div>
						<h2 className={styles.successTitle}>
							Benny's got you. You're on the list.
						</h2>
						<p className={styles.successDetail}>
							You're officially on the FlatFinder™ beta waitlist.
							We'll be in touch when it's your turn.
						</p>
						<div className={styles.successEmail}>{form.email}</div>
						<p className={styles.successDetail}>
							Keep an eye on your inbox for early access to
							FlatFinder™.
						</p>
						<Link to="/" className={styles.btnPrimary}>
							Back to Home
						</Link>
					</div>
				</div>
				<Footer />
			</>
		);
	}

	return (
		<>
			<Nav />
			<div className={styles.container}>
				<div className={styles.header}>
					<h1>Join the Beta</h1>
					<p>
						Pick your plan, tell us what you need, and you're on the
						list.
					</p>
				</div>

				{/* Progress Bar */}
				<div className={styles.progressBar}>
					{["Plans", "Search", "About You", "Confirm"].map(
						(label, i) => (
							<div
								key={label}
								className={`${styles.progressStep} ${i < step ? styles.completed : ""} ${i === step ? styles.active : ""}`}
							>
								<div className={styles.progressCircle}>
									{i < step ? "✓" : i + 1}
								</div>
								<div className={styles.progressLabel}>
									{label}
								</div>
							</div>
						),
					)}
				</div>

				<form onSubmit={handleSubmit}>
					{/* Step 0: Plans */}
					{step === 0 && (
						<div className={styles.stepSection}>
							<div className={styles.plansGrid}>
								{PLANS.map((p) => (
									<div
										key={p.id}
										className={`${styles.planCard} ${form.plan === p.id ? styles.selected : ""} ${p.id === "ultra" ? styles.ultra : ""}`}
										onClick={() => set("plan", p.id)}
									>
										<span
											className={`${styles.planBadge} ${styles[p.badgeClass]}`}
										>
											{p.badge}
										</span>
										<h3>{p.title}</h3>
										<p className={styles.planSubtitle}>
											{p.subtitle}
										</p>
										<div className={styles.planPrice}>
											<span
												className={
													styles.priceNormal
												}
											>
												{p.priceNormal}
											</span>
											<span
												className={
													styles.priceBeta
												}
											>
												{p.priceBeta}
											</span>
										</div>
										<ul className={styles.planFeatures}>
											{p.features.map((f) => (
												<li key={f}>{f}</li>
											))}
										</ul>
										<button
											type="button"
											className={styles.planSelectBtn}
										>
											{form.plan === p.id
												? "✓ Selected"
												: "Select Plan"}
										</button>
									</div>
								))}
							</div>
							<div className={styles.actions}>
								<button
									type="button"
									className={styles.btnPrimary}
									onClick={next}
								>
									Continue to Your Search →
								</button>
							</div>
						</div>
					)}

					{/* Step 1: Your Search */}
					{step === 1 && (
						<div className={styles.stepSection}>
							<h2>Your Search</h2>
							<p className={styles.stepDesc}>
								Tell us where you're looking and what you need.
							</p>

							<div className={styles.formRow}>
								<div
									className={`${styles.formGroup} ${err("city")}`}
								>
									<label>
										What city are you looking in? *
									</label>
									<input
										type="text"
										value={form.city}
										onChange={(e) =>
											set("city", e.target.value)
										}
										placeholder="e.g., Toronto, London"
									/>
								</div>
								<div
									className={`${styles.formGroup} ${err("country")}`}
								>
									<label>Country *</label>
									<select
										value={form.country}
										onChange={(e) =>
											set("country", e.target.value)
										}
									>
										<option value="">
											Select a country
										</option>
										<option>Canada</option>
										<option>United Kingdom</option>
										<option>France</option>
										<option>Germany</option>
										<option>Spain</option>
										<option>Netherlands</option>
										<option>Belgium</option>
										<option>Switzerland</option>
									</select>
									<span className={styles.formNote}>
										FlatFinder™ currently operates in
										Canada, UK, France, and select European
										cities.
									</span>
								</div>
							</div>

							<div className={styles.formRow}>
								<div className={styles.formGroup}>
									<label>
										State or Province (optional)
									</label>
									<input
										type="text"
										value={form.province}
										onChange={(e) =>
											set("province", e.target.value)
										}
										placeholder="e.g., Ontario"
									/>
								</div>
								<div
									className={`${styles.formGroup} ${err("bedrooms")}`}
								>
									<label>How many bedrooms? *</label>
									<select
										value={form.bedrooms}
										onChange={(e) =>
											set("bedrooms", e.target.value)
										}
									>
										<option value="">
											Select bedrooms
										</option>
										<option value="studio">Studio</option>
										<option value="1">1 Bedroom</option>
										<option value="2">2 Bedrooms</option>
										<option value="3">3 Bedrooms</option>
										<option value="4+">4+ Bedrooms</option>
									</select>
								</div>
							</div>

							<div className={styles.formRow}>
								<div
									className={`${styles.formGroup} ${err("budget")}`}
								>
									<label>Monthly apartment budget *</label>
									<div className={styles.currencyGroup}>
										<select
											value={form.currency}
											onChange={(e) =>
												set("currency", e.target.value)
											}
											className={styles.currencySelect}
										>
											<option value="CAD">CAD</option>
											<option value="GBP">GBP</option>
											<option value="EUR">EUR</option>
										</select>
										<input
											type="number"
											value={form.budget}
											onChange={(e) =>
												set("budget", e.target.value)
											}
											placeholder="e.g., 1500"
											min="0"
										/>
									</div>
								</div>
								<div className={styles.formGroup}>
									<label>How many people moving in?</label>
									<input
										type="number"
										value={form.people}
										onChange={(e) =>
											set("people", e.target.value)
										}
										min="1"
									/>
								</div>
							</div>

							<div className={styles.actions}>
								<button
									type="button"
									className={styles.btnSecondary}
									onClick={back}
								>
									Back
								</button>
								<button
									type="button"
									className={styles.btnPrimary}
									onClick={next}
								>
									Continue →
								</button>
							</div>
						</div>
					)}

					{/* Step 2: About You */}
					{step === 2 && (
						<div className={styles.stepSection}>
							<h2>About You</h2>
							<p className={styles.stepDesc}>
								Help us understand your situation better.
							</p>

							<div className={styles.formRow}>
								<div className={styles.formGroup}>
									<label>Annual income (optional)</label>
									<input
										type="number"
										value={form.income}
										onChange={(e) =>
											set("income", e.target.value)
										}
										placeholder="e.g., 45000"
										min="0"
									/>
									<span className={styles.formNote}>
										Used only to calculate your
										affordability range. Never shared.
									</span>
								</div>
								<div
									className={`${styles.formGroup} ${err("budgetRange")}`}
								>
									<label>Budget for plan fees? *</label>
									<select
										value={form.budgetRange}
										onChange={(e) =>
											set("budgetRange", e.target.value)
										}
									>
										<option value="">Select budget</option>
										<option value="free-only">
											Free only
										</option>
										<option value="under-50">
											Under $50/mo
										</option>
										<option value="50-100">
											$50–$100/mo
										</option>
										<option value="100-200">
											$100–$200/mo
										</option>
										<option value="no-limit">
											No limit
										</option>
									</select>
								</div>
							</div>

							<div className={styles.formRow}>
								<div
									className={`${styles.formGroup} ${err("occupation")}`}
								>
									<label>Occupation / Job title *</label>
									<input
										type="text"
										value={form.occupation}
										onChange={(e) =>
											set("occupation", e.target.value)
										}
										placeholder="e.g., Mechanical Engineer"
									/>
								</div>
								<div
									className={`${styles.formGroup} ${err("employment")}`}
								>
									<label>Employment status *</label>
									<select
										value={form.employment}
										onChange={(e) =>
											set("employment", e.target.value)
										}
									>
										<option value="">Select status</option>
										<option value="employed-full-time">
											Employed full-time
										</option>
										<option value="employed-part-time">
											Employed part-time
										</option>
										<option value="self-employed">
											Self-employed/freelance
										</option>
										<option value="student">Student</option>
										<option value="between-jobs">
											Between jobs
										</option>
										<option value="retired">Retired</option>
										<option value="other">Other</option>
									</select>
								</div>
							</div>

							<div
								className={`${styles.formGroup} ${err("urgency")}`}
							>
								<label>How urgent is your search? *</label>
								<div className={styles.radioGroup}>
									{[
										["immediately", "Immediately (within 2 weeks)"],
										["1-3-months", "1–3 months"],
										["3-6-months", "3–6 months"],
										["exploring", "Just exploring"],
									].map(([val, label]) => (
										<label
											key={val}
											className={styles.radioOption}
										>
											<input
												type="radio"
												name="urgency"
												value={val}
												checked={form.urgency === val}
												onChange={() =>
													set("urgency", val)
												}
											/>
											{label}
										</label>
									))}
								</div>
							</div>

							<div
								className={`${styles.formGroup} ${err("denied")}`}
							>
								<label>
									Have you been denied a rental due to income
									screening? *
								</label>
								<div className={styles.radioGroup}>
									{[
										["yes", "Yes"],
										["no", "No"],
										["prefer-not", "Prefer not to say"],
									].map(([val, label]) => (
										<label
											key={val}
											className={styles.radioOption}
										>
											<input
												type="radio"
												name="denied"
												value={val}
												checked={form.denied === val}
												onChange={() =>
													set("denied", val)
												}
											/>
											{label}
										</label>
									))}
								</div>
							</div>

							<div
								className={`${styles.formGroup} ${err("predatory")}`}
							>
								<label>
									Have you dealt with a predatory landlord or
									agent? *
								</label>
								<div className={styles.radioGroup}>
									{[
										["yes", "Yes"],
										["no", "No"],
									].map(([val, label]) => (
										<label
											key={val}
											className={styles.radioOption}
										>
											<input
												type="radio"
												name="predatory"
												value={val}
												checked={
													form.predatory === val
												}
												onChange={() =>
													set("predatory", val)
												}
											/>
											{label}
										</label>
									))}
								</div>
							</div>

							<div
								className={`${styles.formGroup} ${err("source")}`}
							>
								<label>
									How did you hear about FlatFinder™? *
								</label>
								<select
									value={form.source}
									onChange={(e) =>
										set("source", e.target.value)
									}
								>
									<option value="">Select source</option>
									<option value="social-media">
										Social media
									</option>
									<option value="word-of-mouth">
										Word of mouth
									</option>
									<option value="news">News article</option>
									<option value="google">
										Google search
									</option>
									<option value="referred">
										Referred by someone
									</option>
									<option value="other">Other</option>
								</select>
							</div>

							<div className={styles.actions}>
								<button
									type="button"
									className={styles.btnSecondary}
									onClick={back}
								>
									Back
								</button>
								<button
									type="button"
									className={styles.btnPrimary}
									onClick={next}
								>
									Continue →
								</button>
							</div>
						</div>
					)}

					{/* Step 3: Confirm */}
					{step === 3 && (
						<div className={styles.stepSection}>
							<h2>Confirm & Agree</h2>
							<p className={styles.stepDesc}>
								Almost there! Just a few final details.
							</p>

							<div className={styles.formRow}>
								<div
									className={`${styles.formGroup} ${err("email")}`}
								>
									<label>Email address *</label>
									<input
										type="email"
										value={form.email}
										onChange={(e) =>
											set("email", e.target.value)
										}
										placeholder="you@example.com"
									/>
								</div>
								<div
									className={`${styles.formGroup} ${err("name")}`}
								>
									<label>Full name *</label>
									<input
										type="text"
										value={form.name}
										onChange={(e) =>
											set("name", e.target.value)
										}
										placeholder="Your name"
									/>
								</div>
							</div>

							<div
								className={`${styles.checkboxGroup} ${err("terms")}`}
							>
								<label className={styles.checkboxOption}>
									<input
										type="checkbox"
										checked={form.terms}
										onChange={(e) =>
											set("terms", e.target.checked)
										}
									/>
									I agree to the{" "}
									<button
										type="button"
										className={styles.linkBtn}
										onClick={() => setModal("terms")}
									>
										FlatFinder™ Beta Terms & Conditions
									</button>
								</label>
							</div>

							<div
								className={`${styles.checkboxGroup} ${err("privacy")}`}
							>
								<label className={styles.checkboxOption}>
									<input
										type="checkbox"
										checked={form.privacy}
										onChange={(e) =>
											set("privacy", e.target.checked)
										}
									/>
									I agree to the{" "}
									<button
										type="button"
										className={styles.linkBtn}
										onClick={() => setModal("privacy")}
									>
										Privacy Policy
									</button>
								</label>
							</div>

							<div className={styles.checkboxGroup}>
								<label className={styles.checkboxOption}>
									<input
										type="checkbox"
										checked={form.cookies}
										onChange={(e) =>
											set("cookies", e.target.checked)
										}
									/>
									I consent to cookies for analytics
								</label>
							</div>

							<div className={styles.checkboxGroup}>
								<label className={styles.checkboxOption}>
									<input
										type="checkbox"
										checked={form.updates}
										onChange={(e) =>
											set("updates", e.target.checked)
										}
									/>
									I'd like to receive updates about
									FlatFinder™ launches
								</label>
							</div>

							<div className={styles.actions}>
								<button
									type="button"
									className={styles.btnSecondary}
									onClick={back}
								>
									Back
								</button>
								<button
									type="submit"
									className={styles.btnPrimary}
									disabled={submitting}
								>
									{submitting
										? "Submitting…"
										: "Complete Sign-Up →"}
								</button>
							</div>
						</div>
					)}
				</form>
			</div>

			{/* Modals */}
			{modal && (
				<div
					className={styles.modal}
					onClick={(e) => {
						if (e.target === e.currentTarget) setModal(null);
					}}
				>
					<div className={styles.modalContent}>
						<button
							className={styles.modalClose}
							onClick={() => setModal(null)}
						>
							×
						</button>
						{modal === "terms" && <TermsContent />}
						{modal === "privacy" && <PrivacyContent />}
					</div>
				</div>
			)}

			<Footer />
		</>
	);
}

function TermsContent() {
	return (
		<>
			<h3>FlatFinder™ Beta Terms & Conditions</h3>
			<p>
				<strong>1. Beta Service</strong>
			</p>
			<p>
				FlatFinder™ is provided as-is during beta. We make no guarantees
				regarding apartment finding success or listing accuracy.
			</p>
			<p>
				<strong>2. Data Usage</strong>
			</p>
			<p>Your data is used solely to:</p>
			<ul>
				<li>Match you with relevant listings</li>
				<li>Improve Benny™ AI responses</li>
				<li>Conduct internal platform testing</li>
			</ul>
			<p>
				<strong>3. Anonymized Feedback</strong>
			</p>
			<p>
				You grant FlatFinder™ the right to use your anonymized feedback
				to improve the platform and services.
			</p>
			<p>
				<strong>4. Beta Access Revocation</strong>
			</p>
			<p>Beta access may be revoked if terms are violated.</p>
			<p>
				<strong>5. Liability</strong>
			</p>
			<p>
				FlatFinder™ has no financial liability for listing accuracy or
				unsuccessful apartment searches during beta.
			</p>
			<p>
				<strong>6. Governing Law</strong>
			</p>
			<p>
				These terms are governed by Canadian law (Province of Ontario).
			</p>
			<p>
				<strong>
					© 2024–2026 Lila Alexandra Olufemi Inglis Abegunrin. All
					Rights Reserved.
				</strong>
			</p>
		</>
	);
}

function PrivacyContent() {
	return (
		<>
			<h3>Privacy Policy</h3>
			<p>
				<strong>What Data We Collect</strong>
			</p>
			<ul>
				<li>Name and email address</li>
				<li>Income range (optional)</li>
				<li>Occupation and employment status</li>
				<li>City and search preferences</li>
			</ul>
			<p>
				<strong>What We DON'T Collect</strong>
			</p>
			<ul>
				<li>Social Insurance Numbers (SIN)</li>
				<li>Passport or ID numbers</li>
				<li>Full financial records</li>
			</ul>
			<p>
				<strong>How We Use Your Data</strong>
			</p>
			<ul>
				<li>Match you to relevant listings</li>
				<li>Improve Benny™ AI responses</li>
				<li>Internal testing and platform improvement</li>
			</ul>
			<p>
				<strong>Data Security & Storage</strong>
			</p>
			<p>
				Your data is stored securely in Canada (Supabase, ca-central-1
				region).
			</p>
			<p>
				<strong>We Never Sell Your Data</strong>
			</p>
			<p>Ever.</p>
			<p>
				<strong>Your Rights</strong>
			</p>
			<p>
				You can request data deletion at any time:{" "}
				<strong>privacy@flatfinder.io</strong>
			</p>
			<p>
				<strong>Compliance</strong>
			</p>
			<ul>
				<li>
					PIPEDA (Personal Information Protection and Electronic
					Documents Act) compliant
				</li>
				<li>GDPR-adjacent practices for UK/EU users</li>
			</ul>
		</>
	);
}

function createConfetti() {
	const colors = ["#f07c2a", "#fbbf24", "#4caf50", "#3b82f6"];
	for (let i = 0; i < 50; i++) {
		const el = document.createElement("div");
		el.style.cssText = `
			position: fixed;
			pointer-events: none;
			left: ${Math.random() * 100}%;
			top: -10px;
			background: ${colors[Math.floor(Math.random() * colors.length)]};
			width: ${Math.random() * 8 + 4}px;
			height: ${Math.random() * 8 + 4}px;
			border-radius: 50%;
			z-index: 9999;
			animation: confettiFall ${Math.random() * 2 + 2}s linear forwards;
		`;
		document.body.appendChild(el);
		setTimeout(() => el.remove(), 4000);
	}

	if (!document.getElementById("confetti-style")) {
		const style = document.createElement("style");
		style.id = "confetti-style";
		style.textContent = `
			@keyframes confettiFall {
				to { transform: translateY(100vh) rotateZ(360deg); opacity: 0; }
			}
		`;
		document.head.appendChild(style);
	}
}
