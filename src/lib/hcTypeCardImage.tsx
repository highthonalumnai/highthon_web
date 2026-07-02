import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { HC_TYPE_MAP, type HcType } from "./hcTypeTest";

/**
 * 카드에서 자주 바꾸는 값은 전부 여기 모음 (레이아웃 JSX는 이 값만 참조).
 * 문구/날짜/핸들/크기 변경 시 이 객체만 수정하면 됨.
 */
export const HC_CARD_CONFIG = {
  brand: "HIGHTHON : HOMECOMING DAY",
  eyebrow: "그때 우리 팀의",
  eventDate: "2026.07.25 SAT",
  handle: "@highthon_homecomingday",
  jobLabel: { dev: "개발자", design: "디자이너", plan: "기획자", all: "공용" } as Record<HcType["job"], string>,
  /** 공유 이미지 사이즈 — 라우트가 재사용 */
  ogSize: { width: 1200, height: 630 },
  storySize: { width: 1080, height: 1350 },
} as const;

export async function typeCardImageResponse(
  type: HcType,
  size: { width: number; height: number },
): Promise<ImageResponse> {
  const cfg = HC_CARD_CONFIG;
  const logo = await readFile(join(process.cwd(), "public/homecoming/logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  const fg = type.textOnColor === "paper" ? "#ffffff" : "#0a0a0a";
  const best = HC_TYPE_MAP[type.best];
  const worst = HC_TYPE_MAP[type.worst];
  const isPortrait = size.height > size.width;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column",
          background: type.color, color: fg, padding: isPortrait ? 80 : 64,
          justifyContent: "space-between", fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 26, fontWeight: 700, opacity: 0.8 }}>
          <span>{cfg.brand}</span>
          <span style={{ background: fg, color: type.color, padding: "6px 20px", borderRadius: 999, fontSize: 24 }}>
            {cfg.jobLabel[type.job]}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <div style={{ fontSize: isPortrait ? 180 : 130 }}>{type.emoji}</div>
          <div style={{ fontSize: 30, fontWeight: 600, opacity: 0.7 }}>{cfg.eyebrow}</div>
          <div style={{ fontSize: isPortrait ? 88 : 74, fontWeight: 800, textAlign: "center", lineHeight: 1.1 }}>
            {type.name}
          </div>
          <div style={{ fontSize: 30, textAlign: "center", opacity: 0.85, maxWidth: isPortrait ? 820 : 940, lineHeight: 1.4 }}>
            {type.oneLiner}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ display: "flex", flexDirection: "column", flex: 1, background: fg, color: type.color, borderRadius: 20, padding: "18px 24px", fontSize: 26 }}>
              <span style={{ fontWeight: 800 }}>💘 찰떡</span>
              <span>{best.name}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", flex: 1, border: `3px solid ${fg}`, borderRadius: 20, padding: "18px 24px", fontSize: 26 }}>
              <span style={{ fontWeight: 800 }}>💥 상극</span>
              <span>{worst.name}</span>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 24, fontWeight: 700, opacity: 0.85 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              {/* next/og ImageResponse는 next/image가 아닌 <img>를 요구 */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logoSrc} width={44} height={44} alt="" />
              <span>{cfg.eventDate}</span>
            </div>
            <span>{cfg.handle}</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
