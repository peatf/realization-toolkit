module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-editorial-serif)', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        // Updated color palette
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        text: {
          primary: 'var(--color-foreground)',
          secondary: 'var(--color-secondary)',
        },
        card: 'var(--color-card)',
        accent: {
          taupe: 'var(--color-accent-taupe)',
          green: 'var(--color-accent-green)',
          sand: 'var(--color-accent-sand)',
          lavender: 'var(--color-accent-lavender)',
          // New colors from VisualPreview
          raspberry: '#AA4369',
          copper: '#C2995F',
        },
        // Keep the original palette for backward compatibility
        mist: {
          50: '#f8f9fa',
          100: '#f0f2f5',
          200: '#e9ecef',
          300: '#dee2e6',
          400: '#ced4da',
          500: '#adb5bd',
          600: '#6c757d',
          700: '#495057',
          800: '#343a40',
          900: '#212529',
        },
        sage: {
          50: '#f0f4f1',
          100: '#d8e2dc',
          200: '#c0d1c5',
          300: '#a8bfaf',
          400: '#90ae98',
          500: '#789d81',
          600: '#607d67',
          700: '#485e4e',
          800: '#303e34',
          900: '#181f1a',
        },
        peach: {
          50: '#fff5f0',
          100: '#ffe6da',
          200: '#ffcbb3',
          300: '#ffb08d',
          400: '#ff9566',
          500: '#ff7a40',
          600: '#cc6233',
          700: '#994926',
          800: '#66311a',
          900: '#33180d',
        },
        sky: {
          50: '#f0f7ff',
          100: '#dcecff',
          200: '#b3d6ff',
          300: '#8abeff',
          400: '#62a6ff',
          500: '#3a8eff',
          600: '#2e71cc',
          700: '#225599',
          800: '#173866',
          900: '#0b1c33',
        },
      },
      boxShadow: {
        // Updated shadows for glass effect
        'glass-sm': '0 4px 12px rgba(0, 0, 0, 0.03)',
        'glass-md': '0 8px 24px rgba(0, 0, 0, 0.04)',
        'glass-lg': '0 12px 32px rgba(0, 0, 0, 0.05)',
        'glass-card': '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
        'glass-card-hover': '0 12px 40px 0 rgba(31, 38, 135, 0.3)',
        // Keep original neumorphic shadows for backward compatibility
        'neu-sm': '5px 5px 10px rgba(0, 0, 0, 0.05), -5px -5px 10px rgba(255, 255, 255, 0.05)',
        'neu-md': '8px 8px 16px rgba(0, 0, 0, 0.06), -8px -8px 16px rgba(255, 255, 255, 0.06)',
        'neu-lg': '15px 15px 30px rgba(0, 0, 0, 0.07), -15px -15px 30px rgba(255, 255, 255, 0.07)',
        'neu-inner': 'inset 2px 2px 5px rgba(0, 0, 0, 0.05), inset -2px -2px 5px rgba(255, 255, 255, 0.05)',
      },
      borderRadius: {
        // Updated border radiuses for more rounded corners
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
        '5xl': '3rem',
        'card': '24px',
        'button': '20px',
        'full': '9999px',
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
        '3xl': '32px',
      },
      animation: {
        'subtle-noise': 'subtleNoise 1s steps(2) infinite',
        'gradient-move': 'gradientMove 25s ease-in-out infinite alternate',
        'fog': 'fogAnimation 60s linear infinite',
        'fog-delayed': 'fogAnimation 45s linear infinite -10s',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        subtleNoise: {
          '0%': { backgroundPosition: '0 0, 2px 2px' },
          '100%': { backgroundPosition: '0 0, 2.1px 2.1px' },
        },
        gradientMove: {
          '0%': { backgroundPosition: '0% 0%', backgroundSize: '100% 100%' },
          '100%': { backgroundPosition: '7% -3%', backgroundSize: '115% 112%' },
        },
        fogAnimation: {
          '0%': { transform: 'translateX(-150vw)' },
          '100%': { transform: 'translateX(150vw)' },
        },
      },
    },
  },
  plugins: [],
}
