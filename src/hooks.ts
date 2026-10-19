import { useEffect, useRef, useState } from 'react'
import { tabs } from './content/tabs'
import type { TabId } from './content/types'

const isTabId = (value: string): value is TabId => tabs.some((t) => t.id === value)

/**
 * 탭 말고 하나 더 있는 경로. 모든 탭을 한 문서로 이어 붙인 이력서 본문이고,
 * 이 경로에서 Ctrl+P 로 인쇄하면 전체 이력서가 한 문서로 나온다.
 */
export const RESUME_ROUTE = 'resume'

export type Route = TabId | typeof RESUME_ROUTE

const readHash = (): Route => {
  const id = window.location.hash.replace(/^#\/?/, '')
  if (id === RESUME_ROUTE) return RESUME_ROUTE
  return isTabId(id) ? id : 'about'
}

/** URL 해시를 화면 상태로 쓴다. 새로고침·뒤로가기·딥링크(#/portfolio)가 모두 동작한다. */
export function useHashTab() {
  const [route, setRoute] = useState<Route>(readHash)

  useEffect(() => {
    const onChange = () => setRoute(readHash())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  const goTo = (id: TabId) => {
    window.location.hash = `/${id}`
    window.scrollTo({ top: 0 })
  }

  return { route, goTo }
}

/** 색이 바뀌는 동안만 전역 transition을 켠다. 상시로 켜두면 호버 등 다른 상호작용까지 느려진다. */
const THEME_FADE_MS = 1000

export function useTheme() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))
  const first = useRef(true)
  const timer = useRef<number>(0)

  useEffect(() => {
    const root = document.documentElement

    // 첫 렌더에서는 페이드하지 않는다. 저장된 테마로 이미 그려진 상태다.
    if (!first.current) {
      root.classList.add('theme-fade')
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(
        () => root.classList.remove('theme-fade'),
        THEME_FADE_MS,
      )
    }
    first.current = false

    root.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  return { dark, toggle: () => setDark((d) => !d) }
}
