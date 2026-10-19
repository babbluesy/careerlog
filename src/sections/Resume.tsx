import { site } from '../content'
import { About } from './About'
import { Experience } from './Experience'
import { Portfolio } from './Portfolio'
import { Education } from './Education'
import { Awards } from './Awards'

/**
 * 탭 다섯 개를 한 문서로 이어 붙인 이력서 본문. `#/resume` 로 열린다.
 *
 * 화면에서 읽으라고 만든 페이지가 아니라 **인쇄용 원본**이다.
 * 이 경로를 열고 Ctrl+P 로 PDF를 저장하면 페이지의 모든 내용이 한 문서로 나온다. 그래서 여기서는
 *
 *   - 접혀 있는 내용을 두지 않는다 (포트폴리오 아코디언, 논문 모달을 전부 펼친다)
 *   - 섹션마다 페이지를 새로 시작한다 (.resume-section, index.css 의 @media print)
 *
 * 섹션의 내용 자체는 탭과 똑같은 컴포넌트를 그대로 쓴다. 문구를 두 벌 관리하지 않기 위해서다.
 */
export function Resume() {
  return (
    <div className="print-flow mx-auto max-w-3xl px-6 py-12 md:px-12">
      <header className="mb-14 flex flex-wrap items-end justify-between gap-4 border-b-2 border-ink pb-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">{site.name}</h1>
          <p className="mt-2 font-mono text-xs tracking-[0.2em] text-accent uppercase">
            {site.title}
          </p>
        </div>
        <p className="text-right font-mono text-[0.7rem] leading-relaxed text-faint">
          {site.caption}
          <br />
          {site.location}
        </p>
      </header>

      <div className="space-y-20">
        <div className="resume-section">
          <About />
        </div>
        <div className="resume-section">
          <Experience />
        </div>
        <div className="resume-section">
          <Portfolio expandAll />
        </div>
        <div className="resume-section">
          <Education expandAll />
        </div>
        <div className="resume-section">
          <Awards />
        </div>
      </div>
    </div>
  )
}
