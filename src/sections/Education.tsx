import { useState } from 'react'
import { schools, publications, site } from '../content'
import { Section, Row, Bullets } from '../components/ui'
import { Modal } from '../components/Modal'
import { PublicationDetail } from '../components/PublicationDetail'

/** 논문이 딸린 학교인지. 논문 탭을 따로 두지 않고, 해당 학교 항목에서 모달로 연다. */
const hasPublications = (school: string) => publications.some((pub) => pub.school === school)

/** expandAll: 모달로 여는 논문 상세를, 접힌 내용이 있으면 안 되는 곳(#/resume)에서는 본문에 펼친다. */
export function Education({ expandAll = false }: { expandAll?: boolean }) {
  const [opened, setOpened] = useState<string | null>(null)

  return (
    <Section id="education">
      <div className="border-t-2 border-ink">
        {schools.map((school) => {
          const openable = hasPublications(school.name)

          return (
            <Row key={school.name} date={school.period}>
              <h3 className="text-lg font-bold">{school.name}</h3>
              <p className="text-sm text-muted">
                {[school.degree, ...(school.notes ?? [])].join(', ')}
              </p>

              {openable && (
                <button
                  type="button"
                  onClick={() => setOpened(school.name)}
                  className="no-print mt-2 cursor-pointer text-sm text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
                >
                  {site.labels.openPublications}
                </button>
              )}

              {school.projects?.map((project) => (
                <div key={project.name} className="mt-5">
                  <h4 className="text-[0.95rem] font-bold">{project.name}</h4>
                  <Bullets items={project.details} />
                </div>
              ))}

              {/* 모달은 인쇄되지 않으므로, 같은 내용을 인쇄본에서는 본문에 펼쳐 둔다. */}
              {openable && (
                <div className={`mt-8 ${expandAll ? '' : 'hidden print:block'}`}>
                  <PublicationDetail school={school.name} />
                </div>
              )}
            </Row>
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
