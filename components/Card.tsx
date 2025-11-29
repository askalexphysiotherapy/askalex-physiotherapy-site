import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Card({
	children,
	className,
	hover = false
}: {
	children: ReactNode;
	className?: string;
	hover?: boolean;
}) {
	return (
		<div
			className={cn(
				"rounded-2xl shadow-soft bg-white p-6 transition-all duration-200",
				hover && "hover:shadow-soft-hover hover:-translate-y-0.5",
				className
			)}
		>
			{children}
		</div>
	);
}
