import Nav from "../components/Nav";
import Footer from "../components/Footer";
import styles from "./Legal.module.css";

export default function Privacy() {
	return (
		<>
			<Nav />
			<div className={styles.container}>
				<h1>Privacy Policy</h1>
				<p className={styles.subtitle}>
					How FlatFinder™ handles your data
				</p>
				<p className={styles.updated}>Last updated: April 2026</p>

				<section>
					<h2>What Data We Collect</h2>
					<ul>
						<li>Name and email address</li>
						<li>City and housing search preferences</li>
						<li>
							Income range (optional — used only for
							affordability calculations)
						</li>
						<li>Occupation and employment status</li>
						<li>
							Rental history indicators (denial history,
							predatory landlord experience)
						</li>
					</ul>
				</section>

				<section>
					<h2>What We DON'T Collect</h2>
					<ul>
						<li>Social Insurance Numbers (SIN)</li>
						<li>Passport or government ID numbers</li>
						<li>Full financial records or bank statements</li>
						<li>Credit scores or credit reports</li>
						<li>Biometric data</li>
					</ul>
				</section>

				<section>
					<h2>How We Use Your Data</h2>
					<ul>
						<li>
							Match you to relevant listings within your budget
						</li>
						<li>
							Improve Benny™ AI responses and search accuracy
						</li>
						<li>Internal testing and platform improvement</li>
						<li>
							Send you updates about FlatFinder™ (only if you
							opted in)
						</li>
					</ul>
				</section>

				<section>
					<h2>Data Security & Storage</h2>
					<p>
						Your data is stored securely in Canada using Supabase
						(ca-central-1 region). All data remains in Canadian
						jurisdiction, ensuring compliance with Canadian data
						sovereignty requirements.
					</p>
					<p>
						We use industry-standard encryption for data in transit
						(TLS 1.3) and at rest. Access to user data is restricted
						to authorized personnel only.
					</p>
				</section>

				<section>
					<h2>We Never Sell Your Data</h2>
					<p>
						Ever. Your data is never sold, rented, or shared with
						third parties for marketing purposes. This is
						non-negotiable.
					</p>
				</section>

				<section>
					<h2>Your Rights</h2>
					<p>You have the right to:</p>
					<ul>
						<li>
							<strong>Access</strong> — Request a copy of all
							data we hold about you
						</li>
						<li>
							<strong>Correction</strong> — Request correction of
							inaccurate data
						</li>
						<li>
							<strong>Deletion</strong> — Request complete
							deletion of your data at any time
						</li>
						<li>
							<strong>Portability</strong> — Request your data in
							a machine-readable format
						</li>
						<li>
							<strong>Withdrawal</strong> — Withdraw consent for
							data processing at any time
						</li>
					</ul>
					<p>
						To exercise any of these rights, contact{" "}
						<a href="mailto:privacy@flatfinder.io">
							privacy@flatfinder.io
						</a>
					</p>
				</section>

				<section>
					<h2>Cookies</h2>
					<ul>
						<li>
							<strong>Essential cookies</strong> — Required for
							core functionality (session management)
						</li>
						<li>
							<strong>Analytics cookies</strong> — Optional,
							privacy-first analytics via Plausible (no
							fingerprinting, no cross-site tracking)
						</li>
					</ul>
					<p>
						You can opt out of analytics cookies at any time through
						your account settings or by contacting us.
					</p>
				</section>

				<section>
					<h2>Compliance</h2>
					<ul>
						<li>
							<strong>PIPEDA</strong> — Personal Information
							Protection and Electronic Documents Act (Canada)
						</li>
						<li>
							<strong>CASL</strong> — Canadian Anti-Spam
							Legislation (all marketing communications require
							express consent)
						</li>
						<li>
							<strong>GDPR-adjacent</strong> — We follow
							GDPR-level practices for UK and EU users
						</li>
					</ul>
				</section>

				<section>
					<h2>Data Retention</h2>
					<p>
						Beta signup data is retained for the duration of the
						beta program and up to 12 months after the program ends,
						unless you request earlier deletion. Active user account
						data is retained for as long as your account is active.
					</p>
				</section>

				<section>
					<h2>Changes to This Policy</h2>
					<p>
						We will notify registered users of material changes to
						this privacy policy via email. The latest version is
						always available at this URL.
					</p>
				</section>

				<section>
					<h2>Contact</h2>
					<p>
						Privacy Officer:{" "}
						<a href="mailto:privacy@flatfinder.io">
							privacy@flatfinder.io
						</a>
					</p>
					<p>
						General inquiries:{" "}
						<a href="mailto:flat@flatfinder.io">
							flat@flatfinder.io
						</a>
					</p>
				</section>

				<div className={styles.copyright}>
					<p>
						© 2025–2026 Lila Alexandra Olufemi Inglis Abegunrin.
						All Rights Reserved.
					</p>
					<p>
						FlatFinder: Housing Revolutionised Inc. | Patent Pending
						(CIPO) | Trademarks Pending (CIPO)
					</p>
				</div>
			</div>
			<Footer />
		</>
	);
}
