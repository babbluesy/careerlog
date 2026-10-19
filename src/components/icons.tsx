import type { ReactElement } from 'react'
import type { SkillIconName } from '../content/types'

/**
 * 스킬 카테고리 아이콘.
 *
 * 외부 CDN·아이콘 패키지를 쓰지 않으므로 모양은 여기에 직접 둔다.
 * 24×24 격자, 선으로만 그리고 색은 currentColor를 따른다 — 쓰는 쪽에서 색과 크기를 정한다.
 * 어느 카테고리에 무엇을 붙일지는 skills.json 이 정한다. 여기에는 모양만 있다.
 */
const shapes: Record<SkillIconName, ReactElement> = {
  code: (
    <>
      <path d="M16 18l6-6-6-6" />
      <path d="M8 6l-6 6 6 6" />
    </>
  ),
  chart: (
    <>
      <path d="M3 3v16a2 2 0 0 0 2 2h16" />
      <path d="M19 9l-5 5-4-4-3 3" />
    </>
  ),
  sparkles: (
    <>
      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
      <path d="M19 15.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14a9 3 0 0 0 18 0V5" />
      <path d="M3 12a9 3 0 0 0 18 0" />
    </>
  ),
  bars: (
    <>
      <path d="M6 20v-5" />
      <path d="M12 20V8" />
      <path d="M18 20v-9" />
      <path d="M3 20h18" />
    </>
  ),
  server: (
    <>
      <rect x="2" y="3" width="20" height="7" rx="2" />
      <rect x="2" y="14" width="20" height="7" rx="2" />
      <path d="M6 6.5h.01" />
      <path d="M6 17.5h.01" />
    </>
  ),
  wrench: (
    <>
      <path d="M14.6 6.3a1 1 0 0 0 0 1.4l1.7 1.7a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z" />
    </>
  ),
}

/** 카테고리 앞에 놓이는 작은 글리프. 장식이므로 스크린리더에는 읽히지 않는다. */
export function SkillIcon({ name, className = '' }: { name: SkillIconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {shapes[name]}
    </svg>
  )
}
