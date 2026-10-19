/**
 * 태그에 붙는 브랜드 로고.
 *
 * 키는 skills.json / experience.ts / portfolio.ts 에 적힌 태그 이름 그대로다.
 * 여기 없는 이름은 글자만 나온다 — 통계 기법(K-Means, Shapley Value)처럼 로고가 없는 것이 대부분이고,
 * AWS·Oracle·Tableau·Looker Studio 는 상표 정책 때문에 simple-icons 에서 빠져 있어 넣을 수 없다.
 * (직접 그려 넣지 않는다. 그 회사들이 배포하지 말라고 요청한 것이 바로 그 도형이다.)
 *
 * 로고는 simple-icons 를 번들에 인라인한다 — 외부 CDN을 부르지 않는다.
 * 같은 도구가 탭마다 다른 이름으로 적혀 있어(BigQuery / GCP BigQuery) 별칭도 함께 건다.
 */
import {
  siClaudecode,
  siDocker,
  siFastapi,
  siGit,
  siGithub,
  siGithubactions,
  siGoogleappsscript,
  siGooglebigquery,
  siGooglecloud,
  siGooglecloudstorage,
  siJupyter,
  siPython,
  siR,
  siSap,
  siSelenium,
  siStreamlit,
} from 'simple-icons'
import type { SimpleIcon } from 'simple-icons'

export const brands: Record<string, SimpleIcon> = {
  Python: siPython,
  R: siR,
  'Apps Script': siGoogleappsscript,
  'Claude Code': siClaudecode,
  'GCP BigQuery': siGooglebigquery,
  BigQuery: siGooglebigquery,
  'Google BigQuery': siGooglebigquery,
  'GCP Cloud Storage': siGooglecloudstorage,
  'Cloud Storage': siGooglecloudstorage,
  'GCP Compute Engine': siGooglecloud,
  'GCP Secret Manager': siGooglecloud,
  'Google Cloud Vision API': siGooglecloud,
  SAP: siSap,
  Streamlit: siStreamlit,
  FastAPI: siFastapi,
  Git: siGit,
  GitHub: siGithub,
  'GitHub Actions': siGithubactions,
  Docker: siDocker,
  Jupyter: siJupyter,
  selenium: siSelenium,
}
