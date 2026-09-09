// Assinatura "Represented by .TBF. inc" no hero do Tavarístico. Mesmo gesto do
// AuthorSignature (src/components/scrolly/AuthorSignature.tsx: círculo com a
// marca + nome ao lado, referência Forbes Life), em versão mais discreta:
// círculo menor, texto menor, cor secundária. Não reusa o componente nem o
// scrolly.css (fora do escopo desta leva), só se inspira no gesto.

import Image from 'next/image'
import type { Lang } from '@/lib/i18n'
import styles from '@/app/(en)/creators/tavaristico/tavaristico.module.css'

const LABEL: Record<Lang, string> = {
  // Escrito ja na caixa final: o CSS nao pode uppercasear, senao o naming
  // vira ".TBF. INC" e a regra de naming da casa quebra.
  en: 'REPRESENTED BY .TBF. inc',
  pt: 'REPRESENTADO POR .TBF. inc',
}

export function RepresentedBy({ lang }: { lang: Lang }) {
  return (
    <div className={styles.representedBy}>
      <Image
        className={styles.representedByAvatar}
        src="/brand/TBF-AVATAR.webp"
        alt=""
        width={32}
        height={32}
        aria-hidden="true"
      />
      <span className={styles.representedByLabel}>{LABEL[lang]}</span>
    </div>
  )
}
