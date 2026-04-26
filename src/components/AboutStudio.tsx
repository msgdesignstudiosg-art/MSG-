import { motion } from 'motion/react';

export default function AboutStudio() {
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
            <h3 className="text-4xl md:text-5xl font-light mb-12 leading-tight">
              안녕하세요.<br/>
              <span className="italic font-serif">MSG DESIGN STUDIO</span> 입니다 :)
            </h3>
            
            <p className="text-zinc-400 text-lg leading-relaxed mb-12">
              MSG DESIGN STUDIO는 해외에서 디자인을 전공하고 실무 경험을 쌓은 디자이너들이 모여 국내외 다양한 브랜드와 협업해온 전문 디자인 스튜디오입니다. 우리는 단순히 제품을 포장하는 디자인이 아닌, 받는 사람의 마음에 남는 ‘선물 같은 디자인’을 만듭니다.
            </p>

            <div className="space-y-12">
              {[
                { num: '01', text: '싱가포르 명문 디자인 학교를 졸업한 디자이너들이 협업하여 고객에 니즈에 맞는 디자인 제공' },
                { num: '02', text: "단순히 '예쁜' 디자인을 넘어 동시에 실용적이고 창의적인 디자인 솔루션을 제공" },
                { num: '03', text: '특정 스타일에 얽매이지 않고 각 클라이언트의 요구에 맞춘 개성있고 감각적인 맞춤형 디자인 제공' }
              ].map((item) => (
                <div key={item.num} className="flex gap-8 items-start border-l border-white/10 pl-8 transition-colors hover:border-orange-500 group">
                  <span className="text-sm font-mono text-zinc-600 group-hover:text-[#ccff00] transition-colors uppercase">{item.num}</span>
                  <p className="text-zinc-300 font-light">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-16">
            <div className="glass-panel p-10 rounded-[3rem]">
              <h4 className="text-2xl font-serif italic mb-6">“하나의 스토리를 담은 디자인”</h4>
              <p className="text-sm text-zinc-400 leading-relaxed">
                MSG DESIGN STUDIO의 모든 디자인은 공장에서 찍어내듯 만들어지지 않습니다. <br/><br/>
                브랜드의 이야기를 이해하고, 제품이 가진 감정과 가치를 담아 디자인 하나하나에 진심을 더합니다. 각 프로젝트는 브랜드의 첫인상이자 메시지를 전하는 한 통의 편지처럼, 디테일 하나에도 의미와 스토리를 담아 소비자에게 ‘감동’을 전달할 수 있도록 설계됩니다.
              </p>
            </div>

            <div className="glass-panel p-10 rounded-[3rem] border-[#ccff00]/20">
               <h4 className="text-2xl font-serif italic mb-6">“소비자의 마음을 사로잡는 선물 같은 디자인”</h4>
               <p className="text-sm text-zinc-400 leading-relaxed">
                 우리는 패키지를 단순한 포장이 아닌, 브랜드가 소비자에게 건네는 ‘첫 번째 선물’로 생각합니다. <br/><br/>
                 그 선물이 눈에 닿는 순간, 마음까지 설레일 수 있도록, 감각적인 비주얼과 감정적인 공감이 조화를 이루는 디자인을 만듭니다. 제품을 마주한 찰나의 시선 속에서도 브랜드의 메시지와 감성이 자연스럽게 전해지도록 — MSG DESIGN STUDIO는 시각적인 아름다움에 진심을 담습니다.
               </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
