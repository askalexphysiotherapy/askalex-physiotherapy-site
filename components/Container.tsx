import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({
	children,
	className
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"mx-auto w-full max-w-content px-[var(--page-gutter)]",
				className
			)}
		>
			{children}
		</div>
	);
}
