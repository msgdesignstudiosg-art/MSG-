import { motion, AnimatePresence } from 'motion/react';
import { X, Send } from 'lucide-react';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InquiryModal({ isOpen, onClose }: InquiryModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-xl glass-panel p-10 md:p-16 rounded-[4rem] shadow-2xl"
          >
            <button 
              onClick={onClose}
              className="absolute top-10 right-10 text-zinc-500 hover:text-white transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            
            <h3 className="text-4xl font-serif italic mb-4">Start a Project.</h3>
            <p className="text-zinc-500 mb-12 font-light">계획하신 프로젝트에 대해 알려주세요. 최고의 디자인을 제안해 드립니다.</p>
            
            <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); alert('전송되었습니다. 곧 연락드리겠습니다!'); onClose(); }}>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">Name</label>
                  <input required className="w-full bg-white/5 border-b border-white/10 py-3 outline-none focus:border-orange-500 transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">Email</label>
                  <input required type="email" className="w-full bg-white/5 border-b border-white/10 py-3 outline-none focus:border-orange-500 transition-colors" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">Company</label>
                <input className="w-full bg-white/5 border-b border-white/10 py-3 outline-none focus:border-orange-500 transition-colors" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">Message</label>
                <textarea required rows={4} className="w-full bg-white/5 border border-white/10 p-4 rounded-3xl outline-none focus:border-orange-500 transition-colors resize-none" />
              </div>

              <button className="w-full py-5 bg-white text-black font-bold uppercase tracking-widest rounded-full hover:bg-orange-500 hover:text-white transition-all flex items-center justify-center gap-3">
                Send Inquiry <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
