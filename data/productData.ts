// Moving the file from components/data/productData.ts to data/productData.ts
// to match import statements throughout the codebase

// data/productData.ts

export interface Product {
  id: number;
  image: string;
  alt: string;
  title: string;
  tip: string;
}

export const personalToolsProducts: Product[] = [
  {
    id: 1,
    image: "/api/placeholder/500/500",
    alt: "Frequency Generator visualization.",
    title: "Frequency Generator",
    tip: "Our advanced frequency generator helps attune your energy to specific vibrational patterns for personal transformation."
  },
  {
    id: 2,
    image: "/api/placeholder/500/500",
    alt: "Meditation Guide interface.",
    title: "Meditation Guide",
    tip: "Personalized meditation experiences tailored to your unique energetic signature, accessible for every level of practice."
  },
  {
    id: 3,
    image: "/api/placeholder/500/500",
    alt: "Pattern Recognition tool.",
    title: "Pattern Recognition",
    tip: "Identify recurring patterns in your life and transform limiting beliefs with our intuitive pattern recognition software."
  },
  {
    id: 4,
    image: "/api/placeholder/500/500",
    alt: "Resonance Mapper visualization.",
    title: "Resonance Mapper",
    tip: "Map your unique energetic signature and track your transformation journey with detailed visual representations."
  },
  {
    id: 5,
    image: "/api/placeholder/500/500",
    alt: "Dream Analyzer interface.",
    title: "Dream Analyzer",
    tip: "Decode the symbolism in your dreams and connect with your subconscious mind through our AI-assisted dream analysis tool."
  },
  {
    id: 6,
    image: "/api/placeholder/500/500",
    alt: "Intention Setting interface.",
    title: "Intention Setting",
    tip: "Amplify your manifestation abilities with our guided intention setting protocols and energetic alignment tools."
  }
];

export const communityToolsProducts: Product[] = [
  {
    id: 1,
    image: "/api/placeholder/500/500",
    alt: "Constellation Viewer interface.",
    title: "Constellation Viewer",
    tip: "Visualize your connections to people, places, and ideas in an interactive 3D space that reveals hidden relationships."
  },
  {
    id: 2,
    image: "/api/placeholder/500/500",
    alt: "Ritual Builder interface.",
    title: "Ritual Builder",
    tip: "Create personalized digital rituals to support your intentions and goals, with shareable templates for community practice."
  },
  {
    id: 3,
    image: "/api/placeholder/500/500",
    alt: "Synchronicity Journal.",
    title: "Synchronicity Journal",
    tip: "Track meaningful coincidences and patterns that emerge across the community, revealing collective consciousness shifts."
  },
  {
    id: 4,
    image: "/api/placeholder/500/500",
    alt: "Harmonic Resonance tool.",
    title: "Harmonic Resonance",
    tip: "Find other community members whose energy signatures complement and enhance your own for collaborative growth."
  },
  {
    id: 5,
    image: "/api/placeholder/500/500",
    alt: "Wisdom Circle interface.",
    title: "Wisdom Circle",
    tip: "Join facilitated digital gathering spaces for deep conversation, shared insights, and collaborative problem-solving."
  },
  {
    id: 6,
    image: "/api/placeholder/500/500",
    alt: "Collective Meditation interface.",
    title: "Collective Meditation",
    tip: "Participate in synchronized global meditation events designed to amplify intentions through collective consciousness."
  }
];
