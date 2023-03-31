import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ValueProvider } from "@/contexts/ValueContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import BugsnagProvider from "@/components/BugsnagProvider";
import { useEffect } from "react";
import getConfig from "next/config";
export default function App({ Component, pageProps }: AppProps) {
  const { publicRuntimeConfig } = getConfig();

  const { domain } = publicRuntimeConfig.site;
  useEffect(() => {
    try {
      if (process.env.NODE_ENV === "production") {
        document.domain = domain;
      }
    } catch {}
  }, [domain]);
  return (
    <BugsnagProvider>
      <ValueProvider>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </ValueProvider>
    </BugsnagProvider>
  );
}
