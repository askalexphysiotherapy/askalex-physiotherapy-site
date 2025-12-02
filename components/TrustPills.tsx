interface TrustPillsProps {
	pills: string[];
}

export function TrustPills({ pills }: TrustPillsProps) {
	// Duplicate pills for seamless infinite scroll on mobile
	const duplicatedPills = [...pills, ...pills];

	return (
		<div className="relative mt-6">
			{/* Mobile: horizontal scroll with animation */}
			<div
				className="flex gap-3 overflow-x-auto no-scrollbar py-2 animate-trust-scroll group md:hidden"
				style={{
					scrollbarWidth: "none",
					msOverflowStyle: "none"
				}}
			>
				{duplicatedPills.map((pill, idx) => (
					<div
						key={idx}
						className="shrink-0 rounded-full bg-white px-6 py-3 text-sm font-medium text-medical-blue shadow-sm whitespace-nowrap"
					>
						{pill}
					</div>
				))}
			</div>
			{/* Desktop: centered row with wrapping */}
			<div className="hidden md:flex md:flex-wrap md:justify-center md:gap-3 md:py-2">
				{pills.map((pill, idx) => (
					<div
						key={idx}
						className="rounded-full bg-white px-6 py-3 text-sm font-medium text-medical-blue shadow-sm"
					>
						{pill}
					</div>
				))}
			</div>
		</div>
	);
}

