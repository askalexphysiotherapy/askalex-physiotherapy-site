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
	needsSetup?: boolean;
	error?: string;
};

function useVisibleCount() {
	const [visible, setVisible] = useState(3);

	useEffect(() => {
		const update = () => {
			if (window.innerWidth < 640) setVisible(1);
			else if (window.innerWidth < 1024) setVisible(2);
			else setVisible(3);
		};
		update();
		window.addEventListener("resize", update);
		return () => window.removeEventListener("resize", update);
	}, []);

	return visible;
}

function Stars({ rating }: { rating: number }) {
	return (
		<div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
			{Array.from({ length: 5 }).map((_, i) => (
				<Star
					key={i}
					className={`h-4 w-4 ${
						i < Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-slate-300"
					}`}
					aria-hidden="true"
				/>
			))}
		</div>
	);
}

function ReviewCard({ review }: { review: GoogleReview }) {
	return (
		<Card className="flex h-full min-h-[220px] flex-col px-5 py-6">
			<Stars rating={review.rating} />
			<blockquote className="mt-3 flex-1 text-sm leading-relaxed text-slate-700 md:text-base">
				“{review.text}”
			</blockquote>
			<p className="mt-4 text-sm font-medium text-slate-900">
				— {review.author}
				{review.relativeTime ? (
					<span className="font-normal text-slate-500"> · {review.relativeTime}</span>
				) : null}
			</p>
		</Card>
	);
}

export function ReviewsCarousel({ heading }: { heading: string }) {
	const [data, setData] = useState<ReviewsResponse | null>(null);
	const [index, setIndex] = useState(0);
	const visibleCount = useVisibleCount();

	useEffect(() => {
		let cancelled = false;
		fetch("/api/reviews")
			.then((res) => res.json())
			.then((json: ReviewsResponse) => {
				if (!cancelled) setData(json);
			})
			.catch(() => {
				if (!cancelled) {
					setData({
						reviews: [],
						rating: null,
						total: 0,
						profileUrl: null,
						live: false,
						needsSetup: true
					});
				}
			});
		return () => {
			cancelled = true;
		};
	}, []);

	const reviews = data?.reviews ?? [];
	const count = reviews.length;

	const goTo = useCallback(
		(next: number) => {
			if (count === 0) return;
			setIndex(((next % count) + count) % count);
		},
		[count]
	);

	useEffect(() => {
		if (count <= visibleCount) return;
		const timer = window.setInterval(() => {
			setIndex((current) => (current + 1) % count);
		}, 7000);
		return () => window.clearInterval(timer);
	}, [count, visibleCount, index]);

	if (!data) {
		return (
			<div className="mx-auto max-w-6xl animate-pulse">
				<div className="mx-auto h-4 w-48 rounded bg-slate-200" />
				<div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{Array.from({ length: 3 }).map((_, i) => (
						<div key={i} className="h-52 rounded-2xl bg-slate-100" />
					))}
				</div>
			</div>
		);
	}

	if (count === 0) {
		return (
			<div className="mx-auto max-w-2xl text-center">
				<h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
					{heading}
				</h2>
				<p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">
					{data.needsSetup
						? "Connect Google Places (API key + Place ID) to show live starred reviews from your Google Business Profile here."
						: "Google reviews could not be loaded right now."}
				</p>
				{data.profileUrl && (
					<p className="mt-4">
						<a
							href={data.profileUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="font-medium text-medical-blue underline-offset-2 hover:underline"
						>
							Read reviews on Google
						</a>
					</p>
				)}
			</div>
		);
	}

	const windowSize = Math.min(visibleCount, count);
	const visibleReviews = Array.from({ length: windowSize }, (_, i) => reviews[(index + i) % count]);
	const canCycle = count > windowSize;

	return (
		<div className="mx-auto max-w-6xl">
			<div className="mb-6 text-center">
				<h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
					{heading}
				</h2>
				{data.live && data.rating != null && (
					<p className="mt-2 flex flex-wrap items-center justify-center gap-2 text-sm text-slate-600">
						<Stars rating={data.rating} />
						<span>
							<span className="font-semibold text-slate-900">{data.rating.toFixed(1)}</span>{" "}
							average on Google
							{data.total ? ` · ${data.total} reviews` : ""}
						</span>
					</p>
				)}
			</div>

			<div className="group relative">
				<div
					className={`grid gap-4 ${
						windowSize === 1
							? "grid-cols-1"
							: windowSize === 2
								? "sm:grid-cols-2"
								: "sm:grid-cols-2 lg:grid-cols-3"
					}`}
				>
					{visibleReviews.map((review, i) => (
						<ReviewCard key={`${review.author}-${index}-${i}`} review={review} />
					))}
				</div>

				{canCycle && (
					<>
						<button
							type="button"
							aria-label="Previous reviews"
							onClick={() => goTo(index - 1)}
							className="absolute left-0 top-1/2 z-10 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 opacity-0 shadow-sm transition-opacity hover:bg-slate-50 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-medical-blue group-hover:opacity-100"
						>
							<ChevronLeft className="h-4 w-4" aria-hidden="true" />
						</button>
						<button
							type="button"
							aria-label="Next reviews"
							onClick={() => goTo(index + 1)}
							className="absolute right-0 top-1/2 z-10 flex h-9 w-9 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 opacity-0 shadow-sm transition-opacity hover:bg-slate-50 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-medical-blue group-hover:opacity-100"
						>
							<ChevronRight className="h-4 w-4" aria-hidden="true" />
						</button>
					</>
				)}
			</div>

			{canCycle && (
				<div className="mt-4 flex justify-center gap-1.5">
					{reviews.map((_, i) => (
						<button
							key={i}
							type="button"
							aria-label={`Show reviews starting at ${i + 1}`}
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
