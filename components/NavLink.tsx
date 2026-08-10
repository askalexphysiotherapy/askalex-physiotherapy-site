"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function NavLink({
	href,
	children,
	className
}: {
	href: string;
	children: ReactNode;
	className?: string;
}) {
	const pathname = usePathname();
	const active = pathname === href || (href !== "/" && pathname.startsWith(href));
	return (
		<Link
			href={href}
			className={cn(
				"text-sm transition hover:text-aa-blue",
				active ? "font-medium text-aa-blue" : "text-slate-700",
				className
			)}
			aria-current={active ? "page" : undefined}
		>
			{children}
		</Link>
	);
}
