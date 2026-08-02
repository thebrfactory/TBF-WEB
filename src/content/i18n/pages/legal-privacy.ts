// =============================================================================
// Dicionário de LEGAL/PRIVACY. Convenções: ../README.md
//
// NOTA JURÍDICA: LGPD = Lei 13.709/2018. Os artigos citados (art. 5, II; art. 7;
// art. 18) e a sigla ANPD (Autoridade Nacional de Proteção de Dados) são termos
// oficiais brasileiros — mantidos idênticos nos dois idiomas, sem retradução.
// =============================================================================

import type { Lang } from '@/lib/i18n'

const en = {
  meta: {
    title: 'Privacy Policy | .THE BRAZILIAN FACTORY.',
    description:
      'Privacy Policy for .THE BRAZILIAN FACTORY. digital properties. Compliant with Lei Geral de Proteção de Dados (LGPD, Lei 13.709/2018).',
  },

  tag: 'Legal',
  title: 'Privacy Policy',
  updated: 'Last updated: July 2026 · Compliant with Lei 13.709/2018 (LGPD)',

  intro1: [
    'This Privacy Policy describes how',
    ', the controller of personal data, collects, uses, stores and protects your personal information when you access our digital properties, including thebrfactory.com and associated label domains.',
  ] as [string, string],
  introOrg: '.TBF. INC',
  introAddress: '(CNPJ 61.360.565/0001-74)',
  intro2: ['We are committed to protecting your privacy in accordance with the', 'and other applicable data protection laws.'] as [
    string,
    string,
  ],
  lgpdFull: 'Lei Geral de Proteção de Dados (LGPD, Lei 13.709/2018)',

  s1Title: '1. Data We Collect',
  s1Body:
    'We may collect the following categories of personal data: (a) Identity data: name, email address, when voluntarily provided via contact forms or newsletter subscriptions; (b) Usage data: browser type, pages visited, time on page and referring URLs, collected through privacy-first analytics only where you have consented; (c) Communications: content of messages you send us via email or contact forms.',
  s1Sensitive:
    'We do not collect sensitive personal data (as defined under LGPD art. 5, II) without your explicit consent.',

  s2Title: '2. Legal Basis for Processing (LGPD art. 7)',
  s2Body:
    'We process your personal data on the following legal bases: (a) Consent: when you subscribe to our newsletter, submit a contact form, or enable analytics cookies; (b) Legitimate interest: for site performance, security and fraud prevention; (c) Legal obligation: when required by applicable Brazilian law.',

  s3Title: '3. How We Use Your Data',
  s3Body1:
    'We use your data to: operate and improve our digital properties; send newsletters or communications you have requested; respond to your inquiries; comply with legal obligations; and analyze traffic and user behavior to improve the experience of our platforms.',
  s3Body2: 'We do not sell, rent or trade your personal data to third parties for marketing purposes.',

  s4Title: '4. Data Retention',
  s4Body:
    "We retain your personal data only for as long as necessary to fulfill the purposes described in this policy, or as required by applicable law. Newsletter subscriber data is retained until you unsubscribe. Aggregated analytics data is retained for a limited period, in line with our analytics provider's retention policy.",

  s5Title: '5. Your Rights Under LGPD',
  s5Body:
    'Under the LGPD (art. 18), you have the right to: confirm the existence of processing; access your data; correct incomplete or inaccurate data; request anonymization, blocking or deletion of unnecessary data; obtain information about third parties with whom your data has been shared; revoke consent at any time; and lodge a complaint with the Autoridade Nacional de Proteção de Dados (ANPD).',
  s5Contact: 'To exercise any of these rights, contact us at',

  s6Title: '6. Cookies',
  s6Body:
    'We use two categories of cookies and similar technologies. Essential cookies are required for site functionality and are always active. Analytics cookies, provided by Vercel, are privacy-first and load only after you consent; they help us understand aggregate site usage without profiling you or tracking you across other sites. We do not use advertising or marketing cookies. You can accept, reject or change your choice at any time via the Cookie Preferences link in the footer, or by adjusting your browser settings.',

  s7Title: '7. Third-Party Services',
  s7Body:
    'We use the following third-party services which may process your data: Vercel (hosting, CDN and privacy-first, cookieless analytics via Vercel Analytics and Speed Insights), Resend (transactional email), Brevo (newsletter delivery and mailing-list management), and Sanity (content management). Each service operates under its own privacy policy. We ensure that all data processors provide adequate levels of data protection.',

  s8Title: '8. Data Security',
  s8Body:
    'We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, disclosure, alteration or destruction. Our platforms use HTTPS encryption and are hosted on infrastructure that maintains high security standards.',

  s9Title: '9. International Transfers',
  s9Body:
    'Some of our service providers operate outside Brazil. In such cases, we ensure that data transfers comply with LGPD requirements for international transfers, including ensuring that the destination country provides an adequate level of data protection or that appropriate contractual safeguards are in place.',

  s10Title: '10. Changes to This Policy',
  s10Body:
    'We may update this Privacy Policy from time to time. Material changes will be communicated by updating the date at the top of this page. Continued use of our services after changes are posted constitutes your acceptance of the updated policy.',

  s11Title: '11. Contact & Data Controller',
  s11Body: 'For privacy inquiries, data subject requests or to contact our Data Protection Officer:',
  email: 'privacidade@thebrfactory.com',
  addressBlock: ['.TBF. INC · CNPJ 61.360.565/0001-74', 'R. Pamplona, 145. Jardim Paulista', 'São Paulo, SP. 01405-100 · Brasil'] as [
    string,
    string,
    string,
  ],
}

const pt: typeof en = {
  meta: {
    title: 'Política de Privacidade | .THE BRAZILIAN FACTORY.',
    description:
      'Política de Privacidade das propriedades digitais da .THE BRAZILIAN FACTORY. Em conformidade com a Lei Geral de Proteção de Dados (LGPD, Lei 13.709/2018).',
  },

  tag: 'Jurídico',
  title: 'Política de Privacidade',
  updated: 'Última atualização: julho de 2026 · Em conformidade com a Lei 13.709/2018 (LGPD)',

  intro1: [
    'Esta Política de Privacidade descreve como a',
    ', controladora dos dados pessoais, coleta, usa, armazena e protege suas informações pessoais quando você acessa nossas propriedades digitais, incluindo o thebrfactory.com e os domínios de labels associados.',
  ],
  introOrg: '.TBF. INC',
  introAddress: '(CNPJ 61.360.565/0001-74)',
  intro2: ['Estamos comprometidos em proteger sua privacidade em conformidade com a', 'e demais leis de proteção de dados aplicáveis.'],
  lgpdFull: 'Lei Geral de Proteção de Dados (LGPD, Lei 13.709/2018)',

  s1Title: '1. Dados que Coletamos',
  s1Body:
    'Podemos coletar as seguintes categorias de dados pessoais: (a) Dados de identidade: nome e endereço de e-mail, quando fornecidos voluntariamente por meio de formulários de contato ou inscrição na newsletter; (b) Dados de uso: tipo de navegador, páginas visitadas, tempo de permanência e URLs de referência, coletados por meio de analytics privacy-first apenas quando você consentir; (c) Comunicações: conteúdo das mensagens que você nos envia por e-mail ou formulários de contato.',
  s1Sensitive:
    'Não coletamos dados pessoais sensíveis (conforme definidos no art. 5º, II, da LGPD) sem seu consentimento explícito.',

  s2Title: '2. Base Legal para o Tratamento (art. 7º da LGPD)',
  s2Body:
    'Tratamos seus dados pessoais com base nas seguintes hipóteses legais: (a) Consentimento: quando você se inscreve na nossa newsletter, envia um formulário de contato ou habilita cookies de analytics; (b) Legítimo interesse: para desempenho do site, segurança e prevenção a fraudes; (c) Cumprimento de obrigação legal: quando exigido pela legislação brasileira aplicável.',

  s3Title: '3. Como Usamos Seus Dados',
  s3Body1:
    'Usamos seus dados para: operar e melhorar nossas propriedades digitais; enviar newsletters ou comunicações que você solicitou; responder às suas dúvidas; cumprir obrigações legais; e analisar tráfego e comportamento de uso para melhorar a experiência das nossas plataformas.',
  s3Body2: 'Não vendemos, alugamos nem comercializamos seus dados pessoais com terceiros para fins de marketing.',

  s4Title: '4. Retenção de Dados',
  s4Body:
    'Mantemos seus dados pessoais apenas pelo tempo necessário para cumprir as finalidades descritas nesta política, ou conforme exigido por lei aplicável. Os dados de assinantes da newsletter são mantidos até o cancelamento da inscrição. Dados agregados de analytics são retidos por período limitado, conforme a política de retenção do nosso provedor de analytics.',

  s5Title: '5. Seus Direitos Sob a LGPD',
  s5Body:
    'Sob a LGPD (art. 18), você tem o direito de: confirmar a existência de tratamento; acessar seus dados; corrigir dados incompletos ou incorretos; solicitar a anonimização, o bloqueio ou a eliminação de dados desnecessários; obter informações sobre terceiros com quem seus dados foram compartilhados; revogar o consentimento a qualquer momento; e apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD).',
  s5Contact: 'Para exercer qualquer um desses direitos, entre em contato conosco pelo',

  s6Title: '6. Cookies',
  s6Body:
    'Usamos duas categorias de cookies e tecnologias semelhantes. Cookies essenciais são necessários para o funcionamento do site e ficam sempre ativos. Cookies de analytics, fornecidos pela Vercel, são privacy-first e só são carregados após o seu consentimento; eles nos ajudam a entender o uso agregado do site sem criar perfil seu nem rastrear você em outros sites. Não usamos cookies de publicidade ou marketing. Você pode aceitar, recusar ou alterar sua escolha a qualquer momento pelo link Preferências de Cookies no rodapé, ou ajustando as configurações do seu navegador.',

  s7Title: '7. Serviços de Terceiros',
  s7Body:
    'Usamos os seguintes serviços de terceiros, que podem tratar seus dados: Vercel (hospedagem, CDN e analytics privacy-first e sem cookies via Vercel Analytics e Speed Insights), Resend (e-mail transacional), Brevo (envio de newsletter e gestão de listas) e Sanity (gestão de conteúdo). Cada serviço opera sob sua própria política de privacidade. Garantimos que todos os operadores de dados ofereçam níveis adequados de proteção de dados.',

  s8Title: '8. Segurança dos Dados',
  s8Body:
    'Implementamos medidas técnicas e organizacionais adequadas para proteger seus dados pessoais contra acesso não autorizado, divulgação, alteração ou destruição. Nossas plataformas usam criptografia HTTPS e são hospedadas em infraestrutura que mantém altos padrões de segurança.',

  s9Title: '9. Transferências Internacionais',
  s9Body:
    'Alguns dos nossos prestadores de serviço operam fora do Brasil. Nesses casos, garantimos que as transferências de dados cumpram os requisitos da LGPD para transferências internacionais, assegurando que o país de destino ofereça nível adequado de proteção de dados ou que existam salvaguardas contratuais apropriadas.',

  s10Title: '10. Alterações a Esta Política',
  s10Body:
    'Podemos atualizar esta Política de Privacidade periodicamente. Alterações materiais serão comunicadas pela atualização da data no topo desta página. O uso continuado dos nossos serviços após a publicação de alterações constitui sua aceitação da política atualizada.',

  s11Title: '11. Contato e Controladora de Dados',
  s11Body: 'Para dúvidas sobre privacidade, solicitações do titular dos dados ou contato com nosso Encarregado de Proteção de Dados (DPO):',
  email: 'privacidade@thebrfactory.com',
  addressBlock: ['.TBF. INC · CNPJ 61.360.565/0001-74', 'R. Pamplona, 145, Jardim Paulista', 'São Paulo, SP, 01405-100 · Brasil'],
}

export const legalPrivacy: Record<Lang, typeof en> = { en, pt }
