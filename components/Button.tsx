import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary";

interface ButtonBaseProps {
	variant?: ButtonVariant;
	children: ReactNode;
	className?: string;
}

type ButtonAsButton = ButtonBaseProps &
	Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
		href?: never;
	};

interface ButtonAsLink extends ButtonBaseProps {
	href: string;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const baseClasses =
	"inline-flex items-center justify-center rounded-full px-6 h-14 text-sm font-semibold leading-tight transition-all duration-200 md:h-auto md:py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-medical-blue focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-60 disabled:cursor-not-allowed";

const variantClasses = {
	primary:
		"bg-medical-green text-white border-2 border-transparent hover:bg-medical-green/90 hover:shadow-soft-hover active:scale-[0.98]",
	secondary:
		"border-2 border-medical-blue text-medical-blue bg-transparent hover:bg-bg-blue hover:border-soft-aqua hover:text-soft-aqua active:scale-[0.98]"
};

export function Button({ variant = "primary", children, className, href, ...props }: ButtonProps) {
	const classes = cn(baseClasses, variantClasses[variant], className);

	if (href) {
		return (
			<Link href={href} className={classes}>
				{children}
			</Link>
		);
	}

	return (
		<button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
			{children}
		</button>
	);
}

