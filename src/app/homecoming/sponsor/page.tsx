import type { Metadata } from "next";
import { HcSponsorHero } from "@/components/homecoming/HcSponsorHero";
import { HcValue } from "@/components/homecoming/HcValue";
import { HcBenefits } from "@/components/homecoming/HcBenefits";
import { HcDonation } from "@/components/homecoming/HcDonation";
import { HcContact } from "@/components/homecoming/HcContact";
import { supabaseServer } from "@/lib/supabaseServer";
import type { TicketSettings } from "@/lib/tickets";

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

// 잔여 좌석이 후원 폼에 실시간 반영되도록 매 요청 렌더
export const dynamic = "force-dynamic";

const FALLBACK_SETTINGS: TicketSettings = {
  price: 0,
  capacity: 0,
  reserved: 0,
  remaining: 0,
  sold_out: true,
  bank_name: "",
  bank_account: "",
  bank_holder: "",
};

export default async function HomecomingSponsorPage() {
  const { data } = await supabaseServer().rpc("get_ticket_settings");
  const settings = (data as TicketSettings | null) ?? FALLBACK_SETTINGS;

  return (
    <>
      <main>
        <HcSponsorHero />
        <HcValue />
        <HcBenefits />
        <HcDonation settings={settings} />
      </main>
      <HcContact />
    </>
  );
}
