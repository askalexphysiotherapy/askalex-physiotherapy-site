"use client";

import { cn } from "@/lib/utils";

type ExpertiseFlipCardProps = {
	id: string;
	title: string;
	detail: string;
	icon: React.ReactNode;
	flipped: boolean;
	onFlip: (id: string | null) => void;
};

export function ExpertiseFlipCard({
	id,
	title,
	detail,
	icon,
	flipped,
	onFlip
}: ExpertiseFlipCardProps) {
	return (
		<div
			id={`expertise-${id}`}
			className="scroll-mt-28 h-full md:scroll-mt-32"
			style={{ perspective: "1000px" }}
		>
			<div
				className={cn(
					"relative h-full min-h-[12rem] w-full transition-transform duration-500 [transform-style:preserve-3d]",
					flipped && "[transform:rotateY(180deg)]"
				)}
			>
				{/* Front */}
				<div className="absolute inset-0 flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-soft [backface-visibility:hidden]">
					<div className="text-aa-blue">{icon}</div>
					<button
						type="button"
						onClick={() => onFlip(id)}
						className="mt-3 text-left text-base font-semibold text-slate-900 underline decoration-medical-blue/40 underline-offset-2 transition-colors hover:text-medical-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aa-blue focus-visible:ring-offset-2 rounded-sm"
					>
						{title}
					</button>
					<p className="mt-auto pt-3 text-xs text-slate-500">Tap title to learn more</p>
				</div>

				{/* Back */}
				<div className="absolute inset-0 flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-soft [backface-visibility:hidden] [transform:rotateY(180deg)]">
					<p className="flex-1 overflow-y-auto text-sm leading-relaxed text-slate-700 whitespace-pre-line">
						{detail}
					</p>
					<button
						type="button"
						onClick={() => onFlip(null)}
						className="mt-3 self-start text-sm font-semibold text-aa-blue underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aa-blue focus-visible:ring-offset-2"
					>
						Back
					</button>
				</div>
			</div>
		</div>
	);
}
