import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu } from 'lucide-react';
import InquiryModal from './InquiryModal';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    const handleHide = (e: any) => setIsHidden(e.detail.hidden);
    window.addEventListener('hide-navbar', handleHide as any);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hide-navbar', handleHide as any);
    };
  }, []);

  if (isHidden) return null;

  return (
    <>
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 p-12 flex justify-between items-center pointer-events-none"
    >
      <div className="flex items-center gap-3 pointer-events-auto">
        <a href="/" className="flex items-center gap-3">
          <img 
            src="https://firebasestorage.googleapis.com/v0/b/firejet-97177.appspot.com/o/processed_logos%2Ff6db6a9a-32fa-48ef-8b2c-686940d95955_original.png?alt=media&token=86799071-7c91-45ac-9b2f-2ae5f5697204" 
            alt="MSG STUDIO" 
            className="h-10 md:h-12 w-auto object-contain drop-shadow-2xl invert brightness-0"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://drive.google.com/thumbnail?id=11sQQLOUlPv4N4iEi08wyZIJTq6GHSiMy&sz=w1000';
            }}
          />
          <div className="hidden flex items-center gap-2">
            <div className="w-8 h-8 bg-white flex items-center justify-center rounded-full">
              <div className="w-3 h-3 bg-black rotate-45" />
            </div>
            <span className="text-lg font-bold tracking-tighter uppercase whitespace-nowrap">MSG Studio</span>
          </div>
        </a>
      </div>
      
      <div className="hidden md:flex gap-10 text-sm font-medium uppercase tracking-widest text-zinc-400 pointer-events-auto">
        {['About', 'Services', 'Process', 'Work', 'Reviews'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors">
            {item}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-4 pointer-events-auto">
        <a 
          href="http://pf.kakao.com/_CybjX/chat"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex px-8 py-3 bg-white text-black text-sm font-bold uppercase rounded-full hover:bg-[#ccff00] hover:text-black transition-all"
        >
          Start a Project
        </a>
        <button className="md:hidden bg-white/5 backdrop-blur-xl border border-white/10 p-3 rounded-full hover:bg-[#ccff00] transition-colors">
          <Menu className="w-5 h-5 text-white" />
        </button>
      </div>
    </motion.nav>
    <InquiryModal isOpen={isInquiryOpen} onClose={() => setIsInquiryOpen(false)} />
    </>
  );
}
