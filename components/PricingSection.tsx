"use client";

import { site } from "@/lib/content";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { Container } from "@/components/Container";
import { Card } from "@/components/Card";

export function PricingSection() {
	const { pricing } = site;

	return (
		<Section id="pricing" className="bg-bg-blue/40" background="default" container={false}>
			<Container className="space-y-12">
				<SectionHeader
					eyebrow="Pricing"
					title="Clear, transparent pricing"
					description="No hidden fees. You only pay for the time we spend together. Recovery Plans offer the best value for longer-term rehabilitation."
				/>

				{/* Private Physiotherapy */}
				<div className="space-y-6">
					<div className="space-y-1">
						<h2 className="text-lg font-semibold text-slate-900">
							{pricing.physiotherapy.title}
						</h2>
						<p className="max-w-2xl text-sm text-slate-600">
							{pricing.physiotherapy.subtitle}
						</p>
					</div>

					<div className="grid gap-4 md:grid-cols-2">
						{pricing.physiotherapy.items.map((item) => (
							<Card
								key={item.slug}
								className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm"
							>
								<div className="space-y-2">
									<div className="flex items-start justify-between gap-3">
										<div>
											<h3 className="text-base font-semibold text-slate-900">
												{item.name}
											</h3>
											{item.duration && (
												<p className="text-xs font-medium text-medical-blue">
													{item.duration}
												</p>
											)}
										</div>
										<div className="text-right">
											<p className="text-base font-semibold text-slate-900">
												{item.price}
											</p>
											{item.badge && (
												<span className="mt-1 inline-flex items-center rounded-full bg-medical-green/10 px-2 py-0.5 text-[11px] font-medium text-medical-green">
													{item.badge}
												</span>
											)}
										</div>
									</div>
									{item.description && (
										<p className="text-sm text-slate-600">
											{item.description}
										</p>
									)}
								</div>
								{item.highlight && (
									<p className="mt-3 text-xs font-medium text-slate-500">
										{item.highlight}
									</p>
								)}
							</Card>
						))}
					</div>
				</div>

				{/* Community Classes */}
				<div className="space-y-6">
					<div className="space-y-1">
						<h2 className="text-lg font-semibold text-slate-900">
							{pricing.classes.title}
						</h2>
						<p className="max-w-2xl text-sm text-slate-600">
							{pricing.classes.subtitle}
						</p>
					</div>

					<div className="grid gap-4 md:grid-cols-2">
						{pricing.classes.items.map((item) => (
							<Card
								key={item.slug}
								className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm"
							>
								<div className="space-y-2">
									<div className="flex items-start justify-between gap-3">
										<div>
											<h3 className="text-base font-semibold text-slate-900">
												{item.name}
											</h3>
											{item.duration && (
												<p className="text-xs font-medium text-medical-blue">
													{item.duration}
												</p>
											)}
										</div>
										<div className="text-right">
											<p className="text-base font-semibold text-slate-900">
												{item.price}
											</p>
											{item.badge && (
												<span className="mt-1 inline-flex items-center rounded-full bg-medical-green/10 px-2 py-0.5 text-[11px] font-medium text-medical-green">
													{item.badge}
												</span>
											)}
										</div>
									</div>
									{item.description && (
										<p className="text-sm text-slate-600">
											{item.description}
										</p>
									)}
								</div>
								{item.highlight && (
									<p className="mt-3 text-xs font-medium text-slate-500">
										{item.highlight}
									</p>
								)}
							</Card>
						))}
					</div>
				</div>

				{/* Notes */}
				<div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 text-xs text-slate-600 md:text-sm">
					<h3 className="mb-2 text-sm font-semibold text-slate-900">
						Additional information
					</h3>
					<ul className="list-disc space-y-1 pl-4">
						{pricing.notes.map((note, idx) => (
							<li key={idx}>{note}</li>
						))}
					</ul>
				</div>
			</Container>
		</Section>
	);
}

