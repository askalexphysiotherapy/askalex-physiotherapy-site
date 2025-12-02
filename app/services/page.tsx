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
import { Container } from "@/components/Container";
import { Card } from "@/components/Card";
import { Table } from "@/components/Table";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/Button";
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

	// Handle deep linking on mount
	useEffect(() => {
		if (typeof window !== "undefined") {
			const hash = window.location.hash.slice(1);
			if (hash && ["home", "clinic", "online"].includes(hash)) {
				setExpandedCard(hash);
				// Scroll to the card after a brief delay
				setTimeout(() => {
					const element = document.getElementById(hash);
					if (element) {
						element.scrollIntoView({ behavior: "smooth", block: "start" });
					}
				}, 100);
			}
		}
	}, []);

	return (
		<>
			<PageHero
				title={services.title}
				subtitle={services.subtitle}
				align="center"
				density="compact"
			/>

			{/* Service Cards */}
			<Section density="comfortable" background="default">
				<div className="space-y-8 md:space-y-10">
						{services.cards.map((card, idx) => {
							const isExpanded = expandedCard === card.key;
							return (
								<Reveal key={card.key} delay={idx * 0.1}>
									<div id={card.key} className="scroll-mt-20">
										<Card>
											<div className="grid gap-6 md:grid-cols-2">
												<div>
													<h2 className="text-2xl font-semibold text-slate-900">{card.title}</h2>
													<p className="mt-4 text-slate-700">{card.intro}</p>
													{isExpanded && (
														<div className="mt-6">
															<h3 className="text-sm font-semibold text-slate-900 mb-2">
																What to expect:
															</h3>
															<ul className="space-y-2">
																{card.details.map((detail, detailIdx) => (
																	<li key={detailIdx} className="flex items-start gap-2 text-sm text-slate-700">
																		<span className="text-aa-blue mt-1">•</span>
																		<span>{detail}</span>
																	</li>
																))}
															</ul>
														</div>
													)}
													<div className="mt-6 flex items-center justify-between gap-4">
														<button
															onClick={() =>
																setExpandedCard(isExpanded ? null : card.key)
															}
															className="text-aa-blue font-semibold underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aa-blue focus-visible:ring-offset-2 rounded"
														>
															{isExpanded ? "Show less" : "Learn more"}
														</button>
														<Link
															href={card.cta.href}
															className="rounded-full bg-aa-blue px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-aa-aqua focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aa-blue focus-visible:ring-offset-2 whitespace-nowrap"
														>
															{card.cta.label}
														</Link>
													</div>
												</div>
												<div className="relative">
													<Image
														src={card.image.src}
														alt={card.image.alt}
														width={600}
														height={400}
														className="rounded-2xl shadow-soft"
													/>
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

			{/* Comparison Table */}
			<Section density="comfortable" background="tint">
				<SectionHeader
					title="Service Comparison"
					description={services.compare.intro}
				/>
				<div className="mt-8">
					<Reveal>
						<Table
							columns={services.compare.columns}
							rows={services.compare.rows.map((row) => ({
								feature: row.feature,
								home: row.home,
								clinic: row.clinic,
								online: row.online
							}))}
						/>
					</Reveal>
				</div>
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
