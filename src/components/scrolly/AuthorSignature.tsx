// =============================================================================
// AuthorSignature, server component.
// Assinatura discreta abaixo de titulo e subtitulo, pedido do fundador em #01
// CHANGES 2026-08-24. Referencia: Forbes Life ("F / Redacao Forbes"), circulo
// com a marca e o nome ao lado.
//
// 🔴 A IMAGEM E A FOTO DE PERFIL DO @thebrfactory (pedido dele, 2026-08-24:
// "preciso de uma imagem aqui, pode pegar o icone da foto de perfil do nosso
// instagram"). A primeira versao usava a inicial "T" em texto, porque os assets
// de public/brand/ sao todos arte de pagina inteira em proporcao A4 (viewBox
// 595x842), pensados para poster, e nenhum se recorta bem num circulo de 32px.
// A foto do perfil resolve isso: ela ja NASCE quadrada e ja e o rosto publico da
// marca, o mesmo que a pessoa ve no Instagram. Baixada do proprio perfil em
// 1000x1000 e guardada em /brand/TBF-AVATAR.webp a 320px.
//
// Nao inventa nome de pessoa: "Redacao .TBF." em pt, ".TBF. Editorial" em en,
// por pedido explicito do fundador. Componente reutilizavel (ele pediu "pode
// testar em outros lugares tambem"), mas por ora so entra dentro do HeroCinema.
// =============================================================================

import Image from 'next/image'
import type { Lang } from '@/lib/i18n'
import { ShareRow } from './ShareRow'

interface AuthorSignatureProps {
  lang: Lang
  /** Titulo da materia. Passado, a fileira de compartilhar entra na mesma linha. */
  shareTitle?: string
}

const BYLINE: Record<Lang, string> = {
  pt: 'Redação .TBF.',
  en: '.TBF. Editorial',
}

export function AuthorSignature({ lang, shareTitle }: AuthorSignatureProps) {
  return (
    <div className="scrolly-signature">
      <Image
        className="scrolly-signature__avatar"
        src="/brand/TBF-AVATAR.webp"
        alt=""
        width={64}
        height={64}
        aria-hidden="true"
      />
      <span className="scrolly-signature__name">{BYLINE[lang]}</span>

      {/* OS ICONES SOBEM PARA CA (2026-08-24: "eu nao vi os icones de rede
          social"). Eles existiam so no PE da materia, e materia longa e
          exatamente onde ninguem chega ao pe: ele mesmo nao achou. Na
          referencia da Forbes que ele mandou eles moram nesta linha, ao lado de
          quem assina, que e onde a pessoa ainda esta decidindo se compartilha.
          O do fim continua no lugar, para quem terminou de ler. */}
      {shareTitle && (
        <div className="scrolly-signature__share">
          <ShareRow title={shareTitle} variant="inline" />
        </div>
      )}
    </div>
  )
}
