# Realization Toolkit Website

A sophisticated, immersive website featuring editorial-style design, interactive elements, and advanced animations for the Realization Toolkit platform.

## 🌟 Design Philosophy

The Realization Toolkit website embodies several key aesthetic directions:

- **Editorial Typography**: Refined typographic hierarchies with thoughtful spacing
- **Mid-Century Modern Elements**: Clean geometric forms with subtle organic touches
- **Japanese-Inspired Elegance**: Ample negative space and asymmetrical balance
- **Digital Mysticism**: Subtle abstract elements and soft surrealism
- **Minimalist Interactions**: Purposeful animations that enhance rather than distract

## 🛠️ Tech Stack

- **Frontend Framework**: React with Next.js
- **Styling**: Tailwind CSS with custom utilities
- **Animation Libraries**:
  - GSAP for complex animations
  - Framer Motion for React component animations
  - CSS animations for simple transitions
- **Smooth Scrolling**: @studio-freight/lenis
- **Build Tools**: Webpack, Babel
- **Deployment**: Vercel or Netlify

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/realization-toolkit.git
   cd realization-toolkit
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser to [http://localhost:3000](http://localhost:3000) to view the website.

## 📂 Project Structure

```
realization-toolkit/
├── components/           # React components
│   ├── animations/       # Animation utilities and hooks
│   ├── layout/           # Layout components (Header, Footer, etc.)
│   └── sections/         # Page sections
├── pages/                # Next.js pages
├── public/               # Static assets
├── styles/               # Global CSS and Tailwind configuration
└── utils/                # Utility functions and helpers
```

## 🧩 Main Components

### 1. Opening Section (Tuning In)
- Ripple text effect on hover
- Fracturing screen transition
- Radial menu with orbit elements

### 2. Quiz Section (Attune to Your Rhythm)
- Frequency Discovery Console with animated entrance
- Interactive assessment interface

### 3. Membership Benefits
- Editorial-style layout with scroll-triggered animations
- Staggered text reveal effects

### 4. Testimonial Carousel
- 3D orbit animation with floating cards
- Parallax mouse movement effect

### 5. Tool Showcases
- Editorial "Toolkit Index" with typographic transitions
- Grid layout with hover effects

### 6. Pricing Section
- Interactive "decision portal" with floating orbs
- Animated selection highlighting

## 🎨 Animation Implementation

### GSAP Utilities
- Text animation utilities
- Scroll-triggered animations
- Parallax effects
- Screen transition effects

### Framer Motion Components
- Hover effects
- Page transitions
- Staggered animations
- 3D transformations

### Performance Considerations
- Hardware acceleration for complex animations
- Throttling for mouse move events
- Proper use of will-change property
- Respecting reduced motion preferences

## 🌐 Deployment

1. Build the project:
   ```bash
   npm run build
   # or
   yarn build
   ```

2. Deploy to Vercel:
   ```bash
   npm install -g vercel
   vercel
   ```

3. Or deploy to Netlify:
   ```bash
   npm install -g netlify-cli
   netlify deploy
   ```

## 🎯 Implementation Roadmap

### Phase 1: Setup and Foundation
- Set up Next.js project with TypeScript
- Configure Tailwind CSS with custom theme
- Implement base components and layouts

### Phase 2: Core Components
- Implement Opening section with ripple text effect
- Create Quiz section with iframe integration
- Develop Membership Benefits section with editorial layout
- Build Testimonial Carousel with 3D orbit effect
- Implement Tool Showcases with index navigation
- Create Pricing section with floating orbs

### Phase 3: Animations and Interactions
- Implement scroll-triggered animations
- Add hover and interaction effects
- Create page transitions
- Implement custom cursor
- Add parallax effects

### Phase 4: Optimization and Testing
- Optimize performance (lazy loading, code splitting)
- Implement accessibility features
- Test across browsers and devices
- Optimize for Core Web Vitals

### Phase 5: Deployment and Maintenance
- Set up CI/CD pipeline
- Configure production environment
- Deploy to production

## 👥 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [GSAP (GreenSock Animation Platform)](https://greensock.com/gsap/)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Next.js](https://nextjs.org/)
- [Lenis Smooth Scroll](https://github.com/studio-freight/lenis)
