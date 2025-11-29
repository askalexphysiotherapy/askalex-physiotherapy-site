import Link from "next/link";
import { ReactNode } from "react";

export function CTAButton({
	href,
	children,
	variant = "primary"
}: {
	href: string;
	children: ReactNode;
	variant?: "primary" | "secondary";
}) {
	const base =
		"inline-flex items-center justify-center rounded-2xl px-5 py-3 text-base font-medium transition focus-visible:ring-2";
	const variants = {
		primary: `${base} bg-aa-green text-white hover:brightness-110`,
		secondary: `${base} border border-aa-blue text-aa-blue hover:bg-aa-blue/10`
	};
	return (
		<Link href={href} className={variants[variant]}>
			{children}
		</Link>
	);
}


