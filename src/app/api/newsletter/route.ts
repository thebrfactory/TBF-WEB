import { NextRequest, NextResponse } from 'next/server'

const WELCOME_HTML = `
<div style="background:#000;color:#fff;font-family:Georgia,serif;max-width:560px;margin:0 auto;padding:48px 32px;">
  <p style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#888;margin-bottom:32px;">
    .THE BRAZILIAN FACTORY.
  </p>
  <h1 style="font-size:2rem;font-weight:700;line-height:1.1;margin-bottom:24px;">
    Welcome to the factory.
  </h1>
  <p style="font-size:1rem;line-height:1.7;color:#ccc;margin-bottom:24px;">
    You're now part of something being built from São Paulo outward.<br/>
    Expect editorials, drops, and dispatches from the .TBF. universe — when they matter, not when they don't.
  </p>
  <p style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#555;margin-top:48px;">
    Culture™ Crafted in São Paulo. Consumed Worldwide.<br/>
    .TBF. INC — thebrfactory.com
  </p>
</div>
`

async function sendEmail(apiKey: string, to: string, subject: string, html: string, text: string) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: '.TBF. <noreply@thebrfactory.com>',
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

    if (resendApiKey) {
      await Promise.all([
        // Welcome ao subscriber
        sendEmail(
          resendApiKey,
          email,
          'Welcome to the factory.',
          WELCOME_HTML,
          'Welcome to the factory.\n\nYou\'re now part of something being built from São Paulo outward.\n\nCulture™ Crafted in São Paulo. Consumed Worldwide.\n.TBF. INC — thebrfactory.com'
        ),
        // Notificação interna
        sendEmail(
          resendApiKey,
          ownerEmail,
          `[Mailing List] Nova inscrição: ${email}`,
          `<p>Nova inscrição na mailing list: <strong>${email}</strong></p>`,
          `Nova inscrição na mailing list: ${email}`
        ),
      ])
    } else {
      console.info('[newsletter] New subscriber:', email)
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Erro interno. Tente novamente.' },
      { status: 500 }
    )
  }
}
