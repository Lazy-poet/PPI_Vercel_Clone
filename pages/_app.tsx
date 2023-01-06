import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ValueProvider } from "@/contexts/ValueContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <ValueProvider>
        <Component {...pageProps} />
      </ValueProvider>
    </ThemeProvider>
  );
}
