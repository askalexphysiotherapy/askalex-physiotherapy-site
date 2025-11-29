import { forwardRef, InputHTMLAttributes } from "react";

export const Checkbox = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
	function Checkbox({ className = "", ...props }, ref) {
		return (
			<input
				ref={ref}
				type="checkbox"
				className={`h-4 w-4 rounded border-slate-300 ${className}`.trim()}
				{...props}
			/>
		);
	}
);


