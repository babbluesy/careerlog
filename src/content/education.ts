import type { School } from './types'

export const schools: School[] = [
  {
    name: '인하대학교 대학원',
    degree: '통계학 석사',
    period: '2017.08 - 2020.02',
    notes: ['통계계산 및 네트워크 분석 연구실'],
    projects: [
      {
        name: '단기 표층 수온 예측 연구',
        details: [
          '해양 관련 기업과의 산학 프로젝트로 기존 예측 알고리즘 개선',
          '여러 예측 방법의 성능을 비교해 한국데이터정보과학회지 게재',
        ],
      },
      {
        name: '프로그래밍 교육 효과 분석 (외부 의뢰)',
        details: ['교육 전후 설문과 테스트 결과를 비교해 교육 효과 검증'],
      },
    ],
  },
  {
    name: '한남대학교',
    degree: '통계학 학사',
    period: '2011.03 - 2017.08',
  },
]
