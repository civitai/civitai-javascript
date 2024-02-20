/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "blobs-temp.sfo3.digitaloceanspaces.com",
      },
    ],
  },
};
module.exports = nextConfig;
