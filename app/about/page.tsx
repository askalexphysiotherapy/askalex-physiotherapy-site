import { ThermometerSun, Accessibility, ShieldCheck, Award, CheckCircle, HeartPulse } from "lucide-react";
import { site } from "@/lib/content";
import { portraitCarouselImages } from "@/lib/portraitCarousel";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { TrustPills } from "@/components/TrustPills";
import { ImageCarousel } from "@/components/ImageCarousel";
import { ReviewsCarousel } from "@/components/ReviewsCarousel";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
	"thermometer-sun": ThermometerSun,
	accessibility: Accessibility,
	"shield-check": ShieldCheck,
	award: Award,
	"check-circle": CheckCircle,
	"heart-pulse": HeartPulse
};

export const metadata = {
	title: "About",
	description: site.about.hero.subheading
};

export default function AboutPage() {
	const { about } = site;

	return (
		<>
			<Section
				density="hero"
				background="tint"
				id="about-alex"
				className="scroll-mt-[var(--site-header-height)] !pb-0 md:min-h-[calc(100svh-var(--site-header-height))] md:flex md:flex-col md:justify-center"
			>
				<div className="mb-3 md:mb-4">
					<h1 className="text-xl font-extrabold leading-tight tracking-tight text-medical-blue sm:text-2xl lg:text-[1.75rem]">
						{about.hero.heading}
					</h1>
				</div>
				<div className="grid gap-6 md:grid-cols-2 md:items-stretch md:gap-8">
					<Reveal delay={0.1}>
						<div className="relative md:order-1">
							<ImageCarousel
								images={portraitCarouselImages}
								intervalMs={5000}
								overlay={about.hero.image.overlay}
								ariaLabel="Alex and practice photos"
								className="w-full"
								aspectClassName="aspect-[3/4] md:aspect-[4/5] md:max-h-[34rem]"
								objectPositionClassName="object-[center_12%]"
							/>
						</div>
					</Reveal>
					<Reveal>
						<div className="space-y-5 text-slate-700 md:order-2 md:flex md:h-full md:flex-col md:justify-between">
							<div className="space-y-4">
								{about.hero.paragraphs.map((para, idx) => (
									<p key={idx} className="text-sm leading-relaxed md:text-base">
										{para}
									</p>
								))}
							</div>
							<div className="flex flex-col gap-3">
								{about.hero.ctas.map((cta) => (
									<Button
										key={cta.href}
										href={cta.href}
										variant={cta.variant === "primary" ? "primary" : "secondary"}
										className="w-full"
									>
										{cta.label}
									</Button>
								))}
							</div>
						</div>
					</Reveal>
				</div>

				{about.hero.trustRow.length > 0 && (
					<div className="mt-4 border-t border-slate-200/70 pt-3 md:mt-5">
						<TrustPills pills={about.hero.trustRow} />
					</div>
				)}
			</Section>

			{about.comfortSafety && (
				<Section
					density="comfortable"
					background="default"
					id="comfort-safety"
					className="scroll-mt-[var(--site-header-height)]"
				>
					<Reveal>
						<div className="mx-auto max-w-3xl space-y-5">
							<h2 className="text-2xl font-semibold tracking-tight text-medical-blue md:text-3xl">
								{about.comfortSafety.heading}
							</h2>
							{about.comfortSafety.paragraphs.map((para, idx) => (
								<p key={idx} className="leading-relaxed text-slate-700">
									{para}
								</p>
							))}
						</div>
					</Reveal>
				</Section>
			)}

			<Section
				density="comfortable"
				background="tint"
				id="values"
				className="scroll-mt-[var(--site-header-height)]"
			>
				<SectionHeader title={about.heading} description={about.subheading} />
				<div className="mt-6 grid gap-4 sm:grid-cols-2">
					{about.values.map((value, idx) => {
						const Icon = iconMap[value.icon] || ShieldCheck;
						return (
							<Reveal key={idx} delay={idx * 0.1}>
								<Card className="h-full p-4 md:p-5">
									<Icon className="h-7 w-7 text-medical-blue" aria-hidden="true" />
									<h3 className="mt-3 text-base font-semibold text-slate-900">{value.title}</h3>
									<p className="mt-2 text-sm leading-relaxed text-slate-700">{value.text}</p>
								</Card>
							</Reveal>
						);
					})}
				</div>
			</Section>

			<Section
				density="comfortable"
				background="tint"
				id="reviews"
				className="scroll-mt-[var(--site-header-height)]"
			>
				<ReviewsCarousel heading={about.testimonialsHeading} />
			</Section>

			<Section density="compact">
				<div className="flex flex-wrap items-center justify-center gap-6">
					{about.credentials.map((cred, idx) => {
						const Icon = iconMap[cred.icon] || Award;
						return (
							<Reveal key={idx} delay={idx * 0.1}>
								<div className="flex items-center gap-2 text-slate-700">
									<Icon className="h-5 w-5 text-medical-blue" aria-hidden="true" />
									<span className="text-sm font-medium">{cred.label}</span>
								</div>
							</Reveal>
						);
					})}
				</div>
			</Section>
		</>
	);
}
