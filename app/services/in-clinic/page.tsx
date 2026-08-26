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
						actions={<CTAButton href="/contact">Book now</CTAButton>}
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
						<p>
							When an in-clinic session is arranged, fees and durations match the home visit rates
							unless otherwise agreed: initial £90 (75 minutes); follow-up £80 (60 minutes). See{" "}
							<a href="/services#pricing">Services pricing</a> for the full list, including online
							consultations.
						</p>
					</div>
				</Container>
			</Section>
		</>
	);
}


