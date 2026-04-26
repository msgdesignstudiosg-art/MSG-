import { motion } from 'motion/react';
import { Sparkles, Layers, Wand2 } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
      
      {/* Background large text */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-0"
      >
        <h1 className="text-[12vw] font-serif italic text-white/5 whitespace-nowrap select-none">
          Design Studio
        </h1>
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Column: Text content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="glass px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-widest text-emerald-300 flex items-center gap-2">
               Capabilities <Sparkles className="w-3 h-3" />
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-serif italic mb-6 leading-[1.1]">
            Production<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">evolved</span>
          </h1>
          
          <p className="text-lg text-white/60 max-w-md font-light leading-relaxed mb-10">
            We merge cutting-edge design with immersive glassmorphism aesthetics. 
            Crafting digital worlds that feel tangible and otherworldly.
          </p>

          <div className="flex items-center gap-4">
            <button className="bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-white/90 transition-transform active:scale-95 flex items-center gap-2">
              Explore Worlds
            </button>
            <button className="glass px-8 py-4 rounded-full font-medium hover:bg-white/10 transition-transform active:scale-95">
              View Showreel
            </button>
          </div>
        </motion.div>

        {/* Right Column: Floating Glass Cards */}
        <div className="relative h-[600px] w-full hidden md:block">
          <motion.div 
            initial={{ opacity: 0, y: 50, rotate: -5 }}
            animate={{ opacity: 1, y: 0, rotate: -5 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="absolute top-[10%] right-[10%] w-72 glass-panel p-6 rounded-3xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="glass p-2 rounded-xl"><Layers className="w-5 h-5" /></div>
              <span className="text-xs font-medium text-white/50">Natural Context</span>
            </div>
            <div className="aspect-video rounded-xl bg-white/5 overflow-hidden mb-4 border border-white/5 relative">
               <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" alt="Abstract 3d" className="w-full h-full object-cover mix-blend-overlay opacity-80" />
            </div>
            <h3 className="font-serif italic text-xl mb-2">AI Scenery</h3>
            <p className="text-xs text-white/50">Analyze products to create indistinguishable environments.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -50, rotate: 5 }}
            animate={{ opacity: 1, x: 0, rotate: 5 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="absolute top-[40%] left-[-10%] w-80 glass-panel p-6 rounded-3xl z-20"
          >
            <div className="flex flex-wrap gap-2 mb-4">
               <span className="glass px-3 py-1 text-[10px] rounded-full">Scale Fast</span>
               <span className="glass px-3 py-1 text-[10px] rounded-full">Visual Consistency</span>
               <span className="glass px-3 py-1 text-[10px] rounded-full">Time Saver</span>
            </div>
            <h3 className="font-serif italic text-2xl mb-2">Batch Production</h3>
            <p className="text-sm text-white/60">Style your entire product line in minutes. Create a unified visual identity.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: -2 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="absolute bottom-[-5%] right-[20%] w-64 glass-panel p-5 rounded-3xl z-10"
          >
            <div className="flex items-center justify-between mb-4">
               <div className="glass p-2 rounded-xl"><Wand2 className="w-4 h-4" /></div>
            </div>
            <h3 className="font-serif italic text-xl mb-2">Smart Lighting</h3>
            <p className="text-xs text-white/50">Automatic lighting integration with realistic shadows.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
