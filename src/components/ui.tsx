import type { CSSProperties, ReactNode } from 'react'
import { brands, tabs } from '../content'
import type { TabId } from '../content/types'

/**
 * 탭마다 반복되는 머리말. 번호·제목·부제는 tabs.ts 하나에서만 오므로
 * 탭 순서를 바꾸면 번호도 따라 바뀐다.
 */
export function Section({ id, children }: { id: TabId; children: ReactNode }) {
  const index = tabs.findIndex((tab) => tab.id === id)
  const tab = tabs[index]

  return (
    <section>
      <header className="mb-10">
        <div className="flex items-baseline gap-3 font-mono text-xs tracking-widest text-accent uppercase">
          <span>{String(index + 1).padStart(2, '0')}</span>
          <span className="h-px flex-1 bg-line" />
          <span className="text-faint">{tab.ko}</span>
        </div>
        <h2 className="mt-4 text-3xl font-bold tracking-tight">{tab.label}</h2>
      </header>
      {children}
    </section>
  )
}

/** 본문 안의 소제목. '연구과제 참여' 같은 하위 묶음을 연다. */
export function Heading({ children }: { children: ReactNode }) {
  return (
    <h3 className="mb-5 flex items-center gap-3 font-mono text-xs tracking-widest text-faint uppercase">
      {children}
      <span className="h-px flex-1 bg-line" />
    </h3>
  )
}

/** 본문 카드. 왼쪽 모서리에만 강조선을 둬서 카드가 나열돼도 눈이 피로하지 않게. */
export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-r-lg border border-line border-l-2 border-l-accent bg-card ${className}`}>
      {children}
    </div>
  )
}

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 text-[0.925rem] leading-relaxed text-muted">
          <span className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-accent/60" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

/**
 * 태그. 이름에 해당하는 브랜드 로고가 brands.ts 에 있으면 앞에 붙는다 — 스킬이든 프로젝트 스택이든
 * 같은 이름이면 같은 로고가 나온다. 로고가 없는 이름(K-Means, 감성분석…)은 글자만 나온다.
 */
export function Tag({ children }: { children: ReactNode }) {
  const brand = typeof children === 'string' ? brands[children] : undefined

  return (
    <span
      className="tag inline-flex items-center gap-1 rounded border border-line px-1.5 py-0.5 font-mono text-[0.7rem] text-muted"
      style={brand ? ({ '--brand': `#${brand.hex}` } as CSSProperties) : undefined}
    >
      {brand && (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          className="tag-logo h-3 w-3 shrink-0"
        >
          <path d={brand.path} />
        </svg>
      )}
      {children}
    </span>
  )
}

/** 기간·날짜. 자릿수가 흔들리지 않게 등폭 숫자로 고정한다. */
export function Period({ children }: { children: ReactNode }) {
  return (
    <span className="shrink-0 font-mono text-xs text-faint tabular-nums">{children}</span>
  )
}

/** 소제목 위에 붙는 작은 라벨. '배경 및 목적' 같은 구조를 드러낸다. */
export function Label({ children }: { children: ReactNode }) {
  return (
    <p className="mb-2 font-mono text-[0.7rem] tracking-wider text-faint uppercase">{children}</p>
  )
}
