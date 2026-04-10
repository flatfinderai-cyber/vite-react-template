import Nav from "../components/Nav";
import Footer from "../components/Footer";
import styles from "./Legal.module.css";

export default function Terms() {
	return (
		<>
			<Nav />
			<div className={styles.container}>
				<h1>Terms of Service</h1>
				<p className={styles.subtitle}>
					FlatFinder™ Beta Terms & Conditions
				</p>
				<p className={styles.updated}>Last updated: April 2026</p>

				<section>
					<h2>1. Beta Service</h2>
					<p>
						FlatFinder™ is currently in beta. The service is
						provided "as-is" during this period. We make no
						guarantees regarding apartment finding success, listing
						accuracy, or uninterrupted service availability.
					</p>
				</section>

				<section>
					<h2>2. Eligibility</h2>
					<p>
						You must be at least 18 years of age to use
						FlatFinder™. By signing up for the beta, you confirm
						that you meet this requirement and that all information
						you provide is accurate and truthful.
					</p>
				</section>

				<section>
					<h2>3. Data Usage</h2>
					<p>Your data is used solely to:</p>
					<ul>
						<li>Match you with relevant listings in your city</li>
						<li>
							Improve Benny™ AI responses and search accuracy
						</li>
						<li>Conduct internal platform testing and improvement</li>
						<li>
							Communicate with you about your account and
							FlatFinder™ updates (if opted in)
						</li>
					</ul>
				</section>

				<section>
					<h2>4. Anonymized Feedback</h2>
					<p>
						You grant FlatFinder™ the right to use your anonymized
						feedback, search patterns, and usage data to improve the
						platform and services. No personally identifiable
						information is shared externally.
					</p>
				</section>

				<section>
					<h2>5. Beta Access Revocation</h2>
					<p>
						Beta access may be revoked at any time if these terms
						are violated, including but not limited to: providing
						false information, attempting to scrape or reverse
						engineer the platform, or engaging in harassment of
						other users or staff.
					</p>
				</section>

				<section>
					<h2>6. Limitation of Liability</h2>
					<p>
						FlatFinder™ and its parent company, FlatFinder: Housing
						Revolutionised Inc., bear no financial liability for
						listing accuracy, unsuccessful apartment searches,
						disputes with landlords, or any losses incurred during
						the beta period. Our service is informational and
						advocacy-focused — we are not a real estate broker or
						legal advisor.
					</p>
				</section>

				<section>
					<h2>7. Intellectual Property</h2>
					<p>
						All content, branding, technology, and intellectual
						property associated with FlatFinder™, Benny™, Housing
						Revolutionised™, and the Anti-Gatekeeping Affordability
						Algorithm™ are the exclusive property of Lila Alexandra
						Olufemi Inglis Abegunrin and FlatFinder: Housing
						Revolutionised Inc. Patent pending (CIPO). Trademarks
						pending (CIPO).
					</p>
				</section>

				<section>
					<h2>8. Modifications</h2>
					<p>
						We reserve the right to modify these terms at any time.
						Material changes will be communicated via email to
						registered beta users. Continued use of the service
						after changes constitutes acceptance.
					</p>
				</section>

				<section>
					<h2>9. Governing Law</h2>
					<p>
						These terms are governed by the laws of Canada, Province
						of Ontario. Any disputes shall be resolved in the courts
						of Ontario, Canada.
					</p>
				</section>

				<section>
					<h2>10. Contact</h2>
					<p>
						For questions about these terms, contact us at{" "}
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
