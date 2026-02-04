/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/austin",
        destination: "/atx",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
