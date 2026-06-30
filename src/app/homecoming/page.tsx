import type { Metadata, Viewport } from "next";
import { HcNavbar } from "@/components/homecoming/HcNavbar";
import { HcHero } from "@/components/homecoming/HcHero";
import { HcWhatIs } from "@/components/homecoming/HcWhatIs";
import { HcAboutMeetup } from "@/components/homecoming/HcAboutMeetup";
import { HcTarget } from "@/components/homecoming/HcTarget";
import { HcVision } from "@/components/homecoming/HcVision";
import { HcWhy } from "@/components/homecoming/HcWhy";
import { HcDifferentiation } from "@/components/homecoming/HcDifferentiation";
import { HcSchedule } from "@/components/homecoming/HcSchedule";
import { HcVenue } from "@/components/homecoming/HcVenue";
import { HcProgramDetail } from "@/components/homecoming/HcProgramDetail";
import { HcTicketCta } from "@/components/homecoming/HcTicketCta";
import { HcFaq } from "@/components/homecoming/HcFaq";
import { HcFooter } from "@/components/homecoming/HcFooter";

// 다크 히어로 — iOS Safari status bar를 히어로 배경색으로 채움
export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  title: "HOMECOMING DAY · 참가 신청",
  description:
    "하이톤을 기억하는 성인들을 위한 네트워킹 밋업, HIGHTHON : HOMECOMING DAY. 2026년 7월 25일 개최. 현업 IT 전문가가 된 이들이 다시 모이는 하루, 지금 참가 신청하세요.",
  openGraph: {
    title: "HIGHTHON : HOMECOMING DAY · 참가 신청",
    description:
      "하이톤을 기억하는 성인들을 위한 네트워킹 밋업. 2026.07.25, 정원 100명 한정. 지금 참가 신청하세요.",
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
        <HcTarget />
        <HcVision />
        <HcWhy />
        <HcDifferentiation />
        <HcSchedule />
        <HcVenue />
        <HcProgramDetail />
        <HcTicketCta />
        <HcFaq />
      </main>
      <HcFooter />
    </>
  );
}
