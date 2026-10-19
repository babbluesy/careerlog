import { schools } from '../content'
import { Section, Row, Bullets } from '../components/ui'

export function Education() {
  return (
    <Section id="education">
      <div className="border-t-2 border-ink">
        {schools.map((school) => (
          <Row key={school.name} date={school.period}>
            <h3 className="text-lg font-bold">{school.name}</h3>
            <p className="text-sm text-muted">{[school.degree, ...(school.notes ?? [])].join(', ')}</p>

            {school.projects?.map((project) => (
              <div key={project.name} className="mt-5">
                <h4 className="text-[0.95rem] font-bold">{project.name}</h4>
                <Bullets items={project.details} />
              </div>
            ))}
          </Row>
        ))}
      </div>
    </Section>
  )
}
