import nodemailer, { type Transporter } from "nodemailer";
import { formatWon, type Ticket } from "@/lib/tickets";
import { type Donation } from "@/lib/donations";
import { HC_EVENT, HC_LOCATION, HC_CONTACT } from "@/lib/homecoming";

/**
 * Gmail SMTP 발송기. highthon.alumnai@gmail.com 계정 + 앱 비밀번호(App Password)로
 * 예약/후원 확정 안내 메일을 보낸다. Node 런타임 전용(Edge 불가).
 */
let transporter: Transporter | null = null;

const FROM = `"하이톤 홈커밍" <${process.env.GMAIL_USER ?? ""}>`;

/** 홈커밍 안내 페이지 — 메일 내 바로가기 버튼 링크. */
const SITE_URL = "https://highthon-web.vercel.app/homecoming";

function mailer(): Transporter {
  if (transporter) return transporter;
  const user = process.env.GMAIL_USER;
  // Gmail 앱 비밀번호는 표시상 공백이 있으나 실제로는 무시된다 — 안전하게 제거.
  const pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, "");
  if (!user || !pass) {
    throw new Error("이메일 환경변수(GMAIL_USER / GMAIL_APP_PASSWORD)가 없습니다.");
  }
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
  return transporter;
}

/** 메일 공통 푸터 — 행사 일정·장소·문의처. */
function footer(): string {
  return `
    <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0" />
    <table style="font-size:14px;color:#374151;line-height:1.7">
      <tr><td style="padding-right:12px;color:#6b7280;white-space:nowrap;vertical-align:top">일시</td><td>${HC_EVENT.dateFull}</td></tr>
      <tr><td style="padding-right:12px;color:#6b7280;white-space:nowrap;vertical-align:top">장소</td><td>${HC_LOCATION.address}</td></tr>
      <tr><td style="padding-right:12px;color:#6b7280;white-space:nowrap;vertical-align:top">문의</td><td><a href="mailto:${HC_CONTACT.email}" style="color:#2563eb">${HC_CONTACT.email}</a></td></tr>
    </table>
  `;
}

function shell(inner: string): string {
  return `
  <div style="max-width:560px;margin:0 auto;padding:32px 24px;font-family:-apple-system,BlinkMacSystemFont,'Apple SD Gothic Neo','Segoe UI',Roboto,sans-serif;color:#111827">
    <div style="font-size:13px;letter-spacing:0.08em;color:#2563eb;font-weight:700;margin-bottom:8px">HIGHTHON · HOMECOMING DAY</div>
    ${inner}
    <div style="margin:24px 0 4px">
      <a href="${SITE_URL}" style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;font-size:15px;font-weight:600;padding:12px 24px;border-radius:8px">행사 안내 페이지 바로가기 →</a>
    </div>
    ${footer()}
  </div>`;
}

function row(label: string, value: string): string {
  return `<tr><td style="padding:6px 16px 6px 0;color:#6b7280;white-space:nowrap">${label}</td><td style="padding:6px 0;font-weight:600">${value}</td></tr>`;
}

/** 티켓 예약 확정 안내 메일. */
export async function sendTicketConfirmedEmail(ticket: Ticket): Promise<void> {
  const rows = [
    row("예약 번호", ticket.code),
    row("성함", ticket.name),
    row("확정 금액", formatWon(ticket.amount)),
    row("뒤풀이", ticket.afterparty ? "참석 신청" : "미신청"),
  ].join("");

  const html = shell(`
    <h1 style="font-size:22px;margin:0 0 12px">예약이 확정되었습니다 🎉</h1>
    <p style="font-size:15px;color:#374151;line-height:1.7;margin:0 0 20px">
      ${ticket.name}님, 입금이 확인되어 <strong>하이톤 홈커밍 데이</strong> 참가 예약이 확정되었습니다.
      아래 예약 정보를 확인해 주세요.
    </p>
    <table style="font-size:15px;border-collapse:collapse;margin:0 0 8px">${rows}</table>
  `);

  await mailer().sendMail({
    from: FROM,
    to: ticket.email,
    subject: "[하이톤 홈커밍] 예약이 확정되었습니다",
    html,
  });
}

/** 개인 후원 확정 안내 메일. */
export async function sendDonationConfirmedEmail(donation: Donation): Promise<void> {
  const rows = [
    donation.code ? row("후원 번호", donation.code) : "",
    row("성함", donation.name),
    row("확정 금액", formatWon(donation.amount)),
    row("현장 참여", donation.attend ? "참여" : "미참여"),
    row("뒤풀이", donation.afterparty ? "참석 신청" : "미신청"),
  ].join("");

  const html = shell(`
    <h1 style="font-size:22px;margin:0 0 12px">후원이 확정되었습니다 💙</h1>
    <p style="font-size:15px;color:#374151;line-height:1.7;margin:0 0 20px">
      ${donation.name}님, 입금이 확인되어 <strong>하이톤 홈커밍 데이</strong> 후원이 확정되었습니다.
      소중한 후원에 진심으로 감사드립니다.
    </p>
    <table style="font-size:15px;border-collapse:collapse;margin:0 0 8px">${rows}</table>
  `);

  await mailer().sendMail({
    from: FROM,
    to: donation.email,
    subject: "[하이톤 홈커밍] 후원이 확정되었습니다",
    html,
  });
}
