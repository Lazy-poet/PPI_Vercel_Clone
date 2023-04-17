import Bugsnag from "@bugsnag/js";

export function start() {
  // next.js executes top-level code at build time. See https://github.com/vercel/next.js/discussions/16840 for further example
  // So use NEXT_PHASE to avoid Bugsnag.start being executed during the build phase
  // See https://nextjs.org/docs/api-reference/next.config.js/introduction and https://github.com/vercel/next.js/blob/canary/packages/next/shared/lib/constants.ts#L1-L5 for
  // more details on NEXT_PHASE
  if (process.env.NEXT_PHASE !== "phase-production-build") {
    Bugsnag.start({
      apiKey: "2e8864db5e70f2fd27e9b539354a1270",
      appVersion: process.env.NEXT_BUILD_ID,
      plugins: [],
    });
  }
}
