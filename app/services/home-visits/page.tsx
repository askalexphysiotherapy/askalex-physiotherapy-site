import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { CTAButton } from "@/components/CTAButton";

export const metadata = {
	title: "Home Visits – Mobile Physiotherapy in North London",
	description:
		"Physiotherapy at home across Finchley/Barnet. Who it's for, what to expect, set-up tips, and transparent pricing."
};

export default function HomeVisitsPage() {
	return (
		<>
			<Section className="bg-white">
				<Container>
					<SectionHeader
						title="Home visits"
						description="Convenient physiotherapy in your own space. Ideal for mobility, confidence in daily tasks, and practical rehab."
						actions={<CTAButton href="/contact">Book now</CTAButton>}
					/>
					<div className="prose mt-8 max-w-3xl">
						<h3>Who it’s for</h3>
						<p>
							Clients who prefer not to travel, early post-op, falls/balance concerns, or those
							wanting real-world practice in their home environment.
						</p>
						<h3>What to expect</h3>
						<p>
							A friendly assessment, movement and balance checks, and a tailored plan. We’ll
							agree goals, review progress, and adjust exercises as needed.
						</p>
						<h3>Equipment and set-up</h3>
						<p>
							Just a safe, clear area—comfortable clothing and sturdy footwear help. Simple
							items like a chair, step, or resistance band may be used.
						</p>
						<h3>Service area</h3>
						<p>Finchley/Barnet and nearby North London areas. Travel supplements may apply.</p>
						<h3>Pricing</h3>
						<ul>
							<li>Initial assessment: from £95</li>
							<li>Follow-up sessions: from £80</li>
							<li>Travel supplement: if outside core area</li>
						</ul>
						<p className="text-sm text-slate-600">
							Final quotes confirmed during booking. Concessions may be available.
						</p>
					</div>
				</Container>
			</Section>
		</>
	);
}


