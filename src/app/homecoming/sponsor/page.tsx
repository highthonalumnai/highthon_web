import type { Metadata } from "next";
import { HcSponsorHero } from "@/components/homecoming/HcSponsorHero";
import { HcValue } from "@/components/homecoming/HcValue";
import { HcBenefits } from "@/components/homecoming/HcBenefits";
import { HcContact } from "@/components/homecoming/HcContact";

export const metadata: Metadata = {
  title: "HOMECOMING DAY · 후원제안서",
  description:
    "하이톤을 기억하는 성인들을 위한 네트워킹 밋업, HIGHTHON : HOMECOMING DAY. 2026년 7월 25일 개최. 현업 IT 전문가가 된 100여 명의 하이톤 출신 인재 네트워크에 귀사를 파트너로 초대합니다.",
  openGraph: {
    title: "HIGHTHON : HOMECOMING DAY · 후원제안서",
    description:
      "하이톤을 기억하는 성인들을 위한 네트워킹 밋업. 검증된 IT 인재 네트워크에 귀사를 파트너로 초대합니다.",
    type: "website",
    locale: "ko_KR",
  },
};

export default function HomecomingSponsorPage() {
  return (
    <>
      <main>
        <HcSponsorHero />
        <HcValue />
        <HcBenefits />
      </main>
      <HcContact />
    </>
  );
}
