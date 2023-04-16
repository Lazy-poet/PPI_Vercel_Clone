import "@/styles/globals.css";
import { start } from "@/libs/bugsnag";
import "core-js";
import type { AppProps } from "next/app";
import { ValueProvider } from "@/contexts/ValueContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { useEffect } from "react";
import getConfig from "next/config";

start();

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
    <ValueProvider>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </ValueProvider>
  );
}
