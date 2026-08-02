'use client'

import { useState } from 'react'
import { useLang } from '@/lib/LangProvider'
import { shell } from '@/content/i18n/shell'

export type NewsletterStatus = 'idle' | 'loading' | 'success' | 'error'

// Lógica de submit compartilhada entre o MailingList (rodapé) e o NewsletterPopup (sitewide).
// Ambos postam para /api/newsletter, que dispara o welcome e-mail (Resend) e adiciona
// o contato na lista do Brevo.
export function useNewsletterSubmit() {
  // O erro genérico também é texto que a pessoa lê: sem isto o site em
  // português avisa a falha em inglês, justamente na hora em que o visitante
  // já está frustrado.
  const genericError = shell[useLang()].mailing.genericError
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<NewsletterStatus>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function submit(e: React.FormEvent, extra?: Record<string, unknown>) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, ...extra }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
        setErrorMsg(data.error ?? genericError)
      }
    } catch {
      setStatus('error')
      setErrorMsg(genericError)
    }
  }

  return { email, setEmail, status, errorMsg, submit }
}
