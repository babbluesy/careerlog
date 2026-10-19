import type { Award, Education } from './types'

export const awards: Award[] = [
  {
    title: 'CIF 2026 (Coway Innovation Fair) 본선 진출',
    org: '코웨이',
    date: '2026.08',
    details: ['글로벌 감사 모니터링 시스템을 단독 출품해 약 200개 출품작 중 본선 45팀에 선정'],
  },
  {
    title: 'SSAFY 자율프로젝트 우수상 (대전 2위)',
    org: '삼성 청년 SW 아카데미',
    date: '2020.11',
    details: ['일정 텍스트를 분석해 장소·날씨 정보와 일정 요약을 주는 서비스. 4인 팀에서 데이터 분석 담당'],
  },
  {
    title: 'SSAFY 특화프로젝트 우수상 (대전 1위)',
    org: '삼성 청년 SW 아카데미',
    date: '2020.10',
    details: ['음악 취향과 음역대를 반영한 노래 추천 서비스. 4인 팀에서 추천 모델 담당'],
  },
  {
    title: 'SSAFY 공통프로젝트 우수상 (대전 1위)',
    org: '삼성 청년 SW 아카데미',
    date: '2020.08',
    details: ['칸반보드를 붙인 웹 캘린더. 4인 팀에서 프론트엔드 담당'],
  },
]

export const educations: Education[] = [
  {
    name: '삼성 청년 SW 아카데미 (SSAFY)',
    org: '삼성 청년 SW 아카데미',
    period: '2020.01 - 2020.11',
    hours: '1,600시간',
    details: ['알고리즘·코딩 집중 교육과 프로젝트 3건 수행'],
  },
]
