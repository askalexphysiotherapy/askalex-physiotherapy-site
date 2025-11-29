import { ReactNode } from "react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
	return <div className={`card ${className}`.trim()}>{children}</div>;
}

export function CardHeader({ children }: { children: ReactNode }) {
	return <div className="p-4 pb-0">{children}</div>;
}

export function CardContent({ children }: { children: ReactNode }) {
	return <div className="p-4">{children}</div>;
}


