/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  swcMinify: true,
  trailingSlash: false,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ];
  },
  reactStrictMode: false,
  experimental: {
    optimizeCss: true,
    workerThreads: true,
    cpus: 4
  }
}

if (process.env.NETLIFY) {
  const netlifyConfig = require('./next.config.netlify.js');
  module.exports = netlifyConfig;
} else {
  module.exports = nextConfig;
}
