import { motion } from 'motion/react';
import { MessageSquare, CreditCard, Layout, RefreshCw, FileCheck } from 'lucide-react';

const steps = [
  {
    num: '01',
    title: '디자인 상담',
    desc: '어떤 스타일의 디자인을 원하시나요?\n원하는 디자인 스타일과 방향을 함께 이야기해요!\n충분한 상담 후 레퍼런스 취합하여 같이 방향성을 확정해 나갑니다.',
    icon: MessageSquare
  },
  {
    num: '02',
    title: '견적 안내 및 결제',
    desc: '작업 분량에 따라 견적을 안내드리며,\n결제 확인 후 본격적인 작업이 진행됩니다.',
    icon: CreditCard
  },
  {
    num: '03',
    title: '1차 시안 제공',
    desc: '패키지별 작업 기간을 확인하신 후,\n브랜드의 가치를 담은 정성스러운 시안을 받아보세요.',
    icon: Layout
  },
  {
    num: '04',
    title: '피드백 및 수정',
    desc: '수정 횟수는 디자인 분야별로 상이합니다.\n원하는 스타일을 정확하게 담아낼 수 있도록 세심하게 반영해 드립니다.',
    icon: RefreshCw
  },
  {
    num: '05',
    title: '원본파일 제공',
    desc: '최종 확정된 디자인에 따라 필요한 원본 파일\n(AI / PDF / JPG 등)을 안전하게 전달드립니다.',
    icon: FileCheck
  }
];

export default function ProcessSection() {
  return (
    <section id="process" className="relative py-32 px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
          <div>
            <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-zinc-500 mb-6">Process</h2>
            <h3 className="text-5xl md:text-7xl font-light leading-none">
              어떻게 <br/> 
              <span className="italic font-serif">진행되나요?</span>
            </h3>
          </div>
          <div className="text-zinc-500 text-sm max-w-sm leading-relaxed">
             각 프로젝트는 브랜드의 성공을 위해<br/>
             세심하고 체계적인 단계를 거쳐 완성됩니다.
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((step, idx) => (
            <motion.div 
               key={step.num}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.1 }}
               className="glass rounded-[2.5rem] p-8 flex flex-col items-center text-center gap-6 border-white/5 hover:border-white/20 transition-all hover:bg-white/10 group h-full"
            >
               <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white text-[#0A0A0B] shrink-0 overflow-hidden relative group-hover:bg-[#ccff00] transition-colors mb-2">
                 <step.icon className="w-6 h-6" />
               </div>
               
               <div className="space-y-4">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-[10px] font-mono text-zinc-600">{step.num}</span>
                    <h4 className="text-xl font-medium">{step.title}</h4>
                  </div>
                  <p className="text-zinc-500 text-xs font-light group-hover:text-zinc-300 transition-colors leading-relaxed whitespace-pre-line">
                    {step.desc}
                  </p>
               </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
