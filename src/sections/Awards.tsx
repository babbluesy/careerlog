import { awards, educations, site } from '../content'
import { Section, Row, Bullets, Heading } from '../components/ui'

export function Awards() {
  return (
    <Section id="awards">
      <div className="border-t-2 border-ink">
        {awards.map((award) => (
          <Row key={award.title} date={award.date}>
            <h3 className="font-bold text-balance">{award.title}</h3>
            <p className="text-sm text-muted">{award.org}</p>
            <Bullets items={award.details} />
            {award.links?.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="mt-2 mr-4 inline-block text-sm text-accent underline underline-offset-4"
              >
                {link.label}
              </a>
            ))}
          </Row>
        ))}
      </div>

      <Heading>{site.labels.training}</Heading>
      {educations.map((edu) => (
        <Row key={edu.name} date={edu.period}>
          <h4 className="font-bold">
            {edu.name}
            {edu.hours && <span className="ml-2 text-sm font-normal text-faint">{edu.hours}</span>}
          </h4>
          <Bullets items={edu.details} />
        </Row>
      ))}
    </Section>
  )
}
