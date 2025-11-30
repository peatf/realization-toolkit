import React from 'react';
import Head from 'next/head';
import GlobalBackground from './GlobalBackground';
import { initSectionObserver } from '../../utils/SectionObserver';
import { useScrollTriggerEffect } from '../../hooks/useScrollTriggerEffect';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

// Main Layout component
const Layout: React.FC<LayoutProps> = ({
  children,
  title = 'Realization Toolkit',
  description = 'Discover tools for personal transformation through our immersive digital experience.'
}) => {
  // Use our safe hook to initialize animations
  useScrollTriggerEffect(() => {
    // Initialize section observers and return the cleanup function
    return initSectionObserver();
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <GlobalBackground />

      <main className="relative overflow-y-auto min-h-screen">
        {children}
      </main>
    </>
  );
};

export default Layout;
