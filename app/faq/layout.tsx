import type { Metadata } from "next";
import { site } from "@/lib/content";

export const metadata: Metadata = {
	title: "FAQ",
	description: site.faq.intro
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
	return <>{children}</>;
}

