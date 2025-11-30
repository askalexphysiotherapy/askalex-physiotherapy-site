"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, Instagram, Linkedin, Music2, MapPin } from "lucide-react";
import { site } from "@/lib/content";
import { MobileNav } from "./MobileNav";
import { NavLink } from "./NavLink";
import { Container } from "./Container";
import { Button } from "./Button";

const socialIconMap = {
	instagram: Instagram,
	tiktok: Music2,
	linkedin: Linkedin,
	google: MapPin
};

export function Header() {
	const { header, brand } = site;
	const socialLinks =
		site.social?.filter((social) => socialIconMap[social.platform]) ?? [];

	return (
		<header
			className={`border-b border-slate-200 bg-white/90 backdrop-blur ${
				header.behavior.sticky ? "sticky top-0 z-50" : ""
			}`}
		>
			{header.topbar.show && header.topbar.items.length > 0 && (
				<div className="border-b border-slate-100 bg-bg-blue">
					<Container className="flex flex-wrap items-center justify-between gap-3 py-2 text-xs text-slate-700 md:gap-4 md:py-2.5 md:text-sm">
						<div className="flex flex-wrap items-center gap-2.5 md:gap-3">
							{header.topbar.items.map((item, idx) => (
								<a
									key={idx}
									href={item.href}
									className="flex items-center gap-1.5 rounded transition-colors hover:text-medical-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-medical-blue focus-visible:ring-offset-2"
								>
									{item.type === "phone" ? (
										<Phone className="h-3.5 w-3.5 md:h-4 md:w-4" aria-hidden="true" />
									) : (
										<Mail className="h-3.5 w-3.5 md:h-4 md:w-4" aria-hidden="true" />
									)}
									{item.label}
								</a>
							))}
						</div>
						{socialLinks.length > 0 && (
							<div className="flex items-center gap-1.5 md:gap-2">
								{socialLinks.map((social) => {
									const Icon = socialIconMap[social.platform as keyof typeof socialIconMap];
									const href = social.href || `https://${social.platform}.com/placeholder`;

									return (
										<a
											key={social.platform}
											href={href}
											target="_blank"
											rel="noopener noreferrer"
											aria-label={`Visit our ${social.platform} page`}
											className="rounded-full bg-white/90 p-1 text-medical-blue shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-medical-blue focus-visible:ring-offset-2 md:p-1.5"
										>
											<Icon className="h-3.5 w-3.5 md:h-4 md:w-4" aria-hidden="true" />
										</a>
									);
								})}
							</div>
						)}
					</Container>
				</div>
			)}
			<Container className="flex h-14 items-center justify-between md:h-16">
				<Link
					href="/"
					className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-medical-blue focus-visible:ring-offset-2 rounded"
				>
					<Image
						src={brand.logo}
						width={140}
						height={40}
						alt={brand.name}
						className="h-8 w-auto md:h-10"
					/>
					<span className="sr-only">{brand.name}</span>
				</Link>
				<nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
					{header.nav.map((item) => (
						<NavLink key={item.href} href={item.href}>
							{item.label}
						</NavLink>
					))}
				</nav>
				<div className="hidden items-center gap-4 md:flex">
					<Button href={header.cta.href} variant="primary">
						{header.cta.label}
					</Button>
				</div>
				<div className="md:hidden">
					<MobileNav items={header.nav} cta={header.cta} />
				</div>
			</Container>
		</header>
	);
}
