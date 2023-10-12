/** @type {import("next").NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost', 'unsplash.com', '210.90.202.90']
    },
    experimental: {
        scrollRestoration: true
    }
};

module.exports = nextConfig;
