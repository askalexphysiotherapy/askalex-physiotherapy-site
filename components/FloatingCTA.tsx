"use client";

import Link from "next/link";
import { site } from "@/lib/content";

export function FloatingCTA() {
	const { floatingCta } = site;

	if (!floatingCta.showOnMobile) {
		return null;
	}

	return (
		<div className="fixed bottom-6 right-6 z-40 md:hidden">
			<Link
				href={floatingCta.href}
				className="flex items-center gap-2 rounded-full bg-aa-blue px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-aa-aqua hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aa-blue focus-visible:ring-offset-2"
			>
				{floatingCta.label}
			</Link>
		</div>
	);
}

