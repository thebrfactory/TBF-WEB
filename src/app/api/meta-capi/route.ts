import { createHash } from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'

// =============================================================================
// META API DE CONVERSOES (server-side). Inerte sem META_CAPI_TOKEN: 204 e nada.
//
// O cliente (lib/meta-pixel) manda o mesmo evento do pixel com o MESMO event_id,
// e a Meta deduplica. So chega aqui com marketing aceito (o cliente checa).
// Dados de contato em minusculas, sem hash: o hash SHA-256 e feito AQUI.
// Nunca logar PII nem token.
// =============================================================================

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const GRAPH_VERSION = 'v21.0'
const ALLOWED = new Set(['PageView', 'ViewContent', 'Contact', 'Lead', 'PitchComplete'])
const MAX_BODY = 8 * 1024

const sha256 = (v: string) => createHash('sha256').update(v).digest('hex')

function cleanString(v: unknown, max: number): string {
  return typeof v === 'string' ? v.trim().slice(0, max) : ''
}

function cleanCustom(input: unknown): Record<string, string | number | boolean | string[]> {
  const out: Record<string, string | number | boolean | string[]> = {}
  if (!input || typeof input !== 'object' || Array.isArray(input)) return out
  let n = 0
  for (const [k, v] of Object.entries(input as Record<string, unknown>)) {
    if (n >= 20 || !/^[a-z_]{1,40}$/.test(k)) continue
    if (typeof v === 'string') out[k] = v.slice(0, 200)
    else if (typeof v === 'number' && Number.isFinite(v)) out[k] = v
    else if (typeof v === 'boolean') out[k] = v
    else if (Array.isArray(v) && v.every((x) => typeof x === 'string')) {
      out[k] = (v as string[]).slice(0, 10).map((x) => x.slice(0, 100))
    } else continue
    n += 1
  }
  return out
}

function sameSite(req: NextRequest, url: string): boolean {
  const host = (req.headers.get('x-forwarded-host') ?? req.headers.get('host') ?? '').toLowerCase()
  if (!host) return false
  try {
    const origin = req.headers.get('origin') ?? req.headers.get('referer')
    if (!origin || new URL(origin).host.toLowerCase() !== host) return false
    const u = new URL(url)
    return (u.protocol === 'https:' || u.protocol === 'http:') && u.host.toLowerCase() === host
  } catch {
    return false
  }
}

export async function POST(req: NextRequest) {
  const token = process.env.META_CAPI_TOKEN
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID
  if (!token || !pixelId) return new NextResponse(null, { status: 204 })

  let body: Record<string, unknown>
  try {
    const text = await req.text()
    if (text.length > MAX_BODY) return new NextResponse(null, { status: 413 })
    const parsed: unknown = JSON.parse(text)
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('shape')
    body = parsed as Record<string, unknown>
  } catch {
    return new NextResponse(null, { status: 400 })
  }

  const eventName = cleanString(body.event_name, 40)
  const eventId = cleanString(body.event_id, 100)
  const sourceUrl = cleanString(body.event_source_url, 500)
  if (!ALLOWED.has(eventName) || !eventId || !sameSite(req, sourceUrl)) {
    return new NextResponse(null, { status: 403 })
  }

  const raw = (body.user_data_raw && typeof body.user_data_raw === 'object' ? body.user_data_raw : {}) as Record<string, unknown>
  const userData: Record<string, unknown> = {}
  const em = cleanString(raw.em, 254).toLowerCase()
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) userData.em = [sha256(em)]
  const ph = cleanString(raw.ph, 30).replace(/\D/g, '')
  if (ph.length >= 8) userData.ph = [sha256(ph)]
  const fn = cleanString(raw.fn, 80).toLowerCase()
  if (fn) userData.fn = [sha256(fn)]
  const ln = cleanString(raw.ln, 80).toLowerCase()
  if (ln) userData.ln = [sha256(ln)]

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  if (ip) userData.client_ip_address = ip
  const ua = req.headers.get('user-agent')
  if (ua) userData.client_user_agent = ua.slice(0, 500)
  const fbp = req.cookies.get('_fbp')?.value
  if (fbp) userData.fbp = fbp.slice(0, 200)
  const fbc = req.cookies.get('_fbc')?.value
  if (fbc) userData.fbc = fbc.slice(0, 300)

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        event_source_url: sourceUrl,
        action_source: 'website',
        user_data: userData,
        custom_data: cleanCustom(body.custom_data),
      },
    ],
  }
  const testCode = process.env.META_CAPI_TEST_CODE
  if (testCode) payload.test_event_code = testCode

  try {
    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${encodeURIComponent(pixelId)}/events?access_token=${encodeURIComponent(token)}`,
      { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) },
    )
    return new NextResponse(null, { status: res.ok ? 204 : 502 })
  } catch {
    return new NextResponse(null, { status: 502 })
  }
}
