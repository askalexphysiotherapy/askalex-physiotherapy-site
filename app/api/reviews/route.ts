import { NextResponse } from "next/server";
import { site } from "@/lib/content";

export type GoogleReview = {
	author: string;
	rating: number;
	text: string;
	relativeTime?: string;
	source: "google" | "fallback";
};

function reviewsProfileUrl(placeId?: string, apiMapsUrl?: string | null) {
	const configured = process.env.GOOGLE_BUSINESS_PROFILE_URL?.trim();
	if (configured) return configured;
	// Customer-facing reviews list for the Business Profile (web)
	if (placeId) return `https://search.google.com/local/reviews?placeid=${placeId}`;
	if (apiMapsUrl) return apiMapsUrl;
	return site.social.find((s) => s.platform === "google")?.href || null;
}

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
					profileUrl: reviewsProfileUrl(placeId, data.result.url ?? null),
					live: true
				});
			}

			return NextResponse.json(
				{
					reviews: [],
					rating: null,
					total: 0,
					profileUrl: reviewsProfileUrl(placeId, null),
					live: false,
					error: data.status || "places_error"
				},
				{ status: 200 }
			);
		} catch {
			// fall through
		}
	}

	// No API credentials — do not invent star ratings as “Google reviews”
	return NextResponse.json({
		reviews: [],
		rating: null,
		total: 0,
		profileUrl: reviewsProfileUrl(placeId, null),
		live: false,
		needsSetup: !(apiKey && placeId)
	});
}
