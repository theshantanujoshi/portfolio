import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import DarkVeil from './DarkVeil';
import { useOptimizedScroll } from './useOptimizedScroll';

const timelineData = [
  {
    year: 'May 2026 - Present',
    role: 'Head of Ground Operations',
    company: 'Bits&Bytes',
    description: 'Leading on-ground logistics, infrastructure setup, and floor coordination for a 1,500+ student developer community, making sure both execution and energy stay on track.',
  },
  {
    year: 'Apr 2026 - May 2026',
    role: 'Creative Contributor',
    company: 'Bits&Bytes',
    description: 'Ensured our digital presence stays as permissionless (and slightly unhinged) as the forks we’re building. Translated technical jargon into layman\'s words to communicate stories rather than just announcements.',
  },
  {
    year: 'May 2026 - Present',
    role: 'Volunteer',
    company: 'Hack4Good',
    description: 'Managing on-ground developer engagement, keeping the energy up during high-intensity AI sprints, and capturing content in real time. Supporting basecamp logistics and documenting the work as it happens.',
  },
  {
    year: 'Nov 2025 - Present',
    role: 'Member',
    company: 'Google Developer Student Clubs',
    description: 'Connected with engineers, designers, and builders through GDG Lucknow to share ideas on software architecture, cloud systems, and current engineering practices.',
  },
  {
    year: 'Jul 2025 - Nov 2025',
    role: 'Web Engineer Lead',
    company: 'XFRUS',
    description: 'Engineered the secure frontend architecture for a post incident cybercrime support system, building optimized, intuitive interfaces to assist victims under high pressure scenarios.',
  },
  {
    year: 'Jul 2025 - Aug 2025',
    role: 'Generative AI Engineer',
    company: 'Tata Group',
    description: 'Conducted exploratory data analysis using GenAI tools to assess data quality, identify risk indicators, and proposed an initial no-code predictive modeling framework to assess customer delinquency risk.',
  },
  {
    year: 'Jun 2025 - Jul 2025',
    role: 'Quantitative Researcher',
    company: 'JPMorganChase',
    description: 'Focused on quantitative research methods, analyzed a book of loans to estimate a customer\'s probability of default and used dynamic programming to convert FICO scores into categorical data to predict defaults.',
  },
  {
    year: 'Aug 2024 - Aug 2028',
    role: 'BS, AI & Data Science',
    company: 'IIT Jodhpur',
    description: 'Focus areas include Foundational Data Science, Linear Algebra, Calculus, Probability & Statistics, Programming & Data Structures, and Fundamentals of AI & ML.',
  },
  {
    year: 'Apr 2020 - Apr 2024',
    role: 'High School (Science)',
    company: 'R.L.B. Memorial School',
    description: 'Core focus on Physics, Chemistry, Mathematics, and Computer Science.',
  },
  {
    year: 'Apr 2015 - Apr 2020',
    role: 'Middle School',
    company: 'City Montessori School',
    description: 'The absolute origin point of the journey.',
  }
];

export default function ExperiencePage({ 
  onTriggerReverseTransition,
  onTriggerForwardTransition 
}: { 
  onTriggerReverseTransition: () => void,
  onTriggerForwardTransition: () => void 
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  
  const springConfig = { stiffness: 40, damping: 15, mass: 0.1, restDelta: 0.001 };
  
  const { scrollYProgress: rawTimelineScroll } = useScroll({
    container: containerRef,
    target: timelineRef,
    offset: ["start center", "end center"]
  });
  const smoothTimelineScroll = useSpring(rawTimelineScroll, springConfig);
  const lightsaberHeight = useTransform(smoothTimelineScroll, [0, 1], ["0%", "100%"]);

  useOptimizedScroll({
    containerRef,
    onReverse: onTriggerReverseTransition,
    onForward: onTriggerForwardTransition
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
      {/* REACT BITS DARK VEIL BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-80 mix-blend-screen grayscale contrast-150 brightness-150">
        <DarkVeil 
          hueShift={0}
          noiseIntensity={0.15}
          scanlineIntensity={0.2}
          speed={0.4}
          scanlineFrequency={800}
          warpAmount={0.8}
        />
      </div>

      {/* TIMELINE SECTION */}
      <div 
        className="relative z-10 bg-transparent min-h-screen w-full px-6 py-32 pb-32 flex flex-col items-center pt-[15vh]"
      >
        <motion.div 
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", bounce: 0, duration: 1.4 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-5xl w-full"
          style={{ willChange: "transform, opacity" }}
        >
          <h2 className="text-5xl md:text-7xl text-white tracking-tight font-['Instrument_Serif'] mb-32 text-center drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]">
            The <em className="italic text-white/60">Journey</em>
          </h2>

          <div className="relative" ref={timelineRef}>
            <div className="absolute left-[20px] md:left-1/2 top-4 bottom-0 w-[2px] bg-white/10 -translate-x-1/2 rounded-full overflow-hidden">
              <motion.div 
                style={{ height: lightsaberHeight, willChange: "height" }}
                className="w-full bg-white shadow-[0_0_15px_3px_rgba(255,255,255,0.8),0_0_30px_5px_rgba(255,255,255,0.5)] origin-top"
              />
            </div>

            <div className="flex flex-col gap-24 relative z-10">
              {timelineData.map((item, i) => {
                const isEven = i % 2 === 0;
                return (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: isEven ? -60 : 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ type: "spring", bounce: 0, duration: 1.2 }}
                    viewport={{ once: true, margin: "-20%" }}
                    className="relative pl-[60px] md:pl-0 md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8 items-center group w-full"
                    style={{ willChange: "transform, opacity" }}
                  >
                    <div className="absolute left-[20px] md:static md:w-[10px] md:h-[10px] md:mx-auto md:order-2">
                      <div className="w-[10px] h-[10px] rounded-full bg-black border-2 border-white/50 group-hover:border-white group-hover:bg-white group-hover:scale-[1.3] group-hover:shadow-[0_0_20px_rgba(255,255,255,0.9)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-20 relative transform -translate-x-1/2 md:translate-x-0" />
                    </div>

                    <div className={`${isEven ? 'md:order-1 md:text-right md:pr-16' : 'md:order-3 md:text-left md:pl-16'} flex flex-col justify-center`}>
                      <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/50 block mb-3">
                        {item.year} &nbsp;&middot;&nbsp; {item.company}
                      </span>
                      <h3 className="text-3xl md:text-5xl font-['Instrument_Serif'] text-white mb-6 leading-[1.1] tracking-tight">
                        {item.role}
                      </h3>
                      <p className={`text-[17px] text-white/60 leading-[1.7] font-light ${isEven ? 'md:ml-auto' : ''} max-w-[32rem]`}>
                        {item.description}
                      </p>
                    </div>

                    <div className={`hidden md:block ${isEven ? 'md:order-3' : 'md:order-1'}`} />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      {/* INVISIBLE MOMENTUM BUFFER TO ALLOW SABER TO REACH THE END */}
      <div className="h-[35vh] w-full pointer-events-none" />

    </motion.div>
  );
}
