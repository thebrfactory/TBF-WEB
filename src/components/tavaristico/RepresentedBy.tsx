// Assinatura da casa no hero e no contato do Tavarístico: selo redondo mais
// o texto ao lado, no gesto do AuthorSignature (referência Forbes Life), em
// versão discreta.
//
// Correção 09/09/2026 (rodada 2): o cargo e a representação viraram UMA linha
// só, texto exato pedido pelo fundador. `withRole` liga o cargo; o bloco de
// contato usa o componente sem ele, só com a representação.

import Image from 'next/image'
import type { Lang } from '@/lib/i18n'
import styles from '@/app/(en)/creators/tavaristico/tavaristico.module.css'

// Escrito já na caixa final: o CSS não pode uppercasear, senão o naming vira
// ".TBF. INC" e a regra de naming da casa quebra.
const LABEL: Record<Lang, string> = {
  en: 'REPRESENTED BY .TBF. inc',
  pt: 'REPRESENTADO POR .TBF. inc',
}

const LABEL_WITH_ROLE: Record<Lang, string> = {
  en: 'CREATIVE DIRECTOR REPRESENTED BY .TBF. inc',
  pt: 'CREATIVE DIRECTOR REPRESENTADO POR .TBF. inc',
}

export function RepresentedBy({ lang, withRole = false }: { lang: Lang; withRole?: boolean }) {
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
      <span className={styles.representedByLabel}>
        {(withRole ? LABEL_WITH_ROLE : LABEL)[lang]}
      </span>
    </div>
  )
}
