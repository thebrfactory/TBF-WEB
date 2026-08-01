'use client'

// =============================================================================
// COOKIE BANNER — consentimento LGPD sitewide
// Aparece na primeira visita (sem escolha salva). Duas categorias REAIS: cookies
// necessários (sempre) + analytics (Vercel — gateado de verdade pelo
// ConsentedAnalytics). Sem categoria de marketing: o site não seta esse cookie.
// A escolha persiste em localStorage e pode ser reaberta a qualquer momento pelo
// link "Cookie Preferences" do rodapé (evento tbf-open-cookie-prefs). Zero rede.
//
// CONSENTIMENTO NÃO É ETERNO (2026-07-31): a regra de validade (versão de
// categorias + 12 meses) vive em `@/lib/consent`, compartilhada com o
// ConsentedAnalytics e o NewsletterPopup. Sem ela, quem clicou uma vez nunca
// mais via a caixa — foi o que aconteceu em produção, com registro legado que
// ainda trazia a categoria `marketing`, morta no site desde então.
//
// ATRASO EM ROTA DE ARTIGO (2026-08-01, DOPAMINE ARTICLE ORD-02): em
// /editorial/[slug] o pico de entrada (loader → hero) tem prioridade — o banner
// só aparece depois de ARTICLE_BANNER_DELAY_MS. Nas demais rotas, imediato,
// como sempre foi. O atraso é só de EXIBIÇÃO: nada não essencial é coletado
// antes do opt-in, com ou sem atraso, em nenhuma rota. Regra dura do pedido:
// o aviso NUNCA bloqueia a leitura — por isso ele é sempre uma barra inferior
// não bloqueante, nunca overlay/modal, com ou sem o atraso.
// A decisão (imediato vs. atrasado) é tomada a partir da rota de ENTRADA
// (pathname no primeiro render) e não se repete numa navegação client-side
// subsequente — evita reabrir/adiar um banner que o visitante já viu.
// =============================================================================

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { readConsent, writeConsent } from '@/lib/consent'

const ARTICLE_BANNER_DELAY_MS = 5000
const ARTICLE_ROUTE_PATTERN = /^\/editorial\/[^/]+\/?$/

export function CookieBanner() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)
  const [showPrefs, setShowPrefs] = useState(false)
  const [analytics, setAnalytics] = useState(true)

  // Primeira visita → aparece (imediato, ou após 5s em rota de artigo).
  // Reabertura (rodapé) → aparece já em modo preferências, refletindo a
  // escolha salva (revogabilidade, LGPD art. 18).
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const current = readConsent()
    let timer: ReturnType<typeof setTimeout> | undefined

    if (current) {
      setAnalytics(current.analytics)
    } else if (ARTICLE_ROUTE_PATTERN.test(pathname ?? '')) {
      timer = setTimeout(() => setVisible(true), ARTICLE_BANNER_DELAY_MS)
    } else {
      setVisible(true)
    }

    // Reabridor: qualquer lugar do site pode reabrir o painel de preferências.
    const onReopen = () => {
      const saved = readConsent()
      if (saved) setAnalytics(saved.analytics)
      setShowPrefs(true)
      setVisible(true)
    }
    window.addEventListener('tbf-open-cookie-prefs', onReopen)
    return () => {
      if (timer) clearTimeout(timer)
      window.removeEventListener('tbf-open-cookie-prefs', onReopen)
    }
  }, [])

  // Grava e avisa (1) o NewsletterPopup, que só aparece depois da escolha de
  // cookies, e (2) o ConsentedAnalytics, que liga/desliga o Vercel na hora.
  function persist(allowAnalytics: boolean) {
    writeConsent(allowAnalytics)
    setVisible(false)
    setShowPrefs(false)
  }

  const acceptAll = () => persist(true)
  const rejectOptional = () => persist(false)
  const savePrefs = () => persist(analytics)

  if (!visible) return null

  return (
    <div
      className="cookie-banner"
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de cookies"
    >
      <div className="cookie-banner__inner">
        {showPrefs && (
          <div className="cookie-banner__prefs">
            <label className="cookie-pref cookie-pref--locked">
              <input type="checkbox" checked disabled aria-label="Cookies necessários (sempre ativos)" />
              <span>
                <strong>Necessários</strong>: essenciais para o funcionamento do site. Sempre ativos.
              </span>
            </label>
            <label className="cookie-pref">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
              />
              <span>
                <strong>Analytics</strong>: nos ajudam a entender como o site é usado (Vercel, sem perfilamento).
              </span>
            </label>
          </div>
        )}

        <div className="cookie-banner__actions">
          {showPrefs ? (
            <button type="button" className="btn btn--primary cookie-banner__btn" onClick={savePrefs}>
              Salvar preferências
            </button>
          ) : (
            <button type="button" className="btn btn--primary cookie-banner__btn" onClick={acceptAll}>
              Aceitar todos os cookies
            </button>
          )}
          <button type="button" className="btn btn--secondary cookie-banner__btn" onClick={rejectOptional}>
            Rejeitar cookies opcionais
          </button>
        </div>

        {/* Texto abaixo dos botões (pedido), enxuto. */}
        <p className="cookie-banner__text">
          Usamos cookies para melhorar sua experiência. Ao continuar, você concorda com a{' '}
          <Link href="/legal/privacy" className="cookie-banner__link">
            Política de Privacidade
          </Link>
          .
        </p>

        {!showPrefs && (
          <button
            type="button"
            className="cookie-banner__prefs-toggle"
            onClick={() => setShowPrefs(true)}
          >
            Preferências de cookies
          </button>
        )}
      </div>
    </div>
  )
}
