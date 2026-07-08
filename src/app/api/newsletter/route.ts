import { NextRequest, NextResponse } from 'next/server'

// Env vars necessárias (padronizado com o LP-TFD/Melfiore — welcome via Brevo Transacional, não Resend):
//   BREVO_API_KEY      — conta Brevo .TBF. inc. (login thebrazilianfactory@gmail.com) → SMTP & API → API Keys
//   BREVO_LIST_ID      — 3 (conta .TBF.)
//   BREVO_TEMPLATE_ID  — id do template ativo no Brevo (editor visual, conta .TBF. → Modelos). Editar design lá, não aqui.
//   BREVO_SENDER_EMAIL — community@thebrfactory.com (precisa estar "active" nos Senders do Brevo antes de enviar)
//   BREVO_SENDER_NAME  — .TBF. inc.
// ATENÇÃO: existem DUAS contas Brevo — .TBF. inc. (thebrazilianfactory@gmail.com, usada aqui)
// e MELFIORE (thefioredaily@gmail.com, waitlist Melfiore + MCP). Não misturar.
// Sem BREVO_API_KEY, o contato só fica logado no console (dev mode) — nenhum e-mail é enviado.
// A notificação interna (owner) continua via Resend (RESEND_API_KEY) — é operacional, não brand-facing.

async function addBrevoContact(email: string): Promise<void> {
  const res = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'api-key': process.env.BREVO_API_KEY!,
    },
    body: JSON.stringify({
      email: email.trim().toLowerCase(),
      listIds: [Number(process.env.BREVO_LIST_ID)],
      updateEnabled: true, // contato existente é atualizado e ANEXADO à lista (false ignoraria o listIds)
    }),
  })

  // 204 = criado, 400 com code "duplicate_parameter" = já existe — ambos são sucesso
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    if (body?.code !== 'duplicate_parameter') {
      console.error('[newsletter] Brevo contact error:', res.status, body)
    }
  }
}

async function sendBrevoWelcomeEmail(email: string): Promise<void> {
  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'api-key': process.env.BREVO_API_KEY!,
    },
    body: JSON.stringify({
      to: [{ email: email.trim().toLowerCase() }],
      templateId: Number(process.env.BREVO_TEMPLATE_ID),
      sender: {
        email: process.env.BREVO_SENDER_EMAIL,
        name: process.env.BREVO_SENDER_NAME ?? '.TBF. inc.',
      },
    }),
  })
  if (!res.ok) console.error('[newsletter] Brevo welcome email error:', await res.text())
}

async function sendEmail(apiKey: string, to: string, subject: string, html: string, text: string) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: '.TBF. <community@thebrfactory.com>',
      to,
      subject,
      html,
      text,
    }),
  })
  if (!res.ok) console.error('[newsletter] Resend error:', await res.text())
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'E-mail inválido.' },
        { status: 400 }
      )
    }

    const resendApiKey = process.env.RESEND_API_KEY
    const ownerEmail = process.env.CONTACT_EMAIL ?? 'thebrazilianfactory@gmail.com'

    const tasks: Promise<void>[] = []

    // Notificação interna (operacional, não brand-facing) — segue via Resend
    if (resendApiKey) {
      tasks.push(
        sendEmail(
          resendApiKey,
          ownerEmail,
          `[Mailing List] Nova inscrição: ${email}`,
          `<p>Nova inscrição na mailing list: <strong>${email}</strong></p>`,
          `Nova inscrição na mailing list: ${email}`
        )
      )
    }

    // Contato + welcome — padronizado com o LP-TFD/Melfiore: tudo via Brevo Transacional
    if (process.env.BREVO_API_KEY) {
      tasks.push(addBrevoContact(email))
      if (process.env.BREVO_TEMPLATE_ID) {
        tasks.push(sendBrevoWelcomeEmail(email))
      } else {
        console.info('[newsletter] BREVO_TEMPLATE_ID ausente — welcome não enviado:', email)
      }
    } else {
      console.info('[newsletter] Brevo dev mode — contato não sincronizado:', email)
    }

    await Promise.all(tasks)

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Erro interno. Tente novamente.' },
      { status: 500 }
    )
  }
}
