import { NextResponse } from "next/server";
import { site } from "@/lib/content";

export type GoogleReview = {
	author: string;
	rating: number;
	text: string;
	relativeTime?: string;
	source: "google" | "fallback";
};

export async function GET() {
	const apiKey = process.env.GOOGLE_PLACES_API_KEY;
	const placeId = process.env.GOOGLE_PLACE_ID;

	if (apiKey && placeId) {
		try {
			const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
			url.searchParams.set("place_id", placeId);
			url.searchParams.set("fields", "name,rating,user_ratings_total,url,reviews");
			url.searchParams.set("reviews_sort", "newest");
			url.searchParams.set("key", apiKey);

			const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
			const data = await res.json();

			if (data.status === "OK" && Array.isArray(data.result?.reviews)) {
				const reviews: GoogleReview[] = data.result.reviews
					.filter((r: { text?: string }) => Boolean(r.text?.trim()))
					.map(
						(r: {
							author_name?: string;
							rating?: number;
							text?: string;
							relative_time_description?: string;
						}) => ({
							author: r.author_name || "Google reviewer",
							rating: r.rating ?? 5,
							text: r.text || "",
							relativeTime: r.relative_time_description,
							source: "google" as const
						})
					);

				return NextResponse.json({
					reviews,
					rating: data.result.rating ?? null,
					total: data.result.user_ratings_total ?? reviews.length,
					profileUrl:
						data.result.url ||
						site.social.find((s) => s.platform === "google")?.href ||
						null,
					live: true
				});
			}
		} catch {
			// fall through to static testimonials
		}
	}

	const fallback: GoogleReview[] = site.about.testimonials.map((t) => ({
		author: t.author,
		rating: 5,
		text: t.quote,
		source: "fallback" as const
	}));

	return NextResponse.json({
		reviews: fallback,
		rating: null,
		total: fallback.length,
		profileUrl: site.social.find((s) => s.platform === "google")?.href || null,
		live: false
	});
}
