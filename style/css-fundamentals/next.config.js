/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**.joshwcomeau.com',
			},
		],
	},
}

module.exports = nextConfig
