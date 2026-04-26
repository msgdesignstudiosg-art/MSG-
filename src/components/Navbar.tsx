import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import InquiryModal from './InquiryModal';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    const handleHide = (e: any) => setIsHidden(e.detail.hidden);
    window.addEventListener('hide-navbar', handleHide as any);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hide-navbar', handleHide as any);
    };
  }, []);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Process', href: '#process' },
    { name: 'Work', href: '#work' },
    { name: 'Reviews', href: '#reviews' },
  ];

  if (isHidden) return null;

  return (
    <>
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex justify-between items-center ${
        scrolled ? 'p-4 md:p-6 bg-black/80 backdrop-blur-md' : 'p-6 md:p-12'
      }`}
    >
      <div className="flex items-center gap-3">
        <a href="/" className="flex items-center gap-3 group">
          <img 
            src="https://firebasestorage.googleapis.com/v0/b/firejet-97177.appspot.com/o/processed_logos%2Ff6db6a9a-32fa-48ef-8b2c-686940d95955_original.png?alt=media&token=86799071-7c91-45ac-9b2f-2ae5f5697204" 
            alt="MSG STUDIO" 
            className="h-8 md:h-12 w-auto object-contain drop-shadow-2xl invert brightness-0 group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://drive.google.com/thumbnail?id=11sQQLOUlPv4N4iEi08wyZIJTq6GHSiMy&sz=w1000';
            }}
          />
        </a>
      </div>
      
      <div className="hidden md:flex gap-10 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">
        {navItems.map((item) => (
          <a key={item.name} href={item.href} className="hover:text-white transition-colors relative group">
            {item.name}
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#ccff00] transition-all duration-300 group-hover:w-full" />
          </a>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <a 
          href="http://pf.kakao.com/_CybjX/chat"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex px-8 py-3 bg-white text-black text-[10px] font-bold uppercase rounded-full hover:bg-[#ccff00] transition-all shadow-xl hover:shadow-[#ccff00]/20"
        >
          Start a Project
        </a>
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden bg-white/5 backdrop-blur-xl border border-white/10 p-3 rounded-full hover:bg-[#ccff00] hover:text-black transition-all active:scale-90"
        >
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 top-0 left-0 w-full h-[100svh] bg-[#0A0A0B] z-50 md:hidden flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <img 
                src="https://firebasestorage.googleapis.com/v0/b/firejet-97177.appspot.com/o/processed_logos%2Ff6db6a9a-32fa-48ef-8b2c-686940d95955_original.png?alt=media&token=86799071-7c91-45ac-9b2f-2ae5f5697204" 
                alt="MSG STUDIO" 
                className="h-8 w-auto invert brightness-0"
              />
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-3 bg-white/5 rounded-full border border-white/10"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="flex flex-col gap-8 mt-4">
              {navItems.map((item, idx) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.1 }}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-4xl font-black uppercase tracking-tighter text-white hover:text-[#ccff00] transition-colors"
                >
                  {item.name}
                </motion.a>
              ))}
            </div>

            <div className="mt-auto pt-10 border-t border-white/5 space-y-6">
              <a 
                href="http://pf.kakao.com/_CybjX/chat"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-5 bg-white text-black text-center font-bold uppercase rounded-2xl hover:bg-[#ccff00] transition-all"
              >
                Kakaotalk 문의하기
              </a>
              <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                <span>msg design studio</span>
                <span>© 2024</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
    <InquiryModal isOpen={isInquiryOpen} onClose={() => setIsInquiryOpen(false)} />
    </>
  );
}
