"use client";

import { site } from "@/lib/content";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { Container } from "@/components/Container";

type PricingItem = (typeof site.pricing.physiotherapy.items)[number];

const columns = ["Appointment type", "Duration", "Cost"] as const;

function PricingTable({
	title,
	subtitle,
	items,
	footnote
}: {
	title: string;
	subtitle?: string;
	items: PricingItem[];
	footnote?: string;
}) {
	return (
		<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
			<div className="border-b border-slate-200 px-5 py-4">
				<h2 className="text-base font-semibold text-slate-900 md:text-lg">{title}</h2>
				{subtitle && <p className="mt-1 text-sm text-slate-600">{subtitle}</p>}
			</div>
			<div className="overflow-x-auto">
				<table className="w-full min-w-[28rem] border-collapse text-left">
					<thead>
						<tr className="border-b border-slate-200 bg-aa-bg/40">
							{columns.map((col) => (
								<th
									key={col}
									scope="col"
									className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 first:w-[45%]"
								>
									{col}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{items.map((item) => (
							<tr
								key={item.slug}
								className="border-b border-slate-100 last:border-0"
							>
								<td className="px-5 py-3.5 text-sm font-medium text-slate-900">
									{item.name}
								</td>
								<td className="px-5 py-3.5 text-sm text-slate-600">{item.duration}</td>
								<td className="px-5 py-3.5 text-sm font-semibold tabular-nums text-slate-900">
									{item.price}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{footnote && (
				<p className="border-t border-slate-100 px-5 py-3 text-xs leading-relaxed text-slate-500">
					{footnote}
				</p>
			)}
		</div>
	);
}

export function PricingSection() {
	const { pricing } = site;

	return (
		<Section id="pricing" density="compact" background="tint" container={false} className="scroll-mt-[var(--site-header-height)] md:scroll-mt-28">
			<Container className="space-y-5">
				<SectionHeader
					eyebrow="Pricing"
					title="Clear, transparent pricing"
					description="Simple fees for home visits, online sessions, and care home classes."
				/>

				<div className="space-y-5">
					<PricingTable
						title={pricing.physiotherapy.title}
						subtitle={pricing.physiotherapy.subtitle}
						items={pricing.physiotherapy.items}
					/>
					<PricingTable
						title={pricing.classes.title}
						subtitle={pricing.classes.subtitle}
						items={pricing.classes.items}
						footnote="Private classes are designed with care home staff for up to 6 residents of similar functional ability."
					/>
				</div>

				<ul className="space-y-1 text-xs leading-relaxed text-slate-600 md:text-sm">
					{pricing.notes.map((note, idx) => (
						<li key={idx} className="flex gap-2">
							<span className="text-slate-400" aria-hidden>
								•
							</span>
							<span>{note}</span>
						</li>
					))}
				</ul>
			</Container>
		</Section>
	);
}
