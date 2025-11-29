"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

export function Reveal({
	children,
	className,
	delay = 0
}: {
	children: ReactNode;
	className?: string;
	delay?: number;
}) {
	const reduce = usePrefersReducedMotion();

	return (
		<motion.div
			className={className}
			initial={reduce ? false : { opacity: 0, y: 20 }}
			whileInView={reduce ? {} : { opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.2 }}
			transition={{ duration: 0.5, delay }}
		>
			{children}
		</motion.div>
	);
}

