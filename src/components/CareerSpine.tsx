import { useLayoutEffect, useRef, useState } from 'react'
import { Bullets } from './ui'
import type { Strength } from '../content/types'

/**
 * 커리어를 한눈에 펼쳐 보여주되, 항목을 잇는 선만 곧은 자 대신 굽이지는 길로 그린다.
 *
 * 항목마다 높이가 다르므로 곡선을 미리 그려둘 수 없다. 렌더 후 각 항목의 첫 줄 위치를 재서
 * 그 점들을 지나는 베지어를 만든다. 창 크기가 바뀌면(줄바꿈이 달라지면) 다시 잰다.
 */
const GUTTER = 56 // 왼쪽에 길이 지나갈 폭 (px)
const SWAY = 11 // 좌우로 흔들리는 폭. 클수록 구불구불해진다.
const CENTER = 26 // 길의 중심선

interface Props {
  strengths: Strength[]
}

export function CareerSpine({ strengths }: Props) {
  const container = useRef<HTMLOListElement>(null)
  const items = useRef<(HTMLLIElement | null)[]>([])

  const [dots, setDots] = useState<{ x: number; y: number }[]>([])
  const [height, setHeight] = useState(0)
  // 마우스를 올린 항목. 길 위의 점도 함께 반응한다.
  const [hovered, setHovered] = useState<number | null>(null)

  useLayoutEffect(() => {
    const measure = () => {
      const root = container.current
      if (!root) return

      const box = root.getBoundingClientRect()

      setHeight(box.height)
      setDots(
        items.current.filter(Boolean).map((item, i) => {
          // 항목 박스가 아니라 첫 줄(번호·라벨)을 기준으로 잰다. 호버 패딩에 흔들리지 않게.
          const head = item!.firstElementChild ?? item!
          const line = head.getBoundingClientRect()

          return {
            // 홀수·짝수 항목을 번갈아 좌우로 밀어 길이 굽이치게 한다.
            x: CENTER + (i % 2 === 0 ? -SWAY : SWAY),
            y: line.top - box.top + line.height / 2,
          }
        }),
      )
    }

    measure()

    const observer = new ResizeObserver(measure)
    if (container.current) observer.observe(container.current)
    return () => observer.disconnect()
  }, [strengths])

  const road = roadThrough(dots, height)

  return (
    <div className="relative">
      {/* 길. 인쇄할 때는 위치를 다시 잴 수 없으므로 숨기고, 아래 곧은 선으로 대체한다. */}
      <svg
        className="no-print absolute top-0 left-0 h-full"
        width={GUTTER}
        height={height}
        viewBox={`0 0 ${GUTTER} ${height}`}
        aria-hidden
      >
        {/* 길바닥: 두껍고 옅게 깔고 */}
        <path d={road} fill="none" stroke="var(--line)" strokeWidth="10" strokeLinecap="round" />
        {/* 그 위에 중앙선: 걸어온 자취처럼 점선으로 */}
        <path
          d={road}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeDasharray="1 7"
          strokeLinecap="round"
          strokeOpacity="0.7"
        />

        {dots.map((dot, i) => {
          const lit = hovered === i
          // 아무 데도 올리지 않았을 때는 현재(마지막) 지점이 채워져 있다.
          const filled = lit || (hovered === null && i === dots.length - 1)

          return (
            <circle
              key={i}
              cx={dot.x}
              cy={dot.y}
              r={lit ? 7 : i === dots.length - 1 ? 6 : 5}
              fill={filled ? 'var(--accent)' : 'var(--paper)'}
              stroke="var(--accent)"
              strokeWidth="2"
              className="transition-all duration-200"
            />
          )
        })}
      </svg>

      <ol
        ref={container}
        className="space-y-10 print:space-y-8 print:border-l-2 print:border-line print:pl-6"
        style={{ paddingLeft: `${GUTTER + 8}px` }}
      >
        {strengths.map((strength, i) => {
          const lit = hovered === i

          return (
            <li
              key={strength.label}
              ref={(el) => {
                items.current[i] = el
              }}
              // 키보드로 훑을 때도 같은 하이라이트가 걸리게 focus를 함께 받는다.
              tabIndex={0}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
              className={`-mx-3 rounded-lg px-3 py-2 transition-colors duration-200 outline-none ${
                lit ? 'bg-accent-soft/50' : ''
              }`}
            >
              <div className="flex flex-wrap items-baseline gap-x-2 font-mono text-[0.7rem] tracking-widest uppercase">
                <span className="text-accent">{String(i + 1).padStart(2, '0')}</span>
                <span className={`transition-colors ${lit ? 'text-accent' : 'text-faint'}`}>
                  {strength.label}
                </span>
                <span className="ml-auto text-faint normal-case tabular-nums">
                  {strength.period} · {strength.note}
                </span>
              </div>

              <h3 className="mt-1 mb-3 text-lg font-semibold text-balance">{strength.heading}</h3>
              <Bullets items={strength.details} />
            </li>
          )
        })}
      </ol>
    </div>
  )
}

/** 점들을 차례로 지나는 부드러운 길. 위아래로 조금 더 뻗어 잘린 느낌을 없앤다. */
function roadThrough(dots: { x: number; y: number }[], height: number) {
  if (dots.length < 2) return ''

  const first = dots[0]
  const last = dots[dots.length - 1]

  let path = `M${first.x},0 L${first.x},${first.y}`

  for (let i = 1; i < dots.length; i++) {
    const from = dots[i - 1]
    const to = dots[i]
    const mid = (from.y + to.y) / 2
    // 제어점을 세로 중간에 두면 S자로 부드럽게 감긴다.
    path += ` C${from.x},${mid} ${to.x},${mid} ${to.x},${to.y}`
  }

  path += ` L${last.x},${height}`
  return path
}
