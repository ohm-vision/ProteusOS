import type { NextConfig } from "next";
import configurePWA from "next-pwa";

const withPWA = configurePWA({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development', // Disable SW in dev mode
})

// const withPWA = require('next-pwa')({
//   dest: 'public',
//   register: true,
//   skipWaiting: true,
//   disable: process.env.NODE_ENV === 'development', // Disable SW in dev mode
// });

// const nextConfig = {
//   experimental: {
//     appDir: true,
//   },
//   reactStrictMode: true,
// };

// module.exports = withPWA(nextConfig);

const nextConfig = withPWA({
  /* config options here */
} satisfies NextConfig);

export default nextConfig;
