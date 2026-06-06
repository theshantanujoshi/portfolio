import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const PROJECTS = [
  {
    id: 1,
    title: "CodeLore",
    description: "An AI-powered tool that helps developers understand large codebases faster. It maps repository structure into interactive 3D dependency graphs and execution traces, making complex architectures easier to explore in minutes.",
    github: "https://github.com/shantanu/codelore",
    screenshots: [
      "/codelore/01_landing.png",
      "/codelore/02_get_started.png",
      "/codelore/03_import.png",
      "/codelore/04_demo.png",
      "/codelore/05_cli_install.png",
      "/codelore/06_processing.png",
      "/codelore/07_dashboard_overview.png",
      "/codelore/08_dashboard_architecture.png",
      "/codelore/09_dashboard_files.png",
      "/codelore/10_dashboard_execution.png",
      "/codelore/11_dashboard_dependencies.png",
      "/codelore/12_dashboard_onboarding.png",
      "/codelore/13_dashboard_chat.png",
      "/codelore/14_dashboard_settings.png"
    ]
  },
  {
    id: 2,
    title: "AuraFit",
    description: "A dark-themed React and Tailwind CSS dashboard for tracking fitness, nutrition, and wellness data, with interactive charts and dynamic page backgrounds.",
    github: "https://github.com/shantanu/aurafit",
    screenshots: [
      "/aurafit/1.png",
      "/aurafit/2.png",
      "/aurafit/3.png",
      "/aurafit/4.png",
      "/aurafit/5.png"
    ]
  },
  {
    id: 3,
    title: "Holocron",
    description: "A 3D Star Wars universe explorer built with Next.js and R3F where one selection drives the galaxy, timeline, Force-lineage, and datapad. I contributed by engineering animated active story indicators for the NavRail and integrating thematic Aurebesh cipher easter eggs across key UI surfaces.",
    github: "https://github.com/adhit-r/holocron",
    screenshots: [
      "/holocron/Screenshot (179).png",
      "/holocron/Screenshot (180).png",
      "/holocron/Screenshot (181).png",
      "/holocron/Screenshot (182).png",
      "/holocron/Screenshot (183).png",
      "/holocron/Screenshot (184).png",
      "/holocron/Screenshot (185).png",
      "/holocron/Screenshot (186).png",
      "/holocron/Screenshot (187).png",
      "/holocron/Screenshot (188).png"
    ]
  }
];

const ProjectSection = ({ project, containerRef }: { project: typeof PROJECTS[0], containerRef?: React.RefObject<HTMLDivElement> }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    container: containerRef,
  });

  // Dynamically calculate horizontal scroll distance based on the number of items
  const endPercentage = -((project.screenshots.length - 1) / project.screenshots.length) * 100;
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `${endPercentage}%`]);

  // Snap out (scale up) at the beginning, stay scaled, snap back (scale down) at the end
  // Scaling from 0.5 to 1.0 means it literally doubles (200%) in size when it punches out.
  const scale = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0.5, 1, 1, 0.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0.2, 1, 1, 0.2]);

  return (
    <section ref={targetRef} className="relative h-[300vh] w-full border-t border-white/10">
      <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row items-center overflow-hidden">
        
        {/* Left: Info */}
        <div className="w-full md:w-[40%] h-full flex flex-col justify-center px-8 md:pl-24 md:pr-16 relative z-20">
           <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/40 mb-6 block">0{project.id} // Project</span>
           <h3 className="text-5xl md:text-7xl font-['Instrument_Serif'] text-white mb-6 leading-[1.1]">{project.title}</h3>
           <p className="text-white/60 font-light text-lg mb-10 max-w-md leading-relaxed">{project.description}</p>
           <a 
             href={project.github} 
             target="_blank" 
             rel="noreferrer"
             className="inline-flex items-center gap-3 text-xs tracking-widest uppercase text-white border border-white/20 px-8 py-4 rounded-full hover:bg-white hover:text-black transition-all duration-300 w-max group"
           >
              View Repository 
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
           </a>
        </div>

        {/* Right: Scrolling Screenshots */}
        <div className="w-full md:w-[60%] h-full flex items-center overflow-hidden pl-8 md:pl-0">
           <motion.div style={{ x }} className="flex items-center gap-8 md:gap-16 w-max pr-24">
             {project.screenshots.map((src, i) => (
                <motion.div 
                  key={i} 
                  style={{ scale, opacity }}
                  className={`aspect-video w-[85vw] md:w-[60vw] max-w-[1200px] shrink-0 rounded-[1rem] md:rounded-[2rem] border border-white/20 bg-black flex items-center justify-center relative overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.9)]`}
                >
                   <img src={src} className="absolute inset-0 w-full h-full object-cover" alt={`Project Image ${i + 1}`} />
                </motion.div>
             ))}
           </motion.div>
        </div>

      </div>
    </section>
  );
};

export default function StickyProjectList({ containerRef }: { containerRef?: React.RefObject<HTMLDivElement> }) {
  return (
    <div className="w-full flex flex-col relative z-10">
      {PROJECTS.map((proj) => (
        <ProjectSection key={proj.id} project={proj} containerRef={containerRef} />
      ))}
    </div>
  );
}
