import { forwardRef, InputHTMLAttributes } from "react";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function Input(
	{ className = "", ...props },
	ref
) {
	return (
		<input
			ref={ref}
			className={`w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 ${className}`.trim()}
			{...props}
		/>
	);
});


