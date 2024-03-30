import { CardProvider } from '@/src/context/cardContext/CardProvider';
import { ThemeProvider } from '@/src/context/themeContext/ThemeProvider'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CardProvider>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </CardProvider>
  );
}
