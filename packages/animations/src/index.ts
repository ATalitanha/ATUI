import type { Variants, Transition } from "framer-motion";

// Premium architectural spring settings (avoiding generic cartoonish bounces)
export const springs = {
  // Ultra fast and highly responsive, feels tactile
  snappy: {
    type: "spring" as const,
    stiffness: 400,
    damping: 30,
    mass: 0.8,
  },
  // Smooth, elegant, balanced transition
  elegant: {
    type: "spring" as const,
    stiffness: 280,
    damping: 26,
    mass: 1,
  },
  // Soft, luxurious, deeper movement
  velvet: {
    type: "spring" as const,
    stiffness: 150,
    damping: 20,
    mass: 1.2,
  },
  // High energy but completely controlled micro-interaction
  tactile: {
    type: "spring" as const,
    stiffness: 500,
    damping: 22,
    mass: 0.5,
  }
};

// Handcrafted semantic animations for panels, modals, popovers
export const fadeVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, transition: { duration: 0.15, ease: [0.16, 1, 0.3, 1] } },
};

export const slideUpVariants: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: springs.elegant },
  exit: { opacity: 0, y: 12, transition: { duration: 0.15, ease: [0.16, 1, 0.3, 1] } },
};

export const slideInRightVariants: Variants = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0, transition: springs.elegant },
  exit: { opacity: 0, x: 20, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } },
};

export const scaleInVariants: Variants = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1, transition: springs.snappy },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.1, ease: [0.16, 1, 0.3, 1] } },
};

// Staggered transitions helper
export const getStaggerContainer = (staggerChildren = 0.05, delayChildren = 0): Variants => ({
  initial: {},
  animate: {
    transition: {
      staggerChildren,
      delayChildren,
    }
  }
});

export const staggerItemVariants: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: springs.snappy },
};
export { type Variants, type Transition };