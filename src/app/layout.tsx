import type { Metadata } from "next";
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://highthon.kr"),
  title: {
    default: "HIGHTHON · 고등학생들만의 해커톤",
    template: "%s · HIGHTHON",
  },
  description:
    "고등학생에 의한, 고등학생을 위한, 고등학생들만의 해커톤. 2017년부터 매년, 무박 2일 동안 전국의 고등학생 개발자들이 모여 아이디어를 코드로 만듭니다.",
  keywords: [
    "하이톤",
    "highthon",
    "고등학생 해커톤",
    "해커톤",
    "청소년 개발자",
    "코딩 대회",
  ],
  openGraph: {
    title: "HIGHTHON · 고등학생들만의 해커톤",
    description:
      "고등학생에 의한, 고등학생을 위한, 고등학생들만의 해커톤. 2017년부터 매년 개최.",
    type: "website",
    locale: "ko_KR",
    siteName: "HIGHTHON",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ko"
      className={`${bricolage.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          as="style"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body className="grain min-h-full">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
