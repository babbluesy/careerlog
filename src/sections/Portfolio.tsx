import { useState } from 'react'
import { caseStudies, site } from '../content'
import { Section, Row, Bullets, Stack } from '../components/ui'

/** expandAll: 이력서 문서(#/resume)처럼 접힌 내용이 있으면 안 되는 곳에서 전부 펼친다. */
export function Portfolio({ expandAll = false }: { expandAll?: boolean }) {
  // 탭에서는 첫 프로젝트만 펼쳐 둔다. 전부 펼치면 스크롤이 지나치게 길어진다.
  const [open, setOpen] = useState<string[]>(
    expandAll ? caseStudies.map((study) => study.id) : [caseStudies[0].id],
  )

  const toggle = (id: string) =>
    setOpen((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

  return (
    <Section id="portfolio">
      <div className="border-t-2 border-ink">
        {caseStudies.map((study) => {
          const expanded = open.includes(study.id)
          return (
            <Row key={study.id} date={study.period}>
              <button
                type="button"
                onClick={() => toggle(study.id)}
                aria-expanded={expanded}
                className="group flex w-full cursor-pointer items-start gap-3 text-left focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
              >
                <span className="flex-1">
                  <span className="block text-lg font-bold group-hover:text-accent">{study.title}</span>
                  <span className="block text-sm text-muted">{study.company}</span>
                  <span className="mt-2 block leading-7">{study.summary}</span>
                </span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className={`no-print mt-1.5 h-4 w-4 shrink-0 text-faint transition-transform duration-200 ${
                    expanded ? 'rotate-180' : ''
                  }`}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              {expanded && (
                <div className="mt-5 space-y-5">
                  {study.blocks.map((block) => (
                    <div key={block.heading}>
                      <h5 className="text-[0.95rem] font-bold">{block.heading}</h5>
                      <Bullets items={block.bullets} />
                    </div>
                  ))}
                  {study.collaborators && (
                    <p className="text-sm text-muted">
                      {site.labels.collaborators}: {study.collaborators.join(', ')}
                    </p>
                  )}
                  <Stack items={study.stack} />
                </div>
              )}
            </Row>
          )
        })}
      </div>
    </Section>
  )
}
