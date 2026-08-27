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
import { InlineNavLink } from "@/components/InlineNavLink";
import { ExpertiseFlipCard } from "@/components/ExpertiseFlipCard";

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
	const [flippedExpertise, setFlippedExpertise] = useState<string | null>(null);

	useEffect(() => {
		if (typeof window === "undefined") return;

		const hash = window.location.hash.slice(1);
		if (!hash) return;

		if (services.cards.some((card) => card.key === hash)) {
			setExpandedCard(hash);
		}

		const expertiseMatch = services.expertise.items.find(
			(item) => hash === `expertise-${item.id}` || hash === item.id
		);
		if (expertiseMatch) {
			setFlippedExpertise(expertiseMatch.id);
		}

		const scrollId = expertiseMatch ? `expertise-${expertiseMatch.id}` : hash;
		const timer = window.setTimeout(() => scrollToSection(scrollId), 100);
		return () => window.clearTimeout(timer);
	}, [services.cards, services.expertise.items]);

	const openExpertise = (id: string) => {
		setFlippedExpertise(id);
		history.replaceState(null, "", `#expertise-${id}`);
		scrollToSection(`expertise-${id}`);
	};

	return (
		<>
			<Section density="hero" background="tint" container={false} className="!pb-0">
				<Container>
					<h1 className="text-center text-xl font-extrabold leading-tight tracking-tight text-medical-blue sm:text-2xl">
						{services.title}
					</h1>
				</Container>
			</Section>

			<div className="sticky top-[var(--site-header-height)] z-40 border-b border-slate-200/70 bg-bg-blue/90 backdrop-blur supports-[backdrop-filter]:bg-bg-blue/80">
				<Container>
					<nav
						aria-label="Services sections"
						className="flex flex-wrap items-center justify-center gap-1.5 pb-2 pt-2"
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
								className="rounded-full border border-slate-200/80 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm transition-colors hover:border-aa-blue hover:text-aa-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aa-blue focus-visible:ring-offset-2 md:text-sm"
							>
								{item.label}
							</a>
						))}
					</nav>
				</Container>
			</div>

			<Section density="compact" background="default">
				<p className="mx-auto mb-4 max-w-3xl text-center text-sm leading-relaxed text-slate-700 md:text-base">
					Specialist care across{" "}
					<InlineNavLink
						href="#expertise-neurological"
						onClick={(e) => {
							e.preventDefault();
							openExpertise("neurological");
						}}
					>
						neurological
					</InlineNavLink>
					,{" "}
					<InlineNavLink
						href="#expertise-respiratory"
						onClick={(e) => {
							e.preventDefault();
							openExpertise("respiratory");
						}}
					>
						respiratory
					</InlineNavLink>
					,{" "}
					<InlineNavLink
						href="#expertise-msk"
						onClick={(e) => {
							e.preventDefault();
							openExpertise("msk");
						}}
					>
						musculoskeletal
					</InlineNavLink>
					,{" "}
					<InlineNavLink
						href="#expertise-falls"
						onClick={(e) => {
							e.preventDefault();
							openExpertise("falls");
						}}
					>
						falls prevention
					</InlineNavLink>
					,{" "}
					<InlineNavLink
						href="#expertise-post-surgical"
						onClick={(e) => {
							e.preventDefault();
							openExpertise("post-surgical");
						}}
					>
						post-surgical
					</InlineNavLink>{" "}
					and{" "}
					<InlineNavLink
						href="#expertise-elderly"
						onClick={(e) => {
							e.preventDefault();
							openExpertise("elderly");
						}}
					>
						elderly care
					</InlineNavLink>
					. Tap an area of expertise below to learn more.
				</p>

				<div className="grid gap-4 md:grid-cols-2 md:gap-5 md:items-stretch">
					{services.cards.map((card, idx) => {
						const isExpanded = expandedCard === card.key;
						return (
							<Reveal key={card.key} delay={idx * 0.1} className="h-full">
								<div id={card.key} className="scroll-mt-28 h-full md:scroll-mt-32">
									<Card className="flex h-full flex-col p-4 md:p-5">
										<div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl">
											<Image
												src={card.image.src}
												alt={card.image.alt}
												fill
												className="object-cover shadow-soft"
												sizes="(max-width: 768px) 100vw, 50vw"
											/>
										</div>
										<div className="mt-4 flex flex-1 flex-col">
											<h2 className="text-lg font-semibold text-slate-900 md:text-xl">
												{card.title}
											</h2>
											<p className="mt-2 text-sm text-slate-700">{card.intro}</p>
											{isExpanded && (
												<div className="mt-3">
													<h3 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
														What to expect
													</h3>
													<ul className="space-y-1.5">
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
											<div className="mt-auto flex items-center justify-between gap-3 pt-4">
												<button
													onClick={() =>
														setExpandedCard(isExpanded ? null : card.key)
													}
													className="rounded text-sm font-semibold text-aa-blue underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aa-blue focus-visible:ring-offset-2"
												>
													{isExpanded ? "Show less" : "Learn more"}
												</button>
												<Link
													href={card.cta.href}
													className="whitespace-nowrap rounded-full bg-aa-blue px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-aa-aqua focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aa-blue focus-visible:ring-offset-2 md:text-sm"
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

			<Section
				density="compact"
				background="tint"
				id="expertise"
				className="scroll-mt-28 md:scroll-mt-32"
			>
				<SectionHeader title={services.expertise.heading} />
				<div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{services.expertise.items.map((item, idx) => {
						const Icon = expertiseIconMap[item.icon] || Activity;
						return (
							<Reveal key={item.id} delay={idx * 0.05}>
								<ExpertiseFlipCard
									id={item.id}
									title={item.title}
									detail={item.detail}
									icon={<Icon className="h-7 w-7" aria-hidden="true" />}
									flipped={flippedExpertise === item.id}
									onFlip={(id) => setFlippedExpertise(id)}
								/>
							</Reveal>
						);
					})}
				</div>
			</Section>

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

			<PricingSection />

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
