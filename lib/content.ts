import { z } from "zod";
import siteData from "@/content/site.json";

// Zod schema matching the site.json structure
const BrandColorsSchema = z.object({
	green: z.string(),
	blue: z.string(),
	aqua: z.string(),
	bg: z.string()
});

const BrandSchema = z.object({
	name: z.string(),
	logo: z.string().url(),
	email: z.string().email(),
	phone: z.string(),
	areaServed: z.string(),
	colors: BrandColorsSchema
});

const TopbarItemSchema = z.object({
	type: z.enum(["phone", "email"]),
	label: z.string(),
	href: z.string()
});

const HeaderSchema = z.object({
	topbar: z.object({
		show: z.boolean(),
		items: z.array(TopbarItemSchema)
	}),
	nav: z.array(
		z.object({
			label: z.string(),
			href: z.string()
		})
	),
	cta: z.object({
		label: z.string(),
		href: z.string()
	}),
	behavior: z.object({
		sticky: z.boolean(),
		mobileMenu: z.enum(["burger"])
	})
});

const SocialSchema = z.array(
	z.object({
		platform: z.enum(["instagram", "linkedin", "tiktok", "google"]),
		href: z.string().url()
	})
);

const BusinessSchema = z.object({
	type: z.string(),
	name: z.string(),
	telephone: z.string(),
	email: z.string().email(),
	image: z.string().url(),
	url: z.string().url(),
	address: z.object({
		addressLocality: z.string(),
		addressRegion: z.string(),
		addressCountry: z.string()
	}),
	openingHours: z.object({
		days: z.array(z.string()),
		opens: z.string(),
		closes: z.string()
	}),
	priceRange: z.string()
});

const ImageSchema = z.object({
	src: z.string().url(),
	alt: z.string(),
	overlay: z
		.object({
			name: z.string(),
			title: z.string()
		})
		.optional()
});

const HomeHeroSchema = z.object({
	title: z.string(),
	subtitle: z.string(),
	inlineLinks: z.array(
		z.object({
			label: z.string(),
			href: z.string()
		})
	),
	primaryCta: z.object({
		label: z.string(),
		href: z.string()
	}),
	secondaryCta: z.object({
		label: z.string(),
		href: z.string()
	}),
	mission: z.string(),
	image: ImageSchema
});

const LearnCardSchema = z.object({
	title: z.string(),
	text: z.string(),
	href: z.string(),
	cta: z.string(),
	icon: z.string()
});

const ServicesTeaserCardSchema = z.object({
	title: z.string(),
	text: z.string(),
	href: z.string(),
	icon: z.string()
});

const HomeSchema = z.object({
	hero: HomeHeroSchema,
	learn: z.array(LearnCardSchema),
	servicesTeaser: z.object({
		heading: z.string(),
		cards: z.array(ServicesTeaserCardSchema),
		cta: z.object({
			label: z.string(),
			href: z.string()
		})
	})
});

const AboutHeroSchema = z.object({
	heading: z.string(),
	subheading: z.string(),
	paragraphs: z.array(z.string()),
	image: ImageSchema,
	ctas: z.array(
		z.object({
			label: z.string(),
			href: z.string(),
			variant: z.enum(["primary", "ghost"])
		})
	),
	trustRow: z.array(z.string())
});

const ValueSchema = z.object({
	icon: z.string(),
	title: z.string(),
	text: z.string()
});

const TestimonialSchema = z.object({
	quote: z.string(),
	author: z.string()
});

const CredentialSchema = z.object({
	icon: z.string(),
	label: z.string()
});

const AboutSchema = z.object({
	hero: AboutHeroSchema,
	heading: z.string(),
	subheading: z.string(),
	values: z.array(ValueSchema),
	quote: z.object({
		text: z.string()
	}),
	testimonialsHeading: z.string(),
	testimonials: z.array(TestimonialSchema),
	credentials: z.array(CredentialSchema)
});

const ServiceCardSchema = z.object({
	key: z.enum(["home", "clinic", "online"]),
	title: z.string(),
	intro: z.string(),
	details: z.array(z.string()),
	image: z.object({
		src: z.string().url(),
		alt: z.string()
	}),
	cta: z.object({
		label: z.string(),
		href: z.string()
	})
});

const CompareRowSchema = z.object({
	feature: z.string(),
	home: z.string(),
	clinic: z.string(),
	online: z.string()
});

const ExpertiseItemSchema = z.object({
	icon: z.string(),
	title: z.string(),
	text: z.string()
});

const ServicesSchema = z.object({
	title: z.string(),
	subtitle: z.string(),
	cards: z.array(ServiceCardSchema),
	primaryCtaStrip: z.object({
		cta: z.object({
			label: z.string(),
			href: z.string()
		}),
		helper: z.string(),
		helperHref: z.string()
	}),
	compare: z.object({
		intro: z.string(),
		columns: z.array(z.string()),
		rows: z.array(CompareRowSchema)
	}),
	expertise: z.object({
		heading: z.string(),
		items: z.array(ExpertiseItemSchema)
	}),
	seo: z.object({
		blurb: z.string()
	})
});

const FAQNavItemSchema = z.object({
	label: z.string(),
	href: z.string()
});

const FAQItemSchema = z.object({
	q: z.string(),
	a: z.string(),
	links: z
		.array(
			z.object({
				label: z.string(),
				href: z.string()
			})
		)
		.optional()
});

const FAQGroupSchema = z.object({
	id: z.string(),
	title: z.string(),
	items: z.array(FAQItemSchema)
});

const FAQStructuredDataSchema = z.object({
	q: z.string(),
	a: z.string()
});

const FAQSchema = z.object({
	title: z.string(),
	intro: z.string(),
	nav: z.array(FAQNavItemSchema),
	groups: z.array(FAQGroupSchema),
	cta: z.object({
		label: z.string(),
		href: z.string()
	}),
	structuredData: z.array(FAQStructuredDataSchema)
});

const ContactFieldSchema = z.object({
	type: z.enum(["text", "email", "tel", "select", "textarea", "radio-group"]),
	name: z.string(),
	label: z.string(),
	required: z.boolean().optional(),
	placeholder: z.string().optional(),
	pattern: z.string().optional(),
	autocomplete: z.string().optional(),
	options: z.array(z.string()).optional(),
	default: z.string().optional(),
	showWhen: z
		.object({
			field: z.string(),
			equals: z.string()
		})
		.optional()
});

const ContactSchema = z.object({
	title: z.string(),
	lead: z.string(),
	route: z.string(),
	actions: z.object({
		submitLabel: z.string()
	}),
	successRedirect: z.string(),
	altContact: z.object({
		email: z.string().email(),
		phone: z.string(),
		blurb: z.string()
	}),
	consent: z.object({
		label: z.string(),
		privacyText: z.string(),
		privacyHref: z.string(),
		required: z.boolean()
	}),
	prefillFromQuery: z
		.object({
			param: z.string(),
			map: z.record(z.string())
		})
		.optional(),
	fields: z.array(ContactFieldSchema),
	tracking: z.object({
		includeSourceUrl: z.boolean(),
		utm: z.array(z.string())
	})
});

const FooterColumnItemSchema = z.object({
	type: z.enum(["text", "link"]),
	label: z.string(),
	href: z.string().optional()
});

const FooterColumnSchema = z.object({
	title: z.string(),
	items: z.array(FooterColumnItemSchema)
});

const FooterBottomSchema = z.object({
	copyright: z.object({
		org: z.string(),
		year: z.number(),
		auto: z.boolean()
	}),
	credentials: z.array(
		z.object({
			icon: z.string(),
			text: z.string()
		})
	),
	legalLinks: z.array(
		z.object({
			label: z.string(),
			href: z.string()
		})
	)
});

const FooterSchema = z.object({
	brand: z.object({
		logo: z.string().url(),
		blurb: z.string()
	}),
	social: z.array(
		z.object({
			platform: z.enum(["instagram", "linkedin", "tiktok", "google"]),
			label: z.string(),
			href: z.string().url()
		})
	),
	columns: z.array(FooterColumnSchema),
	bottom: FooterBottomSchema
});

const FloatingCTASchema = z.object({
	showOnMobile: z.boolean(),
	href: z.string(),
	label: z.string()
});

const LegalSectionSchema = z.object({
	heading: z.string(),
	body: z.string().optional(),
	list: z.array(z.string()).optional()
});

const LegalMetaSchema = z.object({
	description: z.string(),
	ogTitle: z.string()
});

const LegalDocumentSchema = z.object({
	title: z.string(),
	slug: z.string(),
	lastUpdated: z.string(),
	sections: z.array(LegalSectionSchema),
	meta: LegalMetaSchema,
	summary: z.string().optional()
});

const LegalSchema = z.object({
	terms: LegalDocumentSchema,
	privacy: LegalDocumentSchema
});

const PricingItemSchema = z.object({
	slug: z.string(),
	name: z.string(),
	description: z.string(),
	duration: z.string(),
	price: z.string(),
	highlight: z.string().nullable(),
	badge: z.string().nullable()
});

const PricingCategorySchema = z.object({
	title: z.string(),
	subtitle: z.string(),
	items: z.array(PricingItemSchema)
});

const PricingSchema = z.object({
	physiotherapy: PricingCategorySchema,
	classes: PricingCategorySchema,
	notes: z.array(z.string())
});

const SiteSchema = z.object({
	brand: BrandSchema,
	header: HeaderSchema,
	social: SocialSchema,
	business: BusinessSchema,
	home: HomeSchema,
	about: AboutSchema,
	services: ServicesSchema,
	faq: FAQSchema,
	contact: ContactSchema,
	footer: FooterSchema,
	floatingCta: FloatingCTASchema,
	legal: LegalSchema,
	pricing: PricingSchema
});

// Validate and parse the site data
export const site = SiteSchema.parse(siteData);

// Export types
export type Site = z.infer<typeof SiteSchema>;
export type Brand = z.infer<typeof BrandSchema>;
export type Header = z.infer<typeof HeaderSchema>;
export type Home = z.infer<typeof HomeSchema>;
export type About = z.infer<typeof AboutSchema>;
export type Services = z.infer<typeof ServicesSchema>;
export type FAQ = z.infer<typeof FAQSchema>;
export type Contact = z.infer<typeof ContactSchema>;
export type Footer = z.infer<typeof FooterSchema>;
export type Legal = z.infer<typeof LegalSchema>;
export type Pricing = z.infer<typeof PricingSchema>;

