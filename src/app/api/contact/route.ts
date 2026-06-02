// =============================================================================
// API ROUTE — /api/contact
// Handler para formulários /access e /collective
// Resposta com voz TBF — zero "Obrigado pelo contato"
// =============================================================================

import { NextRequest, NextResponse } from 'next/server'
import type { ContactFormData } from '@/types'

// Intent labels para log / email subject
const INTENT_LABELS: Record<string, string> = {
  tbf: '.TBF. Editorial',
  melfiore: '.MELFIORE.',
  ruc: '.RUC. Runway United Collective',
  tgf: '.TGF. The Growth Factory',
  collective: 'Collective Hotel Casino',
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData & { formType?: string } = await request.json()

    // Validação básica
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { success: false, error: 'Campos obrigatórios ausentes.' },
        { status: 400 }
      )
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, error: 'E-mail inválido.' },
        { status: 400 }
      )
    }

    const intentLabel = INTENT_LABELS[body.intent] ?? body.intent ?? 'General'

    // Integração com Resend (quando configurado via env)
    const resendApiKey = process.env.RESEND_API_KEY
    const recipientEmail = process.env.CONTACT_EMAIL ?? 'thebrazilianfactory@gmail.com'

    if (resendApiKey) {
      const emailPayload = {
        from: 'noreply@thebrfactory.com',
        to: recipientEmail,
        subject: `[${intentLabel}] Nova mensagem de ${body.name}`,
        text: [
          `De: ${body.name} <${body.email}>`,
          `Entrada: ${intentLabel}`,
          body.handle ? `Handle/Link: ${body.handle}` : '',
          '',
          body.message,
        ]
          .filter(Boolean)
          .join('\n'),
      }

      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailPayload),
      })

      if (!resendRes.ok) {
        // Log erro mas não falha silenciosamente
        console.error('[contact] Resend error:', await resendRes.text())
      }
    } else {
      // Dev: apenas log
      console.info('[contact] Transmission received:', {
        name: body.name,
        email: body.email,
        intent: intentLabel,
        message: body.message.slice(0, 80),
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Canal aberto.',
    })
  } catch (error) {
    console.error('[contact] Error:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno. Tente novamente.' },
      { status: 500 }
    )
  }
}
