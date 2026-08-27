import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

type SectionDensity = "hero" | "compact" | "comfortable" | "spacious";
type SectionBackground = "default" | "tint" | "paper";

const densityMap: Record<SectionDensity, string> = {
	hero: "py-[var(--section-py-hero)]",
	compact: "py-[var(--section-py-compact)]",
	comfortable: "py-[var(--section-py-comfortable)]",
	spacious: "py-[var(--section-py-spacious)]"
};

const backgroundMap: Record<SectionBackground, string> = {
	default: "bg-white",
	tint: "bg-bg-blue/60",
	paper: "bg-white"
};

export function Section({
	children,
	className,
	id,
	density = "comfortable",
	background = "default",
	container = true
}: {
	children: ReactNode;
	className?: string;
	id?: string;
	density?: SectionDensity;
	background?: SectionBackground;
	container?: boolean;
}) {
	const sectionClasses = cn(
		densityMap[density],
		backgroundMap[background],
		className
	);

	const content = container ? <Container>{children}</Container> : children;

	return (
		<section id={id} className={sectionClasses}>
			{content}
		</section>
	);
}
