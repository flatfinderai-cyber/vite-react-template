import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import BetaSignup from "./pages/BetaSignup";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import "./index.css";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/beta-signup" element={<BetaSignup />} />
				<Route path="/terms" element={<Terms />} />
				<Route path="/privacy" element={<Privacy />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
