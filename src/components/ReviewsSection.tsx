import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';
import { t } from '../lib/translations';

export default function ReviewsSection() {
  const { lang } = useLang();

  return (
    <section id="reviews" className="relative py-20 md:py-32 px-6 md:px-12 bg-white/5 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-zinc-500 mb-6">Reviews</h2>
          <h3 className="text-4xl md:text-5xl font-light">
            {lang === 'ko' ? '클라이언트 ' : 'Client '}
            <span className="italic font-serif">{lang === 'ko' ? '후기' : 'Kind Words'}</span>
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-8 lg:gap-10">
          {t.reviews.items.map((review, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.01 }}
              className="glass-panel p-6 sm:p-8 md:p-12 lg:p-16 rounded-[1.5rem] sm:rounded-[2.5rem] md:rounded-[4rem] flex flex-col justify-between w-full border border-white/5 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff00ff]/5 blur-[100px] -mr-32 -mt-32 pointer-events-none" />
              <div>
                <Quote className="w-8 h-8 sm:w-12 sm:h-12 text-[#ff00ff]/20 mb-4 sm:mb-8" />
                <p className="text-zinc-300 text-[10px] sm:text-base md:text-xl leading-relaxed mb-6 sm:mb-12 font-light italic line-clamp-6">
                  "{review.text[lang]}"
                </p>
              </div>
              <div className="flex items-center gap-3 sm:gap-6">
                <div className="w-8 sm:w-16 h-[1px] bg-[#ccff00]/30" />
                <span className="text-[8px] sm:text-sm md:text-base font-mono uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#ccff00]/60 font-medium">
                  {review.author[lang]}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
