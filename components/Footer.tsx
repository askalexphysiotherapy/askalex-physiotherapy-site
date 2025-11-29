import Image from "next/image";
import Link from "next/link";
import { Instagram, Linkedin, Music2, MapPin } from "lucide-react";
import { site } from "@/lib/content";
import { Container } from "./Container";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
	instagram: Instagram,
	linkedin: Linkedin,
	tiktok: Music2,
	google: MapPin
};

export function Footer() {
	const { footer, brand } = site;
	const currentYear = footer.bottom.copyright.auto
		? new Date().getFullYear()
		: footer.bottom.copyright.year;

	return (
		<footer className="border-t border-slate-200 bg-bg-blue/40" role="contentinfo">
			<Container className="py-12 lg:py-16">
				{/* Top footer columns */}
				<div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
					{/* Brand column */}
					<div className="space-y-4">
						<Image
							src={footer.brand.logo}
							width={180}
							height={48}
							alt={brand.name}
							className="h-auto w-auto"
						/>
						<p className="max-w-xs text-sm leading-relaxed text-slate-600">
							{footer.brand.blurb}
						</p>
					</div>

					{/* Dynamic footer columns (e.g., Contact, Explore) */}
					{footer.columns.map((column, colIdx) => (
						<div key={colIdx} className="space-y-4">
							<h3 className="text-sm font-semibold uppercase tracking-wide text-medical-blue">
								{column.title}
							</h3>
							<ul className="space-y-2.5">
								{column.items.map((item, itemIdx) => (
									<li key={itemIdx}>
										{item.type === "link" && item.href ? (
											<Link
												href={item.href}
												className="rounded text-sm leading-relaxed text-slate-600 transition-colors hover:text-medical-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-medical-blue focus-visible:ring-offset-2"
											>
												{item.label}
											</Link>
										) : (
											<span className="text-sm leading-relaxed text-slate-600">
												{item.label}
											</span>
										)}
									</li>
								))}
							</ul>
						</div>
					))}

					{/* Connect / Socials column */}
					<div className="space-y-4">
						<h3 className="text-sm font-semibold uppercase tracking-wide text-medical-blue">
							Connect
						</h3>
						<div className="inline-grid grid-cols-2 gap-3">
							{footer.social.map((social, idx) => {
								const Icon = iconMap[social.platform];
								if (!Icon) return null;

								return (
									<a
										key={idx}
										href={social.href}
										target="_blank"
										rel="noopener noreferrer"
										aria-label={social.label}
										className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-medical-blue shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-medical-blue focus-visible:ring-offset-2"
									>
										<Icon className="h-3 w-3" aria-hidden="true" />
									</a>
								);
							})}
						</div>
					</div>
				</div>

				{/* Bottom strip */}
				<div className="mt-12 border-t border-slate-200 pt-8">
					<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
						<div className="flex flex-wrap items-center gap-4 text-xs leading-relaxed text-slate-600">
							<p>
								© {currentYear} {footer.bottom.copyright.org}. All rights reserved.
							</p>
							{footer.bottom.credentials.map((cred, idx) => (
								<span key={idx} className="flex items-center gap-1.5">
									{cred.text}
								</span>
							))}
						</div>
						<nav aria-label="Legal" className="flex flex-wrap items-center gap-4">
							{footer.bottom.legalLinks.map((link, idx) => (
								<Link
									key={idx}
									href={link.href}
									className="rounded text-xs text-slate-600 transition-colors hover:text-medical-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-medical-blue focus-visible:ring-offset-2"
								>
									{link.label}
								</Link>
							))}
						</nav>
					</div>
				</div>
			</Container>
		</footer>
	);
}
