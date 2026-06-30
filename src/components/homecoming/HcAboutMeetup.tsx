import Image from "next/image";
import { Reveal } from "@/components/Reveal";

export function HcAboutMeetup() {
  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/homecoming/meetup.jpg"
          alt="네트워킹 현장"
          fill
          sizes="100vw"
          className="object-cover opacity-25 grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/70 to-ink" />
      </div>

      <div className="relative mx-auto max-w-5xl px-5 py-32 text-center sm:px-8 sm:py-40">
        <Reveal>
          <span className="eyebrow text-paper">Homecoming Day</span>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mt-6 font-display text-3xl font-extrabold leading-snug tracking-tight sm:text-5xl">
            “하이톤을 기억하는 성인들을 위한
            <br className="hidden sm:block" /> 네트워킹 밋업.”
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-7 max-w-2xl text-[15px] leading-relaxed text-paper/60 sm:text-base">
            과거 하이톤 참가자들이 사회인이 되어 겪는 새로운 고민과 정보를 나누기
            위해, 다시 모입니다. 일회성 만남을 넘어 기술과 사람이 지속적으로 교류하며
            시너지를 내는, 검증된 인재들의 네트워크입니다.
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-6 max-w-xl text-xs leading-relaxed text-paper/40 sm:text-[13px]">
            ※ 코딩 대회나 해커톤 행사가 아닌, 참가자들을 위한 네트워킹 밋업입니다.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
