import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";

type PageHeroProps = {
	title: string;
	subtitle?: string;
	align?: "left" | "center";
	density?: "compact" | "comfortable";
	className?: string;
	children?: ReactNode;
};

export function PageHero({
	title,
	subtitle,
	align = "center",
	density = "comfortable",
	className,
	children
}: PageHeroProps) {
	const alignmentClasses =
		align === "center"
			? "mx-auto max-w-4xl text-center"
			: "mx-auto md:mx-0 max-w-3xl text-left";

	return (
		<Section density={density} background="tint" container={false}>
			<Container>
				<header
					className={cn(
						"space-y-3",
						alignmentClasses,
						className
					)}
					aria-label="Page hero"
					role="banner"
				>
					<h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight text-medical-blue">
						{title}
					</h1>

					{subtitle && (
						<p className="text-lg sm:text-xl text-slate-700">
							{subtitle}
						</p>
					)}
				</header>

				{children ? (
					<div className="mt-6 md:mt-8">{children}</div>
				) : null}
			</Container>
		</Section>
	);
}
