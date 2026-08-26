import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

type SectionDensity = "compact" | "comfortable" | "spacious";
type SectionBackground = "default" | "tint" | "paper";

const densityMap: Record<SectionDensity, string> = {
	compact: "py-2.5 md:py-3",
	comfortable: "py-5 md:py-6 lg:py-7",
	spacious: "py-10 md:py-12"
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
