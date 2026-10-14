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
  /** Aviso de ficção (`ManifestoArticle.fiction`), letra pequena abaixo do subtítulo. */
  note?: string
}

// Ponto focal por capa, para o recorte vertical do celular (9:16) não cortar
// rosto. Sem entrada: 50% 35%, o terço de cima onde costuma morar o rosto.
// Capa de Posse: palhaço de laranja (62%) e o motorista (60%) cabem juntos.
const HERO_FOCUS: Record<string, string> = {
  '/images/editorial/country-side/capa.webp': '60% 30%',
  // X-15: a frente do carro (parabrisa e faróis) fica à esquerda do quadro.
  '/images/editorial/gurgel/18-x15-estrada.webp': '30% 50%',
}

export function HeroCinema({ title, subtitle, eyebrow, image, lang, belt, beltLabel, note }: HeroCinemaProps) {
  return (
    <section className="scrolly-hero" aria-label="Abertura da matéria">
      {image ? (
        <div className="scrolly-hero__media">
          {/* Foto em resolução real: sizes 100vw + quality 90 + priority. O
              movimento (Ken Burns) vive na classe, só com transform. */}
          <Image
            className="scrolly-hero__img"
            src={image.src}
            alt={image.alt}
            fill
            priority
            quality={90}
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: HERO_FOCUS[image.src] ?? '50% 35%' }}
          />
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
            <MediaBelt className="scrolly-hero__belt fade-edges" items={belt} label={beltLabel} />
            {beltLabel && <p className="scrolly-hero__beltLabel">{beltLabel}</p>}
          </>
        )}
        {eyebrow && <p className="scrolly-hero__eyebrow">{eyebrow}</p>}
        <h1 className="scrolly-hero__title">{title}</h1>
        {subtitle && <p className="scrolly-hero__subtitle">{subtitle}</p>}
        {note && <p className="scrolly-hero__note">{note}</p>}
        {lang && <AuthorSignature lang={lang} shareTitle={title} />}
      </div>
    </section>
  )
}
