import { motion, AnimatePresence } from "framer-motion";

const FlipCard = ({ number, unit, isFullscreen, theme = "flip" }) => {
  // --- FLIP THEME (Mechanical) ---
  if (theme === "flip") {
    const sizeClasses = isFullscreen 
      ? "h-[15vh] w-[12vh] md:h-[25vh] md:w-[18vh] lg:h-[35vh] lg:w-[22vh]" 
      : "h-16 w-12 md:h-20 md:w-16";
    const textClasses = isFullscreen ? "text-[6vh] md:text-[12vh]" : "text-2xl md:text-3xl";

    return (
      // Added 'shrink-0' here to prevent squishing
      <div className="flex flex-col items-center gap-2 shrink-0">
        <div className={`${sizeClasses} relative bg-white dark:bg-zinc-900 rounded-lg overflow-hidden border border-gray-300 dark:border-zinc-800 shadow-xl transition-colors duration-500`}>
          <AnimatePresence mode="popLayout">
            <motion.div
              key={number}
              initial={{ rotateX: 90 }}
              animate={{ rotateX: 0 }}
              exit={{ rotateX: -90 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
              className={`absolute inset-0 flex items-center justify-center ${textClasses} font-mono font-bold bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-zinc-100`}
              style={{ backfaceVisibility: "hidden" }}
            >
              {number}
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-x-0 top-1/2 h-[1px] bg-gray-300 dark:bg-black/80 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent dark:from-white/5 pointer-events-none"></div>
        </div>
        <span className={`${isFullscreen ? "text-xl mt-4" : "text-[10px]"} uppercase tracking-widest text-gray-500 font-bold font-mono`}>{unit}</span>
      </div>
    );
  }

  // --- CASIO THEME (Digital LCD) ---
  if (theme === "casio") {
    const sizeClasses = isFullscreen 
      ? "h-[15vh] w-[14vh] md:h-[25vh] md:w-[22vh]" 
      : "h-14 w-14 md:h-16 md:w-20"; 
    const textClasses = isFullscreen ? "text-[8vh] md:text-[15vh]" : "text-2xl md:text-4xl";

    return (
      // Added 'shrink-0' here
      <div className="flex flex-col items-center gap-1 shrink-0">
        <div className={`${sizeClasses} relative bg-[#9ea792] rounded-sm border-2 md:border-4 border-gray-400 shadow-inner lcd-shadow flex items-center justify-center overflow-hidden`}>
          {/* Background 88s */}
          <div className={`absolute inset-0 flex items-center justify-center ${textClasses} font-['Orbitron'] text-[#888f80] opacity-30 select-none scale-y-110`}>88</div>
          
          {/* Real Numbers */}
          <div className={`relative z-10 ${textClasses} font-['Orbitron'] text-gray-900 tracking-wider scale-y-110`}>
            {number.toString().padStart(2, '0')}
          </div>
        </div>
        <span className={`${isFullscreen ? "text-xl mt-4" : "text-[9px]"} font-['Orbitron'] text-gray-400 uppercase`}>{unit}</span>
      </div>
    );
  }

  // --- NIXIE THEME (Vacuum Tube) ---
  if (theme === "nixie") {
    const sizeClasses = isFullscreen 
      ? "h-[20vh] w-[12vh] md:h-[30vh] md:w-[18vh]" 
      : "h-16 w-10 md:h-24 md:w-16";
    const textClasses = isFullscreen ? "text-[10vh] md:text-[18vh]" : "text-3xl md:text-5xl";

    return (
      // Added 'shrink-0' here
      <div className="flex flex-col items-center gap-2 shrink-0">
        <div className={`${sizeClasses} relative bg-black/80 rounded-full border border-zinc-700 shadow-[0_0_15px_rgba(0,0,0,0.8)] flex items-center justify-center overflow-hidden`}>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-30"></div>
          <div className={`relative z-10 ${textClasses} font-['Share_Tech_Mono'] text-orange-500 nixie-glow`}>
            {number}
          </div>
          <div className="absolute top-2 right-2 w-1/3 h-2/3 bg-white/10 rounded-full blur-md"></div>
        </div>
        <span className={`${isFullscreen ? "text-xl mt-4" : "text-[10px]"} font-['Share_Tech_Mono'] text-orange-900/50 uppercase`}>{unit}</span>
      </div>
    );
  }
};

export default FlipCard;