import { getType } from "@/lib/hcTypeTest";
import { typeCardImageResponse, HC_CARD_CONFIG } from "@/lib/hcTypeCardImage";

// GET /homecoming/type/result/[typeId]/card → 세로 스토리 카드 PNG
export async function GET(
  _req: Request,
  ctx: { params: Promise<{ typeId: string }> },
) {
  const { typeId } = await ctx.params;
  const type = getType(typeId);
  if (!type) return new Response("Not found", { status: 404 });
  return typeCardImageResponse(type, HC_CARD_CONFIG.storySize);
}
