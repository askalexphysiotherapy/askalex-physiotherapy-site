"use client";

import { useState, useEffect } from "react";

export function usePrefersReducedMotion() {
	const [reduced, setReduced] = useState(false);

	useEffect(() => {
		if (typeof window === "undefined" || !window.matchMedia) return;

		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		const update = () => setReduced(mq.matches);
		update();

		if (mq.addEventListener) {
			mq.addEventListener("change", update);
			return () => mq.removeEventListener("change", update);
		} else {
			// @ts-ignore - for older browsers
			mq.addListener(update);
			// @ts-ignore
			return () => mq.removeListener(update);
		}
	}, []);

	return reduced;
}

