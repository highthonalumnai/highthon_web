import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "HIGHTHON : HOMECOMING DAY";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logo = await readFile(join(process.cwd(), "public/homecoming/logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        {/* 로고 PNG는 상하로 약 24.5%씩 투명 여백을 포함(1800px 프레임 중 실제 잉크는 439~1359).
            음수 마진으로 그 여백을 레이아웃에서 제거해 로고와 날짜 간격을 좁히고,
            보이는 로고+텍스트 묶음이 세로 중앙에 오도록 함. */}
        <img
          src={logoSrc}
          width={440}
          height={440}
          alt=""
          style={{ marginTop: -104, marginBottom: -104 }}
        />
        <div
          style={{
            marginTop: 8,
            fontSize: 30,
            letterSpacing: 10,
            color: "#0a0a0a",
            fontWeight: 700,
          }}
        >
          2026 . 07 . 25
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 52,
            letterSpacing: 2,
            color: "#525252",
            fontWeight: 700,
          }}
        >
          해커톤이 아닌, 네트워킹 밋업
        </div>
      </div>
    ),
    { ...size },
  );
}
