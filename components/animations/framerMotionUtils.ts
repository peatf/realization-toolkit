import { MotionProps, Variants } from 'framer-motion';

/**
 * Common animation variants for page transitions
 */
export const pageTransitionVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/**
 * Staggered animation variants for lists
 */
export const staggeredListVariants = {
  container: {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  },
  item: {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  },
};

/**
 * Text reveal animation variants
 */
export const textRevealVariants = {
  hidden: {
    y: '100%',
    opacity: 0,
  },
  visible: (custom: number = 0) => ({
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 16,
      stiffness: 200,
      delay: custom * 0.1,
    },
  }),
};

/**
 * Scale hover animation props
 * @param scale Scale factor on hover (default: 1.05)
 * @param duration Animation duration in seconds (default: 0.2)
 */
export const scaleHoverProps = (scale: number = 1.05, duration: number = 0.2): MotionProps => ({
  whileHover: { scale },
  whileTap: { scale: 0.95 },
  transition: { duration },
});

/**
 * Card hover animation props with lift and shadow effect
 */
export const cardHoverProps: MotionProps = {
  whileHover: { 
    y: -8,
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
  },
  whileTap: { 
    y: -2,
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },
  transition: { 
    type: 'spring',
    stiffness: 300,
    damping: 20,
  },
};

/**
 * Orbit animation variants for 3D carousel
 * @param index Item index
 * @param total Total number of items
 * @param radius Orbit radius
 */
export const orbitVariants = (index: number, total: number, radius: number = 250): Variants => {
  const angle = (index / total) * Math.PI * 2;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;
  
  return {
    initial: {
      x: 0,
      z: -100,
      opacity: 0,
      scale: 0.8,
    },
    animate: {
      x,
      z,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.5,
      },
    },
    active: {
      scale: 1.1,
      opacity: 1,
      z: 50,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    inactive: {
      scale: 0.9,
      opacity: 0.7,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
};

/**
 * Floating animation variants
 * @param y Y-axis movement range
 * @param duration Animation duration in seconds
 */
export const floatingVariants = (y: number = 10, duration: number = 4): Variants => ({
  initial: { y: 0 },
  animate: {
    y: [0, -y, 0, y, 0],
    transition: {
      duration,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "mirror",
    },
  },
});

/**
 * Pulse animation variants
 * @param scale Maximum scale factor
 * @param duration Animation duration in seconds
 */
export const pulseVariants = (scale: number = 1.05, duration: number = 2): Variants => ({
  initial: { scale: 1 },
  animate: {
    scale: [1, scale, 1],
    transition: {
      duration,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "mirror",
    },
  },
});

/**
 * Fade in up animation props
 * @param delay Delay in seconds before animation starts
 * @param duration Animation duration in seconds
 */
export const fadeInUpProps = (delay: number = 0, duration: number = 0.6): MotionProps => ({
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
    }
  },
});

/**
 * Fade in animation props with custom direction
 * @param direction Direction of the fade in animation
 * @param distance Distance to travel in pixels
 * @param delay Delay in seconds before animation starts
 * @param duration Animation duration in seconds
 */
export const fadeInProps = (
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
  distance: number = 20,
  delay: number = 0,
  duration: number = 0.6
): MotionProps => {
  const directionMap = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
  };
  
  const { x, y } = directionMap[direction];
  
  return {
    initial: { opacity: 0, x, y },
    animate: { 
      opacity: 1, 
      x: 0, 
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }
    },
  };
};

/**
 * Staggered children animation props
 * @param staggerDelay Delay between each child animation
 * @param initialDelay Initial delay before first child animation
 */
export const staggerChildrenProps = (
  staggerDelay: number = 0.1, 
  initialDelay: number = 0.2
): MotionProps => ({
  initial: "hidden",
  animate: "visible",
  variants: {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      },
    },
  },
});

/**
 * Animation props for cursor follower effect
 */
export const cursorFollowerProps: MotionProps = {
  initial: { x: 0, y: 0 },
  animate: { 
    x: 0,
    y: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300,
      mass: 0.5,
    }
  },
};
