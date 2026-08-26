import Link from "next/link";
import { cn } from "@/lib/utils";

const inlineLinkClass =
	"inline font-bold text-medical-blue underline decoration-medical-blue/40 underline-offset-2 transition-colors hover:text-soft-aqua hover:decoration-soft-aqua focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-medical-blue focus-visible:ring-offset-1 rounded-sm";

export function InlineNavLink({
	href,
	children,
	className
}: {
	href: string;
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<Link href={href} className={cn(inlineLinkClass, className)}>
			{children}
		</Link>
	);
}
