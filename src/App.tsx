import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import LandingPage from './LandingPage';
import ExperiencePage from './ExperiencePage';
import ProjectsPage from './ProjectsPage';
import SplitScreenPage from './SplitScreenPage';
import ContactPage from './ContactPage';
import MetricsPage from './MetricsPage';
import WindupPage from './WindupPage';
import HyperspeedTransition from './HyperspeedTransition';
import { AnimatePresence, motion } from 'framer-motion';

const pageVariants = {
  initial: (direction: 'forward' | 'reverse' | 'none') => {
    if (direction === 'none') return { opacity: 0 };
    return {
      y: direction === 'forward' ? '100vh' : '-100vh',
      opacity: 0,
    };
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", bounce: 0, duration: 1.2 }
  },
  exit: (direction: 'forward' | 'reverse' | 'none') => {
    if (direction === 'none') return { opacity: 0, transition: { duration: 0.2 } };
    return {
      y: direction === 'forward' ? '-100vh' : '100vh',
      opacity: 0,
      transition: { type: "spring", bounce: 0, duration: 1.2 }
    };
  }
};

function PageWrapper({ children, direction }: { children: React.ReactNode, direction: 'forward' | 'reverse' | 'none' }) {
  return (
    <motion.div
      custom={direction}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full h-[100dvh] absolute inset-0 bg-black pointer-events-auto"
    >
      {children}
    </motion.div>
  );
}

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [hyperspeedActive, setHyperspeedActive] = useState(false);
  const [hyperspeedDir, setHyperspeedDir] = useState<'forward' | 'reverse'>('forward');
  const [slideDirection, setSlideDirection] = useState<'forward' | 'reverse' | 'none'>('none');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Stop music if leaving the secret areas
  useEffect(() => {
    if (location.pathname !== '/metrics' && location.pathname !== '/windup') {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+M (Mac) or Ctrl+M (Windows/Linux)
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'm') {
        e.preventDefault();
        
        // Prevent multiple triggers if already in the secret flow
        if (location.pathname === '/windup' || location.pathname === '/metrics') {
          return;
        }

        // Start the music immediately
        if (!audioRef.current) {
          audioRef.current = new Audio('https://matias.me/nsfw/konga.92cb31af.mp3');
          audioRef.current.loop = true;
        }
        audioRef.current.play();

        // Show the dancing ditto immediately
        setSlideDirection('forward');
        navigate('/windup');

        // Wait 30 seconds, then open the dashboard while the music keeps playing
        // Use replace: true so the "Return" button bypasses the windup page
        setTimeout(() => {
          navigate('/metrics', { replace: true });
        }, 30000);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, location.pathname]);

  const handleNavigation = (targetPath: string, direction: 'forward' | 'reverse') => {
    if (hyperspeedActive) return;

    // Determine if this navigation warrants the intense Hyperspeed effect
    const isEntry = location.pathname === '/' && targetPath === '/experience';
    const isExit = location.pathname === '/experience' && targetPath === '/';
    const useHyperspeed = isEntry || isExit;

    if (useHyperspeed) {
      setSlideDirection('none'); // Prevent sliding during hyperspeed jump
      setHyperspeedDir(direction);
      setHyperspeedActive(true);
      
      setTimeout(() => {
        navigate(targetPath, { state: { fromReverse: direction === 'reverse' } });
        window.scrollTo(0, 0);
        
        setTimeout(() => {
          setHyperspeedActive(false);
        }, 350);
      }, 400);
    } else {
      // Native sliding transition
      setSlideDirection(direction);
      navigate(targetPath, { state: { fromReverse: direction === 'reverse' } });
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="bg-black text-white selection:bg-white/30 font-sans relative min-h-screen overflow-hidden">
      <HyperspeedTransition isActive={hyperspeedActive} direction={hyperspeedDir} />
      
      <AnimatePresence custom={slideDirection}>
        <Routes location={location} key={location.pathname}>
          <Route 
            path="/" 
            element={
              <PageWrapper direction={slideDirection}>
                <LandingPage 
                  onTriggerTransition={() => handleNavigation('/experience', 'forward')} 
                />
              </PageWrapper>
            } 
          />
          <Route 
            path="/experience" 
            element={
              <PageWrapper direction={slideDirection}>
                <ExperiencePage 
                  onTriggerReverseTransition={() => handleNavigation('/', 'reverse')}
                  onTriggerForwardTransition={() => handleNavigation('/projects', 'forward')}
                />
              </PageWrapper>
            } 
          />
          <Route 
            path="/projects" 
            element={
              <PageWrapper direction={slideDirection}>
                <ProjectsPage 
                  onTriggerTransition={(dir) => handleNavigation(dir === 'forward' ? '/journal' : '/experience', dir)}
                />
              </PageWrapper>
            } 
          />
          <Route 
            path="/journal" 
            element={
              <PageWrapper direction={slideDirection}>
                <SplitScreenPage 
                  onTriggerReverseTransition={() => handleNavigation('/projects', 'reverse')}
                  onTriggerForwardTransition={() => handleNavigation('/contact', 'forward')}
                />
              </PageWrapper>
            } 
          />
          <Route 
            path="/contact" 
            element={
              <PageWrapper direction={slideDirection}>
                <ContactPage 
                  onTriggerReverseTransition={() => handleNavigation('/journal', 'reverse')}
                />
              </PageWrapper>
            } 
          />
          <Route 
            path="/metrics" 
            element={
              <PageWrapper direction={slideDirection}>
                <MetricsPage />
              </PageWrapper>
            } 
          />
          <Route 
            path="/windup" 
            element={
              <PageWrapper direction={slideDirection}>
                <WindupPage />
              </PageWrapper>
            } 
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
