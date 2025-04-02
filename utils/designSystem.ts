/**
 * Design system utilities to maintain consistency
 */

// Typography helpers
export const typography = {
  heading1: "font-serif text-4xl md:text-5xl text-[var(--color-foreground)] font-light",
  heading2: "font-serif text-3xl md:text-4xl text-[var(--color-foreground)] font-light",
  heading3: "font-serif text-2xl md:text-3xl text-[var(--color-foreground)] font-light",
  heading4: "font-serif text-xl md:text-2xl text-[var(--color-foreground)] font-medium",
  subtitle: "font-mono text-[var(--color-secondary)] tracking-widest uppercase text-sm",
  bodyLarge: "font-sans text-lg text-[var(--color-foreground)]",
  body: "font-sans text-base text-[var(--color-foreground)]",
  caption: "font-sans text-sm text-[var(--color-secondary)]",
};

// Common component styles
export const components = {
  card: "bg-[var(--color-card)] rounded-lg shadow-sm",
  cardHighlight: "bg-white rounded-lg shadow-md border border-[var(--color-accent-green)]/20",
  button: {
    primary: "bg-[var(--color-accent-green)] text-[var(--color-foreground)] font-medium px-6 py-3 rounded-lg",
    secondary: "bg-[var(--color-accent-sand)] text-[var(--color-foreground)] font-medium px-6 py-3 rounded-lg",
    outline: "border border-[var(--color-accent-taupe)] text-[var(--color-foreground)] px-6 py-3 rounded-lg",
  },
  input: "px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-accent-lavender)]",
};

// Layout utilities
export const layout = {
  container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  flexCenter: "flex items-center justify-center",
  flexBetween: "flex items-center justify-between",
  grid2: "grid grid-cols-1 md:grid-cols-2 gap-8",
  grid3: "grid grid-cols-1 md:grid-cols-3 gap-6",
};