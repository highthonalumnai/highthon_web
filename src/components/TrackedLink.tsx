"use client";

import Link from "next/link";
import { track } from "@vercel/analytics";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";

type TrackedLinkProps = {
  href: string;
  /** Vercel Web Analytics 커스텀 이벤트명 (snake_case) */
  event: string;
  /** 같은 액션의 위치 구분 등 이벤트 속성 */
  eventData?: Record<string, string | number | boolean>;
  children: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

/**
 * 서버 컴포넌트 안의 CTA를 클라이언트 이벤트로 계측하기 위한 얇은 래퍼.
 * 섹션 전체를 "use client"로 바꾸지 않고 링크 하나만 클라이언트로 승격한다.
 * 내부 라우트("/"로 시작)는 next/link, mailto·외부 링크는 일반 anchor로 렌더.
 */
export function TrackedLink({
  href,
  event,
  eventData,
  children,
  onClick,
  ...rest
}: TrackedLinkProps) {
  const fire = (e: MouseEvent<HTMLAnchorElement>) => {
    track(event, eventData);
    onClick?.(e);
  };

  if (href.startsWith("/")) {
    return (
      <Link href={href} onClick={fire} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} onClick={fire} {...rest}>
      {children}
    </a>
  );
}
