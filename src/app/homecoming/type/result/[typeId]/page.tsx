import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getType, HC_TYPES } from "@/lib/hcTypeTest";
import { TypeResult } from "@/components/homecoming/type/TypeResult";

export function generateStaticParams() {
  return HC_TYPES.map((t) => ({ typeId: t.id }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ typeId: string }> },
): Promise<Metadata> {
  const { typeId } = await params;
  const type = getType(typeId);
  if (!type) return { title: "하이톤 유형 테스트" };
  return {
    title: `나는 '${type.name}' — 하이톤 유형 테스트`,
    description: type.oneLiner,
  };
}

export default async function ResultPage(
  { params }: { params: Promise<{ typeId: string }> },
) {
  const { typeId } = await params;
  const type = getType(typeId);
  if (!type) notFound();
  return <TypeResult type={type} />;
}
