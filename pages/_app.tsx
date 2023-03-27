import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ValueProvider } from "@/contexts/ValueContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import BugsnagProvider from "@/components/BugsnagProvider";
export default function App({ Component, pageProps }: AppProps) {
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
