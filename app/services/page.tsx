"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
	Brain,
	Activity,
	Stethoscope,
	Wind,
	Footprints,
	User
} from "lucide-react";
import { site } from "@/lib/content";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import { PricingSection } from "@/components/PricingSection";

const expertiseIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
	brain: Brain,
	walk: Footprints,
	activity: Activity,
	scalpel: Stethoscope,
	lungs: Wind,
	elderly: User
};

export default function ServicesPage() {
	const { services } = site;
	const [expandedCard, setExpandedCard] = useState<string | null>(null);

	useEffect(() => {
		if (typeof window !== "undefined") {
			const hash = window.location.hash.slice(1);
			if (hash && services.cards.some((card) => card.key === hash)) {
				setExpandedCard(hash);
				setTimeout(() => {
					const element = document.getElementById(hash);
					if (element) {
						element.scrollIntoView({ behavior: "smooth", block: "start" });
					}
				}, 100);
			}
		}
	}, [services.cards]);

	return (
		<>
			<PageHero
				title={services.title}
				subtitle={services.subtitle}
				align="center"
				density="compact"
			/>

			{/* Service Cards — side by side */}
			<Section density="comfortable" background="default">
				<div className="grid gap-6 md:grid-cols-2 md:gap-8 md:items-stretch">
					{services.cards.map((card, idx) => {
						const isExpanded = expandedCard === card.key;
						return (
							<Reveal key={card.key} delay={idx * 0.1} className="h-full">
								<div id={card.key} className="scroll-mt-20 h-full">
									<Card className="flex h-full flex-col">
										<div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl">
											<Image
												src={card.image.src}
												alt={card.image.alt}
												fill
												className="object-cover shadow-soft"
												sizes="(max-width: 768px) 100vw, 50vw"
											/>
										</div>
										<div className="mt-6 flex flex-1 flex-col">
											<h2 className="text-2xl font-semibold text-slate-900">{card.title}</h2>
											<p className="mt-4 text-slate-700">{card.intro}</p>
											{isExpanded && (
												<div className="mt-6">
													<h3 className="mb-2 text-sm font-semibold text-slate-900">
														What to expect:
													</h3>
													<ul className="space-y-2">
														{card.details.map((detail, detailIdx) => (
															<li
																key={detailIdx}
																className="flex items-start gap-2 text-sm text-slate-700"
															>
																<span className="mt-1 text-aa-blue">•</span>
																<span>{detail}</span>
															</li>
														))}
													</ul>
												</div>
											)}
											<div className="mt-auto flex items-center justify-between gap-4 pt-6">
												<button
													onClick={() =>
														setExpandedCard(isExpanded ? null : card.key)
													}
													className="rounded font-semibold text-aa-blue underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aa-blue focus-visible:ring-offset-2"
												>
													{isExpanded ? "Show less" : "Learn more"}
												</button>
												<Link
													href={card.cta.href}
													className="whitespace-nowrap rounded-full bg-aa-blue px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-aa-aqua focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aa-blue focus-visible:ring-offset-2"
												>
													{card.cta.label}
												</Link>
											</div>
										</div>
									</Card>
								</div>
							</Reveal>
						);
					})}
				</div>
			</Section>

			{/* CTA Strip */}
			<Section density="comfortable" background="default">
				<Card className="text-center">
					<h2 className="text-2xl font-semibold text-slate-900">
						{services.primaryCtaStrip.cta.label}
					</h2>
					<p className="mt-4 text-slate-700">{services.primaryCtaStrip.helper}</p>
					<div className="mt-6">
						<Link
							href={services.primaryCtaStrip.cta.href}
							className="rounded-full bg-aa-blue px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-aa-aqua focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aa-blue focus-visible:ring-offset-2"
						>
							{services.primaryCtaStrip.cta.label}
						</Link>
					</div>
				</Card>
			</Section>

			{/* Expertise Grid */}
			<Section density="comfortable" background="default">
				<SectionHeader title={services.expertise.heading} />
				<div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{services.expertise.items.map((item, idx) => {
						const Icon = expertiseIconMap[item.icon] || Activity;
						return (
							<Reveal key={idx} delay={idx * 0.1}>
								<Card className="h-full">
									<Icon className="h-8 w-8 text-aa-blue" aria-hidden="true" />
									<h3 className="mt-4 text-lg font-semibold text-slate-900">{item.title}</h3>
									<p className="mt-2 text-slate-700">{item.text}</p>
								</Card>
							</Reveal>
						);
					})}
				</div>
			</Section>

			{/* Pricing Section */}
			<PricingSection />

			{/* SEO Blurb */}
			<Section density="comfortable" background="tint">
				<Reveal>
					<div className="prose prose-sm max-w-none text-slate-700">
						<p>{services.seo.blurb}</p>
					</div>
				</Reveal>
			</Section>
		</>
	);
}
