import { motion } from 'framer-motion';
import Hyperspeed from './Hyperspeed';
import { useMemo } from 'react';

export default function HyperspeedTransition({ isActive, direction = 'forward' }: { isActive: boolean, direction?: 'forward' | 'reverse' }) {
  const hyperspeedOptions = useMemo(() => ({
    distortion: 'turbulentDistortion',
    fov: 90,
    fovSpeedUp: 92, // barely warp
    speedUp: 0.5, // extremely low speed up
    movingCloserSpeed: [-5, -10], // practically crawling base speeds
    movingAwaySpeed: [5, 10],
    cameraY: 3, // shifts the animation slightly up from the center
    colors: {
      roadColor: 0x080808,
      islandColor: 0x0a0a0a,
      background: 0x000000,
      shoulderLines: 0x333333,
      brokenLines: 0x555555,
      leftCars: [0xFFFFFF, 0xDDDDDD, 0xAAAAAA],
      rightCars: [0xFFFFFF, 0xCCCCCC, 0x999999],
      sticks: 0xFFFFFF,
    }
  }), []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] pointer-events-none bg-black"
      style={{ willChange: "opacity" }}
    >
      <div className="absolute inset-0 w-full h-full rotate-180 mix-blend-screen opacity-90">
        <Hyperspeed effectOptions={hyperspeedOptions} direction={direction} />
      </div>
    </motion.div>
  );
}
