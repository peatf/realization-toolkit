import React from 'react';
import type { AppProps } from 'next/app';
import { Inter, Lora, JetBrains_Mono } from 'next/font/google';
import '../styles/globals.css';

// Define fonts with lighter weights for our foggy, editorial aesthetic
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['100', '200', '300', '400', '500'] // Adding lighter weights
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-editorial-serif',
  display: 'swap',
  weight: ['300', '400', '500'] // Focus on lighter weights
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['200', '300', '400'] // Lighter weights for monospace
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={`${inter.variable} ${lora.variable} ${jetBrainsMono.variable}`}>
      <Component {...pageProps} />
    </main>
  );
}
