import { experience, site } from '../content'
import { Section, Bullets, Tag, Period, Label } from '../components/ui'

export function Experience() {
  return (
    <Section id="experience">
      <div className="space-y-14">
        {experience.map((job) => (
          <article key={job.company}>
            <header className="mb-6 flex flex-wrap items-baseline justify-between gap-2 border-b border-line pb-3">
              <div>
                <h3 className="text-xl font-bold tracking-tight">{job.company}</h3>
                <p className="mt-1 font-mono text-xs text-accent">
                  {job.team ? `${job.team} · ${job.role}` : job.role}
                </p>
              </div>
              <Period>{job.period}</Period>
            </header>

            {job.summary && (
              <p className="mb-6 border-l-2 border-accent/40 pl-4 text-[0.925rem] leading-relaxed text-muted italic">
                {job.summary}
              </p>
            )}

            <ol className="relative space-y-8 border-l border-line pl-6">
              {job.projects.map((project) => (
                <li key={project.name} className="relative">
                  <span className="absolute top-1.5 -left-[26px] h-2.5 w-2.5 rounded-full border-2 border-paper bg-accent" />

                  <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="font-semibold">{project.name}</h4>
                    {project.period && <Period>{project.period}</Period>}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label>{site.labels.background}</Label>
                      <Bullets items={project.background} />
                    </div>
                    <div>
                      <Label>{site.labels.results}</Label>
                      <Bullets items={project.results} />
                    </div>

                    {project.stack && (
                      <div className="flex flex-wrap gap-1.5">
                        {project.stack.map((s) => (
                          <Tag key={s}>{s}</Tag>
                        ))}
                      </div>
                    )}

                    {project.caseStudy && (
                      <a
                        href="#/portfolio"
                        className="no-print inline-flex items-center gap-1 font-mono text-xs text-accent hover:underline"
                      >
                        {site.labels.caseStudyLink} <span aria-hidden>→</span>
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </article>
        ))}
      </div>
    </Section>
  )
}
