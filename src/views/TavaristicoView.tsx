// Índice do portfólio do Felipe Tavares (Tavarístico). Uma página, dois
// idiomas: o cromo (rótulos, bio, contato) vem do dicionário; nomes de
// projeto, cliente e obra continuam em `_data.ts` sem tradução (ver
// src/content/i18n/pages/tavaristico.ts). Ver src/content/i18n/README.md.
//
// CREATOR PAGE 2.0 (redesign a partir do briefing "TAVARÍSTICO / CREATOR PAGE
// 2.0", CHANGES/TAVARÍSTICO.md, com 7 correções de leitura visual do fundador
// em 09/09/2026). Ordem da página: hero (avatar redondo + nome, sem eyebrow),
// Selected Work hierárquico (VENTURES), Campaigns em formato de stories
// (CAMPAIGNS + StoryDeck), intro/statement, a galeria de trabalhos de
// publicidade que já existia, What I Build, About, Currently Exploring e um
// fechamento próprio. O trabalho vem antes da declaração ("I build things").
// O nav e o footer globais do site, que já envolvem toda página, não são
// tocados aqui: são cromo compartilhado, fora do escopo de arquivos desta
// leva.

import {
  IDENTITY,
  DISCIPLINES,
  WORKS,
  VENTURES,
  CAMPAIGNS,
  BUILD_PILLARS,
  EXPLORING,
} from '@/app/(en)/creators/tavaristico/_data'
import { MasonryGallery } from '@/app/(en)/creators/tavaristico/MasonryGallery'
import styles from '@/app/(en)/creators/tavaristico/tavaristico.module.css'
import { tavaristico } from '@/content/i18n/pages/tavaristico'
import { TbfLink as Link } from '@/components/TbfLink/TbfLink'
import { RevealWrapper } from '@/components/RevealWrapper/RevealWrapper'
import { Ticker } from '@/components/Ticker/Ticker'
import { SocialIcons, type SocialLink } from '@/components/tavaristico/SocialIcons'
import { SelectedWork } from '@/components/tavaristico/SelectedWork'
import { Campaigns } from '@/components/tavaristico/Campaigns'
import { WhatIBuild } from '@/components/tavaristico/WhatIBuild'
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

  const explorerSegments = EXPLORING.map((label) => ({ text: label, weight: 'medium' as const }))
  const nameParts = IDENTITY.name.split(' ')

  return (
    <main className={styles.page}>
      {/* HERO, parte 07 do briefing + correção 09/09/2026: sem eyebrow, avatar
          redondo na mesma linha do nome, localização em frase única. */}
      <header className={`${styles.hero} container`}>
        <div className={styles.heroTop}>
          {/* Retrato enviado pelo fundador em 09/09/2026, agora avatar
              redondo. Prioridade alta: é a primeira imagem da página, entra
              no LCP do mobile. */}
          <div className={styles.heroAvatar}>
            <Image
              src="/images/creators/tavaristico-portrait.webp"
              alt={`${IDENTITY.name}, ${IDENTITY.alias}`}
              fill
              priority
              sizes="96px"
            />
          </div>
          <h1 className={styles.heroName}>
            <span className={styles.heroNameLine}>{nameParts[0]}</span>{' '}
            <span className={styles.heroNameLine}>{nameParts.slice(1).join(' ')}</span>
          </h1>
        </div>
        <p className={styles.heroAlias}>
          {t.index.akaPrefix} <b>{IDENTITY.alias}</b>
        </p>
        <p className={styles.heroRole}>{t.index.role}</p>
        <p className={styles.heroStatement}>{t.index.heroStatement}</p>
        <p className={styles.heroLocation}>{t.index.location}</p>
        <SocialIcons links={socialLinks} className={styles.heroSocial} />
      </header>

      {/* SELECTED WORK, partes 10 e 11: peças editoriais com hierarquia, não
          grade uniforme. Correção 09/09/2026: o trabalho vem antes da
          declaração ("I build things"). */}
      <section className={`${styles.selectedWork} container`} id="selected-work">
        <span className={styles.label}>{t.index.selectedWorkLabel}</span>
        <SelectedWork ventures={VENTURES} lang={lang} />
      </section>

      {/* CAMPAIGNS, partes 12, 13 e 14: lógica de stories navegável, sobre
          material real (Ô: 18 Years). */}
      <RevealWrapper as="section" className={`${styles.campaignsSection} container`} variant="card">
        <span className={styles.label}>{t.index.campaignsLabel}</span>
        <Campaigns
          campaigns={CAMPAIGNS}
          lang={lang}
          label={t.index.campaignsLabel}
          caseLabel={t.index.campaignsCaseLabel}
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

      {/* ABOUT, parte 16: curto. */}
      <section className={`${styles.about} container`} id="about">
        <span className={styles.label}>{t.index.aboutLabel}</span>
        <p className={styles.aboutHeadline}>{t.index.aboutHeadline}</p>
        <p className={styles.aboutBody}>{t.index.aboutBody}</p>
        <p className={styles.aboutLocation}>{t.index.location}</p>
      </section>

      {/* CURRENTLY EXPLORING, parte 17: movimento horizontal, reaproveitando
          o letreiro que já existe no site. */}
      <section className={styles.exploring} aria-label={t.index.exploringLabel}>
        <span className={`${styles.label} container`}>{t.index.exploringLabel}</span>
        <Ticker text={explorerSegments} sticky={false} className={styles.exploringTicker} />
      </section>

      {/* CONTATO / FECHAMENTO, parte 18 no nível da página: o footer global
          do site continua fora deste arquivo. */}
      <section className={`${styles.contact} container`} id="contact">
        <span className={styles.label}>{t.index.contactLabel}</span>
        <p className={styles.contactName}>{t.index.contactHeadline}</p>
        <SocialIcons links={socialLinks} className={styles.contactSocial} />
        <div className={styles.links}>
          <span className={styles.link}>{t.index.representedByPrefix} {IDENTITY.representedBy}</span>
        </div>
      </section>

      {/* PROPOSTA DE HOSPEDAGEM.
             A entrada para /creators/tavaristico/hospitality (#01 CHANGES
             2026-08-14). Fica depois do contato, e fora da vitrine de obras,
             porque não é obra: a vitrine olha para trás, a proposta olha para
             frente. Posta entre os cases, ela seria lida como mais um deles. */}
      <section className={`${styles.contact} container`}>
        <span className={styles.label}>{t.index.hospitalityKicker}</span>
        <Link href={localizedPath('/creators/tavaristico/hospitality', lang)} className={styles.contactName}>
          {t.index.hospitalityLabel}
        </Link>
      </section>
    </main>
  )
}
