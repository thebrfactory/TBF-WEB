'use client'

// =============================================================================
// FACTORY HERO SECTION — Client component para animações
// =============================================================================

import { useEffect, useRef } from 'react'
import { TbfLink as Link } from '@/components/TbfLink/TbfLink'
import { useLang } from '@/lib/LangProvider'
import { localizedPath } from '@/lib/i18n'
import { factory } from '@/content/i18n/pages/factory'

export function FactoryHeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const lang = useLang()
  const t = factory[lang].hero

  // IntersectionObserver para revelar elementos
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const reveals = el.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal--visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    reveals.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="section section--heroic container"
      aria-labelledby="factory-h1"
    >
      <div>
        <p
          className="reveal reveal--headline"
          style={{
            fontFamily: 'var(--tbf-type-micro-family)',
            fontSize: 'var(--tbf-type-micro-size)',
            letterSpacing: 'var(--tbf-type-micro-ls)',
            color: 'var(--tbf-text-tertiary)',
            textTransform: 'uppercase',
            marginBottom: 'var(--tbf-space-6)',
          }}
        >
          {t.eyebrow}
        </p>

        <h1
          id="factory-h1"
          className="reveal reveal--headline"
          style={{
            fontFamily: 'var(--tbf-type-display-xl-family)',
            fontSize: 'var(--tbf-type-display-xl-size-sm)',
            fontWeight: 'var(--tbf-type-display-xl-weight)',
            lineHeight: 'var(--tbf-type-display-xl-lh-sm)',
            letterSpacing: 'var(--tbf-type-display-xl-ls)',
            color: 'var(--tbf-text-primary)',
            marginBottom: 'var(--tbf-space-8)',
          }}
        >
          {t.title[0]}
          <br />
          {t.title[1]}
        </h1>

        <p
          className="reveal reveal--deck"
          style={{
            fontFamily: 'var(--tbf-type-deck-family)',
            fontSize: 'var(--tbf-type-deck-size-sm)',
            fontWeight: 'var(--tbf-type-deck-weight)',
            lineHeight: 'var(--tbf-type-deck-lh)',
            color: 'var(--tbf-text-secondary)',
            maxWidth: '50ch',
            marginBottom: 'var(--tbf-space-10)',
          }}
        >
          {t.deck}
        </p>

        <div
          className="reveal"
          style={{ display: 'flex', gap: 'var(--tbf-space-4)', flexWrap: 'wrap' }}
        >
          <a
            href="https://calendly.com/thebrazilianfactory/30min"
            className="btn btn--primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.scheduleCta}
            <span className="btn__arrow" aria-hidden="true">→</span>
          </a>
          <Link href={localizedPath('/access?intent=tgf', lang)} className="btn btn--secondary">
            {t.channelCta}
          </Link>
        </div>
      </div>
    </section>
  )
}
