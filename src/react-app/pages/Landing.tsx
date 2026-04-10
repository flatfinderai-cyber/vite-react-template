import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import styles from "./Landing.module.css";

export default function Landing() {
	return (
		<>
			<Nav />

			{/* Hero */}
			<section className={styles.hero}>
				<div className={styles.heroText}>
					<div className={styles.eyebrow}>
						Housing Revolutionised
					</div>
					<h1>
						FIND YOUR
						<span className={styles.highlight}> NEXT HOME</span>
					</h1>
					<p className={styles.tagline}>
						No gatekeeping. No predatory landlords.
						<br />
						Just <strong>honest listings</strong> that fit your
						budget.
					</p>
					<div className={styles.subTagline}>
						<span>AI-Powered Search</span>
						<span>Affordability First</span>
						<span>Canadian Built</span>
					</div>
					<div className={styles.btnGroup}>
						<Link to="/beta-signup" className={styles.btnPrimary}>
							Join the Beta — It's Free
							<span className={styles.arrow}>→</span>
						</Link>
						<a href="#how-it-works" className={styles.btnSecondary}>
							See How It Works
						</a>
					</div>
				</div>

				<div className={styles.heroVisual}>
					<div className={styles.heroCard}>
						<div className={styles.heroCardHeader}>
							<span className={styles.heroEmoji}>🐱</span>
							<div>
								<div className={styles.heroCardTitle}>
									Benny™ says:
								</div>
								<div className={styles.heroCardSubtitle}>
									Your AI Housing Advocate
								</div>
							</div>
						</div>
						<div className={styles.heroCardBody}>
							"I found 3 places in your range in the
							Annex. Want me to check if any of these
							landlords have compliance issues?"
						</div>
						<div className={styles.heroCardMeta}>
							<span>📍 Toronto, ON</span>
							<span>💰 Under $1,800/mo</span>
							<span>🛏️ 1 Bedroom</span>
						</div>
					</div>
				</div>
			</section>

			{/* How It Works */}
			<section className={styles.section} id="how-it-works">
				<div className={styles.sectionInner}>
					<div className={styles.sectionEyebrow}>The Process</div>
					<h2 className={styles.sectionTitle}>
						HOW FLATFINDER™ WORKS
					</h2>
					<p className={styles.sectionDesc}>
						Three steps. No paperwork until you're ready. No
						landlord sees your data until you say so.
					</p>

					<div className={styles.stepsGrid}>
						<div className={styles.step}>
							<div className={styles.stepNumber}>01</div>
							<h3>Tell Us What You Need</h3>
							<p>
								City, budget, bedrooms. That's it. Benny™ takes
								it from there. No income screening. No credit
								check. Just your actual search.
							</p>
						</div>
						<div className={styles.step}>
							<div className={styles.stepNumber}>02</div>
							<h3>Benny™ Finds Your Options</h3>
							<p>
								Our AI scans listings across your city, filters
								out overpriced traps, and checks landlord
								compliance records. You see only homes that fit.
							</p>
						</div>
						<div className={styles.step}>
							<div className={styles.stepNumber}>03</div>
							<h3>Move In With Confidence</h3>
							<p>
								Every listing comes with a compliance badge.
								Know your rights. Know your landlord's track
								record. Move in knowing the deal is fair.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Plans */}
			<section className={styles.section} id="plans">
				<div className={styles.sectionInner}>
					<div className={styles.sectionEyebrow}>Pick Your Plan</div>
					<h2 className={styles.sectionTitle}>
						BUILT FOR EVERY BUDGET
					</h2>
					<p className={styles.sectionDesc}>
						FlatFinder™ never charges a working renter to find a
						place to live. Paid plans unlock advocacy tools.
					</p>

					<div className={styles.plansGrid}>
						<div className={styles.planCard}>
							<div className={styles.planBadgeFree}>
								FREE during beta
							</div>
							<h3>Pro</h3>
							<div className={styles.planSubtitle}>
								The Essential
							</div>
							<div className={styles.planPrice}>
								<span className={styles.strikethrough}>
									$29 CAD/mo
								</span>
								<span className={styles.priceBeta}>FREE</span>
							</div>
							<ul className={styles.planFeatures}>
								<li>Listing search with affordability filtering</li>
								<li>Benny™ AI chat assistant</li>
								<li>Compliance badges on agents</li>
								<li>Basic demand letter (1/month)</li>
							</ul>
							<Link
								to="/beta-signup?plan=pro"
								className={styles.planBtn}
							>
								Get Started Free
							</Link>
						</div>

						<div className={styles.planCard}>
							<div className={styles.planBadge}>
								50% off — beta deal
							</div>
							<h3>Max</h3>
							<div className={styles.planSubtitle}>
								The Advocate
							</div>
							<div className={styles.planPrice}>
								<span className={styles.strikethrough}>
									$79 CAD/mo
								</span>
								<span className={styles.priceBeta}>
									$39.50/mo
								</span>
							</div>
							<ul className={styles.planFeatures}>
								<li>Everything in Pro +</li>
								<li>Unlimited demand letters</li>
								<li>Agent report submissions</li>
								<li>City-specific legal templates</li>
								<li>Priority Benny™ responses</li>
							</ul>
							<Link
								to="/beta-signup?plan=max"
								className={styles.planBtn}
							>
								Join Beta
							</Link>
						</div>

						<div
							className={`${styles.planCard} ${styles.planCardFeatured}`}
						>
							<div className={styles.planBadgeBest}>
								⭐ Best Value
							</div>
							<h3>Ultra</h3>
							<div className={styles.planSubtitle}>
								The Full Armour
							</div>
							<div className={styles.planPrice}>
								<span className={styles.strikethrough}>
									$149 CAD/mo
								</span>
								<span className={styles.priceBeta}>
									$74.50/mo
								</span>
							</div>
							<ul className={styles.planFeatures}>
								<li>Everything in Max +</li>
								<li>Triple-checked apartment finding</li>
								<li>Personal apartment scout</li>
								<li>Dedicated compliance review</li>
								<li>Pre-move-in inspection checklist</li>
								<li>Direct escalation support</li>
							</ul>
							<Link
								to="/beta-signup?plan=ultra"
								className={styles.planBtn}
							>
								Join Beta
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* Final CTA */}
			<section className={styles.ctaSection}>
				<div className={styles.ctaInner}>
					<h2>Ready to find a home that fits your budget?</h2>
					<p>
						Join the beta. No credit card. No income screening. Just
						housing that works for you.
					</p>
					<Link to="/beta-signup" className={styles.btnPrimary}>
						Join the Beta — It's Free
						<span className={styles.arrow}>→</span>
					</Link>
				</div>
			</section>

			<Footer />
		</>
	);
}
