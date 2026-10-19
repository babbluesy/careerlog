import { site, skills, strengths, experience, publications } from '../content'
import { Section, Tag, Heading, Bullets } from '../components/ui'
import { CareerSpine } from '../components/CareerSpine'
import { SkillIcon } from '../components/icons'
import { useCountUp } from '../hooks'

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

// 숫자는 전부 데이터에서 센다. 항목을 추가하면 타일도 따라 움직인다.
const stats = [
  { value: Math.floor(careerMonths / 12), suffix: 'y+', label: site.stats.years },
  { value: experience.reduce((n, job) => n + job.projects.length, 0), label: site.stats.projects },
  { value: publications.length, label: site.stats.publications },
]

/** 타일 하나. 페이지에 나타나는 동안 0에서 값까지 세어 올라간다. */
function Stat({ value, suffix, label }: { value: number; suffix?: string; label: string }) {
  const shown = useCountUp(value)

  return (
    <div className="bg-card px-4 py-4">
      <div className="font-mono text-2xl font-semibold text-accent tabular-nums">
        {shown}
        {suffix}
      </div>
      <div className="mt-1 text-xs text-faint">{label}</div>
    </div>
  )
}

export function About() {
  return (
    <Section id="about">
      <p className="mb-8 text-lg leading-[1.9] font-medium text-balance">{site.tagline}</p>

      <div className="mb-10 grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-line bg-line">
        {stats.map((stat) => (
          <Stat key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} />
        ))}
      </div>

      {site.intro.map((paragraph) => (
        <p key={paragraph} className="mb-6 leading-relaxed text-muted">
          {paragraph}
        </p>
      ))}

      <div className="mt-14 mb-12">
        <Heading>{site.labels.career}</Heading>
        <CareerSpine strengths={strengths} />
      </div>

      <div className="mb-12">
        <Heading>{site.labels.ai}</Heading>
        <Bullets items={site.ai} />
      </div>

      <Heading>{site.labels.skills}</Heading>
      <dl className="space-y-4">
        {skills.map((group) => (
          <div key={group.category} className="grid gap-2 sm:grid-cols-[10rem_1fr] sm:gap-4">
            <dt className="flex items-center gap-2 font-mono text-xs text-accent sm:pt-1">
              <SkillIcon name={group.icon} className="h-3.5 w-3.5 shrink-0 opacity-80" />
              {group.category}
            </dt>
            <dd className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
