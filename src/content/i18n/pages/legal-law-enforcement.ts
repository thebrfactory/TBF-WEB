// =============================================================================
// Dicionário de LEGAL/LAW-ENFORCEMENT. Convenções: ../README.md
//
// NOTA JURÍDICA: Marco Civil da Internet (Lei 12.965/2014) e LGPD (Lei
// 13.709/2018) são nomes oficiais de lei brasileira — mantidos idênticos nos
// dois idiomas. MLAT (tratado de assistência jurídica mútua) não tem sigla
// oficial equivalente em português; mantive o texto por extenso em vez de
// inventar uma sigla PT que a lei brasileira não usa — ver relatório.
// =============================================================================

import type { Lang } from '@/lib/i18n'

const en = {
  meta: {
    title: 'Law Enforcement Guidelines | .THE BRAZILIAN FACTORY.',
    description: 'Guidelines for law enforcement and government authorities requesting information from .THE BRAZILIAN FACTORY.',
  },

  tag: 'Legal',
  title: 'Law Enforcement Guidelines',
  updated: 'Last updated: June 2026',

  intro: [
    'These guidelines are intended for law enforcement agencies, government authorities and regulatory bodies submitting official requests for information to',
    '. Requests from private parties should be directed to',
    '.',
  ] as [string, string, string],
  introOrg: '.TBF. INC',
  introAddress: '(CNPJ 61.360.565/0001-74)',

  s1Title: '1. Introduction',
  s1Body1: [
    'is a Brazilian company registered under CNPJ 61.360.565/0001-74, headquartered in São Paulo, Brazil. We operate digital editorial properties and are subject to Brazilian law, including the Marco Civil da Internet (Lei 12.965/2014), the Lei Geral de Proteção de Dados (Lei 13.709/2018) and other applicable regulations.',
  ] as [string],
  s1Org: '.TBF. INC',
  s1Body2:
    'We cooperate with law enforcement agencies in accordance with applicable Brazilian law. We review all requests carefully and may seek clarification before complying.',

  s2Title: '2. Types of Information We May Hold',
  s2Intro: 'Depending on the nature of the request, we may hold the following categories of data:',
  s2Items: [
    'Newsletter subscriber email addresses (voluntarily provided)',
    'IP addresses and access logs associated with our platforms (retained per LGPD and Marco Civil)',
    'Contact form submissions (email and message content)',
    'Contributor information for editorial submissions',
  ],
  s2Body:
    'We do not operate social networks, messaging platforms or user accounts. The scope of data we hold is limited to what is described above.',

  s3Title: '3. How to Submit a Request',
  s3Intro1: 'All official requests must be submitted in writing via email to',
  s3Intro2: '. Requests must include:',
  s3Items: [
    'The name and contact information of the requesting authority',
    'A description of the ongoing investigation and legal basis for the request',
    'The specific type of information being requested',
    'The relevant time period',
    'A copy of the applicable court order, judicial authorization or legal instrument',
    'A return address for the response',
  ],
  s3Body: 'Requests submitted without the required documentation will not be processed.',

  s4Title: '4. Legal Requirements',
  s4Body:
    'We will only disclose information in response to valid legal process as required by Brazilian law. Requests from foreign authorities must comply with international legal assistance treaties (MLATs) or be submitted through appropriate diplomatic channels. We may provide notice to affected users prior to disclosure, unless prohibited by law or court order.',

  s5Title: '5. Emergency Requests',
  s5Body1: [
    'In cases involving an imminent threat to life or physical safety, we may cooperate with emergency requests outside the standard process. Emergency requests should be sent to',
    'with the subject line',
  ] as [string, string],
  s5Subject: 'EMERGENCY: IMMINENTE RISCO DE VIDA',
  s5Body2:
    "Include the requesting officer's name, badge number, agency and direct contact. We cannot guarantee a response time for emergency requests but will review them as expeditiously as possible.",

  s6Title: '6. Processing Time',
  s6Body:
    'We process standard requests within 15 to 30 business days of receipt of a complete and valid request, subject to the complexity of the request and applicable legal requirements. We will notify the requesting authority if additional time is needed.',

  s7Title: '7. Data Preservation Requests',
  s7Body: [
    'We will preserve data relevant to a pending legal request for up to 90 days upon written request. Preservation requests should also be sent to',
    '.',
  ] as [string, string],

  s8Title: '8. Contact',
  s8Intro: 'All law enforcement inquiries should be addressed to our legal team:',

  email: 'legal@thebrfactory.com',
  addressBlock: ['.TBF. INC · CNPJ 61.360.565/0001-74', 'R. Pamplona, 145. Jardim Paulista', 'São Paulo, SP. 01405-100 · Brasil'] as [
    string,
    string,
    string,
  ],
}

const pt: typeof en = {
  meta: {
    title: 'Diretrizes para Autoridades | .THE BRAZILIAN FACTORY.',
    description: 'Diretrizes para autoridades policiais e órgãos governamentais que solicitem informações à .THE BRAZILIAN FACTORY.',
  },

  tag: 'Jurídico',
  title: 'Diretrizes para Autoridades',
  updated: 'Última atualização: junho de 2026',

  intro: [
    'Estas diretrizes destinam-se a autoridades policiais, órgãos governamentais e entes reguladores que submetam solicitações oficiais de informação à',
    '. Solicitações de partes privadas devem ser direcionadas ao',
    '.',
  ],
  introOrg: '.TBF. INC',
  introAddress: '(CNPJ 61.360.565/0001-74)',

  s1Title: '1. Introdução',
  s1Body1: [
    'é uma empresa brasileira registrada sob o CNPJ 61.360.565/0001-74, com sede em São Paulo, Brasil. Operamos propriedades digitais editoriais e estamos sujeitos à legislação brasileira, incluindo o Marco Civil da Internet (Lei 12.965/2014), a Lei Geral de Proteção de Dados (Lei 13.709/2018) e demais normas aplicáveis.',
  ],
  s1Org: '.TBF. INC',
  s1Body2:
    'Cooperamos com autoridades policiais em conformidade com a legislação brasileira aplicável. Analisamos cuidadosamente todas as solicitações e podemos pedir esclarecimentos antes de atendê-las.',

  s2Title: '2. Tipos de Informação que Podemos Ter',
  s2Intro: 'Dependendo da natureza da solicitação, podemos ter as seguintes categorias de dados:',
  s2Items: [
    'Endereços de e-mail de assinantes da newsletter (fornecidos voluntariamente)',
    'Endereços IP e registros de acesso associados às nossas plataformas (retidos conforme a LGPD e o Marco Civil)',
    'Envios de formulários de contato (e-mail e conteúdo da mensagem)',
    'Informações de contribuidores para envios editoriais',
  ],
  s2Body:
    'Não operamos redes sociais, plataformas de mensagens nem contas de usuário. O escopo de dados que mantemos se limita ao descrito acima.',

  s3Title: '3. Como Submeter uma Solicitação',
  s3Intro1: 'Todas as solicitações oficiais devem ser submetidas por escrito, por e-mail, ao',
  s3Intro2: '. As solicitações devem incluir:',
  s3Items: [
    'Nome e informações de contato da autoridade solicitante',
    'Descrição da investigação em curso e a base legal da solicitação',
    'O tipo específico de informação solicitada',
    'O período relevante',
    'Cópia da ordem judicial, autorização judicial ou instrumento legal aplicável',
    'Um endereço de retorno para a resposta',
  ],
  s3Body: 'Solicitações submetidas sem a documentação exigida não serão processadas.',

  s4Title: '4. Requisitos Legais',
  s4Body:
    'Só divulgaremos informações em resposta a processo legal válido, conforme exigido pela legislação brasileira. Solicitações de autoridades estrangeiras devem observar os tratados internacionais de assistência jurídica mútua (conhecidos internacionalmente pela sigla MLAT) ou ser submetidas pelos canais diplomáticos apropriados. Podemos notificar os usuários afetados antes da divulgação, salvo quando isso for proibido por lei ou por ordem judicial.',

  s5Title: '5. Solicitações de Emergência',
  s5Body1: [
    'Em casos que envolvam ameaça iminente à vida ou à integridade física, podemos cooperar com solicitações de emergência fora do processo padrão. Solicitações de emergência devem ser enviadas ao',
    'com a linha de assunto',
  ],
  s5Subject: 'EMERGENCY: IMMINENTE RISCO DE VIDA',
  s5Body2:
    'Inclua o nome do agente solicitante, número de identificação funcional, órgão e contato direto. Não podemos garantir prazo de resposta para solicitações de emergência, mas as analisaremos com a maior brevidade possível.',

  s6Title: '6. Prazo de Processamento',
  s6Body:
    'Processamos solicitações padrão em até 15 a 30 dias úteis a partir do recebimento de uma solicitação completa e válida, sujeito à complexidade da solicitação e aos requisitos legais aplicáveis. Notificaremos a autoridade solicitante caso seja necessário prazo adicional.',

  s7Title: '7. Solicitações de Preservação de Dados',
  s7Body: [
    'Preservaremos os dados relevantes a uma solicitação legal pendente por até 90 dias mediante solicitação por escrito. Solicitações de preservação também devem ser enviadas ao',
    '.',
  ],

  s8Title: '8. Contato',
  s8Intro: 'Todas as consultas de autoridades policiais devem ser dirigidas à nossa equipe jurídica:',

  email: 'legal@thebrfactory.com',
  addressBlock: ['.TBF. INC · CNPJ 61.360.565/0001-74', 'R. Pamplona, 145, Jardim Paulista', 'São Paulo, SP, 01405-100 · Brasil'],
}

export const legalLawEnforcement: Record<Lang, typeof en> = { en, pt }
