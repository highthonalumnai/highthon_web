import { describe, it, expect } from "vitest";
import {
  HC_TYPES, HC_QUESTIONS, scoreAnswers, isValidTypeId, getType, type HcTypeId,
} from "./hcTypeTest";

describe("hcTypeTest 데이터 무결성", () => {
  it("유형은 정확히 16개, id 중복 없음", () => {
    expect(HC_TYPES).toHaveLength(16);
    expect(new Set(HC_TYPES.map((t) => t.id)).size).toBe(16);
  });

  it("문항은 10개, 각 4지선다", () => {
    expect(HC_QUESTIONS).toHaveLength(10);
    for (const q of HC_QUESTIONS) expect(q.choices).toHaveLength(4);
  });

  it("모든 유형은 최소 한 선택지에서 가중치를 받는다 (도달 가능)", () => {
    const weighted = new Set<string>();
    for (const q of HC_QUESTIONS)
      for (const c of q.choices)
        for (const id of Object.keys(c.weights)) weighted.add(id);
    for (const t of HC_TYPES) expect(weighted.has(t.id)).toBe(true);
  });

  it("best/worst는 유효한 유형 id를 가리킨다", () => {
    for (const t of HC_TYPES) {
      expect(isValidTypeId(t.best)).toBe(true);
      expect(isValidTypeId(t.worst)).toBe(true);
    }
  });
});

describe("scoreAnswers", () => {
  it("so_pilgrim을 정조준한 응답은 so_pilgrim을 반환", () => {
    // Q2:A(+2 so), Q5:D(+1 so), Q8:A(+2 so) 나머지는 임의(0에 가깝게)
    const answers = [0, 0, 0, 0, 3, 3, 3, 0, 3, 3];
    expect(scoreAnswers(answers)).toBe<HcTypeId>("so_pilgrim");
  });

  it("동점이면 HC_TYPES 선언 순서상 먼저인 유형을 반환 (결정론적)", () => {
    // 빈 응답 → 전원 0점 동점 → 첫 유형
    expect(scoreAnswers([])).toBe(HC_TYPES[0].id);
  });

  it("잘못된 선택지 index가 있어도 throw 없이 유효한 유형 반환", () => {
    const result = scoreAnswers([99, -1, 2, 0]);
    expect(isValidTypeId(result)).toBe(true);
  });
});

describe("getType", () => {
  it("존재하는 id는 유형, 없는 id는 null", () => {
    expect(getType("so_pilgrim")?.name).toBe("스택오버플로우 순례자");
    expect(getType("nope")).toBeNull();
  });
});
