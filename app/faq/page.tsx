import Link from "next/link";
import { site } from "@/lib/content";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Accordion } from "@/components/Accordion";
import { Chip } from "@/components/Chip";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";

export const metadata = {
	title: "FAQ",
	description: site.faq.intro
};

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
				title={faq.title}
				subtitle={faq.intro}
				align="center"
				density="compact"
			/>

			{/* Jump Navigation */}
			<section className="bg-white py-4 sticky top-16 z-40 border-b border-slate-200">
				<Container>
					<div className="flex flex-wrap items-center justify-center gap-3">
						{faq.nav.map((item, idx) => (
							<Chip key={idx} href={item.href}>
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

