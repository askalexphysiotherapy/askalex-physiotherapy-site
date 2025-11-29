import { ReactNode } from "react";

export function Sheet({
	open,
	onOpenChange,
	children
}: {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	children: ReactNode;
}) {
	if (!open) return null;
	return (
		<div className="fixed inset-0 z-50">
			<div className="absolute inset-0 bg-black/40" onClick={() => onOpenChange(false)} />
			<div className="absolute inset-y-0 right-0 w-80 max-w-[90vw] bg-white p-6 shadow-soft">
				{children}
			</div>
		</div>
	);
}


