export type TabId = 'about' | 'experience' | 'portfolio' | 'education' | 'awards'

export interface Tab {
  id: TabId
  label: string
}

/** site.json — 이름·직함처럼 페이지 전체에서 쓰이는 값과, 화면에 찍히는 라벨. */
export interface Site {
  name: string
  title: string
  /** 사이드바 하단의 한 줄 소개 */
  caption: string
  location: string
  /** public/ 안의 프로필 사진 파일명 */
  photo: string
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
  }
  /** 화면 곳곳에 반복되는 고정 문구. 컴포넌트에 문자열을 적는 대신 여기서 가져다 쓴다. */
  labels: {
    skills: string
    career: string
    ai: string
    caseStudyLink: string
    training: string
    collaborators: string
    nav: string
    themeLight: string
    themeDark: string
  }
}

/** skills.json */
export interface SkillGroup {
  category: string
  items: string[]
}

/** strengths.json — About 의 '걸어온 길'. 배열 순서가 화면 순서다. */
export interface Strength {
  period: string
  /** 그 시기의 소속 */
  note: string
  heading: string
  details: string[]
}

/** 경력 내 개별 프로젝트. background 는 한 문장 요약(배경 및 목적), results 는 한 일과 결과. */
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

