// =============================================================================
// PUBLISHING: serve `/publishing` (inglês) e `/pt/publishing` (português)
//
// Nova arquitetura (08/10/2026): "a memória cultural da Factory". Por que
// publicamos, tese editorial, sete territórios, labels, padrão, Zine e como
// contribuir. Coluna de leitura central e cartões arredondados, como o
// template de matéria. O Archive só aparece como território: ainda não existe
// como seção própria.
// =============================================================================

import { TbfLink as Link } from '@/components/TbfLink/TbfLink'
import { publishing } from '@/content/i18n/pages/publishing'
import {
  B800,
  BODY,
  CARD,
  CardGrid,
  DECK,
  H3,
  KICKER,
  LABEL,
  MailLink,
  PageHero,
  READING,
  Section,
  Statement,
} from '@/components/Institutional/Institutional'
import { localizedPath, type Lang } from '@/lib/i18n'

export default function PublishingView({ lang }: { lang: Lang }) {
  const t = publishing[lang]
  const path = (p: string) => localizedPath(p, lang)

  return (
    <div style={{ background: '#000', color: '#fff', minHeight: '100dvh' }}>

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <PageHero
        tag={t.hero.tag}
        title={t.hero.title}
        deck={
          <>
            {t.hero.deckPrefix} <span style={B800}>.THE BRAZILIAN FACTORY.</span> {t.hero.deckSuffix}
          </>
        }
      />

      {/* ─── 01 WHY WE PUBLISH ────────────────────────────────────────────── */}
      <Section id="pub-why" kicker={t.why.kicker} heading={t.why.heading}>
        <p style={DECK}>{t.why.p1}</p>
        <p style={{ ...BODY, marginBottom: 0 }}>{t.why.p2}</p>
      </Section>

      {/* ─── 02 EDITORIAL THESIS ──────────────────────────────────────────── */}
      <Section id="pub-thesis" kicker={t.thesis.kicker} heading={t.thesis.heading}>
        <p style={BODY}>{t.thesis.p1}</p>
        <p style={{ ...BODY, color: '#fff', fontWeight: 700, marginBottom: 0 }}>{t.thesis.p2}</p>
      </Section>

      {/* ─── 03 WHAT WE PUBLISH ───────────────────────────────────────────── */}
      <Section
        id="pub-what"
        kicker={t.whatWePublish.kicker}
        heading={t.whatWePublish.heading}
        wide={<CardGrid items={t.whatWePublish.items} />}
      />

      {/* ─── 04 THE LABELS ────────────────────────────────────────────────── */}
      <Section
        id="pub-labels"
        kicker={t.labels.kicker}
        heading={t.labels.heading}
        wide={<CardGrid items={t.labels.items} />}
      >
        <p style={{ ...BODY, marginBottom: 0 }}>{t.labels.deck}</p>
      </Section>

      {/* ─── 05 THE STANDARD ──────────────────────────────────────────────── */}
      <Section id="pub-standard" kicker={t.standard.kicker} heading={t.standard.heading}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--tbf-space-4)' }}>
          {t.standard.items.map((item) => (
            <div key={item.key} style={CARD}>
              <h3 style={{ ...H3, marginBottom: 'var(--tbf-space-2)' }}>{item.title}</h3>
              <p style={{ ...BODY, marginBottom: 0 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── 06 THE ZINE ──────────────────────────────────────────────────── */}
      <Statement lines={[t.zine.heading]} />
      <section className="section container" aria-labelledby="pub-zine-h">
        <div style={READING}>
          <span style={KICKER} id="pub-zine-h">{t.zine.kicker}</span>
          <p style={BODY}>{t.zine.body}</p>
          <Link href={path('/zine')} className="btn btn--primary">
            {t.zine.cta}
            <span className="btn__arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* ─── 07 CONTRIBUTE ────────────────────────────────────────────────── */}
      <Section
        id="pub-contribute"
        kicker={t.contribute.kicker}
        heading={t.contribute.heading}
        wide={<CardGrid items={t.contribute.items} />}
      >
        <p style={BODY}>{t.contribute.p1}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--tbf-space-6)', marginTop: 'var(--tbf-space-6)' }}>
          <div>
            <span style={{ ...LABEL, color: 'rgba(255,255,255,0.4)' }}>{t.contribute.pitchLabel}</span>
            <MailLink email={t.contribute.pitchEmail} />
          </div>
          <div>
            <span style={{ ...LABEL, color: 'rgba(255,255,255,0.4)' }}>{t.contribute.partnershipsLabel}</span>
            <MailLink email={t.contribute.partnershipsEmail} />
          </div>
          <div>
            <p style={{ ...BODY, marginBottom: 'var(--tbf-space-3)' }}>{t.contribute.joinPrefix}</p>
            <Link href={path('/access')} className="btn btn--secondary">
              {t.contribute.joinCta}
              <span className="btn__arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </Section>

    </div>
  )
}
