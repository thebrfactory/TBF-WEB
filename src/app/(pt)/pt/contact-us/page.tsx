// Rota `/pt/contact-us` — a mesma página, em português.
// A página em si vive em src/views/ContactUsView.tsx e serve os dois idiomas.

import type { Metadata } from 'next'
import ContactUsView from '@/views/ContactUsView'
import { contactUs } from '@/content/i18n/pages/contact-us'
import { languageAlternates } from '@/lib/i18n'
import { openGraphMeta } from '@/lib/og'

const t = contactUs.pt

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: languageAlternates('/contact-us'),
  openGraph: openGraphMeta({ title: t.meta.title, description: t.meta.description }),
}

export default function Page() {
  return <ContactUsView lang="pt" />
}
