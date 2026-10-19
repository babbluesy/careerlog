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

/** 자릿수마다 최소 이만큼 바퀴를 돌린다. 값이 1이어도 0→1로 끝나지 않고 숫자가 굴러간다. */
const MIN_SPINS = 3

/**
 * 오도미터처럼 자릿수를 굴려서 target 에 멎게 한다.
 * 0에서 target 까지 선형으로 세면 한 자리 수(1, 9…)는 볼 것도 없이 끝나므로, 자리마다 여러 바퀴를 돌린다.
 * 아래 자리일수록 많이 돌아 마지막까지 바쁘게 움직이고, 끝으로 갈수록 느려져(ease-out) 멎는 느낌이 난다.
 * 모션을 줄여 달라는 설정이면 애니메이션 없이 최종값을 바로 준다.
 */
export function useCountUp(target: number, durationMs = 1400) {
  const reduced =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const digits = String(target)
  const [value, setValue] = useState(() => (reduced ? digits : '0'.repeat(digits.length)))

  useEffect(() => {
    if (reduced) {
      setValue(digits)
      return
    }

    let frame = 0
    let start: number | null = null

    const tick = (now: number) => {
      start ??= now
      const progress = Math.min((now - start) / durationMs, 1)
      const eased = 1 - Math.pow(1 - progress, 3)

      // 각 자리는 (바퀴 수 × 10 + 목표 숫자) 만큼 굴러간다. eased 가 1이면 정확히 목표 숫자에 멎는다.
      setValue(
        digits
          .split('')
          .map((digit, i) => {
            const spins = MIN_SPINS + (digits.length - 1 - i)
            return Math.floor(eased * (spins * 10 + Number(digit))) % 10
          })
          .join(''),
      )

      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [digits, durationMs, reduced])

  return value
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
