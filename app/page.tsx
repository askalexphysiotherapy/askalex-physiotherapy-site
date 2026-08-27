import Link from "next/link";
import { ShieldCheck, HelpCircle, Home, Building2, Laptop } from "lucide-react";
import { site } from "@/lib/content";
import { portraitCarouselImages } from "@/lib/portraitCarousel";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { ImageCarousel } from "@/components/ImageCarousel";
import { InlineNavLink } from "@/components/InlineNavLink";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
	"shield-check": ShieldCheck,
	"question-circle": HelpCircle,
	house: Home,
	clinic: Building2,
	"laptop-call": Laptop
};

export default function HomePage() {
	const { home } = site;

	return (
		<>
			{/* Hero Section — fills remaining viewport on desktop/tablet */}
			<Section
				density="hero"
				background="tint"
				id="hero"
				className="md:flex md:min-h-[calc(100svh-var(--site-header-height))] md:flex-col md:justify-center"
			>
				<div className="grid gap-4 max-sm:gap-3 lg:gap-8 lg:grid-cols-2 lg:items-stretch">
					<Reveal>
						<div className="max-w-2xl space-y-4 lg:space-y-5 lg:flex lg:h-full lg:flex-col lg:justify-between">
							<div className="space-y-3 lg:space-y-4">
								<h1 className="text-3xl md:text-4xl lg:text-[2.7rem] leading-tight font-extrabold tracking-tight text-[#007B9E]">
									{home.hero.title}
								</h1>
								<p className="text-sm md:text-base leading-relaxed text-slate-700">
									Alex is a qualified, private mobile physiotherapist based in North London, he
									provides professional home visits and creates tailored programmes designed for
									your individual goals. He specialises in elderly care,{" "}
									<InlineNavLink href="/services#expertise-neurological">
										neurological
									</InlineNavLink>
									,{" "}
									<InlineNavLink href="/services#expertise-respiratory">respiratory</InlineNavLink>{" "}
									and{" "}
									<InlineNavLink href="/services#expertise-msk">
										musculoskeletal (MSK)
									</InlineNavLink>{" "}
									physiotherapy.
								</p>
								{home.hero.description && (
									<p className="text-sm md:text-base leading-relaxed text-slate-700">
										Compassion and patient-centred care is at the heart of Alex's practice. He
										believes in bringing movement and rehabilitation in a familiar environment,
										making recovery{" "}
										<InlineNavLink href="/services#pricing">affordable</InlineNavLink> and more
										convenient in the comfort of your own home.
									</p>
								)}
								<p className="mt-3 text-sm leading-relaxed text-slate-700 md:mt-4 md:text-base">
									Not sure where to start?{" "}
									<span className="font-semibold text-[#4CAF50]">
										Book a free 10-minute consultation
									</span>{" "}
									with Alex and he'll help you choose the right treatment path for you - with no
									obligation to book.
								</p>
							</div>
							<div className="space-y-2 max-sm:space-y-2 lg:space-y-4">
								<div className="flex flex-row gap-3 mb-6 max-sm:mb-6 lg:mb-6">
									<div className="flex-1">
										<Button 
											href={home.hero.primaryCta.href} 
											variant="primary"
											className="w-full"
										>
											<span className="whitespace-nowrap">Book Now</span>
										</Button>
									</div>
									<div className="flex-1">
										<Button 
											href={home.hero.secondaryCta.href} 
											variant="secondary"
											className="w-full"
										>
											Our Services
										</Button>
									</div>
								</div>
								{home.hero.mission && (
									<p className="text-base md:text-lg font-semibold leading-relaxed text-[#007B9E] text-center sm:text-left max-sm:mt-0 max-sm:mb-0">
										{home.hero.mission}
									</p>
								)}
							</div>
						</div>
					</Reveal>
					<Reveal delay={0.2}>
						<div className="relative max-w-xl max-sm:-mt-2 lg:mt-0 lg:ml-auto">
							<ImageCarousel
								images={portraitCarouselImages}
								intervalMs={5000}
								overlay={home.hero.image.overlay}
								ariaLabel="Alex and practice photos"
								className="w-full"
								aspectClassName="aspect-[3/4] lg:aspect-[4/5] lg:max-h-[34rem]"
								objectPositionClassName="object-[center_12%]"
							/>
						</div>
					</Reveal>
				</div>
			</Section>

			{/* Learn Cards */}
			<Section density="comfortable" background="tint">
				<div className="grid gap-6 md:grid-cols-2 md:gap-8">
					{home.learn.map((card, idx) => {
						const Icon = iconMap[card.icon] || HelpCircle;
						return (
							<Reveal key={idx} delay={idx * 0.1}>
								<Card hover className="h-full">
									<Icon className="h-8 w-8 text-medical-blue" aria-hidden="true" />
									<h3 className="mt-4 text-xl font-semibold text-medical-blue">{card.title}</h3>
									<p className="mt-2 text-slate-700 leading-relaxed">{card.text}</p>
									<Link
										href={card.href}
										className="mt-4 inline-block text-medical-blue font-medium underline hover:text-soft-aqua transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-medical-blue focus-visible:ring-offset-2 rounded"
									>
										{card.cta} →
									</Link>
								</Card>
							</Reveal>
						);
					})}
				</div>
			</Section>

			{/* Services Teaser */}
			<Section density="comfortable" background="default">
				<SectionHeader
					title={home.servicesTeaser.heading}
					actions={
						<Link
							href={home.servicesTeaser.cta.href}
							className="text-medical-blue font-medium underline hover:text-soft-aqua transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-medical-blue focus-visible:ring-offset-2 rounded"
						>
							{home.servicesTeaser.cta.label} →
						</Link>
					}
				/>
				<div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8">
					{home.servicesTeaser.cards.map((card, idx) => {
						const Icon = iconMap[card.icon] || Home;
						return (
							<Reveal key={idx} delay={idx * 0.1}>
								<Card hover className="flex h-full flex-col">
									<Icon className="h-8 w-8 text-medical-blue" aria-hidden="true" />
									<h3 className="mt-4 text-lg font-semibold text-medical-blue">{card.title}</h3>
									<p className="mt-2 flex-1 text-slate-700 leading-relaxed">{card.text}</p>
									<Link
										href={card.href}
										className="mt-4 inline-flex items-center text-medical-blue font-semibold transition-colors hover:text-soft-aqua"
									>
										Learn more →
									</Link>
								</Card>
							</Reveal>
						);
					})}
				</div>
			</Section>
		</>
	);
}
