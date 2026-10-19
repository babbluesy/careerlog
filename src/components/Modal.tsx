import { useEffect, useId, useRef, type ReactNode } from 'react'
import { site } from '../content'

/**
 * 본문 위에 겹쳐 뜨는 상세 창. 지금은 학력의 논문 상세가 쓴다.
 *
 * 접근성상 지켜야 할 것 — ESC로 닫히고, 열려 있는 동안 배경이 스크롤되지 않고,
 * 열리는 순간 포커스가 창 안으로 들어와야 한다. 닫히면 열었던 버튼으로 포커스를 돌려준다.
 * 인쇄본에는 나오지 않는다 (같은 내용을 여는 쪽에서 펼쳐 인쇄한다).
 */
export function Modal({
  title,
  onClose,
  children,
}: {
  title: string
  onClose: () => void
  children: ReactNode
}) {
  const panel = useRef<HTMLDivElement>(null)
  const titleId = useId()

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    panel.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = overflow
      opener?.focus()
    }
  }, [onClose])

  return (
    <div
      className="no-print fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-ink/40 p-4 backdrop-blur-sm sm:p-8"
      onClick={onClose}
    >
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
        className="my-auto w-full max-w-2xl animate-[fade_.2s_ease-out] rounded-lg border border-line bg-paper shadow-lg outline-none"
      >
        <header className="flex items-center justify-between gap-4 border-b border-line px-6 py-4">
          <h2 id={titleId} className="font-bold">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={site.labels.close}
            className="-mr-2 rounded p-2 text-faint transition-colors hover:text-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              aria-hidden="true"
              className="h-4 w-4"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </header>

        <div className="px-6 py-6">{children}</div>
      </div>
    </div>
  )
}
