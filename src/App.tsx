import Navbar from './components/Navbar';
import Blobs from './components/Blobs';
import LandingPage from './components/LandingPage';
import AboutStudio from './components/AboutStudio';
import ServicesSection from './components/ServicesSection';
import ProcessSection from './components/ProcessSection';
import PortfolioSection from './components/PortfolioSection';
import ReviewsSection from './components/ReviewsSection';
import { motion } from 'motion/react';
import { isConfigValid, firebaseConfig } from './lib/firebase';
import { useEffect, useState } from 'react';
import { useLang } from './contexts/LanguageContext';
import { t } from './lib/translations';

export default function App() {
  const [configChecked, setConfigChecked] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const { lang } = useLang();

  useEffect(() => {
    setIsValid(isConfigValid(firebaseConfig));
    setConfigChecked(true);
    const timer = setTimeout(() => {
      setIsValid(isConfigValid(firebaseConfig));
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full min-h-screen font-sans selection:bg-orange-500 selection:text-white bg-[#0A0A0B] text-white">
      {!isValid && configChecked && (
        <div className="fixed top-0 left-0 right-0 z-[1000] bg-red-600 text-white p-4 text-center text-xs md:text-sm font-bold">
          Firebase configuration is missing. If you're on Netlify/Vercel, please set VITE_FIREBASE_* environment variables.
        </div>
      )}
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

      {/* Final CTA */}
      <section id="contact" className="relative py-24 sm:py-32 md:py-48 px-4 sm:px-6 md:px-12 overflow-hidden flex items-center justify-center min-h-[70vh] md:min-h-[80vh] bg-black">
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50 md:opacity-100">
          {[
            { color: '#ccff00', top: '15%', left: '10%', scale: 1.2 },
            { color: '#ff00ff', top: '25%', left: '85%', scale: 0.8 },
            { color: '#00ffff', top: '75%', left: '15%', scale: 1.1 },
            { color: '#ccff00', top: '60%', left: '80%', scale: 0.9 },
            { color: '#ffffff', top: '40%', left: '45%', scale: 0.7 },
            { color: '#FF5F1F', top: '20%', left: '35%', scale: 1.0 },
            { color: '#00ffff', top: '80%', left: '70%', scale: 0.6 },
            { color: '#ff00ff', top: '10%', left: '60%', scale: 0.85 },
            { color: '#ccff00', top: '90%', left: '30%', scale: 1.3 },
            { color: '#ff00ff', top: '50%', left: '10%', scale: 0.75 },
            { color: '#00ffff', top: '35%', left: '90%', scale: 0.95 },
            { color: '#ccff00', top: '15%', left: '75%', scale: 1.1 },
            { color: '#ffffff', top: '70%', left: '40%', scale: 0.8 },
            { color: '#FF5F1F', top: '5%', left: '20%', scale: 1.2 },
            { color: '#ccff00', top: '95%', left: '80%', scale: 0.7 },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="absolute w-24 h-16 md:w-32 md:h-24"
              initial={{ top: item.top, left: item.left, scale: item.scale }}
              animate={{ 
                y: [0, -100, 0],
                x: [0, i % 2 === 0 ? 50 : -50, 0],
                rotate: [0, i % 2 === 0 ? 35 : -35, 0]
              }}
              transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg width="100%" height="100%" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl opacity-60">
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
          <div className="bg-white/5 backdrop-blur-[100px] p-6 sm:p-14 md:p-20 lg:p-24 rounded-[2rem] sm:rounded-[3.5rem] md:rounded-[4rem] border border-white/10 text-center shadow-2xl">
            <h2 className="text-[10vw] sm:text-7xl md:text-8xl lg:text-[8rem] xl:text-[9rem] font-black leading-[0.9] tracking-tighter uppercase mb-8 md:mb-12 text-white italic px-1">
              LET'S <span className="font-serif font-light text-zinc-400 not-italic">CREATE</span><br />
              SOMETHING <span className="font-serif font-light text-zinc-400 not-italic">GREAT</span>
            </h2>
            <div className="flex flex-col items-center gap-4 mb-8 md:mb-16 px-4">
              <div className="w-12 h-[1px] bg-[#ccff00]/30" />
              <p className="text-[11px] sm:text-base md:text-lg font-sans italic font-light uppercase tracking-[0.2em] md:tracking-[0.25em] text-zinc-400 leading-relaxed text-center">
                {t.cta.sub[lang]}
                <span className="block mt-2 text-[#ccff00] font-semibold tracking-[0.3em] md:tracking-[0.35em] text-base md:text-lg">
                  {t.cta.subHighlight[lang]}
                </span>
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 justify-center items-center px-4">
              <a 
                href="http://pf.kakao.com/_CybjX/chat"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 bg-white text-black text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] rounded-full hover:bg-[#ccff00] transition-all shadow-2xl shadow-white/5"
              >
                {t.cta.kakaoBtn[lang]}
              </a>
              <motion.a 
                href="mailto:hello@msgdesignstudio.com"
                target="_top"
                className="w-full sm:w-auto px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 border-2 border-white/20 text-white text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] rounded-full hover:bg-white hover:text-black transition-all"
              >
                {t.cta.emailBtn[lang]}
              </motion.a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 p-8 sm:p-12 md:p-24 border-t border-white/5 bg-black/40 backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          <div className="flex flex-col sm:flex-row gap-12 md:gap-20 w-full md:w-auto">
            <div className="flex items-start gap-4 md:gap-6">
              <div className="w-16 h-16 sm:w-24 sm:h-24 glass rounded-2xl md:rounded-3xl flex items-center justify-center p-3 sm:p-4 shrink-0">
                <img 
                  src="https://firebasestorage.googleapis.com/v0/b/firejet-97177.appspot.com/o/processed_logos%2Ff6db6a9a-32fa-48ef-8b2c-686940d95955_original.png?alt=media&token=86799071-7c91-45ac-9b2f-2ae5f5697204" 
                  alt="MSG Logo" 
                  className="w-full h-full object-contain invert brightness-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://drive.google.com/thumbnail?id=11sQQLOUlPv4N4iEi08wyZIJTq6GHSiMy&sz=w1000';
                  }}
                />
              </div>
              <div className="pt-1 md:pt-2">
                <div className="text-[8px] md:text-[10px] uppercase text-zinc-500 mb-2 md:mb-4 tracking-[0.2em]">Contact</div>
                <a 
                  href="mailto:hello@msgdesignstudio.com"
                  target="_top"
                  className="block text-base md:text-xl font-light hover:text-[#ccff00] transition-colors mb-1 md:mb-2"
                >
                  hello@msgdesignstudio.com
                </a>
                <div className="text-[8px] md:text-[10px] text-zinc-600 uppercase tracking-widest leading-relaxed">
                  {t.footer.bizInfo[lang]}
                </div>
              </div>
            </div>
            <div className="pt-1 md:pt-2">
              <div className="text-[8px] md:text-[10px] uppercase text-zinc-500 mb-2 md:mb-4 tracking-[0.2em]">Social</div>
              <div className="flex gap-6 text-zinc-400 text-xs md:text-sm uppercase tracking-widest underline underline-offset-4 decoration-white/10 hover:decoration-[#ccff00]">
                <a href="https://www.behance.net/msgdesignstudio" target="_blank" rel="noopener noreferrer" className="hover:text-[#ccff00] transition-colors">Behance</a>
                <a href="https://instagram.com/msgstudio.design" target="_blank" rel="noopener noreferrer" className="hover:text-[#ccff00] transition-colors">Instagram</a>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start md:items-end gap-4 w-full md:w-auto border-t border-white/5 pt-8 md:border-0 md:pt-0">
            <div 
              onClick={() => {
                const event = new CustomEvent('trigger-admin-login');
                window.dispatchEvent(event);
              }}
              className="text-[8px] md:text-[10px] text-zinc-800 hover:text-zinc-600 cursor-pointer uppercase tracking-widest transition-colors"
            >
              Admin Access
            </div>
            <div className="text-[8px] md:text-[10px] text-zinc-600 uppercase tracking-widest text-left md:text-right">
               © 2026 MSG DESIGN STUDIO<br/>
               <span className="italic font-light">Graphic Design Studio</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
