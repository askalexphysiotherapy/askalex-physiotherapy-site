import Link from "next/link";
import { cn } from "@/lib/utils";

export function Chip({
	href,
	children,
	className,
	onClick
}: {
	href?: string;
	children: React.ReactNode;
	className?: string;
	onClick?: () => void;
}) {
	const baseClasses =
		"inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aa-blue focus-visible:ring-offset-2";

	const content = (
		<span
			className={cn(
				baseClasses,
				href || onClick
					? "bg-aa-bg text-aa-blue hover:bg-aa-aqua/20 cursor-pointer"
					: "bg-aa-bg text-slate-700",
				className
			)}
		>
			{children}
		</span>
	);

	if (href) {
		return (
			<Link href={href} className="focus-visible:outline-none">
				{content}
			</Link>
		);
	}

	if (onClick) {
		return (
			<button onClick={onClick} className="focus-visible:outline-none">
				{content}
			</button>
		);
	}

	return content;
}

