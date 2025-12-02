import Image from "next/image";
import { ThermometerSun, Accessibility, ShieldCheck, Award, CheckCircle, HeartPulse } from "lucide-react";
import { site } from "@/lib/content";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/Button";
import { TrustPills } from "@/components/TrustPills";

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
			<PageHero title={about.hero.heading} subtitle={about.hero.subheading} align="left" density="comfortable">
				<div className="grid gap-10 md:grid-cols-2 md:items-stretch">
					<Reveal delay={0.1}>
						<div className="relative md:order-1 md:h-full md:flex md:items-stretch">
							<div className="relative w-full h-auto md:h-full">
								<Image
									src={about.hero.image.src}
									alt={about.hero.image.alt}
									width={600}
									height={800}
									className="h-auto w-full rounded-3xl object-cover shadow-soft md:h-full"
									priority
								/>
								{about.hero.image.overlay && (
									<div className="absolute left-4 bottom-4 rounded-lg bg-white/85 px-3 py-1 shadow-lg backdrop-blur">
										<p className="text-sm font-semibold leading-tight text-slate-900">
											{about.hero.image.overlay.name}
										</p>
										<p className="text-xs text-slate-600">{about.hero.image.overlay.title}</p>
									</div>
								)}
							</div>
						</div>
					</Reveal>
					<Reveal>
						<div className="space-y-6 text-slate-700 md:order-2 md:flex md:h-full md:flex-col md:justify-between">
							<div className="space-y-5">
								{about.hero.paragraphs.map((para, idx) => (
									<p key={idx}>{para}</p>
								))}
							</div>
							<div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
								{about.hero.ctas.map((cta) => (
									<Button
										key={cta.href}
										href={cta.href}
										variant={cta.variant === "primary" ? "primary" : "secondary"}
										className="flex-1"
									>
										{cta.label}
									</Button>
								))}
							</div>
						</div>
					</Reveal>
				</div>
			</PageHero>

			{/* Trust Chips Row */}
			{about.hero.trustRow.length > 0 && (
				<Section density="compact" background="tint" container={false}>
					<Container>
						<TrustPills pills={about.hero.trustRow} />
					</Container>
				</Section>
			)}

			<Section density="comfortable" background="tint">
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
						<blockquote className="text-xl font-medium text-slate-900 italic">
							"{about.quote.text}"
						</blockquote>
					</Card>
				</Reveal>
			</Section>

			<Section density="comfortable" background="tint">
				<SectionHeader title={about.testimonialsHeading} />
				<div className="mt-8 grid gap-6 md:grid-cols-3">
					{about.testimonials.map((testimonial, idx) => (
						<Reveal key={idx} delay={idx * 0.1}>
							<Card className="flex h-full min-h-[180px] flex-col justify-between">
								<blockquote className="text-slate-700">
									<p>"{testimonial.quote}"</p>
								</blockquote>
								<p className="mt-4 text-sm font-medium text-slate-900">— {testimonial.author}</p>
							</Card>
						</Reveal>
					))}
				</div>
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
