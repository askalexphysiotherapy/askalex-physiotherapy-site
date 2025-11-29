import { ReactNode } from "react";

export function Dialog({
	open,
	onClose,
	children
}: {
	open: boolean;
	onClose: () => void;
	children: ReactNode;
}) {
	if (!open) return null;
	return (
		<div role="dialog" aria-modal="true" className="fixed inset-0 z-50 grid place-items-center">
			<div className="absolute inset-0 bg-black/40" onClick={onClose} />
			<div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-soft">
				{children}
				<div className="mt-4 text-right">
					<button
						onClick={onClose}
						className="inline-flex rounded-2xl border border-slate-300 px-4 py-2 text-sm"
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
}


