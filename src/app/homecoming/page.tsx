import type { Metadata } from "next";
import { HcNavbar } from "@/components/homecoming/HcNavbar";
import { HcHero } from "@/components/homecoming/HcHero";
import { HcWhatIs } from "@/components/homecoming/HcWhatIs";
import { HcAboutMeetup } from "@/components/homecoming/HcAboutMeetup";
import { HcVision } from "@/components/homecoming/HcVision";
import { HcTarget } from "@/components/homecoming/HcTarget";
import { HcDifferentiation } from "@/components/homecoming/HcDifferentiation";
import { HcSchedule } from "@/components/homecoming/HcSchedule";
import { HcProgramDetail } from "@/components/homecoming/HcProgramDetail";
import { HcTicketCta } from "@/components/homecoming/HcTicketCta";
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

export default function HomecomingPage() {
  return (
    <>
      <HcNavbar />
      <main>
        <HcHero />
        <HcWhatIs />
        <HcAboutMeetup />
        <HcVision />
        <HcTarget />
        <HcDifferentiation />
        <HcSchedule />
        <HcProgramDetail />
        <HcTicketCta />
        <HcValue />
        <HcBenefits />
      </main>
      <HcContact />
    </>
  );
}
