import { CardProvider } from "@/src/context/cardContext/CardProvider";
import { ThemeProvider } from "@/src/context/themeContext/ThemeProvider";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";


const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <CardProvider>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </CardProvider>
    </QueryClientProvider>
  );
}
