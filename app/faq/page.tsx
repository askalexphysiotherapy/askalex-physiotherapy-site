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

function scrollToFaqSection(hash: string) {
	const id = hash.replace(/^#/, "");
	const element = document.getElementById(id);
	if (!element) return;
	element.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function FAQPage() {
	const { faq } = site;
	const [isVisible, setIsVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		if (typeof window === "undefined") return;

		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};

		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	useEffect(() => {
		if (typeof window === "undefined" || !isMobile) {
			setIsVisible(true);
			return;
		}

		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			const scrollThreshold = 100;

			if (currentScrollY < scrollThreshold) {
				setIsVisible(true);
			} else {
				setIsVisible(currentScrollY < lastScrollY);
			}

			setLastScrollY(currentScrollY);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, [lastScrollY, isMobile]);

	useEffect(() => {
		if (typeof window === "undefined") return;
		const hash = window.location.hash;
		if (!hash) return;
		const timer = window.setTimeout(() => scrollToFaqSection(hash), 80);
		return () => window.clearTimeout(timer);
	}, []);

	return (
		<>
			<FAQJsonLd />
			<PageHero title={faq.title} subtitle={faq.intro} align="center" density="compact" />

			{/* Jump Navigation — sticky under thinned site header */}
			<section
				className={`z-40 border-b border-slate-200 bg-white py-1.5 transition-transform duration-200 ease-out md:sticky md:top-[var(--site-header-height)] md:py-2.5 ${
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
								onClick={(event) => {
									event.preventDefault();
									history.replaceState(null, "", item.href);
									scrollToFaqSection(item.href);
								}}
							>
								{item.label}
							</Chip>
						))}
					</div>
				</Container>
			</section>

			<Section density="comfortable" background="default">
				<div className="space-y-8">
					{faq.groups.map((group, groupIdx) => (
						<Reveal key={group.id} delay={groupIdx * 0.1}>
							{/* header + sticky FAQ chips ≈ 4.75rem + ~3rem */}
							<div id={group.id} className="scroll-mt-[7.5rem] md:scroll-mt-[8rem]">
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
