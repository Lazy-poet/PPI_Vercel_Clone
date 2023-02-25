import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ValueProvider } from "@/contexts/ValueContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ValueProvider>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </ValueProvider>
  );
}
