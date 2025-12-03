/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
	  optimizePackageImports: ["framer-motion"],
	},
	reactStrictMode: true,
  
	// Allow Next/Image to load your remote images
	images: {
	  domains: [
		"static1.squarespace.com", // Squarespace-hosted images
		"img.icons8.com",          // icons in Services/FAQ
	  ],
	},
  
	// Prevent ESLint from blocking production builds
	eslint: {
	  ignoreDuringBuilds: true,
	},
  
	// Redirect any /booking URL to /contact
	async redirects() {
	  return [
		{
		  source: "/booking",
		  destination: "/contact",
		  permanent: true,
		},
		{
		  source: "/booking/",
		  destination: "/contact",
		  permanent: true,
		},
	  ];
	},
  };
  
  module.exports = nextConfig;
  