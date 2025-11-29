import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata = {
	title: "Terms of Service & Booking Policy",
	description:
		"Scope of service, eligibility, bookings, cancellations, fees, refunds, professional standards, liability limits, complaints, acceptable use, and cookies."
};

export default function TermsPage() {
	return (
		<Section className="bg-white">
			<Container>
				<SectionHeader title="Terms of Service & Booking Policy" />
				<div className="prose mt-8 max-w-3xl">
					<h3>Scope of service</h3>
					<p>Physiotherapy services only. Not suitable for emergencies—call 999 in an emergency.</p>
					<h3>Eligibility & safety</h3>
					<p>Please disclose relevant health information. We may advise alternative care if required.</p>
					<h3>Bookings & rescheduling</h3>
					<p>Appointments are by request. We aim to confirm times promptly and offer alternatives.</p>
					<h3>Cancellations & no-shows</h3>
					<p>24 hours’ notice requested to avoid a late fee.</p>
					<h3>Fees & payment</h3>
					<p>Fees vary by setting. Payment timing and method confirmed during booking.</p>
					<h3>Refunds</h3>
					<p>Refunds assessed case-by-case in line with UK consumer law.</p>
					<h3>Professional standards</h3>
					<p>Registered with HCPC; member of CSP. Practice aligns with professional guidance.</p>
					<h3>Liability limits</h3>
					<p>We are not liable for losses beyond statutory rights. Keep your environment safe.</p>
					<h3>Complaints</h3>
					<p>
						Please email concerns to hello@askalexphysiotherapy.com. We will respond and advise next steps.
					</p>
					<h3>Website acceptable use</h3>
					<p>No misuse, scraping, or disruptive activity. We may change content without notice.</p>
					<h3>Cookies</h3>
					<p>See the Privacy Policy for cookies and analytics information.</p>
				</div>
			</Container>
		</Section>
	);
}


