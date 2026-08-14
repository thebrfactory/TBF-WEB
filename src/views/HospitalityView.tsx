// =============================================================================
// /creators/tavaristico/hospitality — A PROPOSTA DE FOTOGRAFIA COMERCIAL
// -----------------------------------------------------------------------------
// Pedido do fundador (#01 CHANGES 2026-08-14). O porquê da página, o argumento
// que ela faz e a origem das catorze fotos estão no cabeçalho do dicionário:
// `src/content/i18n/pages/hospitality.ts`. Aqui mora só a composição.
//
// UMA VIEW, DOIS IDIOMAS, como o resto do site: as cascas em app/(en) e
// app/(pt)/pt montam esta mesma view passando `lang`. Diferente do portfólio,
// AQUI TUDO É TRADUZIDO — inclusive as legendas das fotos. Case de portfólio não
// se traduz porque nome de obra e de cliente não têm versão; proposta comercial
// se traduz porque ela é dirigida a quem vai contratar, e quem contrata hostel
// no Brasil lê em português.
//
// SEM ANIMAÇÃO DE ROLAGEM. O motor de scrolly do site existe e é bom, e esta
// página não o usa: proposta comercial se lê de cima a baixo com pressa, e
// animação de entrada em catorze fotos vira espera. A página é HTML servido,
// server component, zero JavaScript de cliente.
// =============================================================================

import Image from 'next/image'
import { TbfLink as Link } from '@/components/TbfLink/TbfLink'
import { hospitality, SHOTS } from '@/content/i18n/pages/hospitality'
import { localizedPath, type Lang } from '@/lib/i18n'
import styles from './HospitalityView.module.css'

export default function HospitalityView({ lang }: { lang: Lang }) {
  const t = hospitality[lang]
  const path = (p: string) => localizedPath(p, lang)

  return (
    <main className={styles.page}>
      <div className="container">
        {/* ── Abertura ─────────────────────────────────────────────────── */}
        <header className={styles.hero}>
          <Link href={path('/creators/tavaristico')} className={styles.crumb}>
            {t.crumb}
          </Link>
          <p className={styles.eyebrow}>{t.eyebrow}</p>
          <h1 className={styles.title}>{t.title}</h1>
          <p className={styles.deck}>{t.deck}</p>
          <p className={styles.thesis}>{t.thesis}</p>
          <p className={styles.thesisSub}>{t.thesisSub}</p>
        </header>

        {/* ── O argumento ──────────────────────────────────────────────── */}
        <section className={styles.section} aria-labelledby="hosp-argument">
          <h2 id="hosp-argument" className={styles.sectionTitle}>
            {t.argumentTitle}
          </h2>
          <div className={styles.argumentGrid}>
            {t.argument.map((item) => (
              <div key={item.n} className={styles.argumentCard}>
                <span className={styles.argumentN}>{item.n}</span>
                <h3 className={styles.argumentTitle}>{item.title}</h3>
                <p className={styles.argumentBody}>{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── A prova: as catorze fotos ────────────────────────────────────
               A ordem é a de decisão do hóspede (chegada, espaço, gente,
               noite), não a de captura — ver a nota em `SHOTS`.

               `priority` só na primeira: ela é a capa da seção e a única acima
               da dobra em qualquer tela. As outras treze carregam preguiçosas,
               que é o padrão do next/image e é o que mantém a página leve com
               5,5 MB de foto no diretório. */}
        <section className={styles.section} aria-labelledby="hosp-gallery">
          <h2 id="hosp-gallery" className={styles.sectionTitle}>
            {t.galleryTitle}
          </h2>
          <p className={styles.sectionDeck}>{t.galleryDeck}</p>

          <div className={styles.gallery}>
            {SHOTS.map((shot, i) => (
              <figure key={shot.src} className={styles.shot}>
                <Image
                  src={shot.src}
                  alt={shot.alt[lang]}
                  width={shot.w}
                  height={shot.h}
                  priority={i === 0}
                  // A primeira sangra a largura toda no desktop (ver o CSS);
                  // as demais ocupam metade a partir de 768px.
                  sizes={
                    i === 0
                      ? '(min-width: 1024px) 1100px, 100vw'
                      : '(min-width: 768px) 50vw, 100vw'
                  }
                  className={styles.shotImg}
                />
                <figcaption className={styles.shotRole}>
                  <strong>{t.roleLabel}</strong>
                  {shot.role[lang]}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ── O que é o trabalho ───────────────────────────────────────── */}
        <section className={styles.section} aria-labelledby="hosp-deliver">
          <h2 id="hosp-deliver" className={styles.sectionTitle}>
            {t.deliverableTitle}
          </h2>
          <ul className={styles.deliverList} role="list">
            {t.deliverables.map((d) => (
              <li key={d.title}>
                <h3 className={styles.deliverTitle}>{d.title}</h3>
                <p className={styles.deliverBody}>{d.body}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Fecho ────────────────────────────────────────────────────── */}
        <section className={styles.cta} aria-labelledby="hosp-cta">
          <h2 id="hosp-cta" className={styles.sectionTitle}>
            {t.ctaTitle}
          </h2>
          <p className={styles.sectionDeck}>{t.ctaBody}</p>
          <div className={styles.ctaRow}>
            <Link href={path('/access')} className="btn btn--primary">
              {t.ctaButton} &#8594;
            </Link>
            <a href={`mailto:${t.ctaMail}`} className={styles.ctaMail}>
              {t.ctaMail}
            </a>
          </div>
          <p className={styles.clientNote}>{t.clientNote}</p>
        </section>
      </div>
    </main>
  )
}
