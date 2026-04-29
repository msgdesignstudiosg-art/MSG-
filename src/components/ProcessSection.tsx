import { motion } from 'motion/react';
import { MessageSquare, CreditCard, Layout, RefreshCw, FileCheck } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';
import { t } from '../lib/translations';

const icons = [MessageSquare, CreditCard, Layout, RefreshCw, FileCheck];

export default function ProcessSection() {
  const { lang } = useLang();

  return (
    <section id="process" className="relative py-20 md:py-32 px-6 md:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8">
          <div>
            <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-zinc-500 mb-6">Process</h2>
            <h3 className="text-5xl md:text-7xl font-light leading-none whitespace-pre-line">
              {lang === 'ko'
                ? <>{t.process.h3.ko.split('\n')[0]}<br/><span className="italic font-serif">{t.process.h3.ko.split('\n')[1]}</span></>
                : <>{t.process.h3.en.split('\n')[0]}<br/><span className="italic font-serif">{t.process.h3.en.split('\n')[1]}</span></>
              }
            </h3>
          </div>
          <div className="text-zinc-500 text-sm max-w-sm leading-relaxed whitespace-pre-line">
            {t.process.sub[lang]}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {t.process.steps.map((step, idx) => {
            const Icon = icons[idx];
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass rounded-[1.5rem] md:rounded-[2.5rem] p-5 md:p-8 flex flex-col items-center text-center gap-4 md:gap-6 border-white/5 hover:border-white/20 transition-all hover:bg-white/10 group h-full"
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white text-[#0A0A0B] shrink-0 overflow-hidden relative group-hover:bg-[#ccff00] transition-colors mb-2">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-4">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-[10px] font-mono text-zinc-600">{String(idx + 1).padStart(2, '0')}</span>
                    <h4 className="text-xl font-medium">{step.title[lang]}</h4>
                  </div>
                  <p className="text-zinc-500 text-xs font-light group-hover:text-zinc-300 transition-colors leading-relaxed whitespace-pre-line">
                    {step.desc[lang]}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
