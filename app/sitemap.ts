import type { MetadataRoute } from "next";
import { siteMeta } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
	const base = siteMeta.url;
	const now = new Date().toISOString();
	const routes = [
		"",
		"/services",
		"/services/home-visits",
		"/services/in-clinic",
		"/services/online",
		"/about",
		"/faqs",
		"/contact",
		"/terms",
		"/privacy"
	];
	return routes.map((path) => ({
		url: `${base}${path}`,
		lastModified: now,
		changeFrequency: "monthly",
		priority: path === "" ? 1 : 0.7
	}));
}

