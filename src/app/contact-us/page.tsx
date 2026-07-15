import type { Metadata } from 'next'
import { ContactForm } from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    "Let's make brave work for your brand. Open a channel with .THE BRAZILIAN FACTORY. São Paulo, Brazil.",
}

export default function ContactUsPage() {
  return (
    <div style={{ background: '#000', color: '#fff', minHeight: '100dvh' }}>
      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          paddingTop: 'calc(var(--tbf-nav-height-sm) + var(--tbf-space-20))',
          paddingBottom: 'var(--tbf-space-12)',
        }}
      >
        <div className="container">
          <span
            style={{
              display: 'block',
              fontFamily: 'var(--tbf-type-micro-family)',
              fontSize: 'var(--tbf-type-micro-size)',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.45)',
              marginBottom: 'var(--tbf-space-4)',
            }}
          >
            Contact Us
          </span>
          <h1
            style={{
              fontFamily: 'var(--tbf-type-display-xl-family)',
              fontSize: 'clamp(2.5rem, 8vw, 7rem)',
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: 'var(--tbf-type-display-xl-ls)',
              color: '#fff',
              marginBottom: 'var(--tbf-space-8)',
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
              color: 'rgba(255,255,255,0.65)',
              maxWidth: '52ch',
            }}
          >
            Tell us what you&apos;re building. Brands, press, collaborations and the
            unexpected. <strong style={{ fontWeight: 800 }}>.TBF.</strong> opens the channel
            from São Paulo to the world.
          </p>
        </div>
      </section>

      {/* ─── FORM — coluna única, enxuta e fluída (estilo Typeform) ────────── */}
      <section className="section container" style={{ paddingBottom: 'var(--tbf-space-24)' }}>
        <div style={{ maxWidth: '640px' }}>
          <p
            style={{
              fontFamily: 'var(--tbf-type-body-family)',
              fontSize: 'var(--tbf-type-body-size-sm)',
              lineHeight: 'var(--tbf-type-body-lh)',
              color: 'rgba(255,255,255,0.7)',
              marginBottom: 'var(--tbf-space-10)',
            }}
          >
            No filter. Write what matters. We read everything and reply when it makes sense.
          </p>

          <ContactForm />
        </div>
      </section>
    </div>
  )
}
