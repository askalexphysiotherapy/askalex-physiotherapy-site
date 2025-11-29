import { site } from "@/lib/content";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";

export const metadata = {
	title: site.legal.terms.meta.ogTitle,
	description: site.legal.terms.meta.description
};

export default function TermsOfServicePage() {
	const { terms } = site.legal;

	return (
		<section className="bg-white py-12 md:py-20">
			<Container>
				<Reveal>
					<div className="mx-auto max-w-3xl">
						<h1 className="text-4xl font-semibold tracking-tight text-slate-900">{terms.title}</h1>
						<p className="mt-4 text-sm text-slate-600">
							Last updated: {new Date(terms.lastUpdated).toLocaleDateString("en-GB", {
								year: "numeric",
								month: "long",
								day: "numeric"
							})}
						</p>
						<div className="mt-8 prose prose-slate max-w-none">
							{terms.sections.map((section, idx) => (
								<div key={idx} className="mb-8">
									<h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">
										{section.heading}
									</h2>
									{section.body && <p className="text-slate-700 mb-4">{section.body}</p>}
									{section.list && (
										<ul className="list-disc pl-6 space-y-2 text-slate-700">
											{section.list.map((item, itemIdx) => (
												<li key={itemIdx}>{item}</li>
											))}
										</ul>
									)}
								</div>
							))}
						</div>
					</div>
				</Reveal>
			</Container>
		</section>
	);
}

