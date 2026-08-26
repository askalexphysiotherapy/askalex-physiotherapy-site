import { ThermometerSun, Accessibility, ShieldCheck, Award, CheckCircle, HeartPulse } from "lucide-react";
import { site } from "@/lib/content";
import { portraitCarouselImages } from "@/lib/portraitCarousel";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
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
				density="comfortable"
				background="tint"
				id="about-alex"
				className="scroll-mt-[var(--site-header-height)] md:min-h-[calc(100svh-var(--site-header-height))] md:flex md:flex-col md:justify-center"
			>
				<div className="mb-6 md:mb-8">
					<h1 className="text-2xl font-extrabold leading-tight tracking-tight text-medical-blue sm:text-3xl lg:text-4xl">
						{about.hero.heading}
					</h1>
				</div>
				<div className="grid gap-8 md:grid-cols-2 md:items-stretch md:gap-10">
					<Reveal delay={0.1}>
						<div className="relative md:order-1 md:flex md:h-full md:items-stretch">
							<ImageCarousel
								images={portraitCarouselImages}
								intervalMs={5000}
								overlay={about.hero.image.overlay}
								ariaLabel="Alex and practice photos"
								className="w-full md:h-full"
								aspectClassName="aspect-[3/4] md:aspect-auto md:min-h-[24rem] md:h-full"
							/>
						</div>
					</Reveal>
					<Reveal>
						<div className="space-y-6 text-slate-700 md:order-2 md:flex md:h-full md:flex-col md:justify-between">
							<div className="space-y-5">
								{about.hero.paragraphs.map((para, idx) => (
									<p key={idx}>{para}</p>
								))}
							</div>
							<div className="mt-6 flex flex-col gap-3">
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
			</Section>

			{about.hero.trustRow.length > 0 && (
				<Section density="compact" background="tint" container={false}>
					<Container>
						<TrustPills pills={about.hero.trustRow} />
					</Container>
				</Section>
			)}

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
				<div className="mt-8 grid gap-6 md:grid-cols-3">
					{about.values.map((value, idx) => {
						const Icon = iconMap[value.icon] || ShieldCheck;
						return (
							<Reveal key={idx} delay={idx * 0.1}>
								<Card className="h-full">
									<Icon className="h-8 w-8 text-medical-blue" aria-hidden="true" />
									<h3 className="mt-4 text-lg font-semibold text-slate-900">{value.title}</h3>
									<p className="mt-2 text-slate-700">{value.text}</p>
								</Card>
							</Reveal>
						);
					})}
				</div>
			</Section>

			<Section>
				<Reveal>
					<Card className="mx-auto max-w-3xl text-center">
						<blockquote className="text-xl font-medium italic text-slate-900">
							"{about.quote.text}"
						</blockquote>
					</Card>
				</Reveal>
			</Section>

			<Section
				density="comfortable"
				background="tint"
				id="reviews"
				className="scroll-mt-[var(--site-header-height)]"
			>
				<ReviewsCarousel heading={about.testimonialsHeading} />
			</Section>

			<Section>
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
