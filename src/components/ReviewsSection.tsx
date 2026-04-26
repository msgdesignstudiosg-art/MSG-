import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

const reviews = [
  {
    text: "정말정말 만족합니다!! 포트폴리오가 너무 좋으시지만 리뷰가 얼마 없어서 작업 맡기기 전 조금 걱정이 있었는데요, 걱정 무색하게도 1차 시안부터 예쁘고 맘에 쏙 드는 디자인을 해주셔서 안심했고, 작업기간 내내 편안한 마음이었습니다 ㅎㅎ 이곳의 장점은 너무 많지만, 우선 가장 두드러지는 건 신속함과 친절함이었습니다. 메시지 확인도 빠르시고, 작업 속도도 최대한 저희쪽에 맞춰서 신속하게 진행해주시구요 피드백 드리는대로 다 흡수를 잘 해주셔서 군더더기 없는, 정말 마음 편안하고 즐거운 작업이었습니다 :) 디자이너님과 직접 소통하고 있는 저 뿐만 아니라, 결과물만 보신 다른 팀원분들과 저희 대표님도 아주 만족하셨네요 ㅎㅎ 다음에 또 신제품 나오면 또 작업 의뢰드리려구요~ 감사합니다! :)",
    author: "브랜드 클라이언트"
  },
  {
    text: "착수 전 회의부터 너무 마음에 들어 고민없이 진행했던 프로젝트였습니다! 커뮤니케이션, 작업 퀄리티 등 어느하나 빠질것 없이 완벽했던 프로젝트를 진행해주셔서 감사합니다! 앞으로 계속해서 의뢰드리겠습니다. 이번에 즐거운 작업 해주셔서 정말 감사드립니다!",
    author: "해외 판매 사업자"
  },
  {
    text: "저희는 해외판매중인데 해외경험이 있으셔서 소통도 빠르고, 적절한 레퍼런스를 제공을 못해드렸음에도 감각적이고 예쁜 디자인 감사합니다 ! 사업번창하셔요 최고최고~! ^ . ~",
    author: "글로벌 코스메틱 대표"
  },
  {
    text: "단순히 예쁜 디자인이 아니라 브랜드 방향까지 잘 잡아주시는 디자이너입니다. 요청드린 수정도 빠르게 반영해주시고, 전체 완성도를 높여주셔서 결과물이 기대 이상으로 나왔습니다. 식품 패키지 처음 진행이었는데도 믿고 맡길 수 있었고, 매우 만족합니다. 다음 작업도 다시 의뢰드릴 예정입니다! :)",
    author: "브랜드 파트너"
  }
];

export default function ReviewsSection() {
  return (
    <section id="reviews" className="relative py-32 px-12 bg-white/5 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-zinc-500 mb-6">Reviews</h2>
          <h3 className="text-4xl md:text-5xl font-light">Client <span className="italic font-serif">Kind Words</span></h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ scale: 1.02 }}
              className="glass-panel p-10 rounded-[3rem] flex flex-col justify-between"
            >
              <div>
                <Quote className="w-10 h-10 text-[#ff00ff]/20 mb-6" />
                <p className="text-zinc-400 text-sm leading-relaxed mb-10 font-light italic">
                  "{review.text}"
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-px bg-white/10" />
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">{review.author}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
