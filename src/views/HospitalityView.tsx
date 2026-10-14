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
// server component, zero JavaScript de cliente (exceto a galeria em tela cheia, GalleryScope).
// =============================================================================

import Image from 'next/image'
import Link from 'next/link'
import { hospitality, SHOTS, HIGHLIGHTS, HIGHLIGHT_PROFILE } from '@/content/i18n/pages/hospitality'
import { GalleryScope } from '@/components/gallery'
import { StoryPlayer, MediaBelt } from '@/components/StoryPlayer/StoryPlayer'
import { localizedPath, type Lang } from '@/lib/i18n'
import styles from './HospitalityView.module.css'

const LIGHTBOX_LABELS = {
  en: { close: 'Close', prev: 'Previous photo', next: 'Next photo', dialog: 'Photo gallery' },
  pt: { close: 'Fechar', prev: 'Foto anterior', next: 'Próxima foto', dialog: 'Galeria de fotos' },
}

export default function HospitalityView({ lang }: { lang: Lang }) {
  const t = hospitality[lang]
  const path = (p: string) => localizedPath(p, lang)
  // Toda foto da proposta, do carrossel e da galeria, abre em tela cheia.
  const lightboxItems = SHOTS.map((s) => ({ src: s.src, alt: s.alt[lang], w: s.w, h: s.h }))

  return (
    <main className={styles.page}>
      {/* ── O REEL, ANTES DE QUALQUER PALAVRA ──────────────────────────────
             Pedido do fundador: as imagens entram em evidência logo de cara.
             Fora do `.container` de propósito, para correr de ponta a ponta.
             Ver `.reel` no CSS para o porquê da velocidade. */}
      <div className="container">
        {/* Link simples do Next: abre na mesma guia, sem o ↗ de guia nova (12/10/2026). */}
        <Link href={path('/creators/tavaristico')} className={styles.crumb}>
          {t.crumb}
        </Link>
      </div>

      <GalleryScope items={lightboxItems} labels={LIGHTBOX_LABELS[lang]}>
        <MediaBelt
          className={styles.reel}
          items={SHOTS.map((shot) => ({
            src: shot.src,
            alt: shot.alt[lang],
            role: shot.role[lang],
          }))}
          label={t.reelLabel}
        />
      </GalleryScope>
      <p className={styles.reelLabel}>{t.reelLabel}</p>

      <div className="container">
        {/* ── Abertura ─────────────────────────────────────────────────── */}
        <header className={styles.hero}>
          <p className={styles.eyebrow}>{t.eyebrow}</p>
          {/* Quebra forçada depois de "Ô De Casa!" em todos os viewports (12/10/2026). */}
          <h1 className={styles.title}>
            {t.title.split('! ')[0]}!<br />
            {t.title.split('! ').slice(1).join('! ')}
          </h1>
          <p className={styles.deck}>{t.deck}</p>
          <p className={styles.thesis}>{t.thesis}</p>
          <p className={styles.thesisSub}>{t.thesisSub}</p>
        </header>

        {/* ── O argumento, ao lado do anúncio rodando ──────────────────────
               Pedido do fundador (2026-08-14): aqui entra o story com as
               miniaturas grandes, na mesma lógica da cena 05 do deck, e os
               quatro quadros ficam AO LADO.

               A composição faz o argumento sozinha, e é por isso que ela é
               melhor do que as duas seções separadas que existiam antes: à
               esquerda, o que os motores de reserva premiam, escrito; à
               direita, o perfil do Ô de Casa provando cada um dos quatro
               pontos, quadro por quadro, clicável. O leitor confere a tese
               contra a prova sem rolar a página.

               As miniaturas comandam o quadro grande: ver o cabeçalho do
               StoryDeck. */}
        <section className={styles.section} aria-labelledby="hosp-argument">
          <h2 id="hosp-argument" className={styles.sectionTitle}>
            {t.argumentTitle}
          </h2>
          <p className={styles.sectionDeck}>{t.listingDeck}</p>

          <div className={styles.argumentSplit}>
            <div className={styles.argumentGrid}>
              {t.argument.map((item) => (
                <div key={item.n} className={styles.argumentCard}>
                  <span className={styles.argumentN}>{item.n}</span>
                  <h3 className={styles.argumentTitle}>{item.title}</h3>
                  <p className={styles.argumentBody}>{item.body}</p>
                </div>
              ))}
            </div>

            <div className={styles.listingStory}>
              <StoryPlayer
                variant="inline"
                thumbs
                lang={lang}
                label={t.listingTitle}
                groups={[
                  {
                    id: 'destaques',
                    handle: HIGHLIGHT_PROFILE.handle,
                    avatarSrc: HIGHLIGHT_PROFILE.avatar,
                    items: HIGHLIGHTS.map((h) => ({
                      src: h.src,
                      alt: h.alt[lang],
                      role: h.role[lang],
                    })),
                  },
                ]}
              />
            </div>
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

          {/* SEM LEGENDA (pedido do fundador 2026-08-14: "pode tirar as
              descrições das fotos"). A função de cada quadro continua no dado e
              continua no `alt`, que é onde ela serve a quem não vê a imagem.
              Numa página cujo produto É a fotografia, rótulo embaixo de cada
              foto disputa atenção com a foto. */}
          <GalleryScope items={lightboxItems} labels={LIGHTBOX_LABELS[lang]}>
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
              </figure>
            ))}
          </div>
          </GalleryScope>
        </section>

        {/* A SEÇÃO SEPARADA "E aí vira anúncio" FOI ABSORVIDA pelo bloco do
            argumento, acima (2026-08-14). Ela mostrava o mesmo story dos
            destaques numa seção própria, duas dobras depois da tese que ele
            prova. Colado ao lado dos quatro quadros, o material passa a
            responder à tese na mesma tela, que é o que ele estava pedindo. */}

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
