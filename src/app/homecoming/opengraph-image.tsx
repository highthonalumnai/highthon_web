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
        <img src={logoSrc} width={460} height={460} alt="" />
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
            marginTop: 20,
            fontSize: 24,
            letterSpacing: 2,
            color: "#737373",
            fontWeight: 600,
          }}
        >
          해커톤이 아닌, 네트워킹 밋업
        </div>
      </div>
    ),
    { ...size },
  );
}
