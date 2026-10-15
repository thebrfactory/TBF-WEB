// =============================================================================
// POLÍTICA DE PRIVACIDADE: serve `/legal/privacy` (inglês) e `/pt/legal/privacy` (português)
// Texto em src/content/i18n/pages/legal-privacy.ts. Seções numeradas pela posição.
// =============================================================================

import { legalPrivacy } from '@/content/i18n/pages/legal-privacy'
import type { Lang } from '@/lib/i18n'
import s from './LegalPrivacyView.module.css'

export default function LegalPrivacyView({ lang }: { lang: Lang }) {
  const t = legalPrivacy[lang]
  const last = t.sections.length - 1

  return (
    <div className={s.page}>
      <div className={`container ${s.wrap}`}>
        <span className={s.tag}>{t.tag}</span>
        <h1 className={s.title}>{t.title}</h1>
        <p className={s.updated}>
          {t.updatedLabel}: {t.updatedDate}
        </p>

        <p className={`${s.body} ${s.lead}`}>
          <span className={s.strong}>{t.introOrg}</span> {t.introText[0]}{' '}
          <span className={s.strong}>{t.lgpdFull}</span> {t.introText[1]}
        </p>

        {t.sections.map((sec, i) => (
          <section key={sec.title} id={sec.id} className={s.section}>
            <h2 className={s.h2}>
              <span className={s.num}>{i + 1}.</span>
              {sec.title}
            </h2>

            {sec.intro?.map((p) => (
              <p key={p} className={s.body}>
                {p}
              </p>
            ))}

            {sec.items && (
              <ul className={s.list}>
                {sec.items.map((it) => (
                  <li key={it.label} className={s.item}>
                    <span className={s.itemLabel}>{it.label}</span>
                    {it.text}
                  </li>
                ))}
              </ul>
            )}

            {sec.outro?.map((p) => (
              <p key={p} className={s.body}>
                {p}
              </p>
            ))}

            {i === last && (
              <p className={s.body}>
                <a href={`mailto:${t.email}`} className={s.link}>
                  {t.email}
                </a>
                <br />
                {t.addressBlock[0]}
                <br />
                {t.addressBlock[1]}
                <br />
                {t.addressBlock[2]}
              </p>
            )}
          </section>
        ))}
      </div>
    </div>
  )
}
