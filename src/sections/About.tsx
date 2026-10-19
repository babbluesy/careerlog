import { site, skills, strengths, experience } from '../content'
import { Section, Heading, Row, Bullets, Stack } from '../components/ui'

/**
 * 재직 개월 수를 데이터에서 더한다 ('2021.08 - 2023.05' → 22개월, 끝이 날짜가 아니면 이번 달까지).
 * 회사 사이의 공백은 빠지므로 이력서의 '경력 4년 1개월' 과 같은 값이 나온다.
 */
const now = new Date()
const careerMonths = experience.reduce((n, job) => {
  const [start, end] = job.period.split(' - ').map((p) => p.split('.').map(Number))
  const [ey, em] = end && !Number.isNaN(end[0]) ? end : [now.getFullYear(), now.getMonth() + 1]
  return n + (ey - start[0]) * 12 + (em - start[1]) + 1
}, 0)

// 숫자는 전부 데이터에서 센다. 항목을 추가하면 따라 바뀐다.
const stats = [
  { value: Math.floor(careerMonths / 12), label: site.stats.years },
  { value: experience.reduce((n, job) => n + job.projects.length, 0), label: site.stats.projects },
]

export function About() {
  return (
    <Section id="about">
      <p className="text-xl leading-normal font-bold text-balance sm:text-[1.6rem]">{site.tagline}</p>

      {site.intro.map((paragraph) => (
        <p key={paragraph} className="mt-5 leading-8 text-muted">
          {paragraph}
        </p>
      ))}

      <p className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
        {stats.map((stat) => (
          <span key={stat.label} className="text-muted">
            <span className="mr-0.5 text-2xl font-bold text-accent tabular-nums">{stat.value}</span>
            {stat.label}
          </span>
        ))}
      </p>

      <Heading>{site.labels.career}</Heading>
      {strengths.map((step) => (
        <Row key={step.heading} date={step.period}>
          <h4 className="font-bold">
            {step.heading}
            <span className="ml-2 text-sm font-normal text-faint">{step.note}</span>
          </h4>
          <Bullets items={step.details} />
        </Row>
      ))}

      <Heading>{site.labels.ai}</Heading>
      <Bullets items={site.ai} />

      <Heading>{site.labels.skills}</Heading>
      {skills.map((group) => (
        <Row key={group.category} date={group.category}>
          <Stack items={group.items} />
        </Row>
      ))}
    </Section>
  )
}
