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
import { PricingSection } from "@/components/PricingSection";
import { Container } from "@/components/Container";

const expertiseIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
	brain: Brain,
	walk: Footprints,
	activity: Activity,
	scalpel: Stethoscope,
	lungs: Wind,
	elderly: User
};
function scrollToSection(id: string) {
	const element = document.getElementById(id);
	if (element) {
		element.scrollIntoView({ behavior: "smooth", block: "start" });
	}
}

export default function ServicesPage() {
	const { services } = site;
	const [expandedCard, setExpandedCard] = useState<string | null>(null);

	useEffect(() => {
		if (typeof window === "undefined") return;

		const hash = window.location.hash.slice(1);
		if (!hash) return;

		if (services.cards.some((card) => card.key === hash)) {
			setExpandedCard(hash);
		}

		const timer = window.setTimeout(() => scrollToSection(hash), 100);
		return () => window.clearTimeout(timer);
	}, [services.cards]);

	return (
		<>
			{/* Title + section nav (nav stays sticky under the site header) */}
			<Section density="compact" background="tint" container={false} className="!pb-0">
				<Container>
					<h1 className="text-center text-2xl font-extrabold leading-tight tracking-tight text-medical-blue sm:text-3xl lg:text-4xl">
						{services.title}
					</h1>
				</Container>
			</Section>

			<div className="sticky top-[var(--site-header-height)] z-40 border-b border-slate-200/70 bg-bg-blue/90 backdrop-blur supports-[backdrop-filter]:bg-bg-blue/80">
				<Container>
					<nav
						aria-label="Services sections"
						className="flex flex-wrap items-center justify-center gap-2 pb-4 pt-3"
					>
						{services.sectionNav.map((item) => (
							<a
								key={item.id}
								href={`#${item.id}`}
								onClick={(event) => {
									event.preventDefault();
									history.replaceState(null, "", `#${item.id}`);
									scrollToSection(item.id);
								}}
								className="rounded-full border border-slate-200/80 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-aa-blue hover:text-aa-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aa-blue focus-visible:ring-offset-2"
							>
								{item.label}
							</a>
						))}
					</nav>
				</Container>
			</div>

			{/* Service Cards — side by side */}
			<Section density="comfortable" background="default">
				<div className="grid gap-6 md:grid-cols-2 md:gap-8 md:items-stretch">
					{services.cards.map((card, idx) => {
						const isExpanded = expandedCard === card.key;
						return (
							<Reveal key={card.key} delay={idx * 0.1} className="h-full">
								<div id={card.key} className="scroll-mt-32 h-full md:scroll-mt-36">
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
			<Section density="comfortable" background="default" id="expertise" className="scroll-mt-28 md:scroll-mt-32">
				<SectionHeader title={services.expertise.heading} />
				<div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{services.expertise.items.map((item, idx) => {
						const Icon = expertiseIconMap[item.icon] || Activity;
						return (
							<Reveal key={item.id} delay={idx * 0.1}>
								<div id={`expertise-${item.id}`} className="scroll-mt-28 md:scroll-mt-32 h-full">
									<Card className="h-full">
										<Icon className="h-8 w-8 text-aa-blue" aria-hidden="true" />
										<h3 className="mt-4 text-lg font-semibold text-slate-900">{item.title}</h3>
										<p className="mt-2 text-slate-700">{item.text}</p>
									</Card>
								</div>
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
