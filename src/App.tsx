import Navbar from './components/Navbar';
import Blobs from './components/Blobs';
import LandingPage from './components/LandingPage';
import AboutStudio from './components/AboutStudio';
import ServicesSection from './components/ServicesSection';
import ProcessSection from './components/ProcessSection';
import PortfolioSection from './components/PortfolioSection';
import ReviewsSection from './components/ReviewsSection';
import { motion } from 'motion/react';

export default function App() {
  return (
    <div className="relative w-full min-h-screen font-sans selection:bg-orange-500 selection:text-white bg-[#0A0A0B] text-white">
      <Blobs />
      <Navbar />
      
      <main className="relative z-10">
        <LandingPage />
        <AboutStudio />
        <ServicesSection />
        
        <ProcessSection />
        <PortfolioSection />
        <ReviewsSection />
      </main>

      {/* Final CTA with Glassmorphism */}
      <section id="contact" className="relative py-48 px-12 overflow-hidden flex items-center justify-center min-h-[80vh] bg-black">
        {/* Floating background elements - with more movement */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[
            { color: '#ccff00', top: '15%', left: '10%', scale: 1.2 },
            { color: '#ff00ff', top: '25%', left: '80%', scale: 0.8 },
            { color: '#00ffff', top: '75%', left: '20%', scale: 1.1 },
            { color: '#ccff00', top: '60%', left: '85%', scale: 0.9 },
            { color: '#ffffff', top: '40%', left: '50%', scale: 0.7 },
            { color: '#FF5F1F', top: '20%', left: '40%', scale: 1.0 },
            { color: '#00ffff', top: '80%', left: '70%', scale: 0.6 },
            { color: '#ff00ff', top: '10%', left: '60%', scale: 0.85 },
            { color: '#ccff00', top: '90%', left: '30%', scale: 1.3 },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="absolute w-32 h-24"
              initial={{ top: item.top, left: item.left, scale: item.scale }}
              animate={{ 
                y: [0, -100, 0],
                x: [0, i % 2 === 0 ? 50 : -50, 0],
                rotate: [0, i % 2 === 0 ? 35 : -35, 0]
              }}
              transition={{ 
                duration: 6 + i,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <svg width="100%" height="100%" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl opacity-30">
                <path d="M42 20H92C96.4183 20 100 23.5817 100 28V72C100 76.4183 96.4183 80 92 80H8C3.58172 80 0 76.4183 0 72V8C0 3.58172 3.58172 0 8 0H32L42 20Z" fill={item.color}/>
              </svg>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto relative z-10 w-full"
        >
          <div className="bg-white/5 backdrop-blur-[100px] p-16 md:p-24 rounded-[4rem] border border-white/10 text-center shadow-2xl">
            <h2 className="text-6xl md:text-[8rem] font-black leading-[0.9] tracking-tighter uppercase mb-12 text-white italic">
              LET’S <span className="font-serif font-light text-zinc-400 not-italic">CREATE</span><br/>
              SOMETHING <span className="font-serif font-light text-zinc-400 not-italic">GREAT</span>
            </h2>
            <div className="flex flex-col items-center gap-4 mb-16 px-4">
              <div className="w-12 h-[1px] bg-[#ccff00]/30" />
              <p className="text-sm md:text-base font-sans italic font-light uppercase tracking-[0.25em] text-zinc-400 leading-relaxed text-center">
                보는 순간 느껴지는 감각,
                <span className="block mt-2 text-[#ccff00] font-semibold tracking-[0.35em]">
                  MSG DESIGN STUDIO와 함께하세요.
                </span>
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <a 
                href="http://pf.kakao.com/_CybjX/chat"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto px-12 py-6 bg-white text-black text-sm font-bold uppercase tracking-[0.3em] rounded-full hover:bg-[#ccff00] transition-all shadow-2xl shadow-white/5"
              >
                카카오톡으로 문의하기
              </a>
                <motion.a 
                  href="mailto:hello@msgdesignstudio.com"
                  target="_top"
                  className="w-full md:w-auto px-12 py-6 border-2 border-white/20 text-white text-sm font-bold uppercase tracking-[0.3em] rounded-full hover:bg-white hover:text-black transition-all"
                >
                  이메일로 문의하기
                </motion.a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer / Bottom Rail */}
      <footer className="relative z-10 p-12 md:p-24 border-t border-white/5 bg-black/40 backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-12">
          <div className="flex flex-col md:flex-row gap-20">
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 glass rounded-3xl flex items-center justify-center p-4">
                <img 
                  src="https://firebasestorage.googleapis.com/v0/b/firejet-97177.appspot.com/o/processed_logos%2Ff6db6a9a-32fa-48ef-8b2c-686940d95955_original.png?alt=media&token=86799071-7c91-45ac-9b2f-2ae5f5697204" 
                  alt="MSG Logo" 
                  className="w-full h-full object-contain invert brightness-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://drive.google.com/thumbnail?id=11sQQLOUlPv4N4iEi08wyZIJTq6GHSiMy&sz=w1000';
                  }}
                />
              </div>
              <div className="pt-2">
                <div className="text-[10px] uppercase text-zinc-500 mb-4 tracking-[0.2em]">Contact</div>
                <a 
                  href="mailto:hello@msgdesignstudio.com"
                  target="_top"
                  className="block text-xl font-light hover:text-[#ccff00] transition-colors mb-2"
                >
                  hello@msgdesignstudio.com
                </a>
                <div className="text-[10px] text-zinc-600 uppercase tracking-widest">
                  613-33-06171 대표자 김수빈
                </div>
              </div>
            </div>
            <div className="pt-2">
              <div className="text-[10px] uppercase text-zinc-500 mb-4 tracking-[0.2em]">Social</div>
              <div className="flex gap-6 text-zinc-400 text-sm uppercase tracking-widest">
                <a href="https://www.behance.net/msgdesignstudio" target="_blank" rel="noopener noreferrer" className="hover:text-[#ccff00] transition-colors">Behance</a>
                <a href="https://instagram.com/msgstudio.design" target="_blank" rel="noopener noreferrer" className="hover:text-[#ccff00] transition-colors">Instagram</a>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-4">
            <div 
              onClick={() => {
                const event = new CustomEvent('trigger-admin-login');
                window.dispatchEvent(event);
              }}
              className="text-[10px] text-zinc-800 hover:text-zinc-600 cursor-pointer uppercase tracking-widest transition-colors"
            >
              Admin Access
            </div>
            <div className="text-[10px] text-zinc-600 uppercase tracking-widest text-right">
               © 2026 MSG DESIGN STUDIO<br/>
               <span className="italic font-light">Graphic Design Studio</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}


