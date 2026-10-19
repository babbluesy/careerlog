import type { Tab } from './types'

// 순서가 사이드바 순서다. id 는 URL(#/experience)이 되므로 바꾸면 기존 링크가 깨진다.
export const tabs: Tab[] = [
  { id: 'about', label: '소개' },
  { id: 'experience', label: '경력' },
  { id: 'portfolio', label: '포트폴리오' },
  { id: 'education', label: '학력' },
  { id: 'awards', label: '수상 및 교육' },
]
