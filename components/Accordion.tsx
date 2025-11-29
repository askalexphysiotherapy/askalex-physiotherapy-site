"use client";

import { ReactNode, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function Accordion({
	question,
	answer,
	links,
	className
}: {
	question: string;
	answer: string;
	links?: Array<{ label: string; href: string }>;
	className?: string;
}) {
	const [open, setOpen] = useState(false);

	return (
		<details
			className={cn("group rounded-2xl bg-white shadow-soft", className)}
			open={open}
			onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
		>
			<summary className="flex cursor-pointer items-center justify-between p-6 text-left font-medium text-slate-900 transition-colors hover:bg-aa-bg/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aa-blue focus-visible:ring-offset-2 rounded-2xl">
				<span>{question}</span>
				<ChevronDown
					className={cn(
						"ml-4 h-5 w-5 flex-shrink-0 text-slate-500 transition-transform",
						open && "rotate-180"
					)}
					aria-hidden="true"
				/>
			</summary>
			<div className="px-6 pb-6 pt-0">
				<div className="prose prose-sm max-w-none text-slate-700">
					<p>{answer}</p>
					{links && links.length > 0 && (
						<div className="mt-4 flex flex-wrap gap-2">
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

