import { forwardRef, SelectHTMLAttributes } from "react";

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
	function Select({ className = "", ...props }, ref) {
	 return (
			<select
				ref={ref}
				className={`w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 ${className}`.trim()}
				{...props}
			/>
		);
	}
);


