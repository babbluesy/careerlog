export type TabId = 'about' | 'experience' | 'portfolio' | 'education' | 'awards'

export interface Tab {
  id: TabId
  label: string
  ko: string
}

/** site.json — 이름·직함처럼 페이지 전체에서 쓰이는 값과, 화면에 찍히는 라벨. */
export interface Site {
  name: string
  title: string
  /** 사이드바 하단의 한 줄 소개 */
  caption: string
  location: string
  footer: string
  /** About 첫머리에 한 호흡으로 읽히는 문단 */
  tagline: string
  intro: string[]
  /** About 의 AI 활용 블록 */
  ai: string[]
  /** 지표 타일의 라벨. 값은 데이터에서 세므로 여기에 숫자를 적지 않는다. */
  stats: {
    years: string
    projects: string
    publications: string
  }
  /** 화면 곳곳에 반복되는 고정 문구. 컴포넌트에 문자열을 적는 대신 여기서 가져다 쓴다. */
  labels: {
    skills: string
    career: string
    ai: string
    background: string
    results: string
    caseStudyLink: string
    /** 논문 모달의 제목이자, 인쇄본에서 같은 내용을 여는 소제목 */
    publications: string
    /** 논문이 있는 학교 머리말에 붙는 버튼 문구 */
    openPublications: string
    abstract: string
    research: string
    training: string
    nav: string
    close: string
    themeLight: string
    themeDark: string
  }
}

/** 카테고리 앞에 붙는 아이콘. 모양은 components/icons.tsx 에 있고, 여기서 고를 수 있는 이름만 정한다. */
export const skillIconNames = [
  'code',
  'chart',
  'sparkles',
  'database',
  'bars',
  'server',
  'wrench',
] as const

export type SkillIconName = (typeof skillIconNames)[number]

/** skills.json */
export interface SkillGroup {
  category: string
  icon: SkillIconName
  items: string[]
}

/** strengths.json — 커리어 곡선의 각 단계. 배열 순서가 곡선 위의 순서다. */
export interface Strength {
  /** 곡선 위에 찍히는 이름 (통계, 개발, …) */
  label: string
  period: string
  /** 그 시기의 소속 */
  note: string
  heading: string
  details: string[]
}

/** 경력 내 개별 프로젝트. 이력서의 [배경 및 목적] / [진행한 내용 및 결과] 구조를 그대로 따른다. */
export interface Project {
  name: string
  /** 진행 기간. 확인되지 않은 경우 생략하면 화면에도 표시되지 않는다. */
  period?: string
  background: string[]
  results: string[]
  /** 해당 프로젝트를 상세히 다룬 CaseStudy의 id. Portfolio 탭으로 링크된다. */
  caseStudy?: string
  stack?: string[]
}

/** 포트폴리오 탭에서 펼쳐 보여주는 프로젝트 상세. 경력의 요약보다 깊게 들어간다. */
export interface CaseStudy {
  id: string
  title: string
  company: string
  period: string
  summary: string
  collaborators?: string[]
  stack: string[]
  blocks: { heading: string; bullets: string[] }[]
}

export interface Job {
  company: string
  role: string
  team?: string
  period: string
  summary?: string
  projects: Project[]
}

export interface School {
  name: string
  degree: string
  period: string
  notes?: string[]
  projects?: { name: string; details: string[] }[]
}

/**
 * 논문은 별도 탭 없이, 그 논문을 쓴 학교(school)의 Education 항목에서 모달로 열린다.
 * school 은 education.ts 의 School.name 과 같은 문자열이어야 한다.
 */
export interface Publication {
  school: string
  title: string
  journal: string
  date: string
  type: string
  abstract: string
}

export interface ResearchProject {
  school: string
  name: string
  org: string
  period: string
  role: string
}

export interface Award {
  title: string
  org: string
  date: string
  details: string[]
  links?: { label: string; href: string }[]
}

export interface Education {
  name: string
  org: string
  period: string
  hours?: string
  details: string[]
}

