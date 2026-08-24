// Todo `openGraph` de página passa por aqui. O motivo é uma pegadinha do Next:
// declarar `openGraph` num segmento filho DESCARTA a imagem herdada do pai, e
// a página sai sem card social sem ninguém perceber. Centralizar a imagem aqui
// é o que impede a regressão de voltar.
//
// A imagem é ARTE, desenhada no Photoshop a partir de
// `1. TBF.COM/design/og-card/og-card_1200x630.psd`, e não mais o card gerado
// por código na rota `/og`. A rota continua de pé como gerador de reserva.
// A composição vive no quadrado central de 630px porque o WhatsApp, o Telegram
// e o preview pequeno do iMessage recortam o card no centro; a guia do quadrado
// está no `.psd`.
export const OG_IMAGE_PATH = '/images/og-card.jpg'

export function openGraphMeta(o: { title: string; description: string }) {
  return {
    title: o.title,
    description: o.description,
    images: [{ url: OG_IMAGE_PATH, width: 1200, height: 630 }],
  }
}
