import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";

type PageHeroProps = {
	title: string;
	subtitle?: string;
	align?: "left" | "center";
	density?: "hero" | "compact" | "comfortable";
	className?: string;
	children?: ReactNode;
};

export function PageHero({
	title,
	subtitle,
	align = "center",
	density = "hero",
	className,
	children
}: PageHeroProps) {
	const alignmentClasses =
		align === "center"
			? "mx-auto max-w-3xl text-center"
			: "mx-auto md:mx-0 max-w-2xl text-left";

	const isCompact = density === "hero" || density === "compact";

	return (
		<Section density={density} background="tint" container={false}>
			<Container>
				<header
					className={cn(
						isCompact ? "space-y-1.5" : "space-y-3",
						alignmentClasses,
						className
					)}
					aria-label="Page hero"
					role="banner"
				>
					<h1
						className={cn(
							"font-extrabold leading-tight tracking-tight text-medical-blue",
							isCompact
								? "text-xl sm:text-2xl lg:text-[1.75rem]"
								: "text-2xl sm:text-3xl lg:text-4xl"
						)}
					>
						{title}
					</h1>

					{subtitle && (
						<p
							className={cn(
								"text-slate-700",
								isCompact ? "text-sm sm:text-base" : "text-lg sm:text-xl"
							)}
						>
							{subtitle}
						</p>
					)}
				</header>

				{children ? (
					<div className={cn(isCompact ? "mt-3 md:mt-4" : "mt-6 md:mt-8")}>
						{children}
					</div>
				) : null}
			</Container>
		</Section>
	);
}
