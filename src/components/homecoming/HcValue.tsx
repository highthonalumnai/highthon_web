import Image from "next/image";
import { Reveal } from "@/components/Reveal";

export function HcValue() {
  return (
    <section className="relative scroll-mt-20 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <Reveal>
              <span className="eyebrow">Value of Sponsorship — 후원의 가치</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                “IT 생태계의 다음 세대와
                <br />
                <span className="text-stroke">현재의 리더를 연결합니다.”</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
                하이톤은 학생 주도에서 시작하여, 이제는 현업의 전문가들이 다시 모이는
                커뮤니티로 성장하고 있습니다. 귀사의 후원은 이 소중한 연결과 성장을
                지원합니다.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-line">
              <Image
                src="/homecoming/value.jpg"
                alt="연결되는 사람들"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover grayscale contrast-125"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
