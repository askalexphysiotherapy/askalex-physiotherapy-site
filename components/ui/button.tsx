import { ButtonHTMLAttributes, forwardRef } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: "default" | "outline";
};

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
	{ className = "", variant = "default", ...props },
	ref
) {
	const base =
		"inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium transition focus-visible:ring-2 disabled:opacity-60";
	const variants = {
		default: `${base} bg-aa-green text-white hover:brightness-110`,
		outline: `${base} border border-aa-blue text-aa-blue hover:bg-aa-blue/10`
	};
	return <button ref={ref} className={`${variants[variant]} ${className}`.trim()} {...props} />;
});


