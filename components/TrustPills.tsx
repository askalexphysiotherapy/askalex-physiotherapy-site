interface TrustPillsProps {
	pills: string[];
}

export function TrustPills({ pills }: TrustPillsProps) {
	return (
		<div className="mt-4">
			<div className="flex gap-3 overflow-x-auto no-scrollbar py-1 md:justify-center md:flex-wrap">
				{pills.map((pill, idx) => (
					<div
						key={idx}
						className="shrink-0 rounded-full bg-white px-4 py-2 text-xs sm:text-sm font-medium text-medical-blue shadow-sm"
					>
						{pill}
					</div>
				))}
			</div>
		</div>
	);
}

