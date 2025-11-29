import { siteMeta } from "@/lib/seo";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/"
		},
		host: siteMeta.url,
		sitemap: `${siteMeta.url}/sitemap.xml`
	};
}

