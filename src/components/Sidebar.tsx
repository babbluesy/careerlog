import { tabs, site } from '../content'
import type { TabId } from '../content/types'

interface Props {
  current: TabId
  onSelect: (id: TabId) => void
  dark: boolean
  onToggleTheme: () => void
}

export const photoSrc = `${import.meta.env.BASE_URL}${site.photo}`

export function Sidebar({ current, onSelect, dark, onToggleTheme }: Props) {
  const themeLabel = dark ? site.labels.themeLight : site.labels.themeDark

  return (
    <aside className="no-print sticky top-0 z-10 border-b border-line bg-paper/95 backdrop-blur md:fixed md:inset-y-0 md:left-0 md:w-64 md:border-r md:border-b-0">
      <div className="flex h-full flex-col gap-4 px-5 pt-4 md:gap-10 md:px-8 md:py-12">
        <header className="flex items-center gap-3 md:block">
          <img
            src={photoSrc}
            alt={site.name}
            className="h-10 w-10 shrink-0 rounded-full object-cover object-top md:mb-5 md:h-auto md:w-28 md:rounded-md"
          />
          <div className="flex-1">
            <h1 className="text-xl font-bold tracking-tight md:text-2xl">{site.name}</h1>
            <p className="text-sm text-muted">{site.title}</p>
          </div>
          <ThemeButton onClick={onToggleTheme} label={themeLabel} dark={dark} className="md:hidden" />
        </header>

        <nav aria-label={site.labels.nav} className="-mx-5 overflow-x-auto md:mx-0 md:overflow-visible">
          <ul className="flex gap-5 px-5 md:flex-col md:gap-0.5 md:px-0">
            {tabs.map((tab) => {
              const active = tab.id === current
              return (
                <li key={tab.id} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => onSelect(tab.id)}
                    aria-current={active ? 'page' : undefined}
                    className={`w-full cursor-pointer border-b-2 py-2.5 text-left text-[0.95rem] transition-colors md:border-b-0 md:border-l-2 md:py-1.5 md:pl-3 ${
                      active
                        ? 'border-accent font-bold text-ink'
                        : 'border-transparent text-muted hover:text-ink'
                    }`}
                  >
                    {tab.label}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="mt-auto hidden md:block">
          <p className="mb-4 text-xs leading-relaxed text-faint">
            {site.caption}
            <br />
            {site.location}
          </p>
          <ThemeButton onClick={onToggleTheme} label={themeLabel} dark={dark} showLabel />
        </div>
      </div>
    </aside>
  )
}

function ThemeButton({
  onClick,
  label,
  dark,
  showLabel = false,
  className = '',
}: {
  onClick: () => void
  label: string
  dark: boolean
  showLabel?: boolean
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      className={`flex h-8 cursor-pointer items-center gap-1.5 rounded text-sm text-muted transition-colors hover:text-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none ${
        showLabel ? '' : 'w-8 justify-center'
      } ${className}`}
    >
      {/* 아이콘은 직접 그린다 — 외부 아이콘 패키지·CDN을 쓰지 않는다. */}
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {dark ? (
          <>
            <circle cx="12" cy="12" r="4.5" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </>
        ) : (
          <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
        )}
      </svg>
      {showLabel && label}
    </button>
  )
}
