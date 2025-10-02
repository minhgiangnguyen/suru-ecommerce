/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  },
  images: {
    domains: ["res.cloudinary.com", "localhost"], // add your image hosts if needed
  },
};

module.exports = nextConfig;
