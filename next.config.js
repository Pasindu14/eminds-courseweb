/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "eminds.com.au",
      },
    ],
  },
};

module.exports = nextConfig;
