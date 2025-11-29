import { ReactNode, useState } from "react";

export function Accordion({
	items
}: {
	items: { id: string; title: string; content: ReactNode }[];
}) {
	const [open, setOpen] = useState<string | null>(null);
	return (
		<div className="divide-y divide-slate-200 rounded-2xl border border-slate-200">
			{items.map((it) => {
				const isOpen = open === it.id;
				return (
					<div key={it.id}>
						<button
							type="button"
							className="flex w-full items-center justify-between p-4 text-left"
							onClick={() => setOpen((v) => (v === it.id ? null : it.id))}
							aria-expanded={isOpen}
							aria-controls={`acc-${it.id}`}
						>
							<span className="font-medium text-slate-900">{it.title}</span>
							<span className="text-slate-500">{isOpen ? "−" : "+"}</span>
						</button>
						{isOpen ? (
							<div id={`acc-${it.id}`} className="p-4 pt-0 text-slate-700">
								{it.content}
							</div>
						) : null}
					</div>
				);
			})}
		</div>
	);
}


