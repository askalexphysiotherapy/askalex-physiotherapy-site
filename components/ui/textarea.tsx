import { forwardRef, TextareaHTMLAttributes } from "react";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
	function Textarea({ className = "", ...props }, ref) {
		return (
			<textarea
				ref={ref}
				className={`w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 ${className}`.trim()}
				{...props}
			/>
		);
	}
);


