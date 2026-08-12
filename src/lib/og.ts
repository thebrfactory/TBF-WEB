// Todo `openGraph` de página passa por aqui. O motivo é uma pegadinha do Next:
// declarar `openGraph` num segmento filho DESCARTA a imagem herdada do pai, e
// a página sai sem card social sem ninguém perceber. Centralizar a imagem aqui
// é o que impede a regressão de voltar.
export const OG_IMAGE_PATH = '/og'

export function openGraphMeta(o: { title: string; description: string }) {
  return {
    title: o.title,
    description: o.description,
    images: [{ url: OG_IMAGE_PATH, width: 1200, height: 630 }],
  }
}
