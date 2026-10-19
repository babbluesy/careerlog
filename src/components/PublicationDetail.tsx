import { publications, researchProjects, site } from '../content'
import { Card, Tag, Period, Label, Heading } from './ui'

/** 학교 하나에 딸린 논문과 연구과제. 학력의 모달에서 열리고, 인쇄본에서는 본문에 펼쳐진다. */
export function PublicationDetail({ school }: { school: string }) {
  const papers = publications.filter((pub) => pub.school === school)
  const projects = researchProjects.filter((project) => project.school === school)

  return (
    <>
      <div className="space-y-5">
        {papers.map((pub) => (
          <Card key={pub.title}>
            <div className="p-6">
              <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                <h3 className="text-lg font-bold tracking-tight text-balance">{pub.title}</h3>
                <Tag>{pub.type}</Tag>
              </div>

              <p className="font-mono text-xs text-accent">{pub.journal}</p>
              <p className="mt-1 font-mono text-xs text-faint">{pub.date}</p>

              <div className="mt-5 border-t border-line pt-5">
                <Label>{site.labels.abstract}</Label>
                <p className="text-[0.925rem] leading-[1.85] text-muted">{pub.abstract}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {projects.length > 0 && (
        <div className="mt-10">
          <Heading>{site.labels.research}</Heading>
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.name} className="rounded-lg border border-line bg-card p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className="font-semibold">{project.name}</h4>
                  <Period>{project.period}</Period>
                </div>
                <p className="mt-2 font-mono text-xs text-muted">
                  {project.org} · {project.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
