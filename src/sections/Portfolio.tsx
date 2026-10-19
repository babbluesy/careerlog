import { useState } from 'react'
import { caseStudies } from '../content'
import { Section, Bullets, Tag, Period } from '../components/ui'

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
      <div className="space-y-3">
        {caseStudies.map((study, i) => {
          const expanded = open.includes(study.id)
          return (
            <article
              key={study.id}
              className={`overflow-hidden rounded-lg border transition-colors ${
                expanded ? 'border-accent/40 bg-card' : 'border-line bg-card hover:border-accent/30'
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(study.id)}
                aria-expanded={expanded}
                className="flex w-full cursor-pointer items-start gap-4 p-5 text-left"
              >
                <span className="mt-0.5 font-mono text-sm tabular-nums text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <span className="flex-1">
                  <span className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="text-lg font-bold tracking-tight">{study.title}</span>
                    <Period>{study.period}</Period>
                  </span>
                  <span className="mt-0.5 block font-mono text-xs text-accent">{study.company}</span>
                  <span className="mt-2.5 block text-[0.925rem] leading-relaxed text-muted">
                    {study.summary}
                  </span>
                </span>

                <span
                  className="no-print mt-1 shrink-0 font-mono text-xs text-faint transition-transform duration-200"
                  style={{ transform: expanded ? 'rotate(90deg)' : undefined }}
                  aria-hidden
                >
                  ▶
                </span>
              </button>

              {expanded && (
                <div className="px-5 pb-6 md:pl-14">
                  {study.collaborators && (
                    <p className="mb-6 font-mono text-[0.7rem] tracking-wider text-faint uppercase">
                      with {study.collaborators.join(' · ')}
                    </p>
                  )}

                  <div className="space-y-7">
                    {study.blocks.map((block, bi) => (
                      <div key={block.heading}>
                        <h4 className="mb-3 flex items-center gap-3 text-sm font-semibold">
                          <span className="font-mono text-xs text-accent tabular-nums">
                            {`${String(i + 1).padStart(2, '0')}.${bi + 1}`}
                          </span>
                          {block.heading}
                        </h4>
                        <Bullets items={block.bullets} />
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 flex flex-wrap gap-1.5 border-t border-line pt-5">
                    {study.stack.map((s) => (
                      <Tag key={s}>{s}</Tag>
                    ))}
                  </div>
                </div>
              )}
            </article>
          )
        })}
      </div>
    </Section>
  )
}
