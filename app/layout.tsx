import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { site } from "@/lib/content";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

export const metadata: Metadata = {
	metadataBase: new URL(site.business.url),
	title: {
		default: `${site.brand.name} – Expert Physiotherapy in North London`,
		template: `%s | ${site.brand.name}`
	},
	description:
		"Specialist physiotherapy services in North London. Home visits, in-clinic sessions, and online consultations for neurological rehabilitation, MSK care, and more.",
	openGraph: {
		type: "website",
		locale: "en_GB",
		url: site.business.url,
		siteName: site.brand.name,
		title: `${site.brand.name} – Expert Physiotherapy in North London`,
		description:
			"Specialist physiotherapy services in North London. Home visits, in-clinic sessions, and online consultations.",
		images: [{ url: site.brand.logo, width: 1200, height: 630, alt: site.brand.name }]
	},
	twitter: {
		card: "summary_large_image",
		title: `${site.brand.name} – Expert Physiotherapy in North London`,
		description:
			"Specialist physiotherapy services in North London. Home visits, in-clinic sessions, and online consultations.",
		images: [site.brand.logo]
	},
	icons: [{ rel: "icon", url: "/favicon.ico" }]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={`${inter.variable} min-h-screen text-slate-800 antialiased`}>
				<a href="#content" className="sr-only focus:not-sr-only">
					Skip to content
				</a>
				<Header />
				<main id="content" className="min-h-[70vh]">
					{children}
				</main>
				<Footer />
				<FloatingCTA />
			</body>
		</html>
	);
}

