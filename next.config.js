/** @type {import("next").NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost', 'unsplash.com', '210.90.202.90']
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://15.164.190.1:8080/:path*'
            }
        ];
    }
};

module.exports = nextConfig;
