import { getType, HC_TYPES } from "@/lib/hcTypeTest";
import { typeCardImageResponse, HC_CARD_CONFIG } from "@/lib/hcTypeCardImage";

export const alt = "HIGHTHON : HOMECOMING DAY — 나의 하이톤 유형";
export const size = HC_CARD_CONFIG.ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return HC_TYPES.map((t) => ({ typeId: t.id }));
}

export default async function Image({ params }: { params: Promise<{ typeId: string }> }) {
  const { typeId } = await params;
  const type = getType(typeId) ?? HC_TYPES[0];
  return typeCardImageResponse(type, size);
}
