"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Menu } from "lucide-react";
import { NavLink } from "./NavLink";
import { Button } from "./Button";

type NavItem = { label: string; href: string };
type CTA = { label: string; href: string };

export function MobileNav({ items, cta }: { items: NavItem[]; cta: CTA }) {
	const [open, setOpen] = useState(false);
	const pathname = usePathname();

	// Lock body scroll when menu is open
	useEffect(() => {
		if (open) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);

	return (
		<nav className="md:hidden">
			<button
				aria-label="Open menu"
				aria-expanded={open}
				onClick={() => setOpen(true)}
				className="p-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-bg-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-medical-blue focus-visible:ring-offset-2"
			>
				<Menu className="h-4 w-4" aria-hidden="true" />
			</button>

			{open && (
				<div
					role="dialog"
					aria-modal="true"
					className="fixed inset-0 z-[100] bg-bg-blue/95 backdrop-blur-sm md:hidden"
					onClick={() => setOpen(false)}
				>
					<div
						className="flex flex-col h-full w-full bg-white"
						onClick={(e) => e.stopPropagation()}
					>
						{/* Top bar with Menu title and close button */}
						<div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
							<span className="text-lg font-semibold text-slate-900">Menu</span>
							<button
								type="button"
								aria-label="Close menu"
								onClick={() => setOpen(false)}
								className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-bg-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-medical-blue focus-visible:ring-offset-2 shadow-sm"
							>
								<X className="h-5 w-5" aria-hidden="true" />
							</button>
						</div>

						{/* Navigation links */}
						<nav className="flex-1 px-6 py-4 space-y-3 overflow-y-auto">
							{items.map((item) => {
								const active = pathname === item.href;
								return (
									<Link
										key={item.href}
										href={item.href}
										onClick={() => setOpen(false)}
										className={`block rounded-lg px-4 py-3 text-base font-medium transition-colors ${
											active
												? "bg-bg-blue text-medical-blue"
												: "text-slate-700 hover:bg-bg-blue/50"
										} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-medical-blue focus-visible:ring-offset-2`}
									>
										{item.label}
									</Link>
								);
							})}
						</nav>

						{/* Book Now button at bottom */}
						<div className="px-6 pb-6 pt-4 border-t border-slate-200">
							<Button
								href={cta.href}
								variant="primary"
								className="w-full"
							>
								{cta.label}
							</Button>
						</div>
					</div>
				</div>
			)}
		</nav>
	);
}
