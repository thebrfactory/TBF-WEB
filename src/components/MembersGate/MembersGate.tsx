'use client'

// =============================================================================
// MembersGate: a porta fechada de /shop, /talks e /agency
// Ainda não existe sistema de membros. O LOGIN não autentica: abre, no próprio
// lugar, o aviso de que a entrada é por convite, com o caminho para /access.
// Quando o login existir, troca-se o botão por um link; a página não muda.
// =============================================================================

import { useId, useState } from 'react'
import Link from 'next/link'
import { membersGate, type GateArea } from '@/content/i18n/pages/members-gate'
import { localizedPath, type Lang } from '@/lib/i18n'
import styles from './MembersGate.module.css'

export function MembersGate({ area, lang }: { area: GateArea; lang: Lang }) {
  const t = membersGate[lang]
  const a = t.areas[area]
  const [open, setOpen] = useState(false)
  const noticeId = useId()

  return (
    <section className={styles.gate} aria-label={t.roomLabel}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner}>
        <h1 className={styles.name}>{a.name}</h1>
        <p className={styles.line}>{a.line}</p>

        <button
          type="button"
          className="btn"
          aria-expanded={open}
          aria-controls={noticeId}
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="4" y="11" width="16" height="10" rx="2" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
          </svg>
          {t.login}
        </button>

        <p className={styles.note}>{t.membersOnly}</p>

        <p id={noticeId} className={styles.notice} role="status" hidden={!open}>
          {t.notice}{' '}
          <Link href={localizedPath('/access', lang)} className={styles.noticeLink}>
            {t.noticeLink}
          </Link>
        </p>
      </div>
    </section>
  )
}
