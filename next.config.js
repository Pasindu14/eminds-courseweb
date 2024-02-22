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
      {
        protocol: "https",
        hostname: "courseweb.eminds.au",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/signin",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
