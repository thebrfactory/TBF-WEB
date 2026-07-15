import type { Metadata } from 'next'
import { ContactForm } from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    "Let's make brave work for your brand. Open a channel with .THE BRAZILIAN FACTORY. São Paulo, Brazil.",
}

export default function ContactUsPage() {
  return (
    <div style={{ background: 'var(--tbf-bg-primary)', color: 'var(--tbf-text-primary)', minHeight: '100dvh' }}>
      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      {/* Enxuto por pedido: o eyebrow "Contact Us" saiu (o h1, a URL e o nav já
          dizem onde o usuário está) e o deck foi fundido com a linha que ficava
          solta acima do formulário. Sobra h1 + uma linha + formulário. */}
      <section
        style={{
          paddingTop: 'calc(var(--tbf-nav-height-sm) + var(--tbf-space-20))',
          paddingBottom: 'var(--tbf-space-10)',
        }}
      >
        <div className="container">
          <h1
            style={{
              fontFamily: 'var(--tbf-type-display-xl-family)',
              fontSize: 'clamp(2.5rem, 8vw, 7rem)',
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: 'var(--tbf-type-display-xl-ls)',
              color: 'var(--tbf-text-primary)',
              marginBottom: 'var(--tbf-space-6)',
              maxWidth: '16ch',
            }}
          >
            {"Let's make brave work for your brand."}
          </h1>
          <p
            style={{
              fontFamily: 'var(--tbf-type-deck-family)',
              fontSize: 'var(--tbf-type-deck-size-sm)',
              lineHeight: 'var(--tbf-type-deck-lh)',
              color: 'color-mix(in srgb, var(--tbf-color-parchment) 65%, transparent)',
              maxWidth: '52ch',
            }}
          >
            Tell us what you&apos;re building. Brands, press, collaborations and the
            unexpected. We read everything and reply when it makes sense.
          </p>
        </div>
      </section>

      {/* ─── FORM — coluna única, enxuta e fluída (estilo Typeform) ────────── */}
      <section className="section container" style={{ paddingBottom: 'var(--tbf-space-24)' }}>
        <div style={{ maxWidth: '640px' }}>
          <ContactForm />
        </div>
      </section>
    </div>
  )
}
