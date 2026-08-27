"use client";

import Link from "next/link";
import { site } from "@/lib/content";
import { Section } from "@/components/Section";
import { Accordion } from "@/components/Accordion";
import { Card } from "@/components/Card";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";

function FAQJsonLd() {
	const { faq } = site;
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: faq.structuredData.map((item) => ({
			"@type": "Question",
			name: item.q,
			acceptedAnswer: {
				"@type": "Answer",
				text: item.a
			}
		}))
	};

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
		/>
	);
}

export default function FAQPage() {
	const { faq } = site;

	return (
		<>
			<FAQJsonLd />
			<PageHero
				title="FAQ"
				subtitle="Quick answers about home visits and online care."
				align="center"
				density="hero"
			/>

			<Section density="compact" background="default">
				<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
					{faq.groups.map((group, groupIdx) => (
						<Reveal key={group.id} delay={groupIdx * 0.05}>
							<div id={group.id} className="h-full scroll-mt-24">
								<Card className="h-full p-4 md:p-5">
									<h2 className="mb-3 text-base font-semibold text-slate-900 md:text-lg">
										{group.title}
									</h2>
									<div className="space-y-2">
										{group.items.map((item, itemIdx) => (
											<Accordion
												key={itemIdx}
												question={item.q}
												answer={item.a}
												links={item.links}
												compact
											/>
										))}
									</div>
								</Card>
							</div>
						</Reveal>
					))}
				</div>
			</Section>

			<Section density="compact" background="tint">
				<Reveal>
					<div className="text-center">
						<p className="text-sm text-slate-700 md:text-base">{faq.cta.label}</p>
						<div className="mt-4">
							<Link
								href={faq.cta.href}
								className="rounded-full bg-aa-blue px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-aa-aqua focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aa-blue focus-visible:ring-offset-2"
							>
								Contact us
							</Link>
						</div>
					</div>
				</Reveal>
			</Section>
		</>
	);
}
