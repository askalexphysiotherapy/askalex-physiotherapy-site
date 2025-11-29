"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema, type BookingInput } from "@/lib/validation";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { useState } from "react";


export default function BookingPage() {
	const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting, isSubmitSuccessful },
		watch,
		reset
	} = useForm<BookingInput>({
		resolver: zodResolver(bookingSchema),
		defaultValues: { type: "new" }
	});
	const type = watch("type");

	async function onSubmit(data: BookingInput) {
		setStatus("idle");
		try {
			const res = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data)
			});
			if (!res.ok) throw new Error("Request failed");
			setStatus("success");
			reset({ type: data.type });
		} catch {
			setStatus("error");
		}
	}

	return (
		<Section className="bg-white">
			<Container>
				<SectionHeader
					title="Booking & contact"
					description="If you’re requesting a free consultation, please include your preferred contact window. If that time is unavailable, Alex will contact you to arrange another time/day."
				/>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="mx-auto mt-8 max-w-2xl space-y-5 rounded-2xl border border-slate-200 bg-white p-6"
					aria-describedby="form-status"
				>
					<div className="grid gap-3 md:grid-cols-2">
						<label className="block">
							<span className="text-sm font-medium text-slate-800">I am a</span>
							<select
								{...register("type")}
								className="mt-1 w-full rounded-2xl border border-slate-300 bg-white px-3 py-2"
							>
								<option value="new">New client (free 10–15 min intro call)</option>
								<option value="returning">Returning client (request appointment)</option>
							</select>
						</label>
					</div>
					<div className="grid gap-3 md:grid-cols-2">
						<label className="block">
							<span className="text-sm font-medium text-slate-800">Name</span>
							<input
								{...register("name")}
								type="text"
								className="mt-1 w-full rounded-2xl border border-slate-300 bg-white px-3 py-2"
								autoComplete="name"
							/>
							{errors.name?.message ? (
								<p className="text-sm text-red-600" role="alert">
									{errors.name.message}
								</p>
							) : null}
						</label>
						<label className="block">
							<span className="text-sm font-medium text-slate-800">Email</span>
							<input
								{...register("email")}
								type="email"
								className="mt-1 w-full rounded-2xl border border-slate-300 bg-white px-3 py-2"
								autoComplete="email"
							/>
							{errors.email?.message ? (
								<p className="text-sm text-red-600" role="alert">
									{errors.email.message}
								</p>
							) : null}
						</label>
					</div>
					<label className="block">
						<span className="text-sm font-medium text-slate-800">Phone (optional)</span>
						<input
							{...register("phone")}
							type="tel"
							className="mt-1 w-full rounded-2xl border border-slate-300 bg-white px-3 py-2"
							autoComplete="tel"
						/>
						{errors.phone?.message ? (
							<p className="text-sm text-red-600" role="alert">
								{errors.phone.message}
							</p>
						) : null}
					</label>
					<label className="block">
						<span className="text-sm font-medium text-slate-800">Brief reason or goals</span>
						<textarea
							{...register("reason")}
							className="mt-1 w-full rounded-2xl border border-slate-300 bg-white px-3 py-2"
							rows={4}
						/>
						{errors.reason?.message ? (
							<p className="text-sm text-red-600" role="alert">
								{errors.reason.message}
							</p>
						) : null}
					</label>
					{type === "new" ? (
						<label className="block">
							<span className="text-sm font-medium text-slate-800">
								Preferred contact window for the free call
							</span>
							<input
								{...register("contactWindow")}
								type="text"
								placeholder="e.g., Weekdays 12:00–14:00"
								className="mt-1 w-full rounded-2xl border border-slate-300 bg-white px-3 py-2"
							/>
						</label>
					) : (
						<label className="block">
							<span className="text-sm font-medium text-slate-800">Preferred setting</span>
							<select
								{...register("setting")}
								className="mt-1 w-full rounded-2xl border border-slate-300 bg-white px-3 py-2"
							>
								<option value="">Select</option>
								<option value="home">Home</option>
								<option value="clinic">In-Clinic</option>
								<option value="online">Online</option>
							</select>
							{errors.setting?.message ? (
								<p className="text-sm text-red-600" role="alert">
									{errors.setting.message}
								</p>
							) : null}
						</label>
					)}
					{/* Honeypot */}
					<label className="hidden">
						<input type="text" tabIndex={-1} autoComplete="off" {...register("hp_field")} />
					</label>
					<label className="flex items-start gap-2">
						<input
							{...register("consent")}
							type="checkbox"
							className="mt-1 h-4 w-4 rounded border-slate-300"
						/>
						<span className="text-sm text-slate-700">
							I agree to the{" "}
							<a className="text-aa-blue underline" href="/privacy">
								Privacy Policy
							</a>
							.
						</span>
					</label>
					{errors.consent?.message ? (
						<p className="text-sm text-red-600" role="alert">
							{errors.consent.message}
						</p>
					) : null}
					<div>
						<button
							type="submit"
							disabled={isSubmitting}
							className="inline-flex items-center rounded-2xl bg-aa-green px-5 py-3 font-medium text-white disabled:opacity-60"
						>
							{isSubmitting ? "Submitting..." : "Send request"}
						</button>
					</div>
					<div id="form-status" aria-live="polite" className="text-sm">
						{status === "success" ? (
							<p className="text-green-700">Thanks—your request has been sent.</p>
						) : null}
						{status === "error" ? (
							<p className="text-red-700">Sorry—something went wrong. Please try again.</p>
						) : null}
					</div>
				</form>
			</Container>
		</Section>
	);
}


