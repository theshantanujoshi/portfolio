import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import MagnetLines from './MagnetLines';
import Dither from './Dither';
import { Signature } from './Signature';
import { useOptimizedScroll } from './useOptimizedScroll';

const SOCIALS = [
  { name: 'RESUME', url: 'https://drive.google.com/file/d/1-aySDKr-qELNRwXdDJYEp8wrK51INs04/view' },
  { name: 'MEETING', url: 'https://calendly.com/theshantanujoshi' },
  { name: 'LINKEDIN', url: 'https://www.linkedin.com/in/theshantanujoshi/' },
  { name: 'GITHUB', url: 'https://github.com/theshantanujoshi' },
  { name: 'EMAIL', url: 'mailto:shanjoshi39@gmail.com' },
  { name: 'PHONE', url: 'https://contacts.google.com/new?givenname=Shantanu&familyname=Joshi&phone=+919936328758&email=shanjoshi39@gmail.com' },
  { name: 'TWITTER', url: 'https://x.com/okayjoshiji' },
  { name: 'SUBSTACK', url: 'https://okayjoshiji.substack.com/' },
  { name: 'INSTAGRAM', url: 'https://www.instagram.com/ashanthumain/' },
  { name: 'DISCORD', isCopy: true, copyText: 'baakisabmast' }
];

export default function ContactPage({ onTriggerReverseTransition }: { onTriggerReverseTransition: () => void }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll({ container: scrollRef });
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50 && !isFooterVisible) setIsFooterVisible(true);
    else if (latest <= 50 && isFooterVisible) setIsFooterVisible(false);
  });

  useOptimizedScroll({
    containerRef: scrollRef,
    onReverse: onTriggerReverseTransition
  });

  const handleCopy = (idx: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      transition={{ type: "spring", bounce: 0, duration: 1.2 }}
      className="w-full h-screen bg-black overflow-y-auto overflow-x-hidden relative"
      ref={scrollRef}
    >
      {/* Background grain - Fixed to viewport */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none z-50" />

      {/* 
        LINKS SECTION
        Sticky positioning keeps it pinned to the screen while scrolling down. 
        The footer will naturally slide ON TOP of this section.
      */}
      <motion.div 
        className="w-full min-h-screen flex flex-col items-center justify-center sticky top-0 z-0"
        animate={{ 
          opacity: isFooterVisible ? 0.15 : 1,
          pointerEvents: isFooterVisible ? "none" : "auto" 
        }}
        transition={{ type: "spring", bounce: 0, duration: 1.0 }}
      >
        {/* Dither Background Layer */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-auto">
          <Dither
            waveColor={[1, 1, 1]}
            disableAnimation={false}
            enableMouseInteraction={true}
            mouseRadius={0.3}
            colorNum={4}
            waveAmplitude={0.3}
            waveFrequency={0.4}
            waveSpeed={0.05}
            pixelSize={12}
          />
        </div>

        <div className="w-full max-w-[90rem] mx-auto px-8 md:px-24 grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-12 relative z-10 my-24 pointer-events-none">
          {SOCIALS.map((social, idx) => {
            const isHovered = hoveredIdx === idx;
            const isOtherHovered = hoveredIdx !== null && hoveredIdx !== idx;
            const isCopied = copiedIndex === idx;

            const linkProps = social.isCopy ? {
              as: "button" as any,
              onClick: () => handleCopy(idx, social.copyText as string)
            } : {
              as: "a" as any,
              href: social.url,
              target: social.url.startsWith('http') ? '_blank' : '_self',
              rel: "noopener noreferrer"
            };

            return (
              <motion.div
                key={social.name}
                {...linkProps}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                animate={{
                  scale: isHovered ? 1.05 : 1,
                  opacity: isOtherHovered ? 0.15 : 1,
                  color: '#ffffff',
                  x: isHovered ? 30 : 0
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30
                }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-['Instrument_Serif'] tracking-tight origin-left cursor-pointer flex flex-col group relative w-fit text-left pointer-events-auto"
              >
                <span className="italic block leading-none">{social.name}</span>
                {social.isCopy && isHovered && (
                  <span className="font-mono text-[10px] tracking-widest uppercase mt-4 text-white absolute -bottom-6 left-0 whitespace-nowrap">
                    {isCopied ? "COPIED TO CLIPBOARD" : "CLICK TO COPY USERNAME"}
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* 
        FOOTER SECTION 
        Placed lower in DOM with a higher z-index and solid background.
        Scrolling down pulls it natively over the sticky links section.
      */}
      <footer className="w-full bg-gradient-to-t from-zinc-900/40 to-black relative z-10 border-t border-white/10 flex flex-col items-center justify-center py-6 overflow-hidden">
        {/* MagnetLines background specifically constrained to the footer */}
        <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
          <MagnetLines
            rows={12}
            columns={30}
            containerSize="100%"
            lineColor="rgba(255,255,255,0.8)"
            lineWidth="2px"
            lineHeight="20px"
            baseAngle={0}
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        {/* Crisp Text Layer */}
        <div className="relative z-20 flex flex-col items-center pointer-events-none">
          <Signature 
            text="Shantanu Joshi" 
            color="#ffffff" 
            fontSize={48} 
            inView={true} 
            duration={2.5}
            className="mb-4" 
          />

          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 text-white/90 font-mono text-[10px] md:text-xs tracking-widest uppercase mt-4 bg-white/[0.02] px-6 py-2.5 rounded-full backdrop-blur-lg shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
            <span>© {new Date().getFullYear()} Shantanu Joshi</span>
            <span className="hidden md:block w-1.5 h-1.5 bg-white/50 rounded-full" />
            <Link to="/metrics" className="hover:text-white transition-colors cursor-pointer flex items-center gap-2 group pointer-events-auto">
              <span>All Rights Reserved</span>
              <span className="text-white transition-colors opacity-0 group-hover:opacity-100">{">_"}</span>
            </Link>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
