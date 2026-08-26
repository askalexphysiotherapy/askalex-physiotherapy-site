import { NextResponse } from "next/server";
import { site } from "@/lib/content";

export type GoogleReview = {
	author: string;
	rating: number;
	text: string;
	relativeTime?: string;
	source: "google" | "fallback";
};

type PlacesResult = {
	ok: true;
	reviews: GoogleReview[];
	rating: number | null;
	total: number;
	mapsUrl: string | null;
} | {
	ok: false;
	error: string;
	detail?: string;
};

function reviewsProfileUrl(placeId?: string, apiMapsUrl?: string | null) {
	const configured = process.env.GOOGLE_BUSINESS_PROFILE_URL?.trim();
	if (configured) return configured;
	if (placeId) return `https://search.google.com/local/reviews?placeid=${placeId}`;
	if (apiMapsUrl) return apiMapsUrl;
	return site.social.find((s) => s.platform === "google")?.href || null;
}

async function fetchLegacyPlaceDetails(apiKey: string, placeId: string): Promise<PlacesResult> {
	const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
	url.searchParams.set("place_id", placeId);
	url.searchParams.set("fields", "name,rating,user_ratings_total,url,reviews");
	url.searchParams.set("reviews_sort", "newest");
	url.searchParams.set("key", apiKey);

	const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
	const data = await res.json();

	if (data.status === "OK") {
		const reviews: GoogleReview[] = Array.isArray(data.result?.reviews)
			? data.result.reviews
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
					)
			: [];

		return {
			ok: true,
			reviews,
			rating: data.result?.rating ?? null,
			total: data.result?.user_ratings_total ?? reviews.length,
			mapsUrl: data.result?.url ?? null
		};
	}

	return {
		ok: false,
		error: data.status || "places_error",
		detail: typeof data.error_message === "string" ? data.error_message : undefined
	};
}

async function fetchNewPlaceDetails(apiKey: string, placeId: string): Promise<PlacesResult> {
	const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, {
		headers: {
			"X-Goog-Api-Key": apiKey,
			"X-Goog-FieldMask":
				"id,displayName,rating,userRatingCount,googleMapsUri,reviews"
		},
		next: { revalidate: 3600 }
	});

	const data = await res.json();

	if (!res.ok) {
		return {
			ok: false,
			error: data.error?.status || `http_${res.status}`,
			detail: typeof data.error?.message === "string" ? data.error.message : undefined
		};
	}

	const reviews: GoogleReview[] = Array.isArray(data.reviews)
		? data.reviews
				.filter((r: { text?: { text?: string } }) => Boolean(r.text?.text?.trim()))
				.map(
					(r: {
						authorAttribution?: { displayName?: string };
						rating?: number;
						text?: { text?: string };
						relativePublishTimeDescription?: string;
					}) => ({
						author: r.authorAttribution?.displayName || "Google reviewer",
						rating: r.rating ?? 5,
						text: r.text?.text || "",
						relativeTime: r.relativePublishTimeDescription,
						source: "google" as const
					})
				)
		: [];

	return {
		ok: true,
		reviews,
		rating: typeof data.rating === "number" ? data.rating : null,
		total: typeof data.userRatingCount === "number" ? data.userRatingCount : reviews.length,
		mapsUrl: typeof data.googleMapsUri === "string" ? data.googleMapsUri : null
	};
}

export async function GET() {
	const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim();
	const placeId = process.env.GOOGLE_PLACE_ID?.trim();

	if (apiKey && placeId) {
		try {
			let result = await fetchLegacyPlaceDetails(apiKey, placeId);

			// Legacy Places often fails when only Places API (New) is enabled,
			// or when the key is set up for the new endpoints.
			if (!result.ok) {
				const newer = await fetchNewPlaceDetails(apiKey, placeId);
				if (newer.ok) result = newer;
			}

			if (result.ok) {
				return NextResponse.json({
					reviews: result.reviews,
					rating: result.rating,
					total: result.total,
					profileUrl: reviewsProfileUrl(placeId, result.mapsUrl),
					live: result.reviews.length > 0
				});
			}

			return NextResponse.json({
				reviews: [],
				rating: null,
				total: 0,
				profileUrl: reviewsProfileUrl(placeId, null),
				live: false,
				error: result.error,
				errorDetail: result.detail
			});
		} catch {
			return NextResponse.json({
				reviews: [],
				rating: null,
				total: 0,
				profileUrl: reviewsProfileUrl(placeId, null),
				live: false,
				error: "fetch_failed"
			});
		}
	}

	return NextResponse.json({
		reviews: [],
		rating: null,
		total: 0,
		profileUrl: reviewsProfileUrl(placeId, null),
		live: false,
		needsSetup: true
	});
}
