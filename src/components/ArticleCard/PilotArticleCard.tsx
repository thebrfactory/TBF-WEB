// =============================================================================
// PILOT ARTICLE CARD — a matéria do piloto como card, em UM lugar só
// -----------------------------------------------------------------------------
// POR QUE ELE EXISTE. O piloto ("The Day Brazil Stopped Translating Itself") não
// vem do Sanity: ele é um módulo de conteúdo dentro do repo. O <ArticleCard /> é
// inteiramente amarrado ao Sanity (urlFor, heroImage, author, tags), então não
// serve. Este componente é o par local dele: MESMO markup, MESMAS classes,
// MESMA transição de capa — só a origem do dado é outra.
//
// UM LUGAR SÓ, de propósito (regra 4 do ecossistema: apontar, não copiar). Ele é
// usado na home E no arquivo do /editorial. A capa, o título e a data saem do
// próprio artigo, então nunca há como o card mostrar uma coisa e a matéria
// mostrar outra.
// =============================================================================

import Image from 'next/image'
import { ArticleMorphLink } from '@/components/PageTransition/ArticleMorphLink'
import { theDayBrazilStoppedTranslatingItself as piloto } from '@/content/articles/the-day-brazil-stopped-translating-itself'
import { localizedPath } from '@/lib/i18n'
import type { Lang } from '@/lib/i18n'

/** Proporção da capa. A foto é paisagem; o card respeita isso em vez de cortar. */
const RATIO = '3 / 2'

interface PilotArticleCardProps {
  lang: Lang
  variant?: 'featured' | 'standard'
}

export function PilotArticleCard({ lang, variant = 'standard' }: PilotArticleCardProps) {
  const isFeatured = variant === 'featured'
  const titulo = piloto.heroTitle[lang]

  // A data é formatada no locale da ROTA, não no do navegador: a mesma matéria
  // em /editorial e em /pt/editorial mostra a data no idioma da página.
  //
  // O MEIO-DIA NÃO É ENFEITE. `new Date('2026-08-01')` é lido como meia-noite em
  // UTC; formatado no fuso de Brasília (UTC-3) isso volta três horas e vira 31
  // de julho. A matéria passava a anunciar o dia anterior ao da publicação.
  // Ancorando ao meio-dia, nenhum fuso do mundo atravessa a virada do dia.
  const [ano, mes, dia] = piloto.publishedAt.split('-').map(Number)
  const data = new Intl.DateTimeFormat(lang === 'pt' ? 'pt-BR' : 'en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(ano, mes - 1, dia, 12))

  return (
    <ArticleMorphLink
      href={localizedPath(`/editorial/${piloto.slug}`, lang)}
      className={`card ${isFeatured ? 'card--featured' : 'card--standard'}`}
      aria-label={titulo}
    >
      {/* `data-morph` marca a caixa que cresce na transição para a matéria. */}
      <div data-morph className="card__image-wrapper" style={{ aspectRatio: RATIO }}>
        <Image
          className="card__image"
          src={piloto.cover.src}
          alt={piloto.cover.alt[lang]}
          width={1200}
          height={800}
          loading="lazy"
          sizes="(min-width: 768px) 33vw, 100vw"
        />
      </div>

      <div className="card__content">
        <div className="card__tags">
          <span className="tag tag--category">{piloto.category}</span>
        </div>

        {isFeatured ? (
          <h2 className="card__title">{titulo}</h2>
        ) : (
          <h3 className="card__title">{titulo}</h3>
        )}

        <div className="byline">
          <span className="byline__text">
            <span className="card__meta">{data}</span>
          </span>
        </div>
      </div>
    </ArticleMorphLink>
  )
}
