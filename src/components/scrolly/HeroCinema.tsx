// =============================================================================
// HeroCinema — server component (SPEC §2.1)
// Título display XL revela por máscara ao carregar (não no scroll — LCP
// protegido: a animação acontece por cima da imagem/void já pintada).
// =============================================================================

import Image from 'next/image'

interface HeroCinemaProps {
  title: string
  subtitle?: string
  eyebrow?: string
  image?: { src: string; alt: string } | null
}

export function HeroCinema({ title, subtitle, eyebrow, image }: HeroCinemaProps) {
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
        {eyebrow && <p className="scrolly-hero__eyebrow">{eyebrow}</p>}
        <h1 className="scrolly-hero__title">{title}</h1>
        {subtitle && <p className="scrolly-hero__subtitle">{subtitle}</p>}
      </div>
    </section>
  )
}
