import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Table({
	columns,
	rows,
	className
}: {
	columns: string[];
	rows: Array<Record<string, string>>;
	className?: string;
}) {
	return (
		<div className={cn("overflow-x-auto rounded-2xl bg-white shadow-soft", className)}>
			<table className="w-full border-collapse">
				<thead>
					<tr className="border-b border-slate-200 bg-aa-bg/50">
						{columns.map((col, idx) => (
							<th
								key={idx}
								className="px-4 py-3 text-left text-sm font-semibold text-slate-900 first:pl-6 last:pr-6"
							>
								{col}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{rows.map((row, rowIdx) => (
						<tr
							key={rowIdx}
							className="border-b border-slate-100 last:border-0 transition-colors hover:bg-aa-bg/30"
						>
							{columns.map((col, colIdx) => {
								// Map column names to row keys
								// "Feature" -> "feature", "Home Visit" -> "home", etc.
								const colLower = col.toLowerCase();
								const keyMap: Record<string, string> = {
									feature: "feature",
									"home visit": "home",
									clinic: "clinic",
									online: "online"
								};
								const rowKey = keyMap[colLower] || colLower.replace(/\s+/g, "_");
								
								// Try multiple key formats
								const value =
									row[col] || // Exact column name
									row[rowKey] || // Mapped key
									row[colLower] || // Lowercase
									row[colLower.replace(/\s+/g, "_")] || // Lowercase snake_case
									"—";
								return (
									<td
										key={colIdx}
										className="px-4 py-3 text-sm text-slate-700 first:pl-6 last:pr-6"
									>
										{value}
									</td>
								);
							})}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

