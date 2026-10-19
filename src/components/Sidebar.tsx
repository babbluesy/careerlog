import type { ReactNode } from 'react'
import { tabs, site } from '../content'
import type { TabId } from '../content/types'

interface Props {
  current: TabId
  onSelect: (id: TabId) => void
  dark: boolean
  onToggleTheme: () => void
}

export function Sidebar({ current, onSelect, dark, onToggleTheme }: Props) {
  return (
    <aside className="no-print dot-grid sticky top-0 z-10 border-b border-line bg-paper/90 backdrop-blur md:fixed md:inset-y-0 md:left-0 md:w-72 md:border-r md:border-b-0 md:backdrop-blur-none">
      <div className="flex h-full flex-col gap-8 px-6 py-5 md:px-8 md:py-10">
        <header className="flex items-center justify-between md:block">
          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{site.name}</h1>
            <p className="mt-1 font-mono text-[0.7rem] tracking-[0.2em] text-accent uppercase">
              {site.title}
            </p>
          </div>
          {/* 모바일에서는 헤더 옆에, 데스크톱에서는 하단에 둔다. 좁으니 여기서는 아이콘만. */}
          <div className="flex gap-1 md:hidden">
            <IconButton
              onClick={onToggleTheme}
              label={dark ? site.labels.themeLight : site.labels.themeDark}
              icon={dark ? <SunIcon /> : <MoonIcon />}
            />
          </div>
        </header>

        <nav aria-label={site.labels.nav} className="-mx-2 overflow-x-auto md:mx-0 md:overflow-visible">
          <ul className="flex gap-1 px-2 md:flex-col md:px-0">
            {tabs.map((tab, i) => {
              const active = tab.id === current
              return (
                <li key={tab.id} className="shrink-0 md:shrink">
                  <button
                    type="button"
                    onClick={() => onSelect(tab.id)}
                    aria-current={active ? 'page' : undefined}
                    className={`group flex w-full cursor-pointer items-baseline gap-3 rounded px-3 py-2 text-left transition-colors ${
                      active ? 'bg-accent-soft' : 'hover:bg-line/50'
                    }`}
                  >
                    <span
                      className={`font-mono text-[0.7rem] tabular-nums ${
                        active ? 'text-accent' : 'text-faint'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1">
                      <span
                        className={`block text-sm ${active ? 'font-semibold text-ink' : 'text-muted'}`}
                      >
                        {tab.label}
                      </span>
                      <span className="hidden text-xs text-faint md:block">{tab.ko}</span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="mt-auto hidden md:block">
          <div className="mb-4 h-px bg-line" />
          {/* 데스크톱에는 자리가 있으니 아이콘 옆에 무슨 버튼인지 그대로 적는다. */}
          <div className="flex gap-1.5">
            <IconButton
              onClick={onToggleTheme}
              label={dark ? site.labels.themeLight : site.labels.themeDark}
              icon={dark ? <SunIcon /> : <MoonIcon />}
              showLabel
            />
          </div>
          <p className="mt-4 font-mono text-[0.65rem] leading-relaxed text-faint">
            {site.caption}
            <br />
            {site.location}
          </p>
        </div>
      </div>
    </aside>
  )
}

const controlClass = (showLabel: boolean) =>
  `flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded border border-line text-muted transition-colors hover:border-accent hover:text-accent ${
    showLabel ? 'flex-1 px-2 text-xs' : 'w-8'
  }`

function IconButton({
  onClick,
  label,
  icon,
  showLabel = false,
}: {
  onClick: () => void
  label: string
  icon: ReactNode
  showLabel?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      className={controlClass(showLabel)}
    >
      {icon}
      {showLabel && <span>{label}</span>}
    </button>
  )
}

/*
 * 아이콘은 직접 그린다 — 외부 CDN 없이 자체 자산만 쓰고, ⎙ 같은 글리프는 폰트에 따라 빈 네모로 나온다.
 * currentColor 라서 호버·다크모드에서 버튼 색을 그대로 따라간다.
 */
const iconProps = {
  width: 14,
  height: 14,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
} as const

function SunIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg {...iconProps}>
      <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
    </svg>
  )
}
