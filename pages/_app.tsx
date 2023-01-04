import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { useEffect } from "react";
import { Router } from "@mui/icons-material";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

/*   useEffect(() => {
    let redirect = {
      source: "localhost:3000",
      destination: "/claim",
    };

    if (!!window && window.location.host.includes(redirect.source)) {
      router.replace(redirect.destination, { query: router.query });
    }
  }, []); */

  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
