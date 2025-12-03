/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
	  optimizePackageImports: ["framer-motion"],
	},
	reactStrictMode: true,
  
	// Allow Next/Image to load your remote images
	images: {
	  domains: [
		"static1.squarespace.com",
		"img.icons8.com"
	  ],
	},
  
	// 🔥 Add redirect to remove the old /booking page globally
	async redirects() {
	  return [
		{
		  source: "/booking",
		  destination: "/contact",
		  permanent: true, // 308 redirect — great for SEO + cache clearing
		},
	  ];
	},
  };
  
  module.exports = nextConfig;
  