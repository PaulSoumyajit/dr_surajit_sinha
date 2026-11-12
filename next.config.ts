import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/publications",
        destination: "/academic-background",
        permanent: true,
      },
      {
        source: "/judgments",
        destination: "/court-experience",
        permanent: true,
      },
      {
        source: "/practice-areas/corporate-advisory",
        destination: "/practice-areas/corporate-institutional",
        permanent: true,
      },
      {
        source: "/practice-areas/commercial-arbitration",
        destination: "/practice-areas/civil-writ-proceedings",
        permanent: true,
      },
      {
        source: "/practice-areas/appellate-advocacy",
        destination: "/practice-areas/criminal-litigation",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

