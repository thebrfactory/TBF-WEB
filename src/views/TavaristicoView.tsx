// Índice do portfólio do Felipe Tavares (Tavarístico). Uma página, dois
// idiomas: o cromo (rótulos, bio, contato) vem do dicionário; nomes de
// projeto, cliente e obra continuam em `_data.ts` sem tradução (ver
// src/content/i18n/pages/tavaristico.ts). Ver src/content/i18n/README.md.
//
// CREATOR PAGE 2.0 (redesign a partir do briefing "TAVARÍSTICO / CREATOR PAGE
// 2.0", CHANGES/TAVARÍSTICO.md, com 11 correções de leitura visual do
// fundador em 09/09/2026, em cima de prints). Ordem da página: capa quadrada
// dentro do container + avatar redondo e nome (sem eyebrow), A.K.A. e o
// lockup "represented by" (com o cargo), Selected Work hierárquico
// (VENTURES), Campaigns em formato de stories (CAMPAIGNS + StoryDeck),
// intro/statement, a galeria de trabalhos de publicidade que já existia,
// What I Build, Currently Exploring, About, Contato (fecha com o mesmo
// lockup) e a proposta de hospedagem em formato de "próxima leitura"
// (NextRead). O trabalho vem antes da declaração ("I build things"). O nav e
// o footer globais do site, que já envolvem toda página, não são tocados
// aqui: são cromo compartilhado, fora do escopo de arquivos desta leva.

import {
  IDENTITY,
  DISCIPLINES,
  WORKS,
  VENTURES,
  CAMPAIGNS,
  BUILD_PILLARS,
  EXPLORING,
  CAREER,
} from '@/app/(en)/creators/tavaristico/_data'
import { MasonryGallery } from '@/app/(en)/creators/tavaristico/MasonryGallery'
import styles from '@/app/(en)/creators/tavaristico/tavaristico.module.css'
import { tavaristico } from '@/content/i18n/pages/tavaristico'
import { RevealWrapper } from '@/components/RevealWrapper/RevealWrapper'
import { Ticker } from '@/components/Ticker/Ticker'
import { SocialIcons, type SocialLink } from '@/components/tavaristico/SocialIcons'
import { SelectedWork } from '@/components/tavaristico/SelectedWork'
import { Campaigns } from '@/components/tavaristico/Campaigns'
import { WhatIBuild } from '@/components/tavaristico/WhatIBuild'
import { RepresentedBy } from '@/components/tavaristico/RepresentedBy'
import { NextRead } from '@/components/tavaristico/NextRead'
import { localizedPath, type Lang } from '@/lib/i18n'
import Image from 'next/image'

export default function TavaristicoView({ lang }: { lang: Lang }) {
  const t = tavaristico[lang]

  const socialLinks: SocialLink[] = [
    { key: 'instagram', href: IDENTITY.socials.instagram, label: t.index.instagramLabel },
    { key: 'linkedin', href: IDENTITY.socials.linkedin, label: t.index.linkedinLabel },
    { key: 'email', href: 'mailto:tavaristico@thebrfactory.com', label: t.index.emailLabel },
    { key: 'github', href: IDENTITY.socials.github, label: t.index.githubLabel },
  ]

  // Correção 09/09/2026, item 9: interpunct "·" entre cada competência do
  // letreiro. Sem ele as palavras corriam coladas e o fundador achou
  // "confuso": o ticker não separa segmento por conta própria (ver
  // Ticker.tsx, comentário "SEM SEPARADOR ENTRE OS SEGMENTOS", regra do
  // letreiro da casa), então o ponto entra aqui como um segmento a mais.
  const explorerSegments = EXPLORING.flatMap((label, i) => {
    const item = { text: label, weight: 'medium' as const }
    return i === 0 ? [item] : [{ text: '·', weight: 'book' as const }, item]
  })

  return (
    <main className={styles.page}>
      {/* HERO, parte 07 do briefing + correção 09/09/2026: sem eyebrow, avatar
          redondo na mesma linha do nome (também no mobile, gesto de perfil de
          Instagram), sobreposto à borda inferior da capa, localização em duas
          linhas. Correção 09/09/2026, item 1: a capa entrou para DENTRO do
          container (não sangra mais até a borda da tela), quadrada, vídeo
          inteiro visível. */}
      <header className={`${styles.hero} container`}>
        {/* CAPA: o vídeo é quadrado de origem (900x900). object-fit: contain
            garante que ele aparece inteiro, sem corte (ver comentário em
            tavaristico.module.css .heroCover). Poster de fallback e quadro
            único sob prefers-reduced-motion continuam. */}
        {/* CAPA: o vídeo é quadrado de origem (900x900), aparece inteiro.
            Correção 09/09/2026 (rodada 2): o bloco avatar + nome + A.K.A.
            passou para DENTRO do quadrado, sobre um degradê preto que sobe da
            base. É o degradê que dá a perspectiva e garante a leitura do
            texto sobre qualquer quadro do vídeo. */}
        <div className={styles.heroCover}>
          <video
            className={styles.heroCoverMedia}
            poster="/images/creators/tavaristico-cover-poster.webp"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src="/videos/tavaristico-cover.mp4" type="video/mp4" />
          </video>
          <div className={styles.heroCoverFade} />

          <div className={styles.heroTop}>
            {/* Avatar redondo com anel branco: separa a foto do vídeo atrás.
                Prioridade alta, é o LCP do mobile. */}
            <div className={styles.heroAvatar}>
              <Image
                src="/images/creators/tavaristico-portrait.webp"
                alt={`${IDENTITY.name}, ${IDENTITY.alias}`}
                fill
                priority
                sizes="96px"
              />
            </div>
            <div className={styles.heroIdentity}>
              <h1 className={styles.heroName}>{IDENTITY.name}</h1>
              <p className={styles.heroAlias}>
                {t.index.akaPrefix} {IDENTITY.alias}
              </p>
            </div>
          </div>
        </div>

        {/* COLUNA DE TEXTO. No desktop ela ocupa a outra metade da tela, ao
            lado do quadrado (pedido do fundador). No mobile continua
            empilhada embaixo da capa. */}
        <div className={styles.heroBody}>
          {/* Correção 10/09/2026 (rodada 7): a coluna virou DOIS grupos. Em
              cima a entrada no contraste da referência que ele mandou (bold
              caixa alta + thin minúsculo embaixo); embaixo o lockup
              "represented by" colado na linha de localização, que era onde
              ele queria ver o cargo. */}
          <div className={styles.heroBodyMiddle}>
            <div>
              <p className={styles.heroHeadline}>{t.index.heroHeadline}</p>
              <p className={styles.heroStatement}>{t.index.heroStatement}</p>
            </div>

            <div className={styles.heroCredit}>
              <RepresentedBy lang={lang} withRole />
              {/* Localização em uma linha, mesma fonte e mesmo tamanho da linha
                  do lockup acima, e alinhada com o texto dele (por isso o recuo
                  da largura do selo). */}
              <p className={styles.heroLocation}>
                {t.index.locationCity} {t.index.locationOrigin}
              </p>
            </div>
          </div>

          <SocialIcons links={socialLinks} className={styles.heroSocial} />
        </div>
      </header>

      {/* SELECTED WORK, partes 10 e 11: peças editoriais com hierarquia, não
          grade uniforme. Correção 09/09/2026: o trabalho vem antes da
          declaração ("I build things"). */}
      <section className={`${styles.selectedWork} container`} id="selected-work">
        <span className={styles.label}>{t.index.selectedWorkLabel}</span>
        <SelectedWork ventures={VENTURES} lang={lang} />
      </section>

      {/* CAMPAIGNS, partes 12, 13 e 14: lógica de stories navegável, sobre
          material real (Ô: 18 Years). Correção 09/09/2026, item 6: o convite
          entra no próprio título, em itálico e no peso mais fino da família,
          e sai do componente (inviteLabel=""). */}
      <RevealWrapper as="section" className={`${styles.campaignsSection} container`} variant="card">
        <span className={styles.label}>
          {t.index.campaignsLabel} <em className={styles.labelEm}>{t.index.campaignsParenthetical}</em>
        </span>
        <Campaigns
          campaigns={CAMPAIGNS}
          lang={lang}
          label={t.index.campaignsLabel}
          caseLabel={t.index.campaignsCaseLabel}
          inviteLabel=""
        />
      </RevealWrapper>

      {/* INTRO / STATEMENT, parte 09: curto, sem manifesto. */}
      <RevealWrapper as="section" className={`${styles.intro} container`} variant="headline">
        <p className={styles.introHeadline}>{t.index.introHeadline}</p>
        <p className={styles.introStatement}>{t.index.introStatement}</p>
      </RevealWrapper>

      {/* GALERIA: o corpo de trabalho de publicidade e direção de arte, prova
          do território que a Selected Work já apresentou acima. */}
      <section className={`${styles.worksSection} container`} id="work">
        <span className={styles.label}>{t.index.workLabel}</span>
        <MasonryGallery works={WORKS} disciplines={DISCIPLINES} />
      </section>

      {/* WHAT I BUILD, parte 15: sistema visual, não lista de skills. */}
      <RevealWrapper as="section" className={`${styles.whatIBuildSection} container`} variant="card">
        <span className={styles.label}>{t.index.whatIBuildLabel}</span>
        <WhatIBuild pillars={BUILD_PILLARS} lang={lang} />
      </RevealWrapper>

      {/* CURRENTLY EXPLORING, parte 17: movimento horizontal, reaproveitando
          o letreiro que já existe no site. Correção 09/09/2026, item 9: vem
          ANTES de About agora. */}
      <section className={styles.exploring} aria-label={t.index.exploringLabel}>
        <span className={`${styles.label} container`}>{t.index.exploringLabel}</span>
        <Ticker text={explorerSegments} sticky={false} className={styles.exploringTicker} />
      </section>

      {/* ABOUT, parte 16: curto. Correção 09/09/2026, item 8: a frase de
          localização saiu (mora só no hero agora, .heroLocation). */}
      {/* Correção 10/09/2026 (rodada 8): a carreira entra AO LADO do About,
          pedido dele. As dez posições vêm do LinkedIn (ver CAREER em _data.ts,
          que carrega a procedência). No mobile a coluna desce para baixo do
          texto, que é a ordem de leitura certa: primeiro quem ele é, depois
          por onde passou. */}
      <section className={`${styles.about} container`} id="about">
        <div className={styles.aboutText}>
          <span className={styles.label}>{t.index.aboutLabel}</span>
          <p className={styles.aboutHeadline}>{t.index.aboutHeadline}</p>
          <p className={styles.aboutBody}>{t.index.aboutBody}</p>
        </div>

        <div className={styles.career}>
          <span className={styles.label}>{t.index.careerLabel}</span>
          <ul className={styles.careerList}>
            {CAREER.map((job) => (
              <li key={`${job.org}-${job.role}`} className={styles.careerItem}>
                {/* O ponto e decoracao da linha do tempo: quem le por leitor de
                    tela ja tem periodo, cargo e empresa em texto. */}
                <span className={styles.careerDot} aria-hidden="true" />
                <span className={styles.careerPeriod}>
                  {lang === 'pt' ? job.periodPT : job.periodEN}
                </span>
                <span className={styles.careerRole}>{job.role}</span>
                <span className={styles.careerOrg}>
                  {job.org}
                  {job.city ? <span className={styles.careerCity}>{job.city}</span> : null}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CONTATO / FECHAMENTO, parte 18 no nível da página: o footer global
          do site continua fora deste arquivo. Correção 09/09/2026, item 10:
          o lockup RepresentedBy (selo redondo) fecha a seção, no lugar do
          texto solto de antes. */}
      <section className={`${styles.contact} container`} id="contact">
        <span className={styles.label}>{t.index.contactLabel}</span>
        <p className={styles.contactName}>{t.index.contactHeadline}</p>
        <SocialIcons links={socialLinks} className={styles.contactSocial} />
        <div className={styles.contactRepresented}>
          <RepresentedBy lang={lang} />
        </div>
      </section>

      {/* PROPOSTA DE HOSPEDAGEM, correção 09/09/2026, item 11: virou um card
          de "próxima leitura" (NextRead), referências do fundador foram a
          "Escolhas do Editor" da Forbes e "Posts relacionados" da
          MacMagazine, não mais um link solto com cara de banner. A entrada
          para /creators/tavaristico/hospitality (#01 CHANGES 2026-08-14)
          continua depois do contato, fora da vitrine de obras: a vitrine
          olha para trás, a proposta olha para frente. */}
      <section className="container">
        <NextRead
          lang={lang}
          kicker={t.index.hospitalityKicker}
          title={t.index.hospitalityLabel}
          support={t.index.hospitalitySupport}
          cta={t.index.hospitalityCta}
          href={localizedPath('/creators/tavaristico/hospitality', lang)}
          imageSrc="/images/creators/tavaristico/hospitality/08-area-externa.webp"
          imageAlt={t.index.hospitalityLabel}
        />
      </section>
    </main>
  )
}
