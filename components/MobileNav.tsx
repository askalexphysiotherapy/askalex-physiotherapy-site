"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Menu, ChevronDown } from "lucide-react";
import { createPortal } from "react-dom";
import { Button } from "./Button";

type NavItem = { label: string; href: string };
type CTA = { label: string; href: string };
type SectionItem = { label: string; id: string };

function SectionDropdown({
	item,
	sections,
	pathname,
	active
}: {
	item: NavItem;
	sections: SectionItem[];
	pathname: string;
	active: boolean;
}) {
	const [open, setOpen] = useState(false);
	const base = item.href;

	return (
		<div className="space-y-1">
			<button
				type="button"
				aria-expanded={open}
				onClick={() => setOpen((prev) => !prev)}
				className={`flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-base font-medium transition-colors ${
					active || pathname.startsWith(base)
						? "bg-bg-blue text-medical-blue"
						: "text-slate-700 hover:bg-bg-blue/50"
				}`}
			>
				<span>{item.label}</span>
				<ChevronDown
					className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
					aria-hidden="true"
				/>
			</button>
			{open && (
				<div className="ml-2 space-y-1 border-l border-slate-200 pl-3">
					<Link
						href={item.href}
						className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-bg-blue/50 hover:text-medical-blue"
					>
						Overview
					</Link>
					{sections.map((section) => (
						<Link
							key={section.id}
							href={`${base}#${section.id}`}
							className="block rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-bg-blue/50 hover:text-medical-blue"
						>
							{section.label}
						</Link>
					))}
				</div>
			)}
		</div>
	);
}

export function MobileNav({
	items,
	cta,
	servicesSections = [],
	aboutSections = []
}: {
	items: NavItem[];
	cta: CTA;
	servicesSections?: SectionItem[];
	aboutSections?: SectionItem[];
}) {
	const [open, setOpen] = useState(false);
	const [mounted, setMounted] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (!mounted) return;

		if (open) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}

		return () => {
			document.body.style.overflow = "";
		};
	}, [open, mounted]);

	useEffect(() => {
		setOpen(false);
	}, [pathname]);

	const overlay = open ? (
		<div
			role="dialog"
			aria-modal="true"
			className="fixed inset-0 z-[100] overflow-y-auto bg-white md:hidden"
			onClick={() => setOpen(false)}
		>
			<div className="flex h-full w-full flex-col" onClick={(e) => e.stopPropagation()}>
				<div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
					<span className="text-lg font-semibold text-slate-900">Menu</span>
					<button
						aria-label="Close menu"
						onClick={() => setOpen(false)}
						className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-bg-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-medical-blue focus-visible:ring-offset-2"
					>
						<X className="h-5 w-5" aria-hidden="true" />
					</button>
				</div>

				<nav className="flex-1 space-y-2 px-6 py-4">
					{items.map((item) => {
						const active = pathname === item.href;
						if (item.href === "/services" && servicesSections.length > 0) {
							return (
								<SectionDropdown
									key={item.href}
									item={item}
									sections={servicesSections}
									pathname={pathname}
									active={active}
								/>
							);
						}
						if (item.href === "/about" && aboutSections.length > 0) {
							return (
								<SectionDropdown
									key={item.href}
									item={item}
									sections={aboutSections}
									pathname={pathname}
									active={active}
								/>
							);
						}

						return (
							<Link
								key={item.href}
								href={item.href}
								className={`block rounded-lg px-4 py-3 text-base font-medium transition-colors ${
									active
										? "bg-bg-blue text-medical-blue"
										: "text-slate-700 hover:bg-bg-blue/50"
								}`}
							>
								{item.label}
							</Link>
						);
					})}
				</nav>

				<div className="border-t border-slate-200 px-6 pb-8 pt-4">
					<Button href={cta.href} variant="primary" className="w-full">
						{cta.label}
					</Button>
				</div>
			</div>
		</div>
	) : null;

	return (
		<nav className="md:hidden">
			<button
				aria-label="Open menu"
				aria-expanded={open}
				onClick={() => setOpen(true)}
				className="rounded-lg border border-slate-200 p-1.5 text-slate-700 hover:bg-bg-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-medical-blue focus-visible:ring-offset-2"
			>
				<Menu className="h-4 w-4" aria-hidden="true" />
			</button>
			{mounted && overlay ? createPortal(overlay, document.body) : null}
		</nav>
	);
}
