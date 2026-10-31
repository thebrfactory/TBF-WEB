'use client'

// =============================================================================
// GRAFICO DA TFD (rodada 29/10/2026, CHANGES #01, item 138)
// SVG proprio, sem biblioteca. Dois modos sobre os prints do Media Package:
//   seguidores      linha e area num eixo de tempo real (a data de captura do
//                   print posiciona o ponto), um ponto por print;
//   visualizacoes   barras por mes. A parte laranja de cada barra e a fatia de
//                   quem nao seguia a conta, na proporcao IMPRESSA no print. Marco
//                   nao tem print: fica vazio, sem estimativa.
// Sem linha de eixo e sem grade (regra da casa: nada de traco horizontal). O
// numero vem escrito em cada ponto e em cada barra.
// A largura e medida no navegador (ResizeObserver): o texto do SVG tem o tamanho
// real em px no celular de 390 e no desktop, em vez de encolher junto com o
// desenho. Os dados e a fonte de cada ponto moram em `v4-fronts.ts`.
// =============================================================================

import { useEffect, useRef, useState } from 'react'
import { ACCENT, PAPER } from '@/components/DeckShell/DeckShell'
import { TFD_FOLLOWERS, TFD_VIEWS } from '@/content/pitch/v4-fronts'

export type TfdMode = 'followers' | 'views'

const tms = (iso: string) => Date.parse(`${iso}T12:00:00Z`)

// Rotulos do eixo: PT em cima, EN embaixo (a camada de traducao do deck). Onde as
// duas grafias coincidem, vale uma so.
const MONTHS = [
  { pt: 'JAN', en: 'JAN' },
  { pt: 'FEV', en: 'FEB' },
  { pt: 'MAR', en: 'MAR' },
  { pt: 'ABR', en: 'APR' },
  { pt: 'MAI', en: 'MAY' },
  { pt: 'JUN', en: 'JUN' },
  { pt: 'JUL', en: 'JUL' },
  { pt: 'AGO', en: 'AUG' },
]

const FONT_NUM = 'var(--tbf-font-family-display)'
const FONT_TXT = 'var(--tbf-font-family-printed)'

function useWidth() {
  const ref = useRef<HTMLDivElement>(null)
  const [w, setW] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const read = () => setW(Math.floor(el.getBoundingClientRect().width))
    read()
    const ro = new ResizeObserver(read)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return [ref, w] as const
}

// ─── Seguidores: linha e area ────────────────────────────────────────────────
function FollowersLine({
  w,
  h,
  selected,
  onSelect,
}: {
  w: number
  h: number
  selected: string
  onSelect: (id: string) => void
}) {
  const pad = { l: 24, r: 26, t: 40, b: 44 }
  const x0 = tms('2026-01-01')
  const x1 = tms('2026-08-31')
  const innerW = w - pad.l - pad.r
  const innerH = h - pad.t - pad.b
  const yMax = 16000
  const X = (iso: string) => pad.l + ((tms(iso) - x0) / (x1 - x0)) * innerW
  const Y = (v: number) => pad.t + (1 - v / yMax) * innerH
  const base = pad.t + innerH

  // Rotulo de valor: em cima do ponto; se encostar no rotulo vizinho de cima (pontos
  // proximos no tempo, como 05/05 e 02/06 no celular), desce para baixo do ponto.
  const lane = { up: -Infinity, down: -Infinity }
  const pts = TFD_FOLLOWERS.map((p) => {
    const x = X(p.captured)
    const half = (p.shown.pt.length * 7.4 + 6) / 2
    const side: 'up' | 'down' = x - half > lane.up ? 'up' : x - half > lane.down ? 'down' : 'up'
    lane[side] = x + half
    return { p, x, y: Y(p.value), side }
  })
  const line = pts.map((q, i) => `${i === 0 ? 'M' : 'L'}${q.x.toFixed(1)} ${q.y.toFixed(1)}`).join(' ')
  const area = `${line} L${pts[pts.length - 1].x.toFixed(1)} ${base.toFixed(1)} L${pts[0].x.toFixed(1)} ${base.toFixed(1)} Z`

  return (
    <>
      <defs>
        <linearGradient id="p4-tc-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={ACCENT} stopOpacity="0.42" />
          <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Meses: so o rotulo, na data em que o mes comeca. */}
      {MONTHS.map((m, n) => {
        const x = X(`2026-${String(n + 1).padStart(2, '0')}-01`)
        return (
          <g key={m.pt + n}>
            <text x={x} y={base + 20} fill={PAPER} fillOpacity="0.8" fontSize="10.5" fontWeight="600" letterSpacing="0.08em" style={{ fontFamily: FONT_TXT }}>
              {m.pt}
            </text>
            {m.en !== m.pt ? (
              <text x={x} y={base + 33} fill={PAPER} fillOpacity="0.62" fontSize="9.5" fontStyle="italic" fontWeight="300" style={{ fontFamily: FONT_TXT }}>
                {m.en}
              </text>
            ) : null}
          </g>
        )
      })}

      <path d={area} fill="url(#p4-tc-area)" />
      <path d={line} fill="none" stroke={ACCENT} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />

      {pts.map(({ p, x, y, side }) => {
        const on = p.id === selected
        return (
          <g key={p.id} onClick={() => onSelect(p.id)} style={{ cursor: 'pointer' }}>
            {/* Alvo de toque de 44px. */}
            <circle cx={x} cy={y} r="22" fill="transparent" />
            {on ? <circle cx={x} cy={y} r="11" fill={ACCENT} fillOpacity="0.22" /> : null}
            <circle cx={x} cy={y} r={on ? 6.5 : 5} fill={on ? ACCENT : '#000000'} stroke={ACCENT} strokeWidth="2.25" />
            <text
              x={x}
              y={side === 'up' ? y - 16 : y + 25}
              textAnchor="middle"
              fill={on ? ACCENT : PAPER}
              fontSize="13"
              fontWeight="800"
              letterSpacing="-0.02em"
              style={{ fontFamily: FONT_NUM }}
            >
              {p.shown.pt}
            </text>
          </g>
        )
      })}
    </>
  )
}

// ─── Visualizacoes por mes: barras ───────────────────────────────────────────
function ViewsBars({
  w,
  h,
  selected,
  onSelect,
}: {
  w: number
  h: number
  selected: string
  onSelect: (id: string) => void
}) {
  const pad = { l: 8, r: 8, t: 36, b: 46 }
  const n = TFD_VIEWS.length
  const slot = (w - pad.l - pad.r) / n
  const bw = Math.min(46, slot * 0.66)
  const innerH = h - pad.t - pad.b
  const base = pad.t + innerH
  const vmax = Math.max(...TFD_VIEWS.map((m) => m.value ?? 0))

  return (
    <>
      {TFD_VIEWS.map((m, i) => {
        const cx = pad.l + slot * (i + 0.5)
        const mi = Number(m.month.slice(5, 7)) - 1
        const lab = MONTHS[mi]
        const on = m.id === selected

        const ticks = (
          <>
            <text x={cx} y={base + 20} textAnchor="middle" fill={PAPER} fillOpacity="0.8" fontSize="10.5" fontWeight="600" letterSpacing="0.08em" style={{ fontFamily: FONT_TXT }}>
              {lab.pt}
            </text>
            {lab.en !== lab.pt ? (
              <text x={cx} y={base + 33} textAnchor="middle" fill={PAPER} fillOpacity="0.62" fontSize="9.5" fontStyle="italic" fontWeight="300" style={{ fontFamily: FONT_TXT }}>
                {lab.en}
              </text>
            ) : null}
          </>
        )

        // Mes sem print: nada desenhado, so o aviso.
        if (m.missing || m.value === undefined || m.nonFollowers === undefined) {
          return (
            <g key={m.id}>
              <text x={cx} y={base - 14} textAnchor="middle" fill={PAPER} fillOpacity="0.78" fontSize="10.5" fontWeight="600" style={{ fontFamily: FONT_TXT }}>
                sem print
              </text>
              <text x={cx} y={base - 2} textAnchor="middle" fill={PAPER} fillOpacity="0.62" fontSize="9.5" fontStyle="italic" fontWeight="300" style={{ fontFamily: FONT_TXT }}>
                no print
              </text>
              {ticks}
            </g>
          )
        }

        const bh = Math.max((m.value / vmax) * innerH, 4)
        const top = base - bh
        const nonH = bh * m.nonFollowers
        const x = cx - bw / 2
        const clip = `p4-tc-clip-${m.id}`

        return (
          <g key={m.id} onClick={() => onSelect(m.id)} style={{ cursor: 'pointer' }}>
            <defs>
              <clipPath id={clip}>
                <rect x={x} y={top} width={bw} height={bh} rx="4" />
              </clipPath>
            </defs>
            {/* Alvo de toque: a coluna inteira do mes. */}
            <rect x={cx - slot / 2} y={pad.t - 20} width={slot} height={innerH + 20 + pad.b} fill="transparent" />
            <g clipPath={`url(#${clip})`}>
              <rect x={x} y={top} width={bw} height={bh} fill={PAPER} fillOpacity="0.2" />
              <rect x={x} y={base - nonH} width={bw} height={nonH} fill={ACCENT} />
            </g>
            {on ? <rect x={x - 2} y={top - 2} width={bw + 4} height={bh + 4} rx="6" fill="none" stroke={PAPER} strokeWidth="1.5" /> : null}
            {nonH >= 17 ? (
              <text x={cx} y={base - nonH / 2 + 3.5} textAnchor="middle" fill="#000000" fontSize="10.5" fontWeight="800" style={{ fontFamily: FONT_NUM }}>
                {Math.round(m.nonFollowers * 100)}%
              </text>
            ) : null}
            <text
              x={cx}
              y={top - 8}
              textAnchor="middle"
              fill={on ? ACCENT : PAPER}
              fontSize="12.5"
              fontWeight="800"
              letterSpacing="-0.02em"
              style={{ fontFamily: FONT_NUM }}
            >
              {m.shown?.pt}
            </text>
            {ticks}
          </g>
        )
      })}
    </>
  )
}

// ─── Casca ───────────────────────────────────────────────────────────────────
export function TfdChart({
  mode,
  selected,
  onSelect,
}: {
  mode: TfdMode
  selected: string
  onSelect: (id: string) => void
}) {
  const [ref, w] = useWidth()
  const h = w >= 520 ? 280 : 240

  const aria =
    mode === 'followers'
      ? `Seguidores de @thefioredaily: ${TFD_FOLLOWERS.map((p) => `${p.shown.pt} em ${p.period.pt}`).join('; ')}. / Followers of @thefioredaily: ${TFD_FOLLOWERS.map((p) => `${p.shown.en} in ${p.period.en}`).join('; ')}.`
      : `Visualizações por mês de @thefioredaily: ${TFD_VIEWS.filter((m) => !m.missing).map((m) => `${m.shown?.pt} em ${m.period.pt}`).join('; ')}. / Monthly views of @thefioredaily: ${TFD_VIEWS.filter((m) => !m.missing).map((m) => `${m.shown?.en} in ${m.period.en}`).join('; ')}.`

  return (
    <div ref={ref} className="p4-tc">
      {w > 0 ? (
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} role="img" aria-label={aria}>
          {mode === 'followers' ? (
            <FollowersLine w={w} h={h} selected={selected} onSelect={onSelect} />
          ) : (
            <ViewsBars w={w} h={h} selected={selected} onSelect={onSelect} />
          )}
        </svg>
      ) : null}
      <style>{`
        .p4-tc { width: 100%; min-height: 15rem; }
        .p4-tc svg { display: block; overflow: visible; -webkit-tap-highlight-color: transparent; }
        .p4-tc svg text { user-select: none; -webkit-user-select: none; }
      `}</style>
    </div>
  )
}
