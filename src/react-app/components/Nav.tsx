import { Link } from "react-router-dom";
import styles from "./Nav.module.css";

export default function Nav() {
	return (
		<nav className={styles.nav}>
			<Link to="/" className={styles.logo}>
				FLAT<span>FINDER</span>
			</Link>
			<ul className={styles.links}>
				<li>
					<a href="/#how-it-works">How It Works</a>
				</li>
				<li>
					<a href="/#plans">Plans</a>
				</li>
				<li>
					<Link to="/beta-signup" className={styles.cta}>
						Join Beta
					</Link>
				</li>
			</ul>
		</nav>
	);
}
