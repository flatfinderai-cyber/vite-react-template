import { FormEvent, useEffect, useMemo, useState } from "react";
import "./App.css";

type WaitlistPayload = {
	name: string;
	email: string;
	city: string;
	city_other: string;
	moving_date: string;
	household_size: string;
	budget: string;
	bedrooms: string;
	bathrooms: string;
	property_type: string;
};

const INITIAL_FORM: WaitlistPayload = {
	name: "",
	email: "",
	city: "",
	city_other: "",
	moving_date: "",
	household_size: "",
	budget: "",
	bedrooms: "",
	bathrooms: "",
	property_type: "",
};

function App() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [form, setForm] = useState<WaitlistPayload>(INITIAL_FORM);
	const [error, setError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);

	const showOtherCity = useMemo(() => form.city === "other", [form.city]);

	useEffect(() => {
		const onEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				closeModal();
			}
		};

		document.addEventListener("keydown", onEscape);
		return () => {
			document.removeEventListener("keydown", onEscape);
			document.body.style.overflow = "";
		};
	}, []);

	const openModal = () => {
		setIsModalOpen(true);
		document.body.style.overflow = "hidden";
	};

	const closeModal = () => {
		setIsModalOpen(false);
		document.body.style.overflow = "";
	};

	const updateField = (key: keyof WaitlistPayload, value: string) => {
		setForm((prev) => ({ ...prev, [key]: value }));
	};

	const resetForm = () => {
		setForm(INITIAL_FORM);
		setError("");
		setIsSuccess(false);
		setIsSubmitting(false);
	};

	const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError("");

		if (!form.name.trim() || !form.email.trim()) {
			setError("Name and email are required.");
			return;
		}

		setIsSubmitting(true);
		try {
			const response = await fetch("/api/waitlist", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					...form,
					budget: form.budget ? Number(form.budget) : null,
				}),
			});
			const result = (await response.json()) as { error?: string };

			if (!response.ok) {
				setError(result.error || "Something went wrong.");
				setIsSubmitting(false);
				return;
			}

			setIsSuccess(true);
		} catch {
			setError("Network error — please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<>
			<main className="landing">
				<section className="hero">
					<p className="eyebrow">Toronto-based · Launching 2026</p>
					<h1>
						Housing
						<span>Revolutionised.</span>
					</h1>
					<p className="tagline">
						FlatFinder does the heavy lifting. Tell Benny what you need and get
						on the waitlist for first access.
					</p>
					<div className="actions">
						<button className="btn btn-primary" onClick={openModal} type="button">
							Get Early Access
						</button>
						<a className="btn btn-secondary" href="mailto:flat@flatfinder.io">
							Contact Benny
						</a>
					</div>
				</section>

				<section className="cta">
					<h2>The Envy of Owners Everywhere.</h2>
					<p>Join the waitlist. Be first when Benny opens his doors.</p>
					<button className="btn btn-primary" onClick={openModal} type="button">
						Get Early Access
					</button>
				</section>
			</main>

			<div
				className={`modal-overlay ${isModalOpen ? "open" : ""}`}
				onClick={(event) => {
					if (event.target === event.currentTarget) {
						closeModal();
					}
				}}
			>
				<div className="modal" role="dialog" aria-modal="true" aria-label="Waitlist form">
					<button className="modal-close" onClick={closeModal} type="button">
						Close
					</button>

					{isSuccess ? (
						<div className="success-view">
							<p className="success-title">You&apos;re on the list.</p>
							<p className="success-subtitle">
								Benny will be in touch the moment we launch.
							</p>
							<button
								className="btn btn-secondary"
								onClick={() => {
									closeModal();
									resetForm();
								}}
								type="button"
							>
								Close
							</button>
						</div>
					) : (
						<div>
							<p className="modal-eyebrow">Early Access</p>
							<h3>Join the Waitlist</h3>
							<p className="modal-subtitle">
								Tell Benny a bit about your search so he&apos;s ready when we launch.
							</p>

							<form className="form-grid" onSubmit={onSubmit}>
								<div className="form-row">
									<label>
										<span>Full Name *</span>
										<input
											required
											value={form.name}
											onChange={(e) => updateField("name", e.target.value)}
											placeholder="Jane Smith"
										/>
									</label>
									<label>
										<span>Email *</span>
										<input
											required
											type="email"
											value={form.email}
											onChange={(e) => updateField("email", e.target.value)}
											placeholder="jane@email.com"
										/>
									</label>
								</div>

								<label>
									<span>City</span>
									<select
										value={form.city}
										onChange={(e) => updateField("city", e.target.value)}
									>
										<option value="">Select your city</option>
										<option value="toronto">Toronto</option>
										<option value="vancouver">Vancouver</option>
										<option value="calgary">Calgary</option>
										<option value="montreal">Montreal</option>
										<option value="other">Other (specify below)</option>
									</select>
									{showOtherCity ? (
										<input
											value={form.city_other}
											onChange={(e) => updateField("city_other", e.target.value)}
											placeholder="Enter your city"
										/>
									) : null}
								</label>

								<div className="form-row">
									<label>
										<span>Planned Move Date</span>
										<input
											type="month"
											value={form.moving_date}
											onChange={(e) => updateField("moving_date", e.target.value)}
										/>
									</label>
									<label>
										<span>Household Size</span>
										<select
											value={form.household_size}
											onChange={(e) => updateField("household_size", e.target.value)}
										>
											<option value=""># of people</option>
											<option value="1">1</option>
											<option value="2">2</option>
											<option value="3">3</option>
											<option value="4">4</option>
											<option value="5+">5+</option>
										</select>
									</label>
								</div>

								<label>
									<span>Monthly Budget (CAD)</span>
									<input
										type="number"
										min="0"
										step="100"
										value={form.budget}
										onChange={(e) => updateField("budget", e.target.value)}
										placeholder="2500"
									/>
								</label>

								<div className="form-row">
									<label>
										<span>Bedrooms</span>
										<select
											value={form.bedrooms}
											onChange={(e) => updateField("bedrooms", e.target.value)}
										>
											<option value="">Beds</option>
											<option value="Bachelor/Studio">Bachelor/Studio</option>
											<option value="1">1</option>
											<option value="2">2</option>
											<option value="3">3</option>
											<option value="4+">4+</option>
										</select>
									</label>
									<label>
										<span>Bathrooms</span>
										<select
											value={form.bathrooms}
											onChange={(e) => updateField("bathrooms", e.target.value)}
										>
											<option value="">Baths</option>
											<option value="1">1</option>
											<option value="1.5">1.5</option>
											<option value="2">2</option>
											<option value="2.5">2.5</option>
											<option value="3+">3+</option>
										</select>
									</label>
								</div>

								<label>
									<span>Property Type</span>
									<select
										value={form.property_type}
										onChange={(e) => updateField("property_type", e.target.value)}
									>
										<option value="">What are you looking for?</option>
										<option value="condo">Condo</option>
										<option value="house">House</option>
										<option value="apartment">Apartment</option>
										<option value="room">Room</option>
										<option value="shared">Shared / Roommates</option>
									</select>
								</label>

								{error ? <p className="form-error">{error}</p> : null}

								<button className="btn btn-primary full" disabled={isSubmitting} type="submit">
									{isSubmitting ? "Joining…" : "Join the Waitlist"}
								</button>
							</form>
						</div>
					)}
				</div>
			</div>
		</>
	);
}

export default App;
