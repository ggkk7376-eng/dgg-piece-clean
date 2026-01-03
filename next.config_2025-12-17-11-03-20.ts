import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  serverExternalPackages: ["sharp"],
  experimental: {
    allowedDevOrigins: ["www.dggpiece.pl", "dggpiece.pl", "localhost:3001"],
  },
  sassOptions: {
    silenceDeprecations: ["legacy-js-api", "import"],
  },
  productionBrowserSourceMaps: false,
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
      },
    ],
  },
  webpack(config) {
    // biome-ignore lint/suspicious/noExplicitAny: No need to type this.
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.(".svg"),
    );

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: ["@svgr/webpack"],
      },
    );

    fileLoaderRule.exclude = /\.svg$/i;


    return config;
  },
};

console.log("--- CONFIG LOADED v6 (NO ALIAS + SILENT SASS) ---");
export default withPayload(nextConfig);
