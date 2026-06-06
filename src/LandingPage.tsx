import { motion, useAnimation } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HlsVideo from './HlsVideo';
import LineWaves from './LineWaves';
import ScrollVelocity from './ScrollVelocity';

export default function LandingPage({ onTriggerTransition }: { onTriggerTransition: () => void }) {
  const controls = useAnimation();
  const [isTriggered, setIsTriggered] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.fromReverse) {
      // Scale 4x prevents the browser from crashing/clipping while still giving a zoom effect
      controls.set({ scale: 4, opacity: 0, filter: "blur(5px)" });
      controls.start({ 
        scale: 1, 
        opacity: 1, 
        filter: "blur(0px)", 
        transition: { duration: 0.75, ease: [0.65, 0, 0.35, 1], delay: 0.1 } 
      });
    } else {
      controls.set({ scale: 1, opacity: 1, filter: "blur(0px)" });
    }
  }, [location, controls]);

  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY > 50 && !isTriggered) {
      triggerNavigate();
    }
  };

  let touchStartY = 0;
  const handleTouchStart = (e: React.TouchEvent) => { touchStartY = e.touches[0].clientY; };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartY - e.touches[0].clientY > 50 && !isTriggered) {
      triggerNavigate();
    }
  };

  const triggerNavigate = () => {
    setIsTriggered(true);
    controls.start({ 
      scale: 4, 
      opacity: 0, 
      filter: "blur(5px)", 
      transition: { duration: 0.75, ease: [0.65, 0, 0.35, 1] } 
    });
    onTriggerTransition();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      transition={{ type: "spring", bounce: 0, duration: 1.2 }}
      className="h-screen w-full overflow-hidden bg-black relative touch-none"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <motion.div 
        animate={controls}
        className="absolute inset-0 w-full h-full origin-center flex flex-col items-center justify-center"
        style={{ willChange: "transform, opacity, filter", backfaceVisibility: "hidden" }}
      >
        {/* STATIC BACKGROUND */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <div className="absolute inset-0 z-0">
            <HlsVideo
              src="https://stream.mux.com/tLkHO1qZoaaQOUeVWo8hEBeGQfySP02EPS02BmnNFyXys.m3u8"
              className="w-full h-full object-cover object-center"
              muted
              autoPlay
              loop
              playsInline
            />
          </div>
          <div className="absolute inset-0 z-10 opacity-70 mix-blend-screen">
            <LineWaves
              speed={0.3}
              innerLineCount={32}
              outerLineCount={36}
              warpIntensity={1.0}
              rotation={-45}
              edgeFadeWidth={0.0}
              colorCycleSpeed={1.0}
              brightness={0.12}
              color1="#ffffff"
              color2="#ffffff"
              color3="#ffffff"
              enableMouseInteraction={true}
              mouseInfluence={2.0}
            />
          </div>
          <div className="absolute inset-0 z-20 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.6)_0%,transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,1)_100%)]" />
            <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,1)]" />
          </div>
        </div>

        {/* ELEGANT CINEMATIC HERO TYPOGRAPHY */}
        <div className="relative flex flex-col items-center justify-center text-center px-6 pointer-events-none z-20 origin-center">
          <h1 className="text-7xl md:text-8xl lg:text-9xl text-white tracking-tight whitespace-nowrap font-['Instrument_Serif'] drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]">
            Shantanu <em className="italic text-white/80">Joshi</em>
          </h1>
          <div className="mt-10 drop-shadow-[0_0_15px_rgba(0,0,0,0.8)] z-20">
            <p className="text-white/70 text-sm md:text-base font-medium tracking-[0.3em] uppercase">
              Frontend Engineer <span className="text-white/30 mx-2">|</span> Technical Writer <span className="text-white/30 mx-2">|</span> Operations Manager
            </p>
          </div>

          {/* SCROLL VELOCITY MARQUEE */}
          <div className="mt-12 w-[100vw] overflow-hidden opacity-50 z-10 pointer-events-none">
            <ScrollVelocity
              texts={[
                "product strategist • creative technologist • systems thinker • ui architect • problem solver • experience designer • clean code advocate • design system builder • workflow optimizer • visual storyteller • technical translator • interaction designer • community builder • web performance optimizer • documentation architect • strategic executor • detail oriented builder • interface designer • logic driven builder • cross functional collaborator • operational streamliner • digital craftsman • pattern finder • information architect • growth enabler • ",
                "product stylist • analytical thinker • framework agnostic developer • resource orchestrator • project catalyst • spatial ui thinker • automation enthusiast • technical catalyst • complexity reducer • collaborative facilitator • delivery strategist • pixel precise pragmatist • kinetic ui builder • aesthetic minimalist • code artisan • tech stack navigator • infrastructure synthesizer • knowledge synthesizer • perpetual learner • pragmatic idealist • vision executor • content architect • clarifying voice • conceptual thinker • chaos coordinator • "
              ]} 
              velocity={30} 
              className="text-white"
            />
          </div>
        </div>
      </motion.div>
      
    </motion.div>
  );
}
