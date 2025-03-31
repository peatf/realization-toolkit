import React from 'react';
import type { AppProps } from 'next/app';
import { Inter, Lora, JetBrains_Mono } from 'next/font/google';
import '../styles/globals.css';

// Define fonts
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-editorial-serif',
  display: 'swap',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={`${inter.variable} ${lora.variable} ${jetBrainsMono.variable}`}>
      <Component {...pageProps} />
    </main>
  );
}
