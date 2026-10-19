import { experience, site } from '../content'
import { Section, Row, Bullets, Stack } from '../components/ui'

export function Experience() {
  return (
    <Section id="experience">
      <div className="space-y-14">
        {experience.map((job) => (
          <article key={job.company}>
            <header className="flex flex-wrap items-baseline justify-between gap-x-4 border-b-2 border-ink pb-3">
              <div>
                <h3 className="text-xl font-bold tracking-tight">{job.company}</h3>
                <p className="text-sm text-muted">{job.team ? `${job.team}, ${job.role}` : job.role}</p>
              </div>
              <span className="text-sm text-faint tabular-nums">{job.period}</span>
            </header>

            {job.summary && <p className="mt-4 leading-7 text-muted">{job.summary}</p>}

            {job.projects.map((project) => (
              <Row key={project.name} date={project.period}>
                <h4 className="font-bold">{project.name}</h4>
                {/* 배경 및 목적은 한 문장이라 본문색으로, 한 일과 결과는 그 아래 목록으로 */}
                <p className="mt-1 leading-7">{project.background.join(' ')}</p>
                <Bullets items={project.results} />
                <Stack items={project.stack} />
                {project.caseStudy && (
                  <a
                    href="#/portfolio"
                    className="no-print mt-3 inline-block text-sm text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
                  >
                    {site.labels.caseStudyLink}
                  </a>
                )}
              </Row>
            ))}
          </article>
        ))}
      </div>
    </Section>
  )
}
