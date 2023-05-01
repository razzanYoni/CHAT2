/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	poweredByHeader: false,
};

const withPWA = require("next-pwa")({
	dest: "public",
});

module.exports = withPWA(nextConfig);
