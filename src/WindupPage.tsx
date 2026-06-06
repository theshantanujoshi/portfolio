import { motion } from 'framer-motion';

const DANCING_GIFS = [
  "https://tenor.com/view/cat-dance-cat-cat-dancing-dancing-cat-daily-cat-dance-gif-15678680634713803928.gif",
  "https://tenor.com/view/animated-animated-dog-dancing-dancing-dog-happy-dog-gif-1873593611143329153.gif",
  "https://tenor.com/view/betterttv-cute-cat-dance-animated-gif-15582849567129388748.gif",
  "https://tenor.com/view/potatoz-potato-potz-happy-dance-gif-17822977044356267268.gif",
  "https://tenor.com/view/green-animator-vs-animation-gif-15977584893997656383.gif",
  "https://tenor.com/view/dancing-animated-cat-headphones-gif-266744526067215816.gif",
  "https://tenor.com/view/ok-dance-cat-gif-1117619766163691647.gif",
  "https://tenor.com/view/dancing-monkey-sped-up-gif-5447932123991168345.gif",
  "https://tenor.com/view/dancing-bears-cartoon-dance-bear-cartoon-gif-27487930.gif",
  "https://tenor.com/view/cirno-dancing-touhou-anime-pixelated-gif-17512670.gif",
  "https://tenor.com/view/touhou-touhou-dance-dancing-animation-hip-sway-okuu-gif-15117323122140456786.gif",
  "https://tenor.com/view/celebrate-happy-dance-party-excited-gif-12785614850895754577.gif",
  "https://tenor.com/view/geol-goyang-joget-gif-8343380966297455244.gif",
  "https://tenor.com/view/cat-dance-cat-cat-dancing-dancing-cat-daily-cat-dance-gif-15678680634713803928.gif",
  "https://tenor.com/view/cat-cat-meme-cat-bopping-head-cat-dancing-cat-bopping-gif-15291519990855066134.gif",
  "https://tenor.com/view/cat-meme-funny-gif-cat-dancing-dance-gif-5671822644946302447.gif"
];

const FLOATING_TEXTS = [
  { text: "DANCE!", top: "25%", left: "20%", color: "text-pink-500" },
  { text: "SHAKE YOUR BOOTY!", top: "50%", left: "50%", color: "text-green-400" },
  { text: "MAKE IT BOUNCE!", top: "75%", left: "60%", color: "text-yellow-400" },
];

export default function WindupPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 w-full h-full z-50 bg-black overflow-hidden"
    >
      <div className="w-full h-full grid grid-cols-2 md:grid-cols-4 grid-rows-8 md:grid-rows-4">
        {DANCING_GIFS.map((src, i) => (
          <motion.div 
            key={i} 
            className="w-full h-full overflow-hidden relative"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              type: "spring", 
              bounce: 0, 
              delay: i * 0.05,
              duration: 0.5 
            }}
          >
            <img 
              src={src} 
              alt="Dancing Meme" 
              className={`absolute inset-0 w-full h-full object-cover ${
                src.includes('dancing-bears') ? 'scale-[1.7]' : ''
              }`}
            />
          </motion.div>
        ))}
      </div>

      {/* VIBRATING BOUNCY TEXT OVERLAYS */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {FLOATING_TEXTS.map((item, i) => (
          <motion.div
            key={i}
            className={`absolute whitespace-nowrap font-black italic text-5xl md:text-7xl lg:text-9xl uppercase tracking-tighter drop-shadow-[0_0_20px_rgba(0,0,0,0.8)] [-webkit-text-stroke:3px_black] md:[-webkit-text-stroke:6px_black] ${item.color}`}
            style={{ top: item.top, left: item.left }}
            animate={{
              scale: [1, 1.4, 0.8, 1.2, 1],
              rotate: [-15, 15, -20, 20, -10],
              x: ['-50%', '-40%', '-60%', '-45%', '-50%'],
              y: ['-50%', '-60%', '-40%', '-55%', '-50%'],
            }}
            transition={{
              duration: 0.35 + (i * 0.05),
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut"
            }}
          >
            {item.text}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
