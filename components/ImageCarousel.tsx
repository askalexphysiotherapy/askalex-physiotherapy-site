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
	aspectClassName?: string;
	objectPositionClassName?: string;
	overlay?: { name: string; title: string };
	ariaLabel?: string;
};

export function ImageCarousel({
	images,
	intervalMs = 5000,
	className,
	aspectClassName = "aspect-[3/4]",
	objectPositionClassName = "object-[center_20%]",
	overlay,
	ariaLabel = "Photo gallery"
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
			aria-label={ariaLabel}
		>
			<div className={cn("relative w-full", aspectClassName)}>
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
							sizes="(max-width: 1024px) 100vw, 50vw"
							className={cn("object-cover", objectPositionClassName)}
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

			{overlay && (
				<div className="absolute left-4 bottom-4 z-10 rounded-lg bg-white/85 px-3 py-1 shadow-lg backdrop-blur">
					<p className="text-sm font-semibold leading-tight text-slate-900">{overlay.name}</p>
					<p className="text-xs text-slate-600">{overlay.title}</p>
				</div>
			)}

			<div
				className={cn(
					"absolute bottom-3 z-10 flex gap-1.5",
					overlay ? "left-1/2 -translate-x-1/2 sm:left-auto sm:right-4 sm:translate-x-0" : "left-1/2 -translate-x-1/2"
				)}
			>
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
