import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, HelpCircle, Home, Building2, Laptop } from "lucide-react";
import { site } from "@/lib/content";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";

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
			{/* Hero Section */}
			<Section density="comfortable" background="tint" id="hero">
				<div className="grid gap-4 max-sm:gap-3 lg:gap-10 lg:grid-cols-2 lg:items-stretch">
					<Reveal>
						<div className="max-w-2xl space-y-4 lg:space-y-6 lg:flex lg:h-full lg:flex-col lg:justify-between">
							<div className="space-y-4 lg:space-y-5">
								<h1 className="text-3xl md:text-4xl lg:text-[2.7rem] leading-tight font-extrabold tracking-tight text-[#007B9E]">
									{home.hero.title}
								</h1>
								<p className="text-sm md:text-base leading-relaxed text-slate-700">
									{home.hero.subtitle}
								</p>
								<p className="mt-3 text-sm leading-relaxed text-slate-700 md:mt-4 md:text-base">
									Not sure where to start?{" "}
									<span className="font-semibold text-[#4CAF50]">
										Book a free 15-minute consultation
									</span>{" "}
									and I'll help you choose the right treatment path for you.
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
						<div className="relative max-w-xl max-sm:-mt-2 lg:mt-0 lg:ml-auto lg:h-full lg:flex lg:items-stretch">
							<div className="relative w-full h-auto lg:h-full">
								<Image
									src={home.hero.image.src}
									alt={home.hero.image.alt}
									width={600}
									height={800}
									className="h-auto w-full rounded-3xl shadow-soft object-cover lg:h-full"
									priority
								/>
								{home.hero.image.overlay && (
									<div className="absolute left-4 bottom-4 rounded-lg bg-white/85 px-3 py-1 shadow-lg backdrop-blur">
										<p className="text-sm font-semibold leading-tight text-slate-900">
											{home.hero.image.overlay.name}
										</p>
										<p className="text-xs text-slate-600">
											{home.hero.image.overlay.title}
										</p>
									</div>
								)}
							</div>
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
				<div className="mt-10 grid gap-6 md:grid-cols-3 md:gap-8">
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
