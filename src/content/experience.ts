import type { Job } from './types'

// 프로젝트는 최신순. background 는 한 문장(무엇을 왜), results 는 한 일과 결과.
export const experience: Job[] = [
  {
    company: '코웨이',
    team: '정도경영팀',
    role: 'Data Analyst',
    period: '2025.06 - 현재',
    summary:
      '광고대행사에서는 분석이 고객사 단위에 머물러 회사 전체에 영향을 주기 어려웠습니다. AI로 분석의 문턱이 낮아진 만큼 전사 차원의 임팩트를 내는 것이 차별점이라고 판단해 컴플라이언스 영역으로 옮겼습니다.',
    projects: [
      {
        name: '부정 주문 조회 시스템',
        period: '2026.06 - 현재',
        caseStudy: 'audit',
        stack: ['Python', 'BigQuery', 'Apps Script', 'Claude Code'],
        background: ['부정 의심 주문 확인에 건당 1시간씩 걸리던 주소·법인 조회를 하나의 시스템으로 통합'],
        results: [
          '행정안전부 주소 API로 주소 데이터를 표준화하고, 법인 정보와 주문 이력을 한 화면에서 조회',
          '의심 주문을 설치 전에 확인해 현장 대응으로 연결',
          '주소·법인 조회 시간 1시간 → 10분 (약 83% 단축)',
        ],
      },
      {
        name: '사규 통합 관리 시스템',
        period: '2026.06 - 현재',
        caseStudy: 'policy',
        stack: ['Apps Script', 'BigQuery', 'Cloud Storage'],
        background: ['본부별로 흩어진 사규를 한 곳에서 찾고 비교할 수 있게 통합 (진단팀·법무팀 기획, 개발 단독)'],
        results: [
          '사규 검색, 개정 이력, 조문 단위 신구대조표와 AI 개정 내용 요약 제공',
          '그룹웨어 기안과 연동해 결재된 규정이 자동으로 반영되는 동기화 구조 구축',
        ],
      },
      {
        name: '글로벌 감사 모니터링 시스템',
        period: '2025.08 - 현재',
        stack: ['Python', 'BigQuery', 'Apps Script', 'SAP', 'Oracle ERP'],
        background: ['시스템별로 나뉘고 해외 법인은 수기로 하던 감사 모니터링을 국내외 통합 시스템으로 전환'],
        results: [
          '국내 SAP와 해외 법인 Oracle ERP 데이터를 BigQuery로 통합하고 법인별 지표와 임계치 설정',
          'AI 챗봇과 AI 요약 리포트 기능 구현',
          '태국·말레이시아 법인에 현지 출장으로 단계적 도입',
          '모니터링 주기 국내 1주 → 1일, 해외 법인 1개월 → 1주',
          '사내 혁신대회 CIF 2026 본선 진출 (약 200개 출품작 중 15팀)',
        ],
      },
      {
        name: '감사 데이터 분석',
        period: '2025.06 - 현재',
        stack: ['SQL', 'BigQuery'],
        background: ['감사·조사에 필요한 데이터를 추출·분석해 조사 대상 선정과 의사결정을 지원'],
        results: [
          '팀 내 분석 요청에 맞춰 BigQuery SQL로 데이터를 추출·분석하고 월별 감사 모니터링 지표 집계',
          '영업 데이터에서 부정 영업 정황을 찾아 내부 조사 안건으로 상정',
          '해외 법인 수수료 지급 데이터를 시스템 간 대사해 정산 로직 불일치를 찾고, 관련 부서와 시스템 개선으로 연결',
        ],
      },
    ],
  },
  {
    company: '맥시마이저',
    role: 'Data Scientist',
    period: '2023.07 - 2024.04',
    projects: [
      {
        name: '리뷰 분석',
        period: '2024.01 - 2024.03',
        stack: ['Python'],
        background: ['고객사 제안서를 위해 웹툰 플랫폼 사용자 리뷰를 경쟁 서비스와 비교'],
        results: ['리뷰를 긍정·부정과 주제별로 나눠 경쟁 서비스 대비 약점 영역을 정리하고 제안 근거로 활용'],
      },
      {
        name: '광고 성과 대시보드',
        period: '2023.12 - 2024.03',
        caseStudy: 'dashboard',
        stack: ['Tableau', 'Streamlit'],
        background: ['마케터와 디자이너가 매일 여는 광고 성과 대시보드 구축'],
        results: [
          'Tableau로 데일리 성과 리포트용 대시보드 구축',
          'Streamlit으로 캠페인·소재 성과와 소재 네이밍 규칙 관리 대시보드 구축',
        ],
      },
      {
        name: '광고 성과 레포트 자동화',
        period: '2023.07 - 2024.03',
        stack: ['Python', 'BigQuery', 'Cloud Storage', 'Gmail API'],
        background: ['마케터가 반복하던 광고 성과 레포트 작성을 자동화'],
        results: [
          'MMP API로 광고 성과 데이터를 BigQuery·Cloud Storage에 적재하는 파이프라인 구축',
          '적재 데이터로 레포트를 자동 생성해 Gmail API로 발송',
        ],
      },
    ],
  },
  {
    company: '매드업',
    team: '알고리즘팀',
    role: 'Data Scientist',
    period: '2021.08 - 2023.05',
    projects: [
      {
        name: '광고 이미지 자동 분류',
        period: '2023.01 - 2023.03',
        caseStudy: 'image',
        stack: ['Python', 'Google Cloud Vision API'],
        background: ['마케터가 눈으로 하던 광고 이미지 분류를 자동화'],
        results: ['Google Cloud Vision API로 텍스트·사물·색상을 추출해, 크기만 다른 같은 소재를 자동으로 묶음'],
      },
      {
        name: '마케터 일일 업무 자동화',
        period: '2022.08 - 2022.12',
        stack: ['Python', 'selenium'],
        background: ['마케터가 매일 반복하던 운영 내역 정리와 트렌드 확인을 자동화'],
        results: [
          '전일 광고 운영 내역과 성과 요약을 자동 생성해 엑셀로 전달',
          '네이버 데이터랩 인기 검색어를 수집해 순위 변화를 추적',
        ],
      },
      {
        name: '업계 성과 비교 기능',
        period: '2022.07 - 2022.08',
        stack: ['Python', 'FastAPI'],
        background: ['자사 광고 성과 분석 서비스에 업계 대비 광고주 성과를 보여 주는 기능 개발'],
        results: ['업계별 성과 추이 그래프와 업계 대비 광고주 성과 지표 테이블 제공'],
      },
      {
        name: '패션 이커머스 고객사 분석',
        period: '2022.03 - 2022.08',
        caseStudy: 'fashion',
        stack: ['Python'],
        background: ['고객사의 매체 기여도와 신규 카테고리(골프·키즈 등) 구매 패턴 분석'],
        results: [
          '앱 로그 데이터로 신규 카테고리 구매에 영향을 주는 요인과 구매 유저 유형 도출',
          '유입 매체별 전환 기여도 분석',
        ],
      },
      {
        name: '리뷰 분석 서비스',
        period: '2021.12 - 2022.12',
        caseStudy: 'review',
        stack: ['Python', 'AWS S3', 'AWS Athena', 'NAVER CLOVA Sentiment'],
        background: ['광고주 리뷰를 수집·분석해 마케터의 광고주 탐색과 제안을 돕는 서비스'],
        results: [
          '자사몰·네이버 쇼핑·스마트스토어 리뷰를 수집해 AWS S3·Athena에 적재하는 파이프라인 설계',
          '리뷰 분석 리포트를 마케터에게 제공해 신규 광고주 수주에 기여',
        ],
      },
    ],
  },
]
