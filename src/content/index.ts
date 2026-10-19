/**
 * 콘텐츠 진입점.
 *
 * 화면에 나오는 모든 값은 이 폴더 안에서만 정의된다. 컴포넌트에는 문구를 적지 않는다.
 *
 *   site.json       이름, 직함, 소개 문단, 지표 라벨, 푸터
 *   skills.json     스킬·툴 (카테고리별)
 *   strengths.json  핵심 역량
 *   experience.ts   경력과 프로젝트
 *   portfolio.ts    포트폴리오 상세 (케이스 스터디)
 *   education.ts    학력
 *   publication.ts  논문·연구과제
 *   awards.ts       수상·교육 이수
 *   tabs.ts         사이드바 탭 (라우팅과 연결되어 있어 TS로 둔다)
 *
 * JSON은 타입을 자동으로 붙여주지 않으므로 여기서 한 번 검증해 내보낸다.
 * JSON에 오타가 나거나 필드가 빠지면 이 파일에서 타입 에러가 난다.
 */
import siteJson from './site.json'
import skillsJson from './skills.json'
import strengthsJson from './strengths.json'
import { skillIconNames } from './types'
import type { Site, SkillGroup, SkillIconName, Strength } from './types'

export const site: Site = siteJson

/**
 * icon 만 예외적으로 손이 간다. JSON의 문자열은 타입이 그냥 string 이라
 * 아이콘 이름 오타는 타입 체커가 잡아주지 못한다. 대신 여기서 이름을 대조해,
 * 없는 아이콘을 적으면 개발 서버가 뜨는 순간 바로 알 수 있게 한다.
 */
export const skills: SkillGroup[] = skillsJson.map((group) => {
  if (!skillIconNames.includes(group.icon as SkillIconName)) {
    throw new Error(
      `skills.json: '${group.category}' 의 아이콘 '${group.icon}' 은 없는 이름이다. ` +
        `쓸 수 있는 이름: ${skillIconNames.join(', ')}`,
    )
  }
  return { ...group, icon: group.icon as SkillIconName }
})
export const strengths: Strength[] = strengthsJson

export { brands } from './brands'
export { tabs } from './tabs'
export { experience } from './experience'
export { caseStudies } from './portfolio'
export { schools } from './education'
export { publications, researchProjects } from './publication'
export { awards, educations } from './awards'
