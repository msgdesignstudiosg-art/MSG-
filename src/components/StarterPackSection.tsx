import { motion } from 'motion/react';
import { useRef } from 'react';

const FolderIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="folderGradient" x1="50" y1="0" x2="50" y2="80" gradientUnits="userSpaceOnUse">
        <stop stopColor="#f97316" />
        <stop offset="1" stopColor="#ea580c" />
      </linearGradient>
    </defs>
    <path d="M42 20H92C96.4183 20 100 23.5817 100 28V72C100 76.4183 96.4183 80 92 80H8C3.58172 80 0 76.4183 0 72V8C0 3.58172 3.58172 0 8 0H32L42 20Z" fill="url(#folderGradient)"/>
  </svg>
);

const items = [
  { id: 'f1', title: 'CONCEPT DEVELOPMENT', type: 'folder', x: 80, y: 150, color: 'from-orange-500' },
  { id: 'f2', title: 'GRAPHIC DESIGN', type: 'folder', x: 450, y: 80, color: 'from-emerald-500' },
  { id: 'f3', title: 'PRODUCT DEVELOPMENT', type: 'folder', x: 750, y: 180, color: 'from-indigo-500' },
  { id: 'f4', title: 'TREND RESEARCH', type: 'folder', x: 100, y: 700, color: 'from-pink-500' },
  { id: 'f5', title: 'PRINT DESIGN', type: 'folder', x: 400, y: 650, color: 'from-orange-500' },
  { id: 'f6', title: 'APPAREL DESIGN', type: 'folder', x: 620, y: 550, color: 'from-emerald-500' },
  { id: 'f7', title: 'PACKAGING', type: 'folder', x: 800, y: 750, color: 'from-indigo-500' },
];

export default function StarterPackSection() {
  const constraintsRef = useRef(null);

  return (
    <section className="relative min-h-screen h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-transparent pt-32">
      
      {/* Constraints area for drag */}
      <div ref={constraintsRef} className="absolute inset-0 z-20 pointer-events-none" />

      {/* Main Typography Layer */}
      <div className="absolute z-10 w-full max-w-6xl px-12 pointer-events-none flex flex-col items-start pt-12 text-white">
         <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-light leading-[0.9] tracking-tighter mix-blend-overlay">
            Ways to
         </h1>
         <h1 className="text-6xl md:text-8xl lg:text-[10rem] italic font-serif text-zinc-500 leading-[0.9] tracking-tighter ml-0 md:ml-20 mix-blend-overlay relative z-20">
            Work with
         </h1>
         <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-light leading-[0.9] tracking-tighter ml-0 md:ml-40 mix-blend-overlay">
            Me.
         </h1>
      </div>

      <div className="absolute bottom-12 z-10 pointer-events-none w-full flex justify-between items-end px-12 md:px-24">
         <div className="flex gap-20">
            <div>
              <div className="text-[10px] uppercase text-zinc-500 mb-2 tracking-[0.2em]">Based in</div>
              <div className="text-sm cursor-pointer pointer-events-auto transition-colors hover:text-white text-zinc-300">Seoul, Korea</div>
            </div>
         </div>
         <div className="text-[10px] text-zinc-600 uppercase tracking-widest hidden md:block">
            ©2026 MSG Design Studio / Portfolio
         </div>
      </div>

      {/* Floating Draggable Folders */}
      {items.map((item, index) => (
        <motion.div
           key={item.id}
           drag
           dragConstraints={constraintsRef}
           whileHover={{ scale: 1.05 }}
           whileDrag={{ scale: 1.1, zIndex: 50 }}
           initial={{ opacity: 0, x: item.x, y: item.y }}
           animate={{ opacity: 1, x: item.x, y: item.y }}
           transition={{ opacity: { duration: 0.8, delay: Math.random() * 0.5 } }}
           className="absolute cursor-grab active:cursor-grabbing flex flex-col justify-between bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all w-64 h-56 pointer-events-auto"
           style={{ zIndex: 30 }}
        >
           <div className="flex items-start justify-between w-full">
             <div className="text-[10px] text-zinc-500 font-mono tracking-[0.2em] uppercase mt-1">
               0{index + 1} / FOLDER
             </div>
             <div className="w-10 h-8 opacity-50 drop-shadow-lg">
                <FolderIcon />
             </div>
           </div>
           <div>
             <h3 className="text-lg md:text-xl font-medium tracking-tight leading-tight">{item.title}</h3>
             <div className={`w-full h-1 bg-gradient-to-r ${item.color} to-transparent mt-3`} />
           </div>
        </motion.div>
      ))}
    </section>
  );
}
