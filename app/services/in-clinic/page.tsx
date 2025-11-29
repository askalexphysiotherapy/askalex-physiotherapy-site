import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { CTAButton } from "@/components/CTAButton";

export const metadata = {
	title: "In-Clinic Physiotherapy – North London",
	description:
		"Sessions in a rented facility with equipment access and privacy. Benefits, accessibility, and pricing."
};

export default function InClinicPage() {
	return (
		<>
			<Section className="bg-white">
				<Container>
					<SectionHeader
						title="In-clinic sessions"
						description="Focused sessions with equipment access and privacy at a rented facility."
						actions={<CTAButton href="/booking">Book now</CTAButton>}
					/>
					<div className="prose mt-8 max-w-3xl">
						<h3>Location</h3>
						<p>Rented clinic space (address placeholder). Directions provided on booking.</p>
						<h3>Benefits</h3>
						<ul>
							<li>Access to equipment for targeted exercises</li>
							<li>Private, quiet space for focused sessions</li>
						</ul>
						<h3>Accessibility</h3>
						<p>Please advise of access needs. We aim to ensure suitable arrangements.</p>
						<h3>Pricing</h3>
						<ul>
							<li>Initial assessment: from £85</li>
							<li>Follow-up sessions: from £70</li>
						</ul>
					</div>
				</Container>
			</Section>
		</>
	);
}


