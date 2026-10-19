import type { CaseStudy } from './types'

// 포트폴리오 PDF를 페이지에서 바로 읽을 수 있게 재구성한 것.
// 광고주 내부 수치와 코웨이 탐지 기준·내부 보안 구조는 싣지 않는다. 방법론과 결론까지만.
export const caseStudies: CaseStudy[] = [
  {
    id: 'audit',
    title: '부정 주문 조회 시스템',
    company: '코웨이',
    period: '2026.06 - 현재',
    summary:
      '부정 의심 주문을 확인할 때 건마다 1시간씩 걸리던 주소·법인 조회를 하나의 시스템으로 묶었습니다. 기획부터 배포까지 혼자 맡았고, 조회 시간을 10분으로 줄였습니다.',
    stack: ['Python', 'BigQuery', 'Apps Script', 'Claude Code', '행정안전부 주소 API'],
    blocks: [
      {
        heading: '문제',
        bullets: [
          '주소가 자유 텍스트로 쌓이고 도로명과 지번이 섞여 있어, 같은 곳을 가리키는 주문끼리도 맞춰 보기 어려웠음',
          '법인 주문은 법인 정보와 주문 이력을 따로 찾아 대조해야 했음',
        ],
      },
      {
        heading: '한 일',
        bullets: [
          '행정안전부 주소 API로 주소를 표준화해 형식이 달라도 같은 주소로 조회',
          '외부 법인 정보와 사내 주문 이력을 한 화면에서 조회',
          '의심 주문을 설치 전에 확인해 현장 대응으로 연결',
        ],
      },
      {
        heading: '결과',
        bullets: ['주소·법인 조회 시간 각각 1시간 → 10분 (약 83% 단축)'],
      },
    ],
  },
  {
    id: 'policy',
    title: '사규 통합 관리 시스템',
    company: '코웨이',
    period: '2026.06 - 현재',
    summary:
      '본부별로 흩어져 있던 사규를 한 곳에서 찾고, 읽고, 비교할 수 있게 만든 사내 웹앱입니다. 진단팀·법무팀이 기획하고 개발은 혼자 맡았습니다.',
    stack: ['Apps Script', 'BigQuery', 'Cloud Storage', 'Python'],
    blocks: [
      {
        heading: '문제',
        bullets: [
          '사규가 본부별로 흩어져 같은 문의가 반복되고, 어느 것이 최신본인지 확인하기 어려웠음',
          '개정할 때마다 신·구 조문을 직접 맞대어 검토해야 했음',
        ],
      },
      {
        heading: '열람과 신구대조',
        bullets: [
          '최신본 중심의 목록, 규정명·본문 검색, 차수별 개정 이력 제공',
          '신·구 버전을 조문 단위로 비교하고, AI가 개정 내용을 요약',
        ],
      },
      {
        heading: '그룹웨어 연동',
        bullets: [
          '그룹웨어 개발자와 협업해 기안 화면에서 규정 정보를 조회하는 API 구성',
          '결재가 끝난 규정 정보와 첨부 파일이 BigQuery·Cloud Storage에 자동 반영되고, 시행일에 맞춰 게시',
        ],
      },
    ],
  },
  {
    id: 'review',
    title: '리뷰 분석 서비스',
    company: '매드업',
    period: '2021.12 - 2022.12',
    summary:
      '광고주의 자사몰·쇼핑몰 리뷰를 자동으로 수집·적재하고, 감성분석 리포트를 마케터에게 제공한 서비스입니다.',
    collaborators: ['Data Scientist', 'Product Owner'],
    stack: ['Python', 'selenium', 'AWS S3', 'AWS Athena', 'NAVER CLOVA Sentiment', 'Jupyter'],
    blocks: [
      {
        heading: '수집·적재 파이프라인',
        bullets: [
          '스프레드시트에 광고주를 등록하면 스케줄러가 수집·정제·감성분석을 실행',
          '결과를 AWS S3에 날짜별로 적재하고 Athena에서 쿼리로 조회',
        ],
      },
      {
        heading: '감성분석',
        bullets: [
          '별점은 대체로 긍정 쪽으로 치우쳐 있어, 리뷰 본문의 긍정·부정 점수를 따로 산출',
          '리뷰 → 상품 → 구매처 단위로 집계해 부정 리뷰 비중을 비교',
        ],
      },
      {
        heading: '성과',
        bullets: ['리포트를 경쟁사 분석과 소재 제안 자료로 활용해 신규 광고주 수주에 기여'],
      },
    ],
  },
  {
    id: 'fashion',
    title: '패션 이커머스 고객사 분석',
    company: '매드업',
    period: '2022.03 - 2022.08',
    summary:
      '패션 이커머스 고객사의 유입 매체 기여도와, 골프·키즈 같은 신규 카테고리를 사는 유저의 특성을 분석했습니다.',
    collaborators: ['Marketer', 'Data Scientist'],
    stack: ['Python', 'Shapley Value', 'Markov Chain', 'Logistic Regression', 'Random Forest', 'K-Means'],
    blocks: [
      {
        heading: '매체 기여도',
        bullets: [
          '앱 로그의 유입 경로로 Shapley value와 Markov chain 기여도를 계산',
          '두 방법 모두 기여도가 광고비 규모를 따라가는 경향을 확인해, 예산을 반영한 분석이 필요하다는 결론',
        ],
      },
      {
        heading: '신규 카테고리 구매 유저',
        bullets: [
          '브랜드 카테고리·랜딩 유형·매체 변수를 만들어 Random Forest와 로지스틱 회귀로 주요 변수 도출',
          'K-Means 군집분석으로 저가 상품을 여러 개 사는 유저군에서 신규 카테고리 구매가 많음을 확인',
        ],
      },
    ],
  },
  {
    id: 'image',
    title: '광고 이미지 자동 분류',
    company: '매드업',
    period: '2023.01 - 2023.03',
    summary:
      '광고 이미지에서 텍스트·사물·색상을 뽑아, 마케터가 눈으로 하던 리사이징 이미지 분류를 자동화했습니다. PO, 개발자와 함께 테스트 페이지까지 만들었습니다.',
    collaborators: ['Product Owner', 'Frontend Developer'],
    stack: ['Python', 'Google Cloud Vision API', 'Image Hashing', 'Jaccard Similarity'],
    blocks: [
      {
        heading: '속성 추출',
        bullets: ['Google Cloud Vision API로 이미지의 텍스트, 사물, 주 색상을 추출'],
      },
      {
        heading: '유사도 판단',
        bullets: [
          '크기가 같은 이미지는 이미지 해시 거리로 비교',
          '크기가 다르면 텍스트·사물(자카드 유사도)과 주 색상 차이를 함께 비교',
        ],
      },
      {
        heading: '배경색 추출',
        bullets: ['텍스트와 사물 영역을 가린 뒤 배경색을 뽑아, 배경색별 성과 비교에 활용'],
      },
    ],
  },
  {
    id: 'dashboard',
    title: '광고 성과 대시보드',
    company: '맥시마이저',
    period: '2023.12 - 2024.03',
    summary: '마케터와 디자이너가 매일 여는 광고 성과 대시보드를 Tableau와 Streamlit으로 만들었습니다.',
    collaborators: ['Marketer', 'Designer'],
    stack: ['Tableau', 'Streamlit', 'MMP API', 'BigQuery'],
    blocks: [
      {
        heading: 'Tableau',
        bullets: ['MMP API → BigQuery로 적재한 데이터로 데일리 리포트용 대시보드 제작'],
      },
      {
        heading: 'Streamlit',
        bullets: [
          '캠페인 성과 요약, 소재 성과 요약 대시보드로 다음 소재 기획에 반영',
          '소재 네이밍 규칙 대시보드로 분석 기준을 통일하고 신입 마케터의 적응을 도움',
        ],
      },
    ],
  },
]
