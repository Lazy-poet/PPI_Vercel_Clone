/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  assetPrefix: process.env.NODE_ENV === "development" ? "https://work-from-home-2.vercel.app" : 'https://workfromhome.claimingmadeeasy.com',
  publicRuntimeConfig: {
    site: {
      name: "Claiming Made Easy",
      url:
        process.env.NODE_ENV === "development"
          ? "https://work-from-home-2.vercel.app"
          : "https://workfromhome.claimingmadeeasy.com",
      title: "ClaimingMadeEasy™ - Refund Tax Claim Platform",
      description:
        "ClaimingMadeEasy is a trading style of Approved Claims Group Ltd, a HMRC registered Tax Agent. We will handle and process your claim. National Insurance to submit your claim",
      socialPreview: "/images/logo.png",
    },
  },
  images: {
    domains: [
      "work-from-home-2.vercel.app",
      "claimingmadeeasy.com",
      "workfromhome.claimingmadeeasy.com",
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
