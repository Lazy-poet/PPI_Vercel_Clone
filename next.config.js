/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  publicRuntimeConfig: {
    site: {
      name: "Claiming Made Easy",
      url:
        process.env.NODE_ENV === "development"
          ? "https://claimingmadeeasy.vercel.app"
          : "https://claimingmadeeasy.vercel.app",
      title: "ClaimingMadeEasy™ - Refund Tax Claim",
      description:
        "ClaimingMadeEasy is a trading style of Approved Claims Group Ltd, a HMRC registered Tax Agent. We will handle and process your claim",
      socialPreview: "/images/logo.png",
    },
  },
  images: {
    domains: [
      "claimingmadeeasy.vercel.app",
      "work-from-home.vercel.app",
      "www.claimingmadeeasy.com",
      "countryflagsapi.com",
      "www.gravatar.com",
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
