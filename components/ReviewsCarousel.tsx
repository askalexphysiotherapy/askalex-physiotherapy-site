"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Card } from "@/components/Card";
import type { GoogleReview } from "@/app/api/reviews/route";

type ReviewsResponse = {
	reviews: GoogleReview[];
	rating: number | null;
	total: number;
	profileUrl: string | null;
	live: boolean;
};

export function ReviewsCarousel({ heading }: { heading: string }) {
	const [data, setData] = useState<ReviewsResponse | null>(null);
	const [index, setIndex] = useState(0);

	useEffect(() => {
		let cancelled = false;
		fetch("/api/reviews")
			.then((res) => res.json())
			.then((json: ReviewsResponse) => {
				if (!cancelled) setData(json);
			})
			.catch(() => {
				if (!cancelled) setData({ reviews: [], rating: null, total: 0, profileUrl: null, live: false });
			});
		return () => {
			cancelled = true;
		};
	}, []);

	const count = data?.reviews.length ?? 0;

	const goTo = useCallback(
		(next: number) => {
			if (count === 0) return;
			setIndex(((next % count) + count) % count);
		},
		[count]
	);

	useEffect(() => {
		if (count < 2) return;
		const timer = window.setInterval(() => {
			setIndex((current) => (current + 1) % count);
		}, 7000);
		return () => window.clearInterval(timer);
	}, [count, index]);

	if (!data) {
		return (
			<div className="mx-auto max-w-3xl animate-pulse rounded-2xl border border-slate-200 bg-white/80 p-8">
				<div className="mx-auto h-4 w-40 rounded bg-slate-200" />
				<div className="mt-6 h-24 rounded bg-slate-100" />
			</div>
		);
	}

	if (count === 0) return null;

	const review = data.reviews[index];

	return (
		<div className="mx-auto max-w-3xl">
			<div className="mb-6 text-center">
				<h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
					{heading}
				</h2>
				{data.live && data.rating != null && (
					<p className="mt-2 text-sm text-slate-600">
						<span className="font-semibold text-slate-900">{data.rating.toFixed(1)}</span>{" "}
						average on Google
						{data.total ? ` · ${data.total} reviews` : ""}
					</p>
				)}
			</div>

			<div className="group relative">
				<Card className="min-h-[200px] px-6 py-8 md:px-10">
					<div className="flex items-center gap-1" aria-label={`${review.rating} out of 5 stars`}>
						{Array.from({ length: 5 }).map((_, i) => (
							<Star
								key={i}
								className={`h-4 w-4 ${
									i < review.rating ? "fill-amber-400 text-amber-400" : "text-slate-300"
								}`}
								aria-hidden="true"
							/>
						))}
					</div>
					<blockquote className="mt-4 text-base leading-relaxed text-slate-700 md:text-lg">
						“{review.text}”
					</blockquote>
					<p className="mt-6 text-sm font-medium text-slate-900">
						— {review.author}
						{review.relativeTime ? (
							<span className="font-normal text-slate-500"> · {review.relativeTime}</span>
						) : null}
					</p>
				</Card>

				{count > 1 && (
					<>
						<button
							type="button"
							aria-label="Previous review"
							onClick={() => goTo(index - 1)}
							className="absolute left-0 top-1/2 z-10 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 opacity-0 shadow-sm transition-opacity hover:bg-slate-50 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-medical-blue group-hover:opacity-100"
						>
							<ChevronLeft className="h-4 w-4" aria-hidden="true" />
						</button>
						<button
							type="button"
							aria-label="Next review"
							onClick={() => goTo(index + 1)}
							className="absolute right-0 top-1/2 z-10 flex h-9 w-9 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 opacity-0 shadow-sm transition-opacity hover:bg-slate-50 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-medical-blue group-hover:opacity-100"
						>
							<ChevronRight className="h-4 w-4" aria-hidden="true" />
						</button>
					</>
				)}
			</div>

			{count > 1 && (
				<div className="mt-4 flex justify-center gap-1.5">
					{data.reviews.map((_, i) => (
						<button
							key={i}
							type="button"
							aria-label={`Show review ${i + 1}`}
							aria-current={i === index}
							onClick={() => goTo(i)}
							className={`h-2 w-2 rounded-full transition-colors ${
								i === index ? "bg-medical-blue" : "bg-slate-300 hover:bg-slate-400"
							}`}
						/>
					))}
				</div>
			)}

			{data.profileUrl && (
				<p className="mt-5 text-center text-sm text-slate-600">
					<a
						href={data.profileUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="font-medium text-medical-blue underline-offset-2 hover:underline"
					>
						Read more on Google
					</a>
				</p>
			)}
		</div>
	);
}
