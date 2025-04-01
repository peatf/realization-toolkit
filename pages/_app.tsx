import React from 'react';
import type { AppProps } from 'next/app';
import { Inter, JetBrains_Mono } from 'next/font/google';
import '../styles/globals.css';

// Define fonts with lighter weights for minimalist aesthetic
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['200', '300', '400', '500'] // Focus on lighter weights
});


const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['200', '300', '400'] // Lighter weights for monospace
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={`${inter.variable} ${jetBrainsMono.variable}`}>
      <Component {...pageProps} />
    </main>
  );
}
