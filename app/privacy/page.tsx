import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata = {
	title: "Privacy Policy (UK/EU GDPR)",
	description:
		"How Ask Alex Physiotherapy handles your personal and health data: purposes, lawful bases, retention, rights, security, processors, transfers, cookies, analytics, and ICO contact."
};

export default function PrivacyPage() {
	return (
		<Section className="bg-white">
			<Container>
				<SectionHeader title="Privacy Policy (UK/EU GDPR)" />
				<div className="prose mt-8 max-w-3xl">
					<p>
						Controller: Ask Alex Physiotherapy. Contact:{" "}
						<a href="mailto:hello@askalexphysiotherapy.com">hello@askalexphysiotherapy.com</a>.
					</p>
					<h3>Data collected</h3>
					<p>Contact details and relevant health information during care.</p>
					<h3>Purposes & lawful bases</h3>
					<ul>
						<li>Consent (e.g., contact requests)</li>
						<li>Contract (providing requested services)</li>
						<li>Legitimate interests (service administration)</li>
						<li>Provision of healthcare (special category data)</li>
					</ul>
					<h3>Retention</h3>
					<p>Records kept in line with professional and legal guidance, then securely deleted.</p>
					<h3>Your rights</h3>
					<p>
						Access, rectify, erase, restrict, port, and object. Contact us to exercise rights. You
						can also contact the ICO.
					</p>
					<h3>Security</h3>
					<p>We use reasonable technical and organisational measures to protect your data.</p>
					<h3>Processors & transfers</h3>
					<p>
						We may use email/form providers to process requests. International transfers may occur;
						appropriate safeguards apply.
					</p>
					<h3>Cookies & analytics</h3>
					<p>We may use essential cookies and privacy-friendly analytics. Details will be updated.</p>
					<h3>Contact</h3>
					<p>
						Email <a href="mailto:hello@askalexphysiotherapy.com">hello@askalexphysiotherapy.com</a>{" "}
						for privacy queries.
					</p>
				</div>
			</Container>
		</Section>
	);
}


