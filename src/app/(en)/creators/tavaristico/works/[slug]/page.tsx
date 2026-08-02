// Rota `/creators/tavaristico/works/[slug]` — inglês.
// A página em si vive em src/views/TavaristicoWorkView.tsx.

import type { Metadata } from 'next'
import { WORKS, findWork } from '@/app/(en)/creators/tavaristico/_data'
import { tavaristico } from '@/content/i18n/pages/tavaristico'
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
  const t = tavaristico.en.work
  if (!w) return { title: t.fallbackTitle }
  return {
    title: `${w.title} · ${t.metaTitleSuffix}`,
    description: w.summary,
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <TavaristicoWorkView lang="en" slug={slug} />
}
