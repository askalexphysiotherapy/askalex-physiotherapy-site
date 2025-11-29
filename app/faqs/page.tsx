import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata = {
	title: "FAQs – Ask Alex Physiotherapy",
	description:
		"Frequently asked questions about sessions, referrals, set-up, fees, cancellations, insurance, data privacy, service area, and accessibility."
};

const FAQS = [
	{
		q: "What happens in the first session?",
		a: "We discuss your goals, review history, and assess movement and function to build a plan."
	},
	{ q: "Do I need a GP referral?", a: "No, self-referral is welcome." },
	{ q: "What should I wear?", a: "Comfortable clothing that allows free movement and sturdy footwear." },
	{
		q: "Which conditions do you treat?",
		a: "Stroke, Parkinson’s, MS, balance/falls prevention, post-op rehab, and general MSK/pain."
	},
	{
		q: "How do home visits work?",
		a: "We come to you. Please clear a small safe area; a chair or step may be helpful."
	},
	{
		q: "Is online physiotherapy suitable?",
		a: "Great for education, reviews, and exercise progressions. Complex cases may need in-person."
	},
	{ q: "What about fees and payment?", a: "Fees vary by setting. Payment details confirmed at booking." },
	{ q: "What is your cancellation policy?", a: "24 hours’ notice is requested to avoid a late fee." },
	{
		q: "Do you accept insurance?",
		a: "Self-pay only at present. Insurance options may be added in future."
	},
	{ q: "How is my data handled?", a: "We follow UK GDPR. See the Privacy Policy for details." },
	{ q: "Which areas do you cover?", a: "Finchley/Barnet and nearby North London areas." },
	{ q: "Is the service accessible?", a: "Please share access needs; we aim to accommodate wherever possible." }
];

export default function FaqsPage() {
	return (
		<>
			<Section className="bg-white">
				<Container>
					<SectionHeader title="Frequently asked questions" />
					<div className="mt-8 grid gap-4">
						{FAQS.map((f) => (
							<div key={f.q} className="card p-4">
								<p className="font-medium">{f.q}</p>
								<p className="text-slate-700">{f.a}</p>
							</div>
						))}
					</div>
				</Container>
			</Section>
		</>
	);
}


