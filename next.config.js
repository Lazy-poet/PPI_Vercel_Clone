/** @type {import('next').NextConfig} */
const {
  BugsnagSourceMapUploaderPlugin,
  BugsnagBuildReporterPlugin,
} = require("webpack-bugsnag-plugins");

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
      domain: "quicktaxclaims.co.uk",
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
  transpilePackages: ["pdfjs-dist"],
  productionBrowserSourceMaps: true,
  webpack(config, { buildId, isServer, webpack }) {
    config.plugins.push(
      new webpack.DefinePlugin({
        // Define the build id so that it can be accessed in the client when reporting errors
        "process.env.NEXT_BUILD_ID": JSON.stringify(buildId),
        "process.env.NEXT_IS_SERVER": JSON.stringify(isServer),
      })
    );

    // Upload source maps on production build
    config.plugins.push(
      new BugsnagBuildReporterPlugin(
        {
          apiKey: "2e8864db5e70f2fd27e9b539354a1270",
          appVersion: buildId,
          releaseStage: process.env.NODE_ENV,
        },
        { logLevel: "debug" }
      ),
      new BugsnagSourceMapUploaderPlugin({
        apiKey: "2e8864db5e70f2fd27e9b539354a1270",
        appVersion: buildId,
        publicPath:
          process.env.NODE_ENV === "production"
            ? "https://quicktaxclaims.co.uk/_next/"
            : "http://localhost:3000/_next/",
      })
    );

    return config;
  },
};

module.exports = nextConfig;
