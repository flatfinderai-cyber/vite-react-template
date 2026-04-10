import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<div className={styles.inner}>
				<div className={styles.brand}>
					<div className={styles.logo}>🐱 FlatFinder™</div>
					<p className={styles.tagline}>
						Canadian Kind, Scottish Strong
					</p>
				</div>

				<div className={styles.linksGrid}>
					<div className={styles.col}>
						<h4>Product</h4>
						<Link to="/beta-signup">Join Beta</Link>
						<a href="/#plans">Plans</a>
						<a href="/#how-it-works">How It Works</a>
					</div>
					<div className={styles.col}>
						<h4>Legal</h4>
						<Link to="/terms">Terms of Service</Link>
						<Link to="/privacy">Privacy Policy</Link>
					</div>
					<div className={styles.col}>
						<h4>Contact</h4>
						<a href="mailto:flat@flatfinder.io">
							flat@flatfinder.io
						</a>
						<a href="mailto:privacy@flatfinder.io">
							privacy@flatfinder.io
						</a>
					</div>
				</div>

				<div className={styles.bottom}>
					<p>
						© 2025–2026 Lila Alexandra Olufemi Inglis Abegunrin.
						All Rights Reserved.
					</p>
					<p>
						FlatFinder™: Housing Revolutionised™ | Patent Pending
						(CIPO) | Trademarks Pending (CIPO)
					</p>
					<p>PROPRIETARY AND CONFIDENTIAL</p>
				</div>
			</div>
		</footer>
	);
}
