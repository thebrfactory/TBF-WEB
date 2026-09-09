// =============================================================================
// NEXT READ, correção 09/09/2026 (item 11 do laudo visual do fundador)
// -----------------------------------------------------------------------------
// O bloco "ALSO AVAILABLE / Photography for hostels..." existia como um link
// solto (styles.contact + styles.contactName), com leitura de banner de
// marketing. O fundador pediu o gesto de "próxima leitura" de fim de artigo:
// referências dadas por ele foram "Escolhas do Editor" (Forbes) e "Posts
// relacionados" (MacMagazine): kicker discreto, um único card com imagem,
// título e uma linha de apoio, sem cara de anúncio. CSS próprio
// (NextRead.module.css), porque o gesto não se parece com nenhuma outra
// seção da página.
// =============================================================================

import Image from 'next/image'
import { TbfLink as Link } from '@/components/TbfLink/TbfLink'
import styles from './NextRead.module.css'

// Correcao 09/09/2026 (print do fundador): o rotulo do CTA vira "VISIT →"
// / "VISITAR →". A chave de i18n de verdade fica em
// `src/content/i18n/pages/tavaristico.ts`, que esta em edicao paralela por
// outro executor (arquivo proibido nesta tarefa). Por isso o dicionario
// mora aqui, local, e a prop `cta` que chega de fora e ignorada. Quando o
// arquivo de traducao estiver livre, essa chave pode absorver este valor
// e este dicionario local sai.
const CTA_LABEL: Record<'en' | 'pt', string> = {
  en: 'VISIT',
  pt: 'VISITAR',
}

export function NextRead({
  kicker,
  title,
  support,
  cta: _cta,
  href,
  imageSrc,
  imageAlt,
  lang = 'en',
}: {
  kicker: string
  title: string
  support: string
  /** Ignorado de proposito: ver CTA_LABEL acima. Mantido na assinatura pra
   *  nao quebrar a chamada existente em TavaristicoView.tsx. */
  cta: string
  href: string
  imageSrc: string
  imageAlt: string
  /** Sem chave de i18n disponivel pra isso ainda, default 'en' cobre quem
   *  chama sem passar lang. */
  lang?: 'en' | 'pt'
}) {
  return (
    <div className={styles.nextRead}>
      <span className={styles.kicker}>{kicker}</span>
      <Link href={href} className={styles.card}>
        <div className={styles.media}>
          <Image src={imageSrc} alt={imageAlt} fill sizes="(min-width: 900px) 320px, 100vw" />
        </div>
        <div className={styles.body}>
          <span className={styles.title}>{title}</span>
          <span className={styles.support}>{support}</span>
          <span className={styles.cta}>{CTA_LABEL[lang]} →</span>
        </div>
      </Link>
    </div>
  )
}
