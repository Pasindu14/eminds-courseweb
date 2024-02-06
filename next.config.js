/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "eminds.com.au",
      },
      {
        protocol: "https",
        hostname: "zoom.com",
      },
      {
        protocol: "https",
        hostname: "courseweb.eminds.lk",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
