import { motion } from 'motion/react';
import { Fingerprint, Sparkles, Package } from 'lucide-react';

const services = [
  {
    title: 'Logo Design',
    desc: '브랜드의 정체성을 한눈에 보여주는 임팩트 있는 심볼과 로고를 디자인합니다.',
    gradient: 'from-[#ccff00]',
    icon: Fingerprint
  },
  {
    title: 'Branding',
    desc: '일관된 시각적 언어와 철학으로 브랜드만의 특별한 감각과 아이덴티티를 구축합니다.',
    gradient: 'from-[#ff00ff]',
    icon: Sparkles
  },
  {
    title: 'Packaging',
    desc: '단순한 포장을 넘어, 여는 순간부터 소비자에게 설렘을 주는 시그니처 패키지를 제안합니다.',
    gradient: 'from-[#00ffff]',
    icon: Package
  }
];

const FolderIcon = ({ color }: { color: string }) => (
  <svg width="100%" height="100%" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M42 20H92C96.4183 20 100 23.5817 100 28V72C100 76.4183 96.4183 80 92 80H8C3.58172 80 0 76.4183 0 72V8C0 3.58172 3.58172 0 8 0H32L42 20Z" fill={color}/>
  </svg>
);

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-32 px-12 bg-black/20 backdrop-blur-3xl border-y border-white/5">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-zinc-500 mb-6">Our Services</h2>
        <p className="text-4xl md:text-5xl font-light mb-24 md:mb-32 drop-shadow-lg">
          <span className="italic font-serif">Solutions</span> crafted for your distinction.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          {services.map((service) => (
            <motion.div 
              key={service.title}
              whileHover={{ y: -15 }}
              className="relative group pt-12"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-32 opacity-20 group-hover:opacity-100 transition-opacity duration-500 blur-xl group-hover:blur-2xl" style={{ backgroundColor: service.gradient.includes('ccff00') ? '#ccff00' : service.gradient.includes('ff00ff') ? '#ff00ff' : '#00ffff' }} />
              
              <div className="relative glass-panel p-10 md:p-14 rounded-[4rem] h-full flex flex-col items-center border border-white/10 group-hover:border-[#ccff00]/40 transition-all duration-500">
                <div className="w-24 h-20 mb-10 group-hover:scale-110 transition-transform duration-500">
                  <FolderIcon color={service.gradient.includes('ccff00') ? '#ccff00' : service.gradient.includes('ff00ff') ? '#ff00ff' : '#00ffff'} />
                </div>
                
                <h3 className="text-3xl font-bold mb-8 uppercase tracking-tighter group-hover:text-white transition-colors">{service.title}</h3>
                <p className="text-zinc-400 text-base leading-relaxed font-light">
                  {service.desc}
                </p>
                
                <div className="mt-10 p-3 bg-white/5 rounded-2xl group-hover:bg-white text-zinc-500 group-hover:text-black transition-all">
                   <service.icon className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-24 text-xl font-light italic text-zinc-500">
          소비자에게 선물이 되는 감각적인 디자인,<br/>
          <span className="text-white font-serif uppercase tracking-widest not-italic">MSG DESIGN STUDIO</span>로 초대합니다!
        </p>
      </div>
    </section>
  );
}
