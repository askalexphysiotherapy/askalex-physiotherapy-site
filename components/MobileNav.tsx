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
					className="fixed inset-0 top-0 left-0 right-0 bottom-0 z-[100] bg-bg-blue flex flex-col md:hidden"
					onClick={() => setOpen(false)}
				>
					<div
						className="flex flex-col h-full w-full bg-white overflow-y-auto"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="flex items-center justify-between p-6 border-b border-slate-200">
							<h2 className="text-lg font-semibold text-slate-900">Menu</h2>
							<button
								aria-label="Close menu"
								onClick={() => setOpen(false)}
								className="p-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-bg-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-medical-blue focus-visible:ring-offset-2"
							>
								<X className="h-4 w-4" aria-hidden="true" />
							</button>
						</div>

						<div className="flex-1 px-6 py-6">
							<ul className="space-y-2">
								{items.map((item) => {
									const active = pathname === item.href;
									return (
										<li key={item.href}>
											<Link
												href={item.href}
												onClick={() => setOpen(false)}
												className={`block rounded-lg px-4 py-3 text-base transition-colors ${
													active
														? "bg-bg-blue font-medium text-medical-blue"
														: "text-slate-700 hover:bg-bg-blue/50"
												} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-medical-blue focus-visible:ring-offset-2`}
											>
												{item.label}
											</Link>
										</li>
									);
								})}
							</ul>
							<div className="mt-8 pt-6 border-t border-slate-200" onClick={() => setOpen(false)}>
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
				</div>
			)}
		</nav>
	);
}
