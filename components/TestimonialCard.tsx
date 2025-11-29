export function TestimonialCard({
	quote,
	author
}: {
	quote: string;
	author: string;
}) {
	return (
		<figure className="card p-6">
			<blockquote className="text-slate-800">“{quote}”</blockquote>
			<figcaption className="mt-4 text-sm text-slate-600">— {author}</figcaption>
		</figure>
	);
}


