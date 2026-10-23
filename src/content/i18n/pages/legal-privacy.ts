// =============================================================================
// Dicionário de LEGAL/PRIVACY. Convenções: ../README.md
//
// Estrutura LGPD em seções numeradas (a numeração vem da posição no array).
// Cada fato de coleta aqui foi levantado no código em 08/10/2026:
//   formulários (/api/contact, /api/newsletter) · Resend · Brevo · Sanity ·
//   Vercel Analytics + Speed Insights e Google Analytics 4 (ambos só com opt-in,
//   ver CookieBanner e lib/consent) · Cloudflare Stream (vídeo, só ao dar play) ·
//   localStorage/sessionStorage · hospedagem Vercel.
// Seção de pesquisas (id research) em 15/10/2026: questionário /compras da CRIVO,
//   que grava respostas parciais e, com consentimento separado, identificação (Supabase).
//   Atualizada em 17/10/2026: telemetria, identificação opcional, 24 meses. O link do consentimento aponta para #research.
// Meta Pixel (categoria marketing, opt-in) incluído em 23/10/2026.
// Se o código ganhar coleta nova, esta página muda junto.
//
// LGPD = Lei 13.709/2018, ANPD e os artigos citados são termos oficiais
// brasileiros: idênticos nos dois idiomas.
// =============================================================================

import type { Lang } from '@/lib/i18n'

export type PrivacyItem = { label: string; text: string }
export type PrivacySection = {
  id?: string
  title: string
  intro?: string[]
  items?: PrivacyItem[]
  outro?: string[]
}

const en = {
  meta: {
    title: 'Privacy Policy',
    description:
      'How .TBF. INC collects, uses and protects personal data on thebrfactory.com: what we collect, why, which tools and partners we use, and your rights under the LGPD.',
  },

  tag: 'Legal',
  title: 'Privacy Policy',
  updatedLabel: 'Last updated',
  updatedDate: '23/10/2026',

  introOrg: '.TBF. INC',
  introText: [
    'We respect your privacy and handle personal data with care and transparency, in line with the',
    '(Lei Geral de Proteção de Dados, Lei 13.709/2018).',
  ] as [string, string],
  lgpdFull: 'LGPD',

  sections: [
    {
      title: 'Introduction',
      intro: [
        'This policy explains what personal data we collect when you visit thebrfactory.com, in which situations we use it, which tools and partners process it, and what you can do about it.',
        'The controller of your data is .TBF. INC (CNPJ 61.360.565/0001-74), R. Pamplona, 145, Jardim Paulista, São Paulo, SP, 01405-100, Brazil. "We" and "our" mean .TBF. INC.',
        'Personal data is any information that identifies you or can identify you. If you are in the European Union, we also take the GDPR into account, but this policy is written under Brazilian law and we do not promise rights that Brazilian law does not give.',
      ],
    },
    {
      title: 'What data we collect, and when',
      intro: ['We collect data in four situations.'],
      items: [
        {
          label: 'When you write to us',
          text: 'The Access, Collective and contact forms ask for your name, e-mail address and message. Some forms also ask for an Instagram handle or portfolio link, and which entry point you are writing to. We collect only what you type.',
        },
        {
          label: 'When you join the mailing list',
          text: 'The newsletter form (page and pop-up) collects your e-mail address. We then send you a welcome message.',
        },
        {
          label: 'When you answer a survey',
          text: 'Our research questionnaires collect the answers you give, including partial ones. The rules are in the section on research below.',
        },
        {
          label: 'When you browse the site',
          text: 'Our host receives technical data in standard server logs: IP address, browser and device type, pages requested and date and time. With your consent, analytics tools also record pages visited, time on page, approximate location, referring site and interactions such as clicks and scrolling.',
        },
      ],
      outro: [
        'We do not ask for sensitive personal data (LGPD, art. 5, II). Please do not send it in free-text fields. We do not collect payment data on the site. If you do not provide the data a form asks for, you can still read the site, but we cannot answer you or send you the newsletter.',
      ],
    },
    {
      title: 'Cookies and similar technologies',
      intro: [
        'The first time you visit, a cookie notice asks for your choice. You can accept all, reject the optional ones, or choose by category. You can change your mind at any time through Cookie Preferences in the footer. The choice is kept in your browser for 12 months, then we ask again.',
      ],
      items: [
        {
          label: 'Necessary',
          text: 'Always active. Store your cookie choice (localStorage, key tbf-cookie-consent) and small interface flags, such as which stories you have already seen (localStorage) and whether the intro or pop-up has already appeared in this session (sessionStorage). They never leave your device.',
        },
        {
          label: 'Analytics',
          text: 'Only after you accept. They load Vercel Analytics and Speed Insights, and Google Analytics 4. If you reject, or have not chosen yet, none of these scripts load.',
        },
        {
          label: 'Marketing',
          text: 'Off by default. Only after you turn it on. Loads the Meta Pixel (Meta Platforms), which measures our ads and lets us show them again to people who visited the site. If you reject, or have not chosen yet, the pixel does not load and sends nothing. If you withdraw, it stops sending events right away. Nothing else on the site is used for advertising.',
        },
      ],
    },
    {
      title: 'Legal bases (LGPD, art. 7)',
      intro: ['We process your data only when one of these legal bases applies.'],
      items: [
        {
          label: 'Consent',
          text: 'For analytics and marketing cookies, the mailing list and research questionnaires. You can withdraw it at any time.',
        },
        {
          label: 'Pre-contractual procedures and contract',
          text: 'When you write to us about a project, partnership or service, we need your data to answer and, if it goes ahead, to work with you.',
        },
        {
          label: 'Legitimate interest',
          text: 'For site security, preventing abuse and keeping the site running, always weighed against your rights.',
        },
        {
          label: 'Legal or regulatory obligation',
          text: 'When Brazilian law requires us to keep or hand over information.',
        },
      ],
    },
    {
      title: 'How we use your data',
      items: [
        { label: 'Answer you', text: 'Read and reply to messages sent through the forms.' },
        { label: 'Send the newsletter', text: 'Send the welcome message and later editions to people who joined the list. Every message carries an unsubscribe link.' },
        { label: 'Understand the site', text: 'Measure which pages are read and how fast they load, to improve content and performance. Only with consent.' },
        { label: 'Measure ads and remarket', text: 'Measure the result of our ads and show them again to people who visited the site, through the Meta Pixel. Only with consent in the Marketing category.' },
        { label: 'Protect the site', text: 'Detect abuse, errors and attacks.' },
        { label: 'Meet the law', text: 'Comply with legal obligations and defend ourselves in legal proceedings.' },
      ],
      outro: ['We do not sell, rent or trade your personal data.'],
    },
    {
      id: 'research',
      title: 'Research questionnaires',
      intro: [
        '.TBF. INC conducts market research through online questionnaires, directly or through projects under its incubation, such as CRIVO. This section governs the processing of personal data in such research and, where specific, prevails over the other provisions of this policy.',
      ],
      items: [
        {
          label: 'Survey answers and browsing data',
          text: 'The answers you give, including partial ones, and how you move through the survey: screens viewed, time on each screen, where you stopped, and the channel you came from (including UTM tags). The browsing data never includes text you type. We also record the date and time you started and submitted.',
        },
        {
          label: 'Partial answers',
          text: 'By agreeing on the first screen, you allow us to save the answers already given, even if you do not finish. They are saved while you fill in the survey and when you close the page, and are used only for the research, mainly to see where people stop and to improve the survey.',
        },
        {
          label: 'Identification (optional)',
          text: 'Giving your identity is optional and has its own separate consent. If you agree, we collect: name, e-mail, company, job title, city, state, WhatsApp (optional) and LinkedIn (optional). Only people who ask for the beta test are also asked the size of their purchasing team. We also store whether you are interested in the beta test, the text of the consent you accepted, and the date and time you accepted.',
        },
        {
          label: 'Why we use it',
          text: 'To analyze the survey. To contact you about the results. For a 15-minute research conversation, only if you accept. To invite you to the beta test of the CRIVO software, only if you ask for it. We do not use it for anything else.',
        },
        {
          label: 'Exclusive purpose',
          text: 'Data collected in a survey is used only for that research. It is not used for advertising, individual profiling or automated decisions. We do not sell it or give it to third parties. Results are shared only in aggregate form, without naming participants.',
        },
        {
          label: 'Audio recording',
          text: 'A conversation is recorded only with specific consent, given at the start of the recording. The audio is deleted once the summary is prepared, within 12 months at most. You may refuse recording and still take part.',
        },
        {
          label: 'Legal basis and storage',
          text: 'Your consent (LGPD, art. 7, I), given freely and clearly. Your identification is kept in a separate table from your answers, in Supabase, so the answers alone do not point to you.',
        },
        {
          label: 'Retention',
          text: 'We keep your data for 24 months, then delete or anonymize it.',
        },
        {
          label: 'Your rights',
          text: 'You can ask for access, correction or deletion of your data, and withdraw your consent, at any time. Write to legal@thebrfactory.com. Withdrawing does not affect what was done before.',
        },
      ],
    },
    {
      title: 'Tools and partners',
      intro: [
        'These are the services that process data on our behalf or receive it when you use the site. Each one has its own privacy policy.',
      ],
      items: [
        { label: 'Vercel', text: 'Hosting and delivery of the site. Receives technical data from every visit (server logs). Vercel Analytics and Speed Insights measure visits and performance, only with consent.' },
        { label: 'Google Analytics 4', text: 'Audience measurement: pages, sessions, approximate location, device. Only with consent, under Google Consent Mode, with denied as the default. Google may process data outside Brazil.' },
        { label: 'Meta Pixel (Meta Platforms)', text: 'Ad measurement and remarketing. Only with consent in the Marketing category; legal basis: consent. Receives browser identifiers (cookies such as _fbp) and two events: PageView and Lead (form submission), without the content of the form. Meta may process data outside Brazil. To withdraw, open Cookie Preferences in the footer and turn Marketing off. Meta privacy policy: https://www.facebook.com/privacy/policy/' },
        { label: 'Resend', text: 'Sends the e-mail notifications of forms and mailing-list sign-ups to our team. Receives the content of your message, name and e-mail address.' },
        { label: 'Brevo', text: 'Stores the mailing list and sends the welcome message and newsletters. Receives your e-mail address.' },
        { label: 'Sanity', text: 'Content management for articles and pages, and the delivery of their images. It does not receive form data. Image requests reach its servers like any file you load.' },
        { label: 'Supabase', text: 'Database for research questionnaires. Receives the answers, including partial ones, and session metadata. It may process data outside Brazil.' },
        { label: 'Cloudflare Stream', text: 'Plays videos embedded in some pages. The player loads only when you press play, and it then receives your IP address and device data.' },
        { label: 'Links to other services', text: 'The site links to Instagram, LinkedIn and Calendly, among others. When you click, you leave our site and their policies apply. Calendly receives whatever you type to book a call.' },
      ],
      outro: [
        'Our typefaces are hosted on our own server, so no font service sees your visit.',
      ],
    },
    {
      title: 'Your rights as a data subject',
      intro: ['Under LGPD, art. 18, you can ask us for any of the following, at no cost.'],
      items: [
        { label: 'Confirmation', text: 'Whether we process your data.' },
        { label: 'Access', text: 'A copy of the data we hold about you.' },
        { label: 'Correction', text: 'Fixing data that is incomplete, wrong or out of date.' },
        { label: 'Anonymization, blocking or deletion', text: 'Of data that is unnecessary, excessive or processed unlawfully.' },
        { label: 'Portability', text: 'Receiving your data to take to another provider, when applicable.' },
        { label: 'Deletion', text: 'Of data processed with your consent, except where the law requires us to keep it.' },
        { label: 'Information on sharing', text: 'Who we shared your data with.' },
        { label: 'Information on refusing consent', text: 'What happens if you say no.' },
        { label: 'Withdrawal of consent', text: 'At any time. For analytics and marketing, use Cookie Preferences. For the newsletter, use the unsubscribe link.' },
        { label: 'Objection', text: 'To processing based on legitimate interest, if you think it breaks the law.' },
      ],
      outro: [
        'We answer within 15 days. You can also complain to the Autoridade Nacional de Proteção de Dados (ANPD). To exercise a right, use the contact in the last section.',
      ],
    },
    {
      title: 'Security, retention and transfers',
      intro: [
        'We use HTTPS on the whole site, restrict access to the tools above to the people who need them, and keep our API keys out of the public code. No system is fully secure, and if an incident puts your data at risk we will tell you and the ANPD as the law requires.',
        'We keep data only as long as needed for the purpose. Mailing-list e-mails stay until you unsubscribe. Messages from the forms stay while the conversation or the working relationship lasts, and are deleted when you ask, unless the law requires us to keep them. Analytics data follows the retention period set in each provider account.',
        'Several partners above, such as Vercel, Google, Meta, Resend, Brevo and Supabase, operate servers outside Brazil. We only use providers that offer adequate safeguards for international transfers, as LGPD art. 33 requires.',
      ],
    },
    {
      title: 'How we tell you about changes',
      intro: [
        'We update this policy when the site changes how it handles data, for example when a new tool is added. The date of the last change is at the top of the page. If the change affects your consent, we ask again through the cookie notice.',
      ],
    },
    {
      title: 'How to contact us',
      intro: [
        'For questions about this policy or to exercise your rights, write to our data protection contact (DPO):',
      ],
    },
  ] as PrivacySection[],

  email: 'legal@thebrfactory.com',
  addressBlock: ['.TBF. INC · CNPJ 61.360.565/0001-74', 'R. Pamplona, 145. Jardim Paulista', 'São Paulo, SP. 01405-100 · Brazil'] as [
    string,
    string,
    string,
  ],
}

const pt: typeof en = {
  meta: {
    title: 'Política de Privacidade',
    description:
      'Como a .TBF. INC coleta, usa e protege dados pessoais no thebrfactory.com: o que coletamos, por quê, quais ferramentas e parceiros usamos e os seus direitos pela LGPD.',
  },

  tag: 'Jurídico',
  title: 'Política de Privacidade',
  updatedLabel: 'Última alteração',
  updatedDate: '23/10/2026',

  introOrg: '.TBF. INC',
  introText: [
    'Respeitamos a sua privacidade e tratamos dados pessoais com cuidado e transparência, em conformidade com a',
    '(Lei Geral de Proteção de Dados, Lei 13.709/2018).',
  ],
  lgpdFull: 'LGPD',

  sections: [
    {
      title: 'Introdução',
      intro: [
        'Esta política explica quais dados pessoais coletamos quando você visita o thebrfactory.com, em quais situações os usamos, quais ferramentas e parceiros os tratam e o que você pode fazer a respeito.',
        'A controladora dos seus dados é a .TBF. INC (CNPJ 61.360.565/0001-74), R. Pamplona, 145, Jardim Paulista, São Paulo, SP, 01405-100, Brasil. "Nós" e "nosso" significam .TBF. INC.',
        'Dado pessoal é qualquer informação que identifique você ou possa identificar. Se você está na União Europeia, também levamos o GDPR em conta, mas esta política é escrita sob a lei brasileira e não prometemos direitos que ela não dá.',
      ],
    },
    {
      title: 'Quais dados coletamos, e quando',
      intro: ['Coletamos dados em quatro situações.'],
      items: [
        {
          label: 'Quando você escreve para nós',
          text: 'Os formulários de Access, Collective e de contato pedem nome, e-mail e mensagem. Alguns pedem também um perfil do Instagram ou link de portfólio, e para qual porta de entrada você escreve. Coletamos só o que você digita.',
        },
        {
          label: 'Quando você entra na mailing list',
          text: 'O formulário da newsletter (página e pop-up) coleta o seu e-mail. Em seguida enviamos uma mensagem de boas-vindas.',
        },
        {
          label: 'Quando você responde a uma pesquisa',
          text: 'Nossos questionários de pesquisa coletam as respostas que você dá, inclusive as parciais. As regras estão na seção de pesquisas, abaixo.',
        },
        {
          label: 'Quando você navega no site',
          text: 'Nossa hospedagem recebe dados técnicos nos registros de servidor: endereço IP, tipo de navegador e de aparelho, páginas pedidas, data e hora. Com o seu consentimento, as ferramentas de analytics registram também páginas visitadas, tempo na página, localização aproximada, site de origem e interações como cliques e rolagem.',
        },
      ],
      outro: [
        'Não pedimos dados pessoais sensíveis (LGPD, art. 5º, II). Não os envie nos campos de texto livre. Não coletamos dados de pagamento no site. Se você não fornecer os dados que um formulário pede, ainda pode ler o site, mas não conseguimos responder nem enviar a newsletter.',
      ],
    },
    {
      title: 'Cookies e tecnologias semelhantes',
      intro: [
        'Na primeira visita, um aviso de cookies pede a sua escolha. Você pode aceitar todos, rejeitar os opcionais ou escolher por categoria. Pode mudar de ideia a qualquer momento em Preferências de Cookies, no rodapé. A escolha fica guardada no seu navegador por 12 meses, e depois perguntamos de novo.',
      ],
      items: [
        {
          label: 'Necessários',
          text: 'Sempre ativos. Guardam a sua escolha de cookies (localStorage, chave tbf-cookie-consent) e pequenas marcas de interface, como quais stories você já viu (localStorage) e se a abertura ou o pop-up já apareceram na sessão (sessionStorage). Nunca saem do seu aparelho.',
        },
        {
          label: 'Analytics',
          text: 'Só depois que você aceita. Carregam o Vercel Analytics, o Speed Insights e o Google Analytics 4. Se você rejeita, ou ainda não escolheu, nenhum desses scripts carrega.',
        },
        {
          label: 'Marketing',
          text: 'Desligados por padrão. Só depois que você ligar. Carregam o Meta Pixel (Meta Platforms), que mede nossos anúncios e permite mostrá-los de novo a quem visitou o site. Se você rejeita, ou ainda não escolheu, o pixel não carrega e não envia nada. Se você revoga, ele para de enviar eventos na hora. Nada mais no site é usado para publicidade.',
        },
      ],
    },
    {
      title: 'Bases legais (LGPD, art. 7º)',
      intro: ['Só tratamos seus dados quando uma destas bases legais se aplica.'],
      items: [
        {
          label: 'Consentimento',
          text: 'Para cookies de analytics e de marketing, para a mailing list e para os questionários de pesquisa. Você pode retirá-lo a qualquer momento.',
        },
        {
          label: 'Procedimentos preliminares e execução de contrato',
          text: 'Quando você nos escreve sobre projeto, parceria ou serviço, precisamos dos seus dados para responder e, se avançar, trabalhar com você.',
        },
        {
          label: 'Legítimo interesse',
          text: 'Para segurança do site, prevenção de abuso e manutenção do funcionamento, sempre pesado contra os seus direitos.',
        },
        {
          label: 'Obrigação legal ou regulatória',
          text: 'Quando a lei brasileira exige que guardemos ou entreguemos informações.',
        },
      ],
    },
    {
      title: 'Como usamos seus dados',
      items: [
        { label: 'Responder você', text: 'Ler e responder as mensagens enviadas pelos formulários.' },
        { label: 'Enviar a newsletter', text: 'Enviar a mensagem de boas-vindas e as edições seguintes a quem entrou na lista. Toda mensagem traz um link para cancelar a inscrição.' },
        { label: 'Entender o site', text: 'Medir quais páginas são lidas e a velocidade de carregamento, para melhorar conteúdo e desempenho. Só com consentimento.' },
        { label: 'Medir anúncios e remarketing', text: 'Medir o resultado dos nossos anúncios e mostrá-los de novo a quem visitou o site, pelo Meta Pixel. Só com consentimento na categoria Marketing.' },
        { label: 'Proteger o site', text: 'Detectar abuso, erros e ataques.' },
        { label: 'Cumprir a lei', text: 'Atender obrigações legais e nos defender em processos.' },
      ],
      outro: ['Não vendemos, alugamos nem trocamos seus dados pessoais.'],
    },
    {
      id: 'research',
      title: 'Questionários de pesquisa',
      intro: [
        'A .TBF. INC conduz pesquisas de mercado por meio de questionários online, diretamente ou por projetos sob sua incubação, como a CRIVO. Esta seção rege o tratamento de dados pessoais nessas pesquisas e, no que for específica, prevalece sobre as demais disposições desta política.',
      ],
      items: [
        {
          label: 'Respostas e dados de navegação',
          text: 'As respostas que você dá, inclusive as parciais, e como você percorre a pesquisa: telas vistas, tempo em cada tela, onde parou e o canal de onde veio (inclusive marcações UTM). Os dados de navegação nunca incluem texto digitado. Registramos também a data e a hora em que você começou e enviou.',
        },
        {
          label: 'Respostas parciais',
          text: 'Ao concordar na tela inicial, você permite que gravemos as respostas já dadas, mesmo que não termine. Elas são gravadas enquanto você preenche e quando fecha a página, e servem só à pesquisa, principalmente para ver onde as pessoas param e melhorar o questionário.',
        },
        {
          label: 'Identificação (opcional)',
          text: 'Informar quem você é é opcional e tem um consentimento separado. Se você concordar, coletamos: nome, e-mail, empresa, cargo, cidade, UF, WhatsApp (opcional) e LinkedIn (opcional). Só quem pede o teste beta informa também o tamanho da equipe de compras. Guardamos ainda se você tem interesse no teste beta, o texto do consentimento que você aceitou e a data e a hora do aceite.',
        },
        {
          label: 'Para que usamos',
          text: 'Para analisar a pesquisa. Para falar com você sobre os resultados. Para uma conversa de pesquisa de 15 minutos, só se você aceitar. Para convidar você ao teste beta do software da CRIVO, só se você pedir. Não usamos para mais nada.',
        },
        {
          label: 'Finalidade exclusiva',
          text: 'Os dados coletados em uma pesquisa servem só a ela. Não são usados para publicidade, perfil individual nem decisão automatizada. Não vendemos nem cedemos a terceiros. Os resultados são divulgados só de forma agregada, sem identificar participantes.',
        },
        {
          label: 'Gravação de áudio',
          text: 'A conversa só é gravada com consentimento específico, dado no início da gravação. O áudio é apagado depois que o resumo fica pronto, em no máximo 12 meses. Você pode recusar a gravação e continuar participando.',
        },
        {
          label: 'Base legal e armazenamento',
          text: 'O seu consentimento (LGPD, art. 7º, I), dado de forma livre e clara. A identificação fica guardada em uma tabela separada das respostas, no Supabase, para que as respostas sozinhas não apontem para você.',
        },
        {
          label: 'Retenção',
          text: 'Guardamos seus dados por 24 meses e depois apagamos ou anonimizamos.',
        },
        {
          label: 'Seus direitos',
          text: 'Você pode pedir acesso, correção ou exclusão dos seus dados, e revogar o consentimento, a qualquer momento. Escreva para legal@thebrfactory.com. Revogar não afeta o que foi feito antes.',
        },
      ],
    },
    {
      title: 'Ferramentas e parceiros',
      intro: [
        'Estes são os serviços que tratam dados em nosso nome ou recebem dados quando você usa o site. Cada um tem a própria política de privacidade.',
      ],
      items: [
        { label: 'Vercel', text: 'Hospedagem e entrega do site. Recebe dados técnicos de toda visita (registros de servidor). Vercel Analytics e Speed Insights medem visitas e desempenho, só com consentimento.' },
        { label: 'Google Analytics 4', text: 'Medição de audiência: páginas, sessões, localização aproximada, aparelho. Só com consentimento, sob o Consent Mode do Google, com negado como padrão. O Google pode tratar dados fora do Brasil.' },
        { label: 'Meta Pixel (Meta Platforms)', text: 'Medição de anúncios e remarketing. Só com consentimento na categoria Marketing; base legal: consentimento. Recebe identificadores do navegador (cookies como _fbp) e dois eventos: PageView e Lead (envio de formulário), sem o conteúdo do formulário. A Meta pode tratar dados fora do Brasil. Para revogar, abra Preferências de Cookies no rodapé e desligue Marketing. Política de privacidade da Meta: https://www.facebook.com/privacy/policy/' },
        { label: 'Resend', text: 'Envia à nossa equipe os e-mails de aviso dos formulários e das inscrições na mailing list. Recebe o conteúdo da sua mensagem, nome e e-mail.' },
        { label: 'Brevo', text: 'Guarda a mailing list e envia a mensagem de boas-vindas e as newsletters. Recebe o seu e-mail.' },
        { label: 'Sanity', text: 'Gestão de conteúdo de artigos e páginas, e entrega das imagens deles. Não recebe dados de formulário. Os pedidos de imagem chegam aos servidores dela como qualquer arquivo que você carrega.' },
        { label: 'Supabase', text: 'Banco de dados dos questionários de pesquisa. Recebe as respostas, inclusive as parciais, e os metadados da sessão. Pode tratar dados fora do Brasil.' },
        { label: 'Cloudflare Stream', text: 'Reproduz vídeos incorporados em algumas páginas. O player só carrega quando você aperta play, e então recebe o seu IP e dados do aparelho.' },
        { label: 'Links para outros serviços', text: 'O site tem links para Instagram, LinkedIn e Calendly, entre outros. Ao clicar, você sai do nosso site e valem as políticas deles. O Calendly recebe o que você digitar para agendar uma conversa.' },
      ],
      outro: [
        'As nossas fontes tipográficas ficam no nosso próprio servidor, então nenhum serviço de fontes vê a sua visita.',
      ],
    },
    {
      title: 'Seus direitos como titular',
      intro: ['Pelo art. 18 da LGPD, você pode pedir qualquer item abaixo, sem custo.'],
      items: [
        { label: 'Confirmação', text: 'Se tratamos seus dados.' },
        { label: 'Acesso', text: 'Uma cópia dos dados que temos sobre você.' },
        { label: 'Correção', text: 'Ajustar dado incompleto, errado ou desatualizado.' },
        { label: 'Anonimização, bloqueio ou eliminação', text: 'De dados desnecessários, excessivos ou tratados em desacordo com a lei.' },
        { label: 'Portabilidade', text: 'Receber seus dados para levar a outro fornecedor, quando aplicável.' },
        { label: 'Eliminação', text: 'Dos dados tratados com seu consentimento, salvo quando a lei nos obriga a guardar.' },
        { label: 'Informação sobre compartilhamento', text: 'Com quem compartilhamos seus dados.' },
        { label: 'Informação sobre negar o consentimento', text: 'O que acontece se você disser não.' },
        { label: 'Revogação do consentimento', text: 'A qualquer momento. Para analytics e marketing, use as Preferências de Cookies. Para a newsletter, o link de cancelamento.' },
        { label: 'Oposição', text: 'A tratamento feito com base em legítimo interesse, se você entender que ele descumpre a lei.' },
      ],
      outro: [
        'Respondemos em até 15 dias. Você também pode reclamar à Autoridade Nacional de Proteção de Dados (ANPD). Para exercer um direito, use o contato da última seção.',
      ],
    },
    {
      title: 'Segurança, retenção e transferências',
      intro: [
        'Usamos HTTPS em todo o site, limitamos o acesso às ferramentas acima a quem precisa e mantemos as chaves de API fora do código público. Nenhum sistema é totalmente seguro, e se um incidente colocar seus dados em risco, avisaremos você e a ANPD como a lei exige.',
        'Guardamos os dados só pelo tempo necessário à finalidade. E-mails da mailing list ficam até você cancelar. Mensagens dos formulários ficam enquanto durar a conversa ou a relação de trabalho, e são apagadas quando você pede, salvo se a lei nos obrigar a guardar. Dados de analytics seguem o prazo de retenção definido em cada conta de provedor.',
        'Vários parceiros acima, como Vercel, Google, Meta, Resend, Brevo e Supabase, têm servidores fora do Brasil. Só usamos provedores com garantias adequadas para transferência internacional, como exige o art. 33 da LGPD.',
      ],
    },
    {
      title: 'Como avisamos de alterações',
      intro: [
        'Atualizamos esta política quando o site muda a forma de tratar dados, por exemplo ao incluir uma ferramenta nova. A data da última alteração fica no topo da página. Se a mudança afetar o seu consentimento, perguntamos de novo pelo aviso de cookies.',
      ],
    },
    {
      title: 'Como entrar em contato',
      intro: [
        'Para dúvidas sobre esta política ou para exercer seus direitos, escreva ao nosso contato de proteção de dados (Encarregado, DPO):',
      ],
    },
  ],

  email: 'legal@thebrfactory.com',
  addressBlock: ['.TBF. INC · CNPJ 61.360.565/0001-74', 'R. Pamplona, 145, Jardim Paulista', 'São Paulo, SP, 01405-100 · Brasil'],
}

export const legalPrivacy: Record<Lang, typeof en> = { en, pt }
