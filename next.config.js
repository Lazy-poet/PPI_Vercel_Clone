/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === "development";
const nextConfig = {
  reactStrictMode: true,
  swcMinify: isDev,
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
      domain: 'quicktaxclaims.co.uk'
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
  ...(!isDev && {
    webpack(config, { isServer }) {
      if (!isServer) {
        config.module.rules.forEach((rule) => {
          if (rule.test && rule.test.toString().includes('svg')) {
            rule.exclude = /node_modules/;
          }
        });
      }
      config.module.rules.push({
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['next/babel', '@babel/preset-env', '@babel/preset-typescript'],
            plugins: [
              '@babel/plugin-proposal-private-methods',
              '@babel/plugin-proposal-private-property-in-object',
              '@babel/plugin-proposal-class-properties',
            ],
            exclude: /node_modules\/(?!pdfjs-dist)/
          },
        },
        exclude: /node_modules\/(?!(pdfjs-dist)\/).*/,
      });

      return config;
    },
  })
};

module.exports = nextConfig;
