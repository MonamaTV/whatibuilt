/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
        pathname: "*/**",
      },
      {
        protocol: "https",
        hostname: "*.githubusercontent.com",
        pathname: "*/**",
      },
      {
        protocol: "https",
        hostname: "pegmpwlszhifrxsvhfbs.supabase.co",
        pathname: "*/**",
      },
      {
        protocol: "https",
        hostname: "*.ytimg.com",
        pathname: "*/**",
      },
    ],
  },
};

module.exports = nextConfig;
