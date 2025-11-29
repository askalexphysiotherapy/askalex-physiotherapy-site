import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./app/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./content/**/*.{md,mdx}",
		"./pages/**/*.{ts,tsx}"
	],
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: "1rem",
				sm: "1rem",
				md: "1.5rem",
				lg: "2rem",
				xl: "2rem",
				"2xl": "2rem"
			},
			screens: {
				sm: "640px",
				md: "768px",
				lg: "1024px",
				xl: "1152px", // Max content width
				"2xl": "1440px"
			}
		},
		extend: {
			maxWidth: {
				content: "1152px"
			},
			fontSize: {
				xs: ["var(--text-xs)", { lineHeight: "1.5" }],
				sm: ["var(--text-sm)", { lineHeight: "1.5" }],
				base: ["var(--text-base)", { lineHeight: "1.6" }],
				lg: ["var(--text-lg)", { lineHeight: "1.6" }],
				xl: ["var(--text-xl)", { lineHeight: "1.5" }],
				"2xl": ["var(--text-2xl)", { lineHeight: "1.4" }],
				"3xl": ["var(--text-3xl)", { lineHeight: "1.3" }],
				"4xl": ["var(--text-4xl)", { lineHeight: "1.2" }],
				"5xl": ["var(--text-5xl)", { lineHeight: "1.1" }]
			},
			spacing: {
				"1": "var(--space-1)",
				"2": "var(--space-2)",
				"3": "var(--space-3)",
				"4": "var(--space-4)",
				"5": "var(--space-5)",
				"6": "var(--space-6)",
				"8": "var(--space-8)",
				"10": "var(--space-10)",
				"12": "var(--space-12)",
				"16": "var(--space-16)",
				"20": "var(--space-20)"
			},
			borderRadius: {
				xl: "1rem",
				"2xl": "1.25rem"
			},
			colors: {
				// Brand semantic tokens
				"medical-green": "var(--medical-green)",
				"medical-blue": "var(--medical-blue)",
				"soft-aqua": "var(--soft-aqua)",
				"bg-blue": "var(--bg-blue)",
				// Legacy aliases for backward compatibility
				aa: {
					green: "var(--medical-green)",
					blue: "var(--medical-blue)",
					aqua: "var(--soft-aqua)",
					bg: "var(--bg-blue)"
				}
			},
			boxShadow: {
				soft: "0 8px 24px rgba(0,0,0,0.08)",
				"soft-hover": "0 12px 32px rgba(0,0,0,0.12)"
			}
		}
	},
	plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
	darkMode: ["class", '[data-theme="dark"]']
};

export default config;

