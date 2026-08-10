"use client";

import { site } from "@/lib/content";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { Container } from "@/components/Container";

type PricingItem = (typeof site.pricing.physiotherapy.items)[number];

function PriceRow({ item }: { item: PricingItem }) {
	return (
		<div className="flex items-start justify-between gap-4 border-b border-slate-100 py-3 last:border-b-0 last:pb-0 first:pt-0">
			<div className="min-w-0 flex-1">
				<div className="flex flex-wrap items-center gap-x-2 gap-y-1">
					<p className="text-sm font-semibold text-slate-900">{item.name}</p>
					{item.badge && (
						<span className="inline-flex items-center rounded-full bg-medical-green/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-medical-green">
							{item.badge}
						</span>
					)}
				</div>
				<p className="mt-0.5 text-xs font-medium text-medical-blue">{item.duration}</p>
				{item.description && (
					<p className="mt-1 text-xs leading-relaxed text-slate-600">{item.description}</p>
				)}
			</div>
			<p className="shrink-0 text-sm font-semibold tabular-nums text-slate-900">{item.price}</p>
		</div>
	);
}

function PricingColumn({
	title,
	subtitle,
	singles,
	packages,
	packageLabel
}: {
	title: string;
	subtitle: string;
	singles: PricingItem[];
	packages: PricingItem[];
	packageLabel: string;
}) {
	return (
		<div className="rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-sm md:p-6">
			<div className="mb-4">
				<h2 className="text-lg font-semibold text-slate-900">{title}</h2>
				<p className="mt-1 text-sm leading-relaxed text-slate-600">{subtitle}</p>
			</div>

			<div>
				{singles.map((item) => (
					<PriceRow key={item.slug} item={item} />
				))}
			</div>

			{packages.length > 0 && (
				<div className="mt-4 border-t border-slate-200 pt-4">
					<p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
						{packageLabel}
					</p>
					{packages.map((item) => (
						<PriceRow key={item.slug} item={item} />
					))}
				</div>
			)}
		</div>
	);
}

export function PricingSection() {
	const { pricing } = site;

	const physioSingles = pricing.physiotherapy.items.filter(
		(item) => !item.slug.startsWith("recovery-")
	);
	const physioPackages = pricing.physiotherapy.items.filter((item) =>
		item.slug.startsWith("recovery-")
	);
	const classSingles = pricing.classes.items.filter(
		(item) => item.slug !== "four-class-block"
	);
	const classPackages = pricing.classes.items.filter(
		(item) => item.slug === "four-class-block"
	);

	return (
		<Section id="pricing" density="compact" background="tint" container={false}>
			<Container className="space-y-6">
				<SectionHeader
					eyebrow="Pricing"
					title="Clear, transparent pricing"
					description="No hidden fees. Packages save money when you commit to a block of sessions."
				/>

				<div className="grid gap-5 lg:grid-cols-2 lg:gap-6 lg:items-start">
					<PricingColumn
						title={pricing.physiotherapy.title}
						subtitle={pricing.physiotherapy.subtitle}
						singles={physioSingles}
						packages={physioPackages}
						packageLabel="Recovery packages"
					/>
					<PricingColumn
						title={pricing.classes.title}
						subtitle={pricing.classes.subtitle}
						singles={classSingles}
						packages={classPackages}
						packageLabel="Class packages"
					/>
				</div>

				<div className="rounded-xl border border-slate-200/80 bg-white/80 px-4 py-3 text-xs leading-relaxed text-slate-600 md:text-sm">
					<p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
						Good to know
					</p>
					<ul className="grid gap-1 sm:grid-cols-2 sm:gap-x-6">
						{pricing.notes.map((note, idx) => (
							<li key={idx} className="flex gap-2">
								<span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-medical-blue" aria-hidden />
								<span>{note}</span>
							</li>
						))}
					</ul>
				</div>
			</Container>
		</Section>
	);
}
