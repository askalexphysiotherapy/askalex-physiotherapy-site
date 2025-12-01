"use client";

import { useState } from "react";
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
					className="fixed inset-0 z-[100] bg-bg-blue/95 backdrop-blur-sm"
					onClick={() => setOpen(false)}
				>
					<div
						className="ml-auto h-full w-72 bg-white p-6 shadow-xl overflow-y-auto"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="flex items-center justify-between mb-6">
							<h2 className="text-lg font-semibold text-slate-900">Menu</h2>
							<button
								aria-label="Close menu"
								onClick={() => setOpen(false)}
								className="p-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-bg-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-medical-blue focus-visible:ring-offset-2"
							>
								<X className="h-4 w-4" aria-hidden="true" />
							</button>
						</div>

						<ul className="space-y-2">
							{items.map((item) => {
								const active = pathname === item.href;
								return (
									<li key={item.href}>
										<Link
											href={item.href}
											onClick={() => setOpen(false)}
											className={`block rounded-lg px-3 py-3 text-sm transition-colors ${
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
						<div className="mt-6 pt-6 border-t border-slate-200" onClick={() => setOpen(false)}>
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
