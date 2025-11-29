import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeader({
	title,
	eyebrow,
	description,
	actions,
	className
}: {
	title: string;
	eyebrow?: string;
	description?: string;
	actions?: ReactNode;
	className?: string;
}) {
	return (
		<div className={cn("mx-auto max-w-3xl text-center", className)}>
			{eyebrow ? (
				<p className="text-medical-blue font-medium text-sm md:text-base">{eyebrow}</p>
			) : null}
			<h2 className="mt-2 text-2xl font-semibold tracking-tight text-medical-blue md:text-3xl">
				{title}
			</h2>
			{description ? (
				<p className="mt-4 text-lg text-slate-700 leading-relaxed">{description}</p>
			) : null}
			{actions ? (
				<div className="mt-6 flex flex-wrap items-center justify-center gap-3">{actions}</div>
			) : null}
		</div>
	);
}


