"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function Accordion({
	question,
	answer,
	links,
	className,
	compact = false
}: {
	question: string;
	answer: string;
	links?: Array<{ label: string; href: string }>;
	className?: string;
	compact?: boolean;
}) {
	const [open, setOpen] = useState(false);

	return (
		<details
			className={cn(
				"group rounded-xl border border-slate-100 bg-white shadow-sm",
				className
			)}
			open={open}
			onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
		>
			<summary
				className={cn(
					"flex cursor-pointer items-center justify-between text-left font-medium text-slate-900 transition-colors hover:bg-aa-bg/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aa-blue focus-visible:ring-offset-2 rounded-xl",
					compact ? "p-3 text-sm" : "p-6"
				)}
			>
				<span>{question}</span>
				<ChevronDown
					className={cn(
						"ml-3 h-4 w-4 flex-shrink-0 text-slate-500 transition-transform",
						open && "rotate-180"
					)}
					aria-hidden="true"
				/>
			</summary>
			<div className={cn(compact ? "px-3 pb-3 pt-0" : "px-6 pb-6 pt-0")}>
				<div className="prose prose-sm max-w-none text-slate-700">
					<p className={cn("whitespace-pre-line", compact ? "text-sm" : undefined)}>
						{answer}
					</p>
					{links && links.length > 0 && (
						<div className="mt-3 flex flex-wrap gap-2">
							{links.map((link, idx) => (
								<a
									key={idx}
									href={link.href}
									className="text-aa-blue underline hover:text-aa-aqua focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aa-blue focus-visible:ring-offset-2 rounded"
								>
									{link.label}
								</a>
							))}
						</div>
					)}
				</div>
			</div>
		</details>
	);
}
