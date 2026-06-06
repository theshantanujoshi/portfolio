import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';
import DotGrid from './DotGrid';
import { useOptimizedScroll } from './useOptimizedScroll';

// --- MOCK DATA ---
const BLOG_ENTRIES = [
  {
    date: "MAY 29, 2026",
    title: "After School",
    content: "At some point, life quietly shifts from school and sunshine into resumes, LinkedIn, and all the things nobody properly prepared you for. School feels difficult when you are in it, but it still does not prepare you for the hardest part, which is figuring out how the real world works once the structure disappears. I say this a lot about the Indian education system: there is neither much education nor much system in it. We are often just rats in a spinning wheel, and the moment we step out, reality hits. You realize that no one handed you a playbook for the actual game. But maybe that was always going to happen. So instead of spending all our time complaining about the wheel, we might as well learn how to exist in the chaos and still win. We are going to fall, we are going to rise, and we are going to keep rising until the system has to adapt to us, not the other way around. Let’s connect, collaborate, and create."
  },
  {
    date: "MAY 26, 2026",
    title: "Making Connections",
    content: "Everyone says “make connections, it is going to get you somewhere in life,” but almost nobody tells you how. For extroverts, walking up to someone and starting a conversation might come naturally, but for people who are shy, quiet, or have spent most of their life being introverted, that advice is useless without a playbook. The reality is that there is no single textbook way to build connections, but there are patterns that work. Proof of work speaks louder than loud self-promotion, so document what you are doing. A bug you fixed, a paper you read, or even a quote that stayed with you can help people see that you actually do things. If you hit a wall and do not know anyone, look for people on GitHub working on similar projects and send a simple, direct message asking one real question. That is often enough to start a useful relationship. If you admire what a company is building and want to intern there but feel too shy to cold email, solve an issue in their public repository and open a PR. They will notice. And if crowds scare you, hackathons do not have to mean performing in front of everyone. Sometimes it is enough to stand near a project demo, listen, and then join the conversation with one thoughtful insight. Most LinkedIn connections are just profile decoration. Real connections are the ones you can message at midnight about a terrible bug and know they will actually help."
  },
  {
    date: "MAY 25, 2026",
    title: "Proof of Work",
    content: "Learning a new skill has turned into an internet ritual. Most people follow the same pattern: open YouTube, search for a roadmap, find a playlist that is 8, 12, or 20 hours long, feel productive for five minutes, and then lose focus before finishing it. Even for the people who do make it to the end, there is still one obvious question: what did you actually make? That is the gap. Tutorials feel productive, but they are still consumption. If you want credibility in any domain, you need proof of work, something built and something visible. If you want a realistic path from zero to shipping projects, the formula is simple: learn, build, and document your work in public. There is also zero need for fake free trials or platforms asking for your card before teaching you anything. The resource stack matters, but the strategy matters more than the list. Pick one step, finish the resource, build one small project, post it, and then move on. Do not spend months consuming content with nothing to show for it."
  },
  {
    date: "MAY 23, 2026",
    title: "On Open Source",
    content: "Open source is a wild space. I spent the last month diving into public repositories to understand what all the buzz was about, and honestly, there are two very real sides to it. Some people contribute to build a personal brand, which is completely valid, while others do it purely because they love the process of building in public. I still do not fully know which category I fall into, but I got the chance to ship code to two great projects: Holocron by Adhithya Rajasekaran, a 3D Star Wars universe explorer, and works-on-my-resume by William Zujkowski, a markdown resume renderer with local previews and clean exports. Open source is often treated like a sprint, and timing collisions are real. Your PR can get overtaken by an in-house patch or need serious rework because the main branch is moving too fast. But seeing maintainers genuinely value your code changes your whole perspective. Huge shoutout to William for breaking down my patch layout and calling it “clean” and “the right shape” even when a timing collision closed the PR, and massive thanks to Adhithya for preserving my original commits and resolving runtime conflicts to merge my mobile parity audit and UX fixes. Open source feels a lot like organizing a bada mangal ka bhandara. People just build things in public for everyone to use."
  }
];

const PHOTOS = [
  { id: 1, url: "/gallery/IMG20260502193852.jpg" },
  { id: 2, url: "/gallery/IMG20260516184409.jpg" },
  { id: 3, url: "/gallery/IMG20260517213029.jpg" },
  { id: 4, url: "/gallery/IMG20260518191726.jpg" },
  { id: 5, url: "/gallery/IMG20260524205140.jpg" },
  { id: 7, url: "/gallery/IMG20260531181655.jpg" },
  { id: 8, url: "/gallery/IMG_20220816_131215.jpg" },
  { id: 9, url: "/gallery/IMG_20220817_105255.jpg" },
  { id: 10, url: "/gallery/IMG_20220817_125516.jpg" },
  { id: 11, url: "/gallery/IMG_20220817_125554.jpg" },
  { id: 12, url: "/gallery/IMG_20220817_171451.jpg" },
  { id: 13, url: "/gallery/IMG_20221016_165148.jpg" },
  { id: 14, url: "/gallery/IMG_20221016_165215.jpg" },
  { id: 15, url: "/gallery/IMG_20240123_201123.jpg" },
  { id: 16, url: "/gallery/IMG_20240224_114950.jpg" },
  { id: 17, url: "/gallery/IMG_20240302_192026.jpg" },
  { id: 18, url: "/gallery/IMG_20241028_104830.jpg" },
  { id: 19, url: "/gallery/IMG_20250206_181618.jpg" },
  { id: 20, url: "/gallery/IMG_20250208_183715.jpg" },
  { id: 21, url: "/gallery/IMG_20250208_193931.jpg" },
  { id: 22, url: "/gallery/IMG_20250208_200014.jpg" },
  { id: 23, url: "/gallery/IMG_20250209_172340.jpg" },
  { id: 24, url: "/gallery/IMG_20250210_140232.jpg" },
  { id: 25, url: "/gallery/IMG_20250315_182916.jpg" },
  { id: 26, url: "/gallery/IMG_20250315_183228.jpg" },
  { id: 27, url: "/gallery/IMG_20250517_182317.jpg" },
  { id: 28, url: "/gallery/IMG_20251031_201321.jpg" },
  { id: 29, url: "/gallery/IMG_20251101_075002.jpg" },
  { id: 30, url: "/gallery/IMG_20251103_165459.jpg" },
  { id: 31, url: "/gallery/IMG_20251115_131445.jpg" },
  { id: 32, url: "/gallery/IMG_20251209_085946.jpg" },
  { id: 33, url: "/gallery/IMG_20251209_121640.jpg" },
  { id: 34, url: "/gallery/IMG_20251210_080834.jpg" },
  { id: 35, url: "/gallery/IMG_20251210_214714.jpg" },
  { id: 36, url: "/gallery/IMG_20251210_215400.jpg" },
  { id: 37, url: "/gallery/IMG_20251211_100657.jpg" },
  { id: 38, url: "/gallery/IMG_20251211_101020.jpg" },
  { id: 39, url: "/gallery/IMG_20260320_173112.jpg" },
  { id: 40, url: "/gallery/IMG_20260320_180930.jpg" },
  { id: 41, url: "/gallery/IMG_20260322_084316.jpg" },
  { id: 42, url: "/gallery/IMG_20260328_175048.jpg" },
  { id: 43, url: "/gallery/Screenshot_2024-01-22-19-36-19-133_com.miui.gallery.jpg" },
];

export default function SplitScreenPage({ 
  onTriggerReverseTransition,
  onTriggerForwardTransition
}: { 
  onTriggerReverseTransition: () => void;
  onTriggerForwardTransition: () => void;
}) {
  const leftScrollRef = useRef<HTMLDivElement>(null);
  const rightScrollRef = useRef<HTMLDivElement>(null);
  
  // Use independent motion values for flex properties
  const leftRatio = useMotionValue(1);
  const rightRatio = useMotionValue(1);
  
  const leftFlex = useSpring(leftRatio, { stiffness: 50, damping: 20, mass: 0.5 });
  const rightFlex = useSpring(rightRatio, { stiffness: 50, damping: 20, mass: 0.5 });

  const [hoveredSide, setHoveredSide] = useState<'left' | 'right' | null>(null);

  const handleBlogEnter = () => { 
    leftRatio.set(1.5); rightRatio.set(1); 
    setHoveredSide('left');
  };
  
  const handleGalleryEnter = () => { 
    leftRatio.set(1); rightRatio.set(1.5); 
    setHoveredSide('right');
  };

  const handleContainerLeave = () => { 
    leftRatio.set(1); rightRatio.set(1); 
    setHoveredSide(null);
  };

  useOptimizedScroll({
    containerRef: leftScrollRef,
    onReverse: onTriggerReverseTransition,
    onForward: onTriggerForwardTransition
  });

  useOptimizedScroll({
    containerRef: rightScrollRef,
    onReverse: onTriggerReverseTransition,
    onForward: onTriggerForwardTransition
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      transition={{ type: "spring", bounce: 0, duration: 1.2 }}
      className="w-full h-screen flex overflow-hidden relative cursor-default"
      onMouseLeave={handleContainerLeave}
    >
      {/* Global Interactive Backgrounds */}
      <div className="absolute inset-0 z-0 pointer-events-auto opacity-30 mix-blend-screen">
        <DotGrid
          dotSize={4}
          gap={24}
          baseColor="#ffffff"
          activeColor="#ffffff"
          proximity={150}
          shockRadius={250}
          shockStrength={10}
        />
      </div>
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_25%_50%,_rgba(255,255,255,0.05),_transparent_50%)]"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_75%_50%,_rgba(180,151,207,0.15),_transparent_50%)]"
        animate={{ opacity: hoveredSide === 'right' ? 1 : 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />

      {/* LEFT PANEL: BLOG */}
      <motion.div 
        ref={leftScrollRef}
        style={{ flex: leftFlex }} 
        onMouseEnter={handleBlogEnter}
        className="h-full bg-black/60 overflow-y-auto overflow-x-hidden relative transition-colors duration-500 hover:bg-black/20 border-r border-white/5 z-10"
      >
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none z-0 fixed" />
        
        {/* We use width percentage maxs so it gracefully scales down instead of overflowing */}
        <div className="w-full max-w-3xl mx-auto px-8 md:px-16 py-32 relative z-10">
          <h2 className="text-4xl md:text-6xl text-white font-['Instrument_Serif'] mb-24 tracking-tight">
            Journal &<br /><em className="italic text-white/50">Musings</em>
          </h2>

          <div className="flex flex-col gap-24">
            {BLOG_ENTRIES.map((entry, idx) => (
              <article key={idx} className="group">
                <span className="font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase block mb-4 group-hover:text-white/60 transition-colors">
                  {entry.date}
                </span>
                <h3 className="text-3xl text-white font-['Instrument_Serif'] mb-6">
                  {entry.title}
                </h3>
                <p className="text-white/60 font-light leading-relaxed text-base md:text-lg">
                  {entry.content}
                </p>
              </article>
            ))}
          </div>
        </div>
      </motion.div>

      {/* RIGHT PANEL: PHOTOGRAPHY */}
      <motion.div 
        ref={rightScrollRef}
        style={{ flex: rightFlex }} 
        onMouseEnter={handleGalleryEnter}
        className="h-full bg-black/60 relative overflow-y-auto overflow-x-hidden transition-colors duration-500 hover:bg-black/20 z-10"
      >
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none z-0 fixed" />
        
        <div className="w-full p-4 md:p-8 relative z-10">
           <div className="columns-1 md:columns-2 gap-4 md:gap-8 space-y-4 md:space-y-8">
             {PHOTOS.map((photo) => (
               <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="break-inside-avoid"
               >
                 <img 
                   src={photo.url} 
                   alt="Gallery Photography" 
                   className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out"
                   loading="lazy"
                 />
               </motion.div>
             ))}
           </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
