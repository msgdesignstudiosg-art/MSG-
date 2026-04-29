import { motion } from 'motion/react';
import { useLang } from '../contexts/LanguageContext';
import { t } from '../lib/translations';

export default function AboutStudio() {
  const { lang } = useLang();

  return (
    <section id="about" className="relative py-32 px-12 md:px-24">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-20"
        >
          <div>
            <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-zinc-500 mb-6">About. MSG Design Studio</h2>
            <h3 className="text-4xl md:text-5xl font-light mb-12 leading-tight whitespace-pre-line">
              {lang === 'ko' ? t.about.h3ko : t.about.h3en}
              {lang === 'en' && <><br/><span className="italic font-serif">MSG DESIGN STUDIO</span></>}
            </h3>
            
            <p className="text-zinc-400 text-lg leading-relaxed mb-12">
              {t.about.p[lang]}
            </p>
            <div className="space-y-12">
              {t.about.items.map((item, idx) => (
                <div key={idx} className="flex gap-8 items-start border-l border-white/10 pl-8 transition-colors hover:border-orange-500 group">
                  <span className="text-sm font-mono text-zinc-600 group-hover:text-[#ccff00] transition-colors uppercase">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <p className="text-zinc-300 font-light">{item[lang]}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-16">
            <div className="glass-panel p-10 rounded-[3rem]">
              <h4 className="text-2xl font-serif italic mb-6">{t.about.quote1Title[lang]}</h4>
              <p className="text-sm text-zinc-400 leading-relaxed whitespace-pre-line">
                {t.about.quote1Body[lang]}
              </p>
            </div>
            <div className="glass-panel p-10 rounded-[3rem] border-[#ccff00]/20">
              <h4 className="text-2xl font-serif italic mb-6">{t.about.quote2Title[lang]}</h4>
              <p className="text-sm text-zinc-400 leading-relaxed whitespace-pre-line">
                {t.about.quote2Body[lang]}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
