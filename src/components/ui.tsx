import type { CSSProperties, ReactNode } from 'react'
import { brands, tabs } from '../content'
import type { TabId } from '../content/types'

/** 탭 머리말. 제목은 tabs.ts 하나에서만 온다. */
export function Section({ id, children }: { id: TabId; children: ReactNode }) {
  const tab = tabs.find((t) => t.id === id)!

  return (
    <section>
      <h2 className="mb-8 text-[1.75rem] leading-tight font-bold tracking-tight">{tab.label}</h2>
      {children}
    </section>
  )
}

/** 탭 안의 하위 묶음('걸어온 길', '스킬' …) 제목. */
export function Heading({ children }: { children: ReactNode }) {
  return <h3 className="mt-16 mb-2 border-b-2 border-ink pb-2 text-lg font-bold">{children}</h3>
}

/**
 * 이 사이트의 기본 단위. 장부처럼 왼쪽에 기간, 오른쪽에 내용을 둔다.
 * 모든 탭이 같은 행을 쓰므로 날짜 열이 페이지 전체에서 한 줄로 맞는다.
 * 좁은 화면에서는 기간이 내용 위로 올라간다.
 */
export function Row({ date, children }: { date?: ReactNode; children: ReactNode }) {
  return (
    <div className="grid gap-1 border-b border-line py-6 last:border-b-0 sm:grid-cols-[8.5rem_1fr] sm:gap-6">
      <div className="pt-0.5 text-sm text-faint tabular-nums">{date}</div>
      <div className="min-w-0">{children}</div>
    </div>
  )
}

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 list-disc space-y-1 pl-5 marker:text-accent">
      {items.map((item) => (
        <li key={item} className="pl-0.5 leading-7 text-muted">
          {item}
        </li>
      ))}
    </ul>
  )
}

/** 쓴 기술 목록. 글자만 작게 두고, brands.ts 에 로고가 있으면 앞에 붙인다. */
export function Stack({ items }: { items?: string[] }) {
  if (!items?.length) return null
  return (
    <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
      {items.map((item) => (
        <Tag key={item}>{item}</Tag>
      ))}
    </p>
  )
}

/**
 * 기술 이름 하나. 이름에 해당하는 브랜드 로고가 brands.ts 에 있으면 앞에 붙는다.
 * 로고는 평소 회색이고 마우스를 올린 것만 브랜드 색으로 켜진다 (index.css 의 .tag-logo).
 */
export function Tag({ children }: { children: ReactNode }) {
  const brand = typeof children === 'string' ? brands[children] : undefined

  return (
    <span
      className="tag inline-flex items-center gap-1 text-[0.8rem] text-faint"
      style={brand ? ({ '--brand': `#${brand.hex}` } as CSSProperties) : undefined}
    >
      {brand && (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="tag-logo h-3 w-3 shrink-0">
          <path d={brand.path} />
        </svg>
      )}
      {children}
    </span>
  )
}
