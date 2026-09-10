// Rota `/pt/creators/tavaristico/works/[slug]` — português.
// A página em si vive em src/views/TavaristicoWorkView.tsx.
//
// generateStaticParams precisa existir NESTA árvore também — sem ele, o
// português não gera as páginas estáticas de obra (ver README.md §3).

import type { Metadata } from 'next'
import { WORKS, findWork } from '@/app/(en)/creators/tavaristico/_data'
import { tavaristico } from '@/content/i18n/pages/tavaristico'
import { languageAlternates } from '@/lib/i18n'
import { openGraphMeta } from '@/lib/og'
import TavaristicoWorkView from '@/views/TavaristicoWorkView'

export function generateStaticParams() {
  return WORKS.map((w) => ({ slug: w.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const w = findWork(slug)
  const t = tavaristico.pt.work
  if (!w) return { title: t.fallbackTitle }
  const title = `${w.title} · ${t.metaTitleSuffix}`
  return {
    title,
    description: w.summary,
    alternates: languageAlternates(`/creators/tavaristico/works/${slug}`),
    openGraph: openGraphMeta({ title, description: w.summary }),
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <TavaristicoWorkView lang="pt" slug={slug} />
}
