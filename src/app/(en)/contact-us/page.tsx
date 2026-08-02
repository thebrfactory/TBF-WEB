// Rota `/contact-us` — em inglês.
// A página em si vive em src/views/ContactUsView.tsx e serve os dois idiomas.

import type { Metadata } from 'next'
import ContactUsView from '@/views/ContactUsView'
import { contactUs } from '@/content/i18n/pages/contact-us'
import { languageAlternates } from '@/lib/i18n'

const t = contactUs.en

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: languageAlternates('/contact-us'),
}

export default function Page() {
  return <ContactUsView lang="en" />
}
