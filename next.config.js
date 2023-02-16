/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  // assetPrefix: process.env.NODE_ENV === "development" ? "https://work-from-home-2.vercel.app" : 'https://ppi.claimingmadeeasy.com',
  publicRuntimeConfig: {
    site: {
      name: "Claiming Made Easy",
      url:
        process.env.NODE_ENV === "development"
          ? "https://work-from-home-2.vercel.app"
          : "https://ppi.claimingmadeeasy.com",
      title: "QuickTaxClaims™ - Refund Tax Claim Platform",
      description:
        "QuickTaxClaims™ is a trading style of Approved Claims Group Ltd, a HMRC registered Tax Agent. We will handle and process your claim. National Insurance to submit your claim",
      socialPreview: "/images/logo.png",
    },
  },
  images: {
    domains: [
      "work-from-home-2.vercel.app",
      "claimingmadeeasy.com",
      "ppi.claimingmadeeasy.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flowbite.s3.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
