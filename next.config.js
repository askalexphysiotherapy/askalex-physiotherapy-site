/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
	  optimizePackageImports: ["framer-motion"],
	},
	reactStrictMode: true,
  
	// Allow Next/Image to load your remote images
	images: {
	  domains: [
		"static1.squarespace.com", // your Squarespace-hosted images
		"img.icons8.com"           // icons in Services/FAQ
	  ],
	  // If you prefer stricter matching, you can use remotePatterns instead.
	  // remotePatterns: [
	  //   { protocol: "https", hostname: "static1.squarespace.com" },
	  //   { protocol: "https", hostname: "img.icons8.com" }
	  // ]
	},
  };
  
  module.exports = nextConfig;
  