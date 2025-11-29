"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export function NavLink({ href, children }: { href: string; children: ReactNode }) {
	const pathname = usePathname();
	const active = pathname === href;
	return (
		<Link
			href={href}
			className={`text-sm transition hover:text-aa-blue ${active ? "text-aa-blue font-medium" : "text-slate-700"}`}
			aria-current={active ? "page" : undefined}
		>
			{children}
		</Link>
	);
}


