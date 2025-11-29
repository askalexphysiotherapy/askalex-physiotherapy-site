"use client";

import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { site } from "@/lib/content";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/Button";

export default function ContactPage() {
	const { contact } = site;
	const searchParams = useSearchParams();
	const [formData, setFormData] = useState<Record<string, string>>({});
	const [clientType, setClientType] = useState<"new" | "returning">("new");
	const [showPostcode, setShowPostcode] = useState(false);
	const [consentChecked, setConsentChecked] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

	// Booking type options for returning clients
	const bookingTypeOptions = [
		"Initial – Home Visit",
		"Follow-up – Home Visit",
		"Initial – In-Clinic",
		"Follow-up – In-Clinic",
		"Initial – Online",
		"Follow-up – Online"
	];

	// Day and time options
	const dayOptions = ["Any day", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
	const timeWindowOptions = ["Any time", "08:00–12:00", "12:00–16:00", "16:00–20:00"];

	// Prefill from query params
	useEffect(() => {
		if (contact.prefillFromQuery) {
			const serviceParam = searchParams.get(contact.prefillFromQuery.param);
			if (serviceParam && contact.prefillFromQuery.map[serviceParam]) {
				const mappedValue = contact.prefillFromQuery.map[serviceParam];
				setFormData((prev) => ({ ...prev, appointment_type: mappedValue }));
				if (mappedValue === "Home Visit") {
					setShowPostcode(true);
				}
			}
		}

		// Capture UTM params
		if (contact.tracking.utm) {
			const utmData: Record<string, string> = {};
			contact.tracking.utm.forEach((param) => {
				const value = searchParams.get(param);
				if (value) utmData[param] = value;
			});
			if (contact.tracking.includeSourceUrl) {
				utmData.source_url = window.location.href;
			}
			setFormData((prev) => ({ ...prev, ...utmData }));
		}
	}, [searchParams, contact]);

	// Handle client type change
	const handleClientTypeChange = (type: "new" | "returning") => {
		setClientType(type);
		// Clear appointment type when switching to new client
		if (type === "new") {
			setFormData((prev) => {
				const newData = { ...prev };
				delete newData.appointment_type;
				delete newData.postcode;
				return newData;
			});
			setShowPostcode(false);
		}
	};

	// Handle booking type change (for returning clients)
	const handleBookingTypeChange = (value: string) => {
		setFormData((prev) => ({ ...prev, booking_type: value }));
		// Show postcode if it's a Home Visit
		if (value.includes("Home Visit")) {
			setShowPostcode(true);
		} else {
			setShowPostcode(false);
			setFormData((prev) => ({ ...prev, postcode: "" }));
		}
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setErrors({});
		setSubmitMessage(null);
		setIsSubmitting(true);

		// Validate required fields based on client type
		const newErrors: Record<string, string> = {};

		if (clientType === "new") {
			// New client validation
			if (!formData.first_name) newErrors.first_name = "First name is required";
			if (!formData.last_name) newErrors.last_name = "Last name is required";
			if (!formData.email && !formData.phone) {
				newErrors.contact = "Please provide at least an email or phone number";
			}
			if (!formData.preferred_day) newErrors.preferred_day = "Preferred day is required";
			if (!formData.preferred_time_window) newErrors.preferred_time_window = "Preferred time window is required";
		} else {
			// Returning client validation
			if (!formData.booking_type) newErrors.booking_type = "Booking type is required";
			if (showPostcode && !formData.postcode) newErrors.postcode = "Postcode is required for home visits";
			if (!formData.first_name) newErrors.first_name = "First name is required";
			if (!formData.last_name) newErrors.last_name = "Last name is required";
			if (!formData.email) newErrors.email = "Email is required";
			if (!formData.preferred_day) newErrors.preferred_day = "Preferred day is required";
			if (!formData.preferred_time_window) newErrors.preferred_time_window = "Preferred time window is required";
		}

		// Validate consent
		if (contact.consent.required && !consentChecked) {
			newErrors.consent = "You must agree to the data processing terms";
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			setIsSubmitting(false);
			return;
		}

		// Prepare data for API
		const apiData = {
			clientType,
			first_name: formData.first_name || "",
			last_name: formData.last_name || "",
			email: formData.email || "",
			phone: formData.phone || "",
			preferred_day: formData.preferred_day || "",
			preferred_time_window: formData.preferred_time_window || "",
			description: formData.description || "",
			booking_type: formData.booking_type || "",
			postcode: formData.postcode || "",
			utm_source: formData.utm_source || "",
			utm_medium: formData.utm_medium || "",
			utm_campaign: formData.utm_campaign || "",
			utm_term: formData.utm_term || "",
			utm_content: formData.utm_content || "",
			source_url: formData.source_url || ""
		};

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(apiData)
			});

			const result = await response.json();

			if (!response.ok || !result.success) {
				throw new Error(result.error || "Failed to send message");
			}

			// Success
			setSubmitMessage({
				type: "success",
				text: "Thank you – your enquiry has been sent. Alex will contact you as soon as possible to confirm your appointment or discuss next steps."
			});

			// Reset form
			setFormData({});
			setConsentChecked(false);
			setClientType("new");
			setShowPostcode(false);
		} catch (error) {
			setSubmitMessage({
				type: "error",
				text: "Sorry, something went wrong sending your enquiry. Please try again, or email hello@askalexphysiotherapy.com."
			});
		} finally {
			setIsSubmitting(false);
		}
	};


	return (
		<>
			<PageHero
				title={contact.title}
				subtitle={contact.lead}
				align="center"
				density="comfortable"
			/>

			{/* Contact Form */}
			<Section density="comfortable" background="default">
				<Reveal>
					<Card className="max-w-3xl mx-auto">
						<form onSubmit={handleSubmit} className="space-y-6">
							{/* Client Type Selection */}
							<div>
								<fieldset className="space-y-3">
									<legend className="text-sm font-semibold text-slate-900 mb-2">
										I am a:
									</legend>
									<div className="flex flex-col gap-3 sm:flex-row">
										<label className="flex items-center gap-2 cursor-pointer rounded-lg border-2 border-slate-200 p-4 transition-all hover:border-medical-blue hover:bg-bg-blue/50 has-[:checked]:border-medical-blue has-[:checked]:bg-bg-blue">
											<input
												type="radio"
												name="client_type"
												value="new"
												checked={clientType === "new"}
												onChange={() => handleClientTypeChange("new")}
												className="text-medical-blue focus:ring-medical-blue"
											/>
											<span className="text-sm font-medium text-slate-900">
												New client (request a free consultation)
											</span>
										</label>
										<label className="flex items-center gap-2 cursor-pointer rounded-lg border-2 border-slate-200 p-4 transition-all hover:border-medical-blue hover:bg-bg-blue/50 has-[:checked]:border-medical-blue has-[:checked]:bg-bg-blue">
											<input
												type="radio"
												name="client_type"
												value="returning"
												checked={clientType === "returning"}
												onChange={() => handleClientTypeChange("returning")}
												className="text-medical-blue focus:ring-medical-blue"
											/>
											<span className="text-sm font-medium text-slate-900">
												Returning client (request a follow-up or appointment)
											</span>
										</label>
									</div>
								</fieldset>
							</div>

							{/* Form fields based on client type */}
							{clientType === "new" ? (
								<>
									{/* New Client Fields */}
									<div>
										<label htmlFor="first_name" className="block text-sm font-medium text-slate-900">
											First name <span className="text-medical-blue ml-1">*</span>
										</label>
										<input
											type="text"
											id="first_name"
											name="first_name"
											required
											autoComplete="given-name"
											value={formData.first_name || ""}
											onChange={(e) => setFormData((prev) => ({ ...prev, first_name: e.target.value }))}
											className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-medical-blue focus:outline-none focus:ring-2 focus:ring-medical-blue focus:ring-offset-2"
										/>
										{errors.first_name && <p className="mt-1 text-sm text-red-600">{errors.first_name}</p>}
									</div>

									<div>
										<label htmlFor="last_name" className="block text-sm font-medium text-slate-900">
											Last name <span className="text-medical-blue ml-1">*</span>
										</label>
										<input
											type="text"
											id="last_name"
											name="last_name"
											required
											autoComplete="family-name"
											value={formData.last_name || ""}
											onChange={(e) => setFormData((prev) => ({ ...prev, last_name: e.target.value }))}
											className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-medical-blue focus:outline-none focus:ring-2 focus:ring-medical-blue focus:ring-offset-2"
										/>
										{errors.last_name && <p className="mt-1 text-sm text-red-600">{errors.last_name}</p>}
									</div>

									<div>
										<label htmlFor="email" className="block text-sm font-medium text-slate-900">
											Email
										</label>
										<input
											type="email"
											id="email"
											name="email"
											autoComplete="email"
											value={formData.email || ""}
											onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
											className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-medical-blue focus:outline-none focus:ring-2 focus:ring-medical-blue focus:ring-offset-2"
										/>
										{errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
									</div>

									<div>
										<label htmlFor="phone" className="block text-sm font-medium text-slate-900">
											Phone
										</label>
										<input
											type="tel"
											id="phone"
											name="phone"
											autoComplete="tel"
											value={formData.phone || ""}
											onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
											className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-medical-blue focus:outline-none focus:ring-2 focus:ring-medical-blue focus:ring-offset-2"
										/>
										{errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
									</div>

									{errors.contact && <p className="text-sm text-red-600">{errors.contact}</p>}

									<div>
										<label htmlFor="preferred_day" className="block text-sm font-medium text-slate-900">
											Preferred day <span className="text-medical-blue ml-1">*</span>
										</label>
										<select
											id="preferred_day"
											name="preferred_day"
											required
											value={formData.preferred_day || ""}
											onChange={(e) => setFormData((prev) => ({ ...prev, preferred_day: e.target.value }))}
											className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-medical-blue focus:outline-none focus:ring-2 focus:ring-medical-blue focus:ring-offset-2"
										>
											<option value="">Select a day</option>
											{dayOptions.map((day) => (
												<option key={day} value={day}>
													{day}
												</option>
											))}
										</select>
										{errors.preferred_day && <p className="mt-1 text-sm text-red-600">{errors.preferred_day}</p>}
									</div>

									<div>
										<label htmlFor="preferred_time_window" className="block text-sm font-medium text-slate-900">
											Preferred time window <span className="text-medical-blue ml-1">*</span>
										</label>
										<select
											id="preferred_time_window"
											name="preferred_time_window"
											required
											value={formData.preferred_time_window || ""}
											onChange={(e) => setFormData((prev) => ({ ...prev, preferred_time_window: e.target.value }))}
											className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-medical-blue focus:outline-none focus:ring-2 focus:ring-medical-blue focus:ring-offset-2"
										>
											<option value="">Select a time window</option>
											{timeWindowOptions.map((time) => (
												<option key={time} value={time}>
													{time}
												</option>
											))}
										</select>
										{errors.preferred_time_window && <p className="mt-1 text-sm text-red-600">{errors.preferred_time_window}</p>}
									</div>

									<div>
										<label htmlFor="description" className="block text-sm font-medium text-slate-900">
											Brief description of your concern
										</label>
										<textarea
											id="description"
											name="description"
											placeholder="Please describe your problem or concern..."
											value={formData.description || ""}
											onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
											className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-medical-blue focus:outline-none focus:ring-2 focus:ring-medical-blue focus:ring-offset-2"
											rows={4}
										/>
									</div>
								</>
							) : (
								<>
									{/* Returning Client Fields */}
									<div>
										<label htmlFor="booking_type" className="block text-sm font-medium text-slate-900">
											Booking type <span className="text-medical-blue ml-1">*</span>
										</label>
										<select
											id="booking_type"
											name="booking_type"
											required
											value={formData.booking_type || ""}
											onChange={(e) => handleBookingTypeChange(e.target.value)}
											className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-medical-blue focus:outline-none focus:ring-2 focus:ring-medical-blue focus:ring-offset-2"
										>
											<option value="">Select booking type</option>
											{bookingTypeOptions.map((option) => (
												<option key={option} value={option}>
													{option}
												</option>
											))}
										</select>
										{errors.booking_type && <p className="mt-1 text-sm text-red-600">{errors.booking_type}</p>}
									</div>

									{showPostcode && (
										<div>
											<label htmlFor="postcode" className="block text-sm font-medium text-slate-900">
												Postcode <span className="text-medical-blue ml-1">*</span>
											</label>
											<input
												type="text"
												id="postcode"
												name="postcode"
												required
												placeholder="e.g. N3 1AB"
												value={formData.postcode || ""}
												onChange={(e) => setFormData((prev) => ({ ...prev, postcode: e.target.value }))}
												className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-medical-blue focus:outline-none focus:ring-2 focus:ring-medical-blue focus:ring-offset-2"
											/>
											{errors.postcode && <p className="mt-1 text-sm text-red-600">{errors.postcode}</p>}
										</div>
									)}

									<div>
										<label htmlFor="preferred_day" className="block text-sm font-medium text-slate-900">
											Preferred day <span className="text-medical-blue ml-1">*</span>
										</label>
										<select
											id="preferred_day"
											name="preferred_day"
											required
											value={formData.preferred_day || ""}
											onChange={(e) => setFormData((prev) => ({ ...prev, preferred_day: e.target.value }))}
											className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-medical-blue focus:outline-none focus:ring-2 focus:ring-medical-blue focus:ring-offset-2"
										>
											<option value="">Select a day</option>
											{dayOptions.map((day) => (
												<option key={day} value={day}>
													{day}
												</option>
											))}
										</select>
										{errors.preferred_day && <p className="mt-1 text-sm text-red-600">{errors.preferred_day}</p>}
									</div>

									<div>
										<label htmlFor="preferred_time_window" className="block text-sm font-medium text-slate-900">
											Preferred time window <span className="text-medical-blue ml-1">*</span>
										</label>
										<select
											id="preferred_time_window"
											name="preferred_time_window"
											required
											value={formData.preferred_time_window || ""}
											onChange={(e) => setFormData((prev) => ({ ...prev, preferred_time_window: e.target.value }))}
											className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-medical-blue focus:outline-none focus:ring-2 focus:ring-medical-blue focus:ring-offset-2"
										>
											<option value="">Select a time window</option>
											{timeWindowOptions.map((time) => (
												<option key={time} value={time}>
													{time}
												</option>
											))}
										</select>
										{errors.preferred_time_window && <p className="mt-1 text-sm text-red-600">{errors.preferred_time_window}</p>}
									</div>

									<div>
										<label htmlFor="first_name" className="block text-sm font-medium text-slate-900">
											First name <span className="text-medical-blue ml-1">*</span>
										</label>
										<input
											type="text"
											id="first_name"
											name="first_name"
											required
											autoComplete="given-name"
											value={formData.first_name || ""}
											onChange={(e) => setFormData((prev) => ({ ...prev, first_name: e.target.value }))}
											className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-medical-blue focus:outline-none focus:ring-2 focus:ring-medical-blue focus:ring-offset-2"
										/>
										{errors.first_name && <p className="mt-1 text-sm text-red-600">{errors.first_name}</p>}
									</div>

									<div>
										<label htmlFor="last_name" className="block text-sm font-medium text-slate-900">
											Last name <span className="text-medical-blue ml-1">*</span>
										</label>
										<input
											type="text"
											id="last_name"
											name="last_name"
											required
											autoComplete="family-name"
											value={formData.last_name || ""}
											onChange={(e) => setFormData((prev) => ({ ...prev, last_name: e.target.value }))}
											className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-medical-blue focus:outline-none focus:ring-2 focus:ring-medical-blue focus:ring-offset-2"
										/>
										{errors.last_name && <p className="mt-1 text-sm text-red-600">{errors.last_name}</p>}
									</div>

									<div>
										<label htmlFor="email" className="block text-sm font-medium text-slate-900">
											Email <span className="text-medical-blue ml-1">*</span>
										</label>
										<input
											type="email"
											id="email"
											name="email"
											required
											autoComplete="email"
											value={formData.email || ""}
											onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
											className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-medical-blue focus:outline-none focus:ring-2 focus:ring-medical-blue focus:ring-offset-2"
										/>
										{errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
									</div>

									<div>
										<label htmlFor="phone" className="block text-sm font-medium text-slate-900">
											Phone
										</label>
										<input
											type="tel"
											id="phone"
											name="phone"
											autoComplete="tel"
											value={formData.phone || ""}
											onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
											className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-medical-blue focus:outline-none focus:ring-2 focus:ring-medical-blue focus:ring-offset-2"
										/>
									</div>

									<div>
										<label htmlFor="description" className="block text-sm font-medium text-slate-900">
											Description
										</label>
										<textarea
											id="description"
											name="description"
											placeholder="Describe your condition/problem, or make specific date/time requests for appointments..."
											value={formData.description || ""}
											onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
											className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-medical-blue focus:outline-none focus:ring-2 focus:ring-medical-blue focus:ring-offset-2"
											rows={4}
										/>
									</div>
								</>
							)}

									{/* Consent Checkbox */}
									<div>
										<label className="flex items-start gap-2 text-sm text-slate-700">
											<input
												type="checkbox"
												checked={consentChecked}
												onChange={(e) => setConsentChecked(e.target.checked)}
												required={contact.consent.required}
												className="mt-0.5 text-aa-blue focus:ring-aa-blue"
											/>
											<span>
												{contact.consent.label}{" "}
												<Link
													href={contact.consent.privacyHref}
													className="text-aa-blue underline hover:text-aa-aqua"
												>
													{contact.consent.privacyText}
												</Link>
											</span>
										</label>
										{errors.consent && (
											<p className="mt-1 text-sm text-red-600">{errors.consent}</p>
										)}
									</div>

									{/* Submit Message */}
									{submitMessage && (
										<div
											className={`rounded-lg p-4 ${
												submitMessage.type === "success"
													? "bg-medical-green/10 border border-medical-green/20 text-medical-green"
													: "bg-red-50 border border-red-200 text-red-700"
											}`}
										>
											<p className="text-sm font-medium">{submitMessage.text}</p>
										</div>
									)}

									<Button 
										type="submit" 
										variant="primary" 
										className="w-full"
										disabled={isSubmitting}
									>
										{isSubmitting ? "Sending..." : contact.actions.submitLabel}
									</Button>

									{/* Disclaimer */}
									<p className="mt-6 text-xs text-slate-600 text-center">
										Alex will respond to your request as soon as possible to confirm your appointment or discuss an alternative time if your preferred slot isn't available.
									</p>
								</form>
					</Card>
				</Reveal>

				{/* Alt Contact */}
				<Reveal delay={0.2}>
					<Card className="max-w-3xl mx-auto mt-8">
						<h3 className="text-lg font-semibold text-slate-900">Alternative Contact</h3>
						<p className="mt-4 text-slate-700">{contact.altContact.blurb}</p>
						<div className="mt-6 space-y-3">
							<a
								href={`mailto:${contact.altContact.email}`}
								className="block text-medical-blue underline hover:text-soft-aqua transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-medical-blue focus-visible:ring-offset-2 rounded"
							>
								{contact.altContact.email}
							</a>
							<a
								href={`tel:${contact.altContact.phone}`}
								className="block text-medical-blue underline hover:text-soft-aqua transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-medical-blue focus-visible:ring-offset-2 rounded"
							>
								{contact.altContact.phone}
							</a>
						</div>
					</Card>
				</Reveal>
			</Section>
		</>
	);
}

