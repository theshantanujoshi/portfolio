import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiGithub, FiLinkedin, FiClock, FiCode, FiMusic, FiArrowLeft, FiEye, FiTrendingUp } from 'react-icons/fi';
import { SiSpotify } from 'react-icons/si';
import { ActivityCalendar } from 'react-activity-calendar';

const BENTO_ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0, duration: 0.8 } }
};

export default function MetricsPage() {
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());
  const [githubData, setGithubData] = useState([]);
  const [views, setViews] = useState(null);

  const [spotifyData, setSpotifyData] = useState({
    song: "Not Playing",
    artist: "Spotify",
    albumArt: "https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452",
    isPlaying: false
  });

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const res = await fetch('https://api.counterapi.dev/v1/theshantanujoshi/portfolio/up');
        if (res.ok) {
          const data = await res.json();
          setViews(data.count);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchViews();
  }, []);

  useEffect(() => {
    const fetchSpotify = async () => {
      try {
        const res = await fetch('/api/spotify');
        if (res.ok) {
          const data = await res.json();
          if (data.isPlaying) {
            setSpotifyData({
              song: data.title,
              artist: data.artist,
              albumArt: data.albumImageUrl,
              isPlaying: true
            });
          } else {
            setSpotifyData(prev => ({ ...prev, isPlaying: false }));
          }
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchSpotify();
    const interval = setInterval(fetchSpotify, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchGithub = async () => {
      try {
        const res = await fetch('https://github-contributions-api.deno.dev/theshantanujoshi.json');
        if (res.ok) {
          const data = await res.json();
          // The API returns an object with a 'contributions' array of arrays (weeks)
          const flatContributions = data.contributions.flat();
          
          const levelMap = {
            NONE: 0,
            FIRST_QUARTILE: 1,
            SECOND_QUARTILE: 2,
            THIRD_QUARTILE: 3,
            FOURTH_QUARTILE: 4
          };

          const currentYear = new Date().getFullYear().toString();
          const currentYearContributions = flatContributions.filter(day => day.date.startsWith(currentYear));

          const formattedData = currentYearContributions.map(day => ({
            date: day.date,
            count: day.contributionCount,
            level: levelMap[day.contributionLevel] || 0
          }));
          
          setGithubData(formattedData);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchGithub();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 lg:p-24 overflow-y-auto selection:bg-white/30 relative z-10">
      {/* Background ambient glow */}
      <div className="fixed top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex items-center justify-between mb-12"
      >
        <div>
          <h1 className="text-4xl md:text-5xl font-['Instrument_Serif'] italic tracking-tight">Behind the scenes</h1>
        </div>
        
        <button 
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-white/50 hover:text-white transition-colors font-mono text-sm uppercase tracking-widest px-4 py-2 rounded-full border border-white/10 hover:border-white/30 hover:bg-white/5"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Return
        </button>
      </motion.div>

      {/* Bento Layout */}
      <motion.div 
        className="flex flex-col gap-4 md:gap-6 max-w-4xl mx-auto"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.1 }}
      >

        {/* 1. Big GitHub Header */}
        <motion.div variants={BENTO_ITEM_VARIANTS} className="w-full bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col hover:bg-white/[0.05] transition-colors overflow-hidden">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-white/50 font-mono text-xs uppercase tracking-widest mb-1">GitHub Activity</p>
            </div>
            <FiGithub size={32} className="text-white/50" />
          </div>
          
          <div className="flex justify-center overflow-x-auto overflow-y-hidden pb-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            <div className="min-w-max">
              {githubData.length > 0 ? (
                <ActivityCalendar 
                  data={githubData}
                  colorScheme="dark"
                  theme={{
                    dark: ['#1a1a1a', '#064e3b', '#047857', '#10b981', '#34d399']
                  }}
                  fontSize={12}
                  blockSize={14}
                  blockMargin={4}
                />
              ) : (
                <div className="animate-pulse w-[800px] h-[120px] bg-white/5 rounded-md" />
              )}
            </div>
          </div>
        </motion.div>

        {/* Bottom Row: Local Time + Spotify + Analytics */}
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 w-full">
          
          {/* 2. Local Time */}
          <motion.div variants={BENTO_ITEM_VARIANTS} className="flex-1 min-w-[200px] bg-white/[0.03] border border-white/10 rounded-3xl p-6 flex flex-col justify-between hover:bg-white/[0.05] transition-colors relative overflow-hidden">
            <div className="absolute -bottom-10 -right-10 text-white/5 pointer-events-none">
              <FiClock size={160} />
            </div>
            <p className="text-white/50 font-mono text-xs uppercase tracking-widest mb-1">Local Time</p>
            <div className="mt-auto z-10 pt-12">
              <h3 className="text-4xl xl:text-5xl font-light tracking-tight">
                {time.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute:'2-digit' })}
              </h3>
              <p className="text-white/50 text-sm mt-2">GMT+5:30 (IST)</p>
            </div>
          </motion.div>

          {/* 3. Spotify */}
          <motion.div variants={BENTO_ITEM_VARIANTS} className="flex-[1.5] bg-white/[0.03] border border-white/10 rounded-3xl p-6 relative overflow-hidden group flex flex-col sm:flex-row items-center gap-6 hover:bg-white/[0.05] transition-colors">
            <div className="absolute top-6 right-6 text-[#1DB954]">
              <SiSpotify size={24} className="animate-pulse" />
            </div>
            
            {/* Vinyl Image */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden shrink-0 shadow-[0_0_20px_rgba(29,185,84,0.3)] animate-[spin_4s_linear_infinite]">
              <img src={spotifyData.albumArt} alt="Album Art" className="w-full h-full object-cover" />
            </div>
            
            {/* Track Info */}
            <div className="flex flex-col w-full z-10 text-center sm:text-left">
              <p className="text-white/50 font-mono text-xs uppercase tracking-widest mb-1">Vibing To</p>
              <h3 className="text-xl sm:text-2xl font-semibold tracking-tight mb-1 truncate max-w-[200px] sm:max-w-[250px]">{spotifyData.song}</h3>
              <p className="text-white/70 text-sm sm:text-base">{spotifyData.artist}</p>
              
              {/* Audio Visualizer (No Progress Bar) */}
              <div className={`mt-4 flex items-end gap-1 h-5 ${!spotifyData.isPlaying ? 'hidden' : 'justify-center sm:justify-start'}`}>
                {[...Array(8)].map((_, i) => (
                  <motion.div 
                    key={i}
                    className="w-1.5 bg-[#1DB954] rounded-t-sm"
                    animate={{ height: ['20%', '100%', '40%', '80%', '30%'] }}
                    transition={{ duration: 1.2, repeat: Infinity, repeatType: "mirror", delay: i * 0.1 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* 4. Analytics */}
          <motion.div variants={BENTO_ITEM_VARIANTS} className="flex-1 min-w-[200px] bg-white/[0.03] border border-white/10 rounded-3xl p-6 flex flex-col justify-between hover:bg-white/[0.05] transition-colors relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 text-[#3b82f6]/10 pointer-events-none group-hover:text-[#3b82f6]/20 transition-colors">
              <FiEye size={160} />
            </div>
            <div className="flex justify-between items-start mb-6">
              <p className="text-white/50 font-mono text-xs uppercase tracking-widest mb-1">Total Views</p>
            </div>
            <div className="mt-auto z-10 pt-8">
              <h3 className="text-4xl xl:text-5xl font-light tracking-tight font-mono">
                {views === null ? '---' : views.toLocaleString()}
              </h3>
              <p className="text-white/50 text-sm mt-2 flex items-center gap-2">
                <FiTrendingUp /> Global traffic
              </p>
            </div>
          </motion.div>

        </div>



      </motion.div>
    </div>
  );
}
