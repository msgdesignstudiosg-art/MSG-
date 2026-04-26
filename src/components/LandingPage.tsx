import { useState, useRef } from 'react';
import { motion } from 'motion/react';

const folderItems = [
  { id: 'f1', title: 'CONCEPT DEVELOPMENT', color: '#ccff00', x: '10%', y: '20%' }, // Neon Lime
  { id: 'f2', title: 'GRAPHIC DESIGN', color: '#ff00ff', x: '70%', y: '15%' }, // Neon Pink
  { id: 'f3', title: 'BRANDING', color: '#00ffff', x: '80%', y: '60%' }, // Neon Cyan
  { id: 'f4', title: 'PACKAGING', color: '#FF5F1F', x: '15%', y: '75%' }, // Fluorescent Orange
];

const FolderIcon = ({ color }: { color: string }) => (
  <svg width="100%" height="100%" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M42 20H92C96.4183 20 100 23.5817 100 28V72C100 76.4183 96.4183 80 92 80H8C3.58172 80 0 76.4183 0 72V8C0 3.58172 3.58172 0 8 0H32L42 20Z" fill={color}/>
  </svg>
);

export default function LandingPage() {
  const constraintsRef = useRef(null);

  return (
    <section id="home" ref={constraintsRef} className="relative min-h-[100svh] flex flex-col items-center justify-center px-6 md:px-12 py-20 overflow-hidden bg-[#0A0A0B]">
      
      {/* High Impact Background Typography */}
      <div className="absolute inset-0 z-0 pointer-events-none flex flex-col items-center justify-center select-none overflow-hidden opacity-30 md:opacity-80">
        <h1 className="text-[22vw] md:text-[15vw] lg:text-[18vw] font-bold leading-[0.8] tracking-tighter text-white/5 uppercase mix-blend-lighten">
          Ways To
        </h1>
        <h1 className="text-[22vw] md:text-[15vw] lg:text-[18vw] font-serif italic leading-[0.8] tracking-tighter text-zinc-800 uppercase mix-blend-lighten">
          Work With
        </h1>
        <h1 className="text-[22vw] md:text-[15vw] lg:text-[18vw] font-bold leading-[0.8] tracking-tighter text-white/5 uppercase mix-blend-lighten">
          Me
        </h1>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col items-center text-center px-4">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           className="backdrop-blur-sm bg-black/20 p-6 sm:p-10 md:p-16 lg:p-20 rounded-[2rem] md:rounded-[4rem] w-full"
        >
          <div className="flex items-center gap-3 mb-6 md:mb-10 justify-center">
            <span className="glass px-4 md:px-6 py-2 rounded-full text-[8px] md:text-[11px] font-mono uppercase tracking-[0.2em] md:tracking-[0.4em] text-[#ccff00]">
               Est. 2024 / GRAPHIC DESIGN STUDIO
            </span>
          </div>
          
          <h2 className="text-[9vw] sm:text-6xl md:text-7xl lg:text-8xl font-sans font-black leading-[1.05] mb-6 md:mb-12 tracking-tighter uppercase text-center flex flex-col items-center">
             <span className="block">WE DON’T JUST</span>
             <span className="block">CREATE VISUALS.</span>
             <span className="italic font-serif text-white/40 uppercase block mt-2 sm:mt-0 leading-tight">WE DESIGN EXPERIENCES.</span>
          </h2>
          
          <div className="max-w-3xl mx-auto mb-10 md:mb-16">
            <p className="text-sm sm:text-xl md:text-2xl text-zinc-300 font-light leading-relaxed px-6">
              저희 MSG 디자인 스튜디오는 단순히 포장하지 않습니다. <br className="hidden sm:block" /> 브랜드의 경험을 디자인합니다.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 md:gap-8 justify-center w-full max-w-md mx-auto sm:max-w-none">
            <motion.a 
              href="mailto:hello@msgdesignstudio.com"
              target="_top"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-8 sm:px-10 md:px-14 py-4 sm:py-5 md:py-6 bg-white text-[#0A0A0B] text-xs sm:text-sm font-bold uppercase tracking-widest rounded-full hover:bg-[#ccff00] hover:shadow-[0_0_30px_rgba(204,255,0,0.3)] transition-all flex items-center justify-center gap-3"
            >
              Email Us <span className="opacity-20 font-light hidden sm:inline">|</span> <span className="hidden sm:inline">hello@msgdesignstudio.com</span>
            </motion.a>
            
            <motion.a 
              href="http://pf.kakao.com/_CybjX/chat"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-8 sm:px-10 md:px-14 py-4 sm:py-5 md:py-6 bg-[#F7E600] text-[#3A1D1D] text-xs sm:text-sm font-bold uppercase tracking-widest rounded-full hover:bg-white transition-all shadow-xl flex items-center justify-center gap-3"
            >
              KakaoTalk <span className="opacity-20 font-light hidden sm:inline">|</span> <span className="hidden sm:inline">카카오톡 상담</span>
              <span className="sm:hidden">상담하기</span>
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Draggable Folders - Referencing the visual sentiment */}
      {folderItems.map((item, idx) => (
        <motion.div
          key={item.id}
          drag
          dragConstraints={constraintsRef}
          initial={{ opacity: 0, scale: 0.8, top: item.y, left: item.x }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: [0, -35, 0],
            rotate: [0, idx % 2 === 0 ? 10 : -10, 0]
          }}
          transition={{ 
            opacity: { duration: 0.8 },
            scale: { duration: 0.8 },
            y: {
              duration: 3 + idx,
              repeat: Infinity,
              ease: "easeInOut"
            },
            rotate: {
              duration: 5 + idx,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          className="absolute z-20 cursor-grab active:cursor-grabbing pointer-events-auto flex flex-col items-center gap-4"
        >
          <div className="w-20 h-16 md:w-32 md:h-24 drop-shadow-2xl">
            <FolderIcon color={item.color} />
          </div>
          <span className="text-[8px] md:text-[9px] font-mono uppercase tracking-[0.2em] bg-black/40 backdrop-blur-md px-2 md:px-3 py-1 rounded-full text-white/70 border border-white/5">
            {item.title}
          </span>
        </motion.div>
      ))}

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 text-zinc-600 text-[10px] font-mono uppercase tracking-[0.3em]">
        <span>Scroll to Explore</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-px h-12 bg-gradient-to-b from-[#ccff00] to-transparent"
        />
      </div>
    </section>
  );
}
