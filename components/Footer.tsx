import Image from "next/image";
import Link from "next/link";
import { Instagram, Linkedin, MapPin } from "lucide-react";
import { site } from "@/lib/content";
import { Container } from "./Container";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
	instagram: Instagram,
	linkedin: Linkedin,
	google: MapPin
};

export function Footer() {
	const { footer, brand } = site;
	const currentYear = footer.bottom.copyright.auto
		? new Date().getFullYear()
		: footer.bottom.copyright.year;

	return (
		<footer className="mt-auto border-t border-slate-200 bg-white" role="contentinfo">
			<Container className="py-10 lg:py-12">
				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
					{/* Brand */}
					<div className="space-y-3 lg:col-span-4">
						<Image
							src={footer.brand.logo}
							width={160}
							height={44}
							alt={brand.name}
							className="h-auto w-[9.5rem]"
						/>
						<p className="text-sm font-semibold text-medical-blue">{brand.name}</p>
						<p className="max-w-sm text-sm leading-relaxed text-slate-600">
							{footer.brand.blurb}
						</p>
					</div>

					{/* Contact + Explore */}
					{footer.columns.map((column, colIdx) => (
						<div key={colIdx} className="space-y-3 lg:col-span-2">
							<h3 className="text-sm font-semibold text-slate-900">{column.title}</h3>
							<ul className="space-y-2">
								{column.items.map((item, itemIdx) => (
									<li key={itemIdx}>
										{item.type === "link" && item.href ? (
											<Link
												href={item.href}
												className="text-sm text-slate-600 transition-colors hover:text-medical-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-medical-blue focus-visible:ring-offset-2 rounded"
											>
												{item.label}
											</Link>
										) : (
											<span className="text-sm text-slate-600">{item.label}</span>
										)}
									</li>
								))}
							</ul>
						</div>
					))}

					{/* Connect */}
					<div className="space-y-3 lg:col-span-4">
						<h3 className="text-sm font-semibold text-slate-900">Connect</h3>
						<ul className="space-y-2">
							{footer.social.map((social, idx) => {
								const Icon = iconMap[social.platform];
								if (!Icon) return null;

								return (
									<li key={idx}>
										<a
											href={social.href}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-medical-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-medical-blue focus-visible:ring-offset-2 rounded"
										>
											<span className="flex h-7 w-7 items-center justify-center rounded-full bg-bg-blue text-medical-blue">
												<Icon className="h-3.5 w-3.5" aria-hidden="true" />
											</span>
											{social.label}
										</a>
									</li>
								);
							})}
						</ul>
					</div>
				</div>

				<div className="mt-8 border-t border-slate-200 pt-6">
					<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
						<div className="space-y-1">
							<p className="text-xs text-slate-600">
								© {currentYear} {footer.bottom.copyright.org}. All rights reserved.
							</p>
							<div className="flex flex-wrap gap-x-4 gap-y-1">
								{footer.bottom.credentials.map((cred, idx) => (
									<span key={idx} className="text-xs text-slate-500">
										{cred.text}
									</span>
								))}
							</div>
						</div>
						<nav aria-label="Legal" className="flex flex-wrap gap-4">
							{footer.bottom.legalLinks.map((link, idx) => (
								<Link
									key={idx}
									href={link.href}
									className="text-xs text-slate-600 transition-colors hover:text-medical-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-medical-blue focus-visible:ring-offset-2 rounded"
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
