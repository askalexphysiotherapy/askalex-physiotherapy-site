import Link from "next/link";
import { cn } from "@/lib/utils";
import type { MouseEvent } from "react";

export function Chip({
	href,
	children,
	className,
	onClick
}: {
	href?: string;
	children: React.ReactNode;
	className?: string;
	onClick?: (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
}) {
	const baseClasses =
		"inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aa-blue focus-visible:ring-offset-2";

	const chipClass = cn(
		baseClasses,
		href || onClick
			? "bg-aa-bg text-aa-blue hover:bg-aa-aqua/20 cursor-pointer"
			: "bg-aa-bg text-slate-700",
		className
	);

	if (href) {
		return (
			<Link
				href={href}
				className={cn(chipClass, "focus-visible:outline-none")}
				onClick={onClick}
			>
				{children}
			</Link>
		);
	}

	if (onClick) {
		return (
			<button type="button" onClick={onClick} className={chipClass}>
				{children}
			</button>
		);
	}

	return <span className={chipClass}>{children}</span>;
}
