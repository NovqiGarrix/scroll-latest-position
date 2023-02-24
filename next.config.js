/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    PEXELS_API_KEY: process.env.PEXELS_API_KEY
  },
  images: {
    domains: ['images.pexels.com'],
  },
}
