import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Product media is served from Supabase Storage (and any URLs you paste in the admin panel).
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
