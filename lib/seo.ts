export const siteMeta = {
	name: "Ask Alex Physiotherapy",
	url: "https://www.askalexphysiotherapy.com",
	email: "hello@askalexphysiotherapy.com",
	priceRange: "££",
	area: "Finchley / Barnet, North London"
};

export function absoluteUrl(path = "/") {
	try {
		const base = new URL(siteMeta.url);
		return new URL(path, base).toString();
	} catch {
		return path;
	}
}

export const clinicJsonLd = {
	"@context": "https://schema.org",
	"@type": ["MedicalClinic", "LocalBusiness"],
	name: siteMeta.name,
	email: siteMeta.email,
	priceRange: siteMeta.priceRange,
	url: siteMeta.url,
	address: {
		"@type": "PostalAddress",
		addressLocality: "Finchley/Barnet",
		addressRegion: "London",
		addressCountry: "UK"
	},
	areaServed: "Finchley, Barnet and nearby North London areas",
	telephone: "N/A",
	image: ["/logo-wide.svg"],
	sameAs: []
};

