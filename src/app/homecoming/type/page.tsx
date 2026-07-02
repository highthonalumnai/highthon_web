import type { Metadata } from "next";
import { TypeIntro } from "@/components/homecoming/type/TypeIntro";

export const metadata: Metadata = {
  title: "그때 우리, 무슨 스타일이었더라? — 하이톤 유형 테스트",
  description: "개발자·기획자·디자이너, 16유형으로 알아보는 나의 해커톤 캐릭터. GPT도 없던 그 시절의 나는?",
};

export default function TypeTestPage() {
  return <TypeIntro />;
}
