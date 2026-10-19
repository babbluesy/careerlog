import { awards, educations, site } from '../content'
import { Section, Bullets, Period, Heading } from '../components/ui'

export function Awards() {
  return (
    <Section id="awards">
      <div className="mb-12 space-y-3">
        {awards.map((award, i) => (
          <article key={award.title} className="rounded-lg border border-line bg-card p-5">
            <div className="flex items-start gap-4">
              <span className="mt-0.5 font-mono text-sm tabular-nums text-accent">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="flex-1">
                <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-semibold text-balance">{award.title}</h3>
                  <Period>{award.date}</Period>
                </div>
                <p className="mb-3 font-mono text-xs text-accent">{award.org}</p>
                <Bullets items={award.details} />

                {award.links && (
                  <div className="mt-3 flex gap-4">
                    {award.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="font-mono text-xs text-accent underline underline-offset-4 hover:no-underline"
                      >
                        {link.label} ↗
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      <Heading>{site.labels.training}</Heading>
      <div className="space-y-3">
        {educations.map((edu) => (
          <div key={edu.name} className="rounded-lg border border-line bg-card p-5">
            <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
              <h4 className="font-semibold">{edu.name}</h4>
              <Period>{edu.period}</Period>
            </div>
            {edu.hours && <p className="mb-3 font-mono text-xs text-accent">{edu.hours}</p>}
            <Bullets items={edu.details} />
          </div>
        ))}
      </div>
    </Section>
  )
}
