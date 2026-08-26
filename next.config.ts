import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static output: no server runtime, so this deploys to Vercel,
  // Netlify, Cloudflare Pages, GitHub Pages or any static host.
  // Remove `output` and `images.unoptimized` if you later want
  // next/image optimisation on a Node host.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
