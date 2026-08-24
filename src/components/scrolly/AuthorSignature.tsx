// =============================================================================
// AuthorSignature, server component.
// Assinatura discreta abaixo de titulo e subtitulo, pedido do fundador em #01
// CHANGES 2026-08-24. Referencia: Forbes Life ("F / Redacao Forbes"), circulo
// escuro com inicial e nome ao lado, em duas linhas.
//
// DECISAO: os assets de public/brand/ (MONOGRAM-01/02, BRAND-ASSET-*,
// 01ST-LABEL-TBF, LOGOTYPE) sao todos artes de pagina inteira em proporcao A4
// (viewBox 595x842), pensadas para poster/impresso, nao para icone pequeno.
// Nenhum se recorta bem num circulo de 32px sem distorcer a marca. Por isso o
// circulo usa a inicial em texto, como a propria referencia da Forbes faz. Se
// nascer um monograma quadrado dedicado a icone, trocar aqui e so aqui.
//
// Nao inventa nome de pessoa: "Redacao .TBF." em pt, ".TBF. Editorial" em en,
// por pedido explicito do fundador. Componente reutilizavel (ele pediu "pode
// testar em outros lugares tambem"), mas por ora so entra dentro do
// HeroCinema.
// =============================================================================

import type { Lang } from '@/lib/i18n'

interface AuthorSignatureProps {
  lang: Lang
}

const BYLINE: Record<Lang, string> = {
  pt: 'Redação .TBF.',
  en: '.TBF. Editorial',
}

export function AuthorSignature({ lang }: AuthorSignatureProps) {
  return (
    <div className="scrolly-signature">
      <span className="scrolly-signature__avatar" aria-hidden="true">T</span>
      <span className="scrolly-signature__name">{BYLINE[lang]}</span>
    </div>
  )
}
