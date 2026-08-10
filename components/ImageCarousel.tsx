"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type CarouselImage = {
	src: string;
	alt: string;
};

type ImageCarouselProps = {
	images: CarouselImage[];
	intervalMs?: number;
	className?: string;
};

export function ImageCarousel({
	images,
	intervalMs = 5000,
	className
}: ImageCarouselProps) {
	const [index, setIndex] = useState(0);
	const count = images.length;

	const goTo = useCallback(
		(next: number) => {
			if (count === 0) return;
			setIndex(((next % count) + count) % count);
		},
		[count]
	);

	const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);
	const goNext = useCallback(() => goTo(index + 1), [goTo, index]);

	useEffect(() => {
		if (count < 2) return;
		const timer = window.setInterval(() => {
			setIndex((current) => (current + 1) % count);
		}, intervalMs);
		return () => window.clearInterval(timer);
	}, [count, intervalMs, index]);

	if (count === 0) return null;

	const current = images[index];

	return (
		<div
			className={cn(
				"group relative overflow-hidden rounded-3xl bg-slate-100 shadow-soft",
				className
			)}
			role="region"
			aria-roledescription="carousel"
			aria-label="Practice photos"
		>
			<div className="relative aspect-[4/5] w-full sm:aspect-[16/10]">
				{images.map((image, i) => (
					<div
						key={image.src}
						className={cn(
							"absolute inset-0 transition-opacity duration-500",
							i === index ? "opacity-100" : "pointer-events-none opacity-0"
						)}
						aria-hidden={i !== index}
					>
						<Image
							src={image.src}
							alt={image.alt}
							fill
							priority={i === 0}
							sizes="(max-width: 768px) 100vw, 900px"
							className="object-cover"
						/>
					</div>
				))}
			</div>

			<button
				type="button"
				onClick={goPrev}
				aria-label="Previous image"
				className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-800 opacity-0 shadow-md transition-opacity hover:bg-white focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aa-blue group-hover:opacity-100"
			>
				<ChevronLeft className="h-5 w-5" aria-hidden="true" />
			</button>

			<button
				type="button"
				onClick={goNext}
				aria-label="Next image"
				className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-800 opacity-0 shadow-md transition-opacity hover:bg-white focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aa-blue group-hover:opacity-100"
			>
				<ChevronRight className="h-5 w-5" aria-hidden="true" />
			</button>

			<div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
				{images.map((image, i) => (
					<button
						key={image.src}
						type="button"
						aria-label={`Show image ${i + 1}`}
						aria-current={i === index}
						onClick={() => goTo(i)}
						className={cn(
							"h-2 w-2 rounded-full transition-colors",
							i === index ? "bg-white" : "bg-white/50 hover:bg-white/80"
						)}
					/>
				))}
			</div>

			<span className="sr-only">
				Image {index + 1} of {count}: {current.alt}
			</span>
		</div>
	);
}
