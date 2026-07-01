'use client'

import { useState } from 'react'

export type NewsletterStatus = 'idle' | 'loading' | 'success' | 'error'

// Lógica de submit compartilhada entre o MailingList (rodapé) e o NewsletterPopup (sitewide).
// Ambos postam para /api/newsletter, que dispara o welcome e-mail (Resend) e adiciona
// o contato na lista do Brevo.
export function useNewsletterSubmit() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<NewsletterStatus>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
        setErrorMsg(data.error ?? 'Erro. Tente novamente.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Erro. Tente novamente.')
    }
  }

  return { email, setEmail, status, errorMsg, submit }
}
