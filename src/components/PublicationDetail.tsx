import { publications, researchProjects, site } from '../content'

/** 학교 하나에 딸린 논문과 연구과제. 학력의 모달에서 열리고, 인쇄본에서는 본문에 펼쳐진다. */
export function PublicationDetail({ school }: { school: string }) {
  const papers = publications.filter((pub) => pub.school === school)
  const projects = researchProjects.filter((project) => project.school === school)

  return (
    <div className="space-y-8">
      {papers.map((pub) => (
        <article key={pub.title}>
          <h3 className="text-lg leading-snug font-bold text-balance">{pub.title}</h3>
          <p className="mt-1 text-sm text-muted">
            {pub.journal}, {pub.date} ({pub.type})
          </p>
          <h4 className="mt-5 text-sm font-bold">{site.labels.abstract}</h4>
          <p className="mt-1 leading-7 text-muted">{pub.abstract}</p>
        </article>
      ))}

      {projects.length > 0 && (
        <div>
          <h4 className="text-sm font-bold">{site.labels.research}</h4>
          {projects.map((project) => (
            <p key={project.name} className="mt-1 leading-7 text-muted">
              {project.name} ({project.org}, {project.role}, {project.period})
            </p>
          ))}
        </div>
      )}
    </div>
  )
}
