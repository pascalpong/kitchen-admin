// next.config.mjs
import withTM from 'next-transpile-modules';

// List the packages that need to be transpiled
const withTranspileModules = withTM(['@mui/x-charts']);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Other Next.js configuration options go here
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/public/**',
      },
    ],
  },
  webpack(config) {
    // Add a rule for CSS files if not already present
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader', 'postcss-loader'],
    });

    return config;
  },
};

export default withTranspileModules(nextConfig);