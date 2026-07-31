'use client'

// =============================================================================
// HOME HERO — o hero da homepage, isolado em componente
// -----------------------------------------------------------------------------
// Vive aqui desde 2026-07-31 porque a capa do deck /pitch/v2 passou a ser
// EXATAMENTE o hero da home (pedido do fundador). Regra 4 do ecossistema:
// apontar, não copiar. Mexeu aqui, muda nos dois lugares ao mesmo tempo.
//
// `id` é opcional: a home não precisa, o deck usa para a navegação por setas.
// `style` idem: o deck acrescenta o encaixe de scroll-snap dos movimentos.
// =============================================================================

import { HeroVideo } from '@/components/HeroVideo/HeroVideo'

interface HomeHeroProps {
  id?: string
  style?: React.CSSProperties
}

export function HomeHero({ id, style }: HomeHeroProps = {}) {
  return (
      <section
        id={id}
        className="hero hero--home"
        aria-label="Hero .THE BRAZILIAN FACTORY."
        style={{ width: '100vw', ...style }}
      >
        {/* Grain overlay */}
        <div className="hero__overlay-grain" aria-hidden="true" />

        {/* Vídeo de fundo (mobile vertical / desktop horizontal) */}
        <HeroVideo />

        {/* LOGOTYPE + DECK — grupo alinhado, junto à base do vídeo */}
        <div className="hero-home__content">
          {/* Logotype SVG — mobile: margem a margem · desktop: 65% centralizado */}
          <svg
            viewBox="0 397 595.28 47"
            aria-label=".THE BRAZILIAN FACTORY."
            role="img"
            className="hero-home__logo"
          >
            <path d="M5.21,428.52c3.22,0,5.21,1.9,5.21,5.02s-2,5.02-5.21,5.02-5.21-1.9-5.21-5.02,2-5.02,5.21-5.02Z" fill="#fff"/>
            <path d="M36.36,403.16v8.46h-8.84v26.15h-10.09v-26.15h-8.84v-8.46h27.78Z" fill="#fff"/>
            <path d="M60.39,437.77v-13.36h-11.49v13.36h-10.05v-34.61h10.05v12.83h11.49v-12.83h10.09v34.61h-10.09Z" fill="#fff"/>
            <path d="M75.48,403.16h23.17v8.46h-13.12v4.61h11.25v7.93h-11.25v5.14h13.84v8.46h-23.89v-34.61Z" fill="#fff"/>
            <path d="M114.85,403.16h11.78c7.83,0,14.28,2.93,14.28,9.95,0,3.56-2.21,5.62-4.47,6.49,2.79.77,5.72,3.65,5.72,7.74,0,7.35-6.1,10.43-14.76,10.43h-12.55v-34.61ZM124.42,411.14v5.91h2.79c1.92,0,3.6-.72,3.6-2.93s-1.68-2.98-3.6-2.98h-2.79ZM124.42,423.4v6.39h3.51c1.92,0,3.85-.77,3.85-3.17s-1.92-3.22-3.85-3.22h-3.51Z" fill="#fff"/>
            <path d="M163.11,437.77l-5.1-10.77h-2.84v10.77h-9.81v-34.61h13.03c8.51,0,14.52,3.99,14.52,12.16,0,4.9-2.31,8.22-6.1,10.05l6.73,12.4h-10.43ZM155.18,411.62v7.4h3.75c2.02,0,3.85-.87,3.85-3.7s-1.83-3.7-3.85-3.7h-3.75Z" fill="#fff"/>
            <path d="M196.13,433.2h-10.53l-2.11,4.57h-10.43l17.59-35.09h.48l17.59,35.09h-10.43l-2.16-4.57ZM188.39,426.67h5c-.87-2.02-2.16-5.19-2.45-6.44h-.1c-.29,1.25-1.59,4.42-2.45,6.44Z" fill="#fff"/>
            <path d="M223.28,429.31h13.84v8.46h-29.13l14.9-26.15h-13.12v-8.46h28.31l-14.8,26.15Z" fill="#fff"/>
            <path d="M250.92,437.77h-10.05v-34.61h10.05v34.61Z" fill="#fff"/>
            <path d="M255.92,437.77v-34.61h10.05v26.15h11.82v8.46h-21.87Z" fill="#fff"/>
            <path d="M290.57,437.77h-10.05v-34.61h10.05v34.61Z" fill="#fff"/>
            <path d="M315.18,433.2h-10.53l-2.11,4.57h-10.43l17.59-35.09h.48l17.59,35.09h-10.43l-2.16-4.57ZM307.44,426.67h5c-.86-2.02-2.16-5.19-2.45-6.44h-.1c-.29,1.25-1.59,4.42-2.45,6.44Z" fill="#fff"/>
            <path d="M339.12,422.24v15.53h-9.81v-35.09h.48l19.8,16.01v-15.53h9.85v35.09h-.43l-19.9-16.01Z" fill="#fff"/>
            <path d="M379.23,403.16h21.97v8.46h-11.92v5.14h10.05v8.22h-10.05v12.79h-10.05v-34.61Z" fill="#fff"/>
            <path d="M419.94,433.2h-10.53l-2.11,4.57h-10.43l17.59-35.09h.48l17.59,35.09h-10.43l-2.16-4.57ZM412.2,426.67h5c-.86-2.02-2.16-5.19-2.45-6.44h-.1c-.29,1.25-1.59,4.42-2.45,6.44Z" fill="#fff"/>
            <path d="M448.83,402.44c4.42,0,7.45,1.01,9.85,2.26v9.13c-1.87-.96-4.81-2.21-8.84-2.21-6.15,0-9.37,4.28-9.37,8.84s3.12,8.84,8.84,8.84c4.37,0,7.59-1.2,9.61-2.21v9.23c-2.4,1.25-6.39,2.16-10.57,2.16-10.38,0-17.98-7.98-17.98-18.02s7.59-18.02,18.46-18.02Z" fill="#fff"/>
            <path d="M489.18,403.16v8.46h-8.84v26.15h-10.09v-26.15h-8.84v-8.46h27.78Z" fill="#fff"/>
            <path d="M508.38,402.44c10.91,0,18.51,8.12,18.51,18.02s-7.59,18.02-18.51,18.02-18.46-7.98-18.46-18.02,7.59-18.02,18.46-18.02ZM508.38,429.31c5.09,0,8.36-4.18,8.36-8.84s-3.27-8.84-8.36-8.84-8.36,4.28-8.36,8.84,3.32,8.84,8.36,8.84Z" fill="#fff"/>
            <path d="M547.84,437.77l-5.09-10.77h-2.84v10.77h-9.81v-34.61h13.03c8.51,0,14.52,3.99,14.52,12.16,0,4.9-2.31,8.22-6.1,10.05l6.73,12.4h-10.43ZM539.91,411.62v7.4h3.75c2.02,0,3.85-.87,3.85-3.7s-1.83-3.7-3.85-3.7h-3.75Z" fill="#fff"/>
            <path d="M568.94,437.77v-13.07l-12.64-21.53h11.44l6.25,11.97,6.25-11.97h11.44l-12.64,21.53v13.07h-10.09Z" fill="#fff"/>
            <path d="M590.06,428.52c3.22,0,5.21,1.9,5.21,5.02s-2,5.02-5.21,5.02-5.21-1.9-5.21-5.02,2-5.02,5.21-5.02Z" fill="#fff"/>
          </svg>

          {/* Deck — alinhado ao início do SVG */}
          <p className="hero-home__deck">
            Culture™<br />Crafted in São Paulo, Brazil<br />.Consumed Worldwide.
          </p>
        </div>

      </section>
  )
}
