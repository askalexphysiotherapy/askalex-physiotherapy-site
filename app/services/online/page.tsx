import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { CTAButton } from "@/components/CTAButton";

export const metadata = {
	title: "Online Physiotherapy – Video Sessions",
	description:
		"Initial and follow-up video appointments. What you need, suitability, and pricing for online care."
};

export default function OnlinePage() {
	return (
		<>
			<Section className="bg-white">
				<Container>
					<SectionHeader
						title="Online physiotherapy"
						description="Convenient video sessions for education, self-management strategies, and exercise progressions."
						actions={<CTAButton href="/contact">Book now</CTAButton>}
					/>
					<div className="prose mt-8 max-w-3xl">
						<h3>What you need</h3>
						<ul>
							<li>Device with camera and microphone</li>
							<li>Stable internet connection</li>
							<li>A small clear space for movement</li>
						</ul>
						<h3>Best suited for</h3>
						<p>
							Education, check-ins, and exercise progressions. Complex assessments may still be
							best seen in person.
						</p>
						<h3>Pricing</h3>
						<ul>
							<li>Initial assessment: from £65</li>
							<li>Follow-up sessions: from £55</li>
						</ul>
					</div>
				</Container>
			</Section>
		</>
	);
}


