"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { site } from "@/lib/content";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Accordion } from "@/components/Accordion";
import { Chip } from "@/components/Chip";
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
	const [isVisible, setIsVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);
	const [isMobile, setIsMobile] = useState(false);

	// Detect mobile on mount and resize
	useEffect(() => {
		if (typeof window === "undefined") return;

		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768); // md breakpoint
		};

		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	// Scroll detection - only active on mobile
	useEffect(() => {
		if (typeof window === "undefined" || !isMobile) {
			// On desktop, always visible
			setIsVisible(true);
			return;
		}

		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			const scrollThreshold = 100; // Show nav when near top

			// Always show when near top of page
			if (currentScrollY < scrollThreshold) {
				setIsVisible(true);
			} else {
				// Hide when scrolling down, show when scrolling up
				setIsVisible(currentScrollY < lastScrollY);
			}

			setLastScrollY(currentScrollY);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, [lastScrollY, isMobile]);

	return (
		<>
			<FAQJsonLd />
			<PageHero
				title={faq.title}
				subtitle={faq.intro}
				align="center"
				density="compact"
			/>

			{/* Jump Navigation */}
			<section
				className={`bg-white py-1.5 md:py-4 border-b border-slate-200 z-40 transition-transform duration-200 ease-out md:sticky md:top-16 ${
					isVisible ? "translate-y-0" : "-translate-y-full md:translate-y-0"
				}`}
			>
				<Container>
					<div className="flex flex-wrap items-center justify-center gap-1.5 md:gap-3">
						{faq.nav.map((item, idx) => (
							<Chip
								key={idx}
								href={item.href}
								className="px-2.5 py-1 text-xs md:px-4 md:py-2 md:text-sm"
							>
								{item.label}
							</Chip>
						))}
					</div>
				</Container>
			</section>

			{/* FAQ Groups */}
			<Section density="comfortable" background="default">
					<div className="space-y-8">
						{faq.groups.map((group, groupIdx) => (
							<Reveal key={group.id} delay={groupIdx * 0.1}>
								<div id={group.id} className="scroll-mt-24">
									<h2 className="mb-6 text-2xl font-semibold text-slate-900">{group.title}</h2>
									<div className="space-y-4">
										{group.items.map((item, itemIdx) => (
											<Accordion
												key={itemIdx}
												question={item.q}
												answer={item.a}
												links={item.links}
											/>
										))}
									</div>
								</div>
							</Reveal>
						))}
					</div>
			</Section>

			{/* CTA Section */}
			<Section density="comfortable" background="tint">
					<Reveal>
						<div className="text-center">
							<p className="text-lg text-slate-700">{faq.cta.label}</p>
							<div className="mt-6">
								<Link
									href={faq.cta.href}
									className="rounded-full bg-aa-blue px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-aa-aqua focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aa-blue focus-visible:ring-offset-2"
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
