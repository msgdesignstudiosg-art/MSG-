import { motion } from 'motion/react';
import { Fingerprint, Sparkles, Package } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';
import { t } from '../lib/translations';

const icons = [Fingerprint, Sparkles, Package];
const colors = ['#ccff00', '#ff00ff', '#00ffff'];

const FolderIcon = ({ color }: { color: string }) => (
  <svg width="100%" height="100%" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M42 20H92C96.4183 20 100 23.5817 100 28V72C100 76.4183 96.4183 80 92 80H8C3.58172 80 0 76.4183 0 72V8C0 3.58172 3.58172 0 8 0H32L42 20Z" fill={color}/>
  </svg>
);

export default function ServicesSection() {
  const { lang } = useLang();

  return (
    <section id="services" className="relative py-20 md:py-32 px-6 md:px-12 bg-black/20 backdrop-blur-3xl border-y border-white/5">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-zinc-500 mb-6">Our Services</h2>
        <p className="text-4xl md:text-5xl font-light mb-24 md:mb-32 drop-shadow-lg">
          <span className="italic font-serif">Solutions</span> {lang === 'ko' ? '당신의 브랜드를 위한.' : 'crafted for your distinction.'}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-20">
          {t.services.items.map((service, idx) => {
            const Icon = icons[idx];
            const color = colors[idx];
            return (
              <motion.div 
                key={service.title}
                whileHover={{ y: -15 }}
                className="relative group pt-12"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-32 opacity-20 group-hover:opacity-100 transition-opacity duration-500 blur-xl group-hover:blur-2xl" style={{ backgroundColor: color }} />
                
                <div className="relative glass-panel p-10 md:p-14 rounded-[4rem] h-full flex flex-col items-center border border-white/10 group-hover:border-[#ccff00]/40 transition-all duration-500">
                  <div className="w-24 h-20 mb-10 group-hover:scale-110 transition-transform duration-500">
                    <FolderIcon color={color} />
                  </div>
                  
                  <h3 className="text-3xl font-bold mb-8 uppercase tracking-tighter group-hover:text-white transition-colors">{service.title}</h3>
                  <p className="text-zinc-400 text-base leading-relaxed font-light">
                    {service.desc[lang]}
                  </p>
                  
                  <div className="mt-10 p-3 bg-white/5 rounded-2xl group-hover:bg-white text-zinc-500 group-hover:text-black transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        <p className="mt-24 text-xl font-light italic text-zinc-500 whitespace-pre-line">
          {t.services.footer[lang]}
        </p>
      </div>
    </section>
  );
}
