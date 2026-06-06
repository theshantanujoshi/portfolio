import { motion } from 'framer-motion';
import { useRef } from 'react';
import StickyProjectList from './StickyProjectList';
import Waves from './Waves';
import { useOptimizedScroll } from './useOptimizedScroll';

export default function ProjectsPage({ onTriggerTransition }: { onTriggerTransition: (direction: 'forward' | 'reverse') => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useOptimizedScroll({
    containerRef,
    onReverse: () => onTriggerTransition('reverse'),
    onForward: () => onTriggerTransition('forward')
  });

  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      transition={{ type: "spring", bounce: 0, duration: 1.2 }}
      className="bg-black text-white font-sans w-full h-full overflow-y-auto overflow-x-hidden relative"
    >
      {/* REACT BITS INTERACTIVE WAVES BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Waves
          lineColor="#ffffff15"
          backgroundColor="transparent"
          waveSpeedX={0.02}
          waveSpeedY={0.01}
          waveAmpX={40}
          waveAmpY={20}
          friction={0.9}
          tension={0.01}
          maxCursorMove={120}
          xGap={24}
          yGap={72}
        />
      </div>

      {/* HERO HEADING SECTION */}
      <div className="w-full min-h-[50vh] flex flex-col items-center justify-center relative z-10 px-6 pt-[10vh]">
        <h2 className="text-6xl md:text-8xl text-white tracking-tight font-['Instrument_Serif'] mb-6 text-center drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]">
          Selected <em className="italic text-white/60">Works</em>
        </h2>
        <p className="text-white/40 font-mono text-xs md:text-sm tracking-widest uppercase mt-4 max-w-2xl text-center leading-relaxed">
          A collection of experiments, architectures, and permissionless builds.
        </p>
      </div>

      <StickyProjectList containerRef={containerRef} />
    </motion.div>
  );
}
