/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, options) => {
    // Modify or extend the `config` object as needed
    // For example, add a new loader:
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });

    return config;  // Always return the config object
  },
};

module.exports = nextConfig;
