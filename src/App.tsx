import { Sidebar } from './components/Sidebar'
import { About } from './sections/About'
import { Experience } from './sections/Experience'
import { Portfolio } from './sections/Portfolio'
import { Education } from './sections/Education'
import { Awards } from './sections/Awards'
import { Resume } from './sections/Resume'
import { useHashTab, useTheme, RESUME_ROUTE } from './hooks'
import { site } from './content'
import type { TabId } from './content/types'
import type { ComponentType } from 'react'

// 탭에서는 기본값으로 쓴다. 펼침 여부(expandAll)는 이력서 문서에서만 켠다.
const views: Record<TabId, ComponentType> = {
  about: About,
  experience: Experience,
  portfolio: Portfolio,
  education: Education,
  awards: Awards,
}

export default function App() {
  const { route, goTo } = useHashTab()
  const { dark, toggle } = useTheme()

  // #/resume 는 사이드바도 탭도 없는 이력서 본문 한 장 — 인쇄(Ctrl+P)용 원본이다.
  if (route === RESUME_ROUTE) return <Resume />

  const View = views[route]

  return (
    <div className="min-h-screen md:pl-72">
      <Sidebar current={route} onSelect={goTo} dark={dark} onToggleTheme={toggle} />

      {/* key를 주면 탭이 바뀔 때마다 다시 마운트되어 페이드가 걸린다. */}
      <main key={route} className="print-flow mx-auto max-w-3xl animate-[fade_.35s_ease-out] px-6 py-12 md:px-12 md:py-16">
        <View />
        <footer className="no-print mt-20 border-t border-line pt-6 font-mono text-[0.65rem] text-faint">
          © {new Date().getFullYear()} {site.name} · {site.footer}
        </footer>
      </main>
    </div>
  )
}
