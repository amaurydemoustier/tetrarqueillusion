import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactNode } from 'react';

interface ScrollTransitionProps {
  children: ReactNode;
}

const ScrollTransition = ({ children }: ScrollTransitionProps) => {
  const { scrollYProgress } = useScroll();

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  return (
    <motion.div
      style={{
        opacity,
        scale,
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollTransition;
