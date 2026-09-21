// =============================================================================
// HeroCinema — server component (SPEC §2.1)
// Título display XL revela por máscara ao carregar (não no scroll — LCP
// protegido: a animação acontece por cima da imagem/void já pintada).
// =============================================================================

import Image from 'next/image'
import { AuthorSignature } from './AuthorSignature'
import { MediaBelt } from '@/components/StoryPlayer/StoryPlayer'
import type { Lang } from '@/lib/i18n'

interface HeroCinemaProps {
  title: string
  subtitle?: string
  eyebrow?: string
  image?: { src: string; alt: string } | null
  /** Idioma da assinatura abaixo do titulo/subtitulo. Opcional: mock articles
      sem idioma local nao renderizam a assinatura. */
  lang?: Lang
  /**
   * ESTEIRA NO CABEÇALHO, opt-in por matéria (`ManifestoArticle.heroBelt`,
   * pedido do fundador em 21/09/2026: o reel entra ANTES da palavra, igual ao
   * de /creators/tavaristico/hospitality, mas sem sair do cabeçalho da
   * matéria scrolly). Sem `belt`, o Hero continua exatamente como antes; as
   * matérias que não optaram não mudam de aparência.
   */
  belt?: { src: string; alt: string; role: string }[]
  /** Legenda da esteira, mesmo papel do `reelLabel` do reel da proposta. */
  beltLabel?: string
}

export function HeroCinema({ title, subtitle, eyebrow, image, lang, belt, beltLabel }: HeroCinemaProps) {
  return (
    <section className="scrolly-hero" aria-label="Abertura da matéria">
      {image ? (
        <div className="scrolly-hero__media">
          <Image src={image.src} alt={image.alt} fill priority sizes="100vw" style={{ objectFit: 'cover' }} />
          <div className="scrolly-hero__overlay" aria-hidden="true" />
        </div>
      ) : (
        // Sem foto: void em preto puro. Forçar uma imagem aqui seria mentira
        // visual (05_PILOTO-CENAS.md §6).
        <div className="scrolly-hero__void" aria-hidden="true" />
      )}
      <div className="scrolly-hero__content">
        {belt && belt.length > 0 && (
          <>
            <MediaBelt className="scrolly-hero__belt" items={belt} label={beltLabel} />
            {beltLabel && <p className="scrolly-hero__beltLabel">{beltLabel}</p>}
          </>
        )}
        {eyebrow && <p className="scrolly-hero__eyebrow">{eyebrow}</p>}
        <h1 className="scrolly-hero__title">{title}</h1>
        {subtitle && <p className="scrolly-hero__subtitle">{subtitle}</p>}
        {lang && <AuthorSignature lang={lang} shareTitle={title} />}
      </div>
    </section>
  )
}
