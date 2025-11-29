import { ReactNode } from "react";

export function FeatureCard({
	title,
	description,
	icon
}: {
	title: string;
	description: string;
	icon?: ReactNode;
}) {
	return (
		<div className="card p-6">
			{icon ? <div className="mb-3 text-aa-blue">{icon}</div> : null}
			<h3 className="text-lg font-semibold text-slate-900">{title}</h3>
			<p className="mt-2 text-slate-700">{description}</p>
		</div>
	);
}


