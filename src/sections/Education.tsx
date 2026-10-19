import { useState } from 'react'
import { schools, publications, site } from '../content'
import { Section, Bullets, Period } from '../components/ui'
import { Modal } from '../components/Modal'
import { PublicationDetail } from '../components/PublicationDetail'

/** 논문이 딸린 학교인지. 논문 탭을 따로 두지 않고, 해당 학교 항목을 눌러 모달로 연다. */
const hasPublications = (school: string) => publications.some((pub) => pub.school === school)

/** expandAll: 모달로 여는 논문 상세를, 접힌 내용이 있으면 안 되는 곳(#/resume)에서는 본문에 펼친다. */
export function Education({ expandAll = false }: { expandAll?: boolean }) {
  const [opened, setOpened] = useState<string | null>(null)

  return (
    <Section id="education">
      <div className="space-y-12">
        {schools.map((school) => {
          const openable = hasPublications(school.name)

          const heading = (
            <>
              <div>
                <h3 className="flex items-center gap-2 text-xl font-bold tracking-tight">
                  {school.name}
                  {openable && (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="no-print h-4 w-4 text-accent transition-transform group-hover:translate-x-0.5"
                    >
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  )}
                </h3>
                <p className="mt-1 font-mono text-xs text-accent">{school.degree}</p>
                {school.notes && (
                  <p className="mt-1 text-xs text-faint">{school.notes.join(' · ')}</p>
                )}
                {openable && (
                  <p className="no-print mt-2 font-mono text-[0.7rem] text-faint transition-colors group-hover:text-accent">
                    {site.labels.openPublications}
                  </p>
                )}
              </div>
              <Period>{school.period}</Period>
            </>
          )

          return (
            <article key={school.name}>
              {openable ? (
                <button
                  type="button"
                  onClick={() => setOpened(school.name)}
                  className="group mb-6 flex w-full flex-wrap items-baseline justify-between gap-2 border-b border-line pb-3 text-left transition-colors hover:border-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
                >
                  {heading}
                </button>
              ) : (
                <header className="mb-6 flex flex-wrap items-baseline justify-between gap-2 border-b border-line pb-3">
                  {heading}
                </header>
              )}

              {school.projects && (
                <ol className="space-y-6">
                  {school.projects.map((project, i) => (
                    <li key={project.name} className="grid gap-2 sm:grid-cols-[2rem_1fr]">
                      <span className="font-mono text-xs tabular-nums text-accent sm:pt-1">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h4 className="mb-2.5 font-semibold text-balance">{project.name}</h4>
                        <Bullets items={project.details} />
                      </div>
                    </li>
                  ))}
                </ol>
              )}

              {/* 모달은 인쇄되지 않으므로, 같은 내용을 인쇄본에서는 본문에 펼쳐 둔다. */}
              {openable && (
                <div className={`mt-10 ${expandAll ? '' : 'hidden print:block'}`}>
                  <PublicationDetail school={school.name} />
                </div>
              )}
            </article>
          )
        })}
      </div>

      {opened && (
        <Modal title={site.labels.publications} onClose={() => setOpened(null)}>
          <PublicationDetail school={opened} />
        </Modal>
      )}
    </Section>
  )
}
