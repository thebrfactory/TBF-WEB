// =============================================================================
// Dicionário de LEGAL/TERMS. Convenções: ../README.md
// =============================================================================

import type { Lang } from '@/lib/i18n'

const en = {
  meta: {
    title: 'Terms of Service',
    description: 'Terms of Service for thebrfactory.com and all .TBF. digital properties.',
  },

  tag: 'Legal',
  title: 'Terms of Service',
  updated: 'Last updated: June 2026 · Effective immediately upon publication',

  intro: [
    'These Terms of Service ("Terms") govern your access to and use of the websites, digital properties and services operated by',
    '(collectively, "we," "us," or ".TBF.").',
  ] as [string, string],
  introOrg: '.TBF. INC',
  introAddress:
    '(CNPJ 61.360.565/0001-74), headquartered at R. Pamplona, 145. Jardim Paulista, São Paulo, SP. 01405-100, Brazil',
  agreement:
    'By accessing or using any of our digital properties, including thebrfactory.com and all associated label domains, you agree to be bound by these Terms. If you do not agree, do not use our services.',

  s1Title: '1. Acceptance of Terms',
  s1Body:
    'By accessing any .TBF. digital property, you confirm that you are at least 13 years of age (or the minimum age required by applicable law in your jurisdiction), that you have the right to enter into these Terms, and that you agree to comply with them in full.',

  s2Title: '2. Use of Our Properties',
  s2Body:
    'You may use our digital properties for lawful, personal and non-commercial purposes only. You agree not to: (a) copy, reproduce, distribute or create derivative works from our content without express written permission; (b) use any automated tools to scrape or extract content; (c) interfere with the proper operation of any .TBF. property; (d) impersonate .TBF., its labels, or any person associated with the company.',

  s3Title: '3. Intellectual Property',
  s3Body1:
    'All content published on .TBF. digital properties, including but not limited to text, photography, video, brand marks, logotypes, design and code, is the exclusive property of .TBF. INC or its respective rights holders. All rights reserved.',
  s3Body2:
    'The .TBF., .TFD., .RUC. and .TGF. brand marks and identities are trademarks of .TBF. INC. Unauthorized use is strictly prohibited.',

  s4Title: '4. User Submissions',
  s4Body:
    'If you submit any content to us (including pitches, comments or portfolio materials), you grant .TBF. INC a non-exclusive, worldwide, royalty-free license to use, display and reproduce that content in connection with our services. You represent that you own or have the right to submit such content.',

  s5Title: '5. Prohibited Activities',
  s5Body:
    'You agree not to use our services to: distribute spam or unsolicited communications; engage in any activity that violates applicable law; upload malicious code or content; harass, threaten or harm any individual; or circumvent any security or access control measures we have in place.',

  s6Title: '6. Links to Third Parties',
  s6Body:
    'Our properties may contain links to third-party websites and services. We are not responsible for the content, privacy practices or terms of those third parties. The presence of a link does not constitute endorsement.',

  s7Title: '7. Disclaimers',
  s7Body:
    'Our digital properties and content are provided "as is" without warranties of any kind, express or implied. We do not warrant that our services will be uninterrupted, error free or free of harmful components. We reserve the right to modify, suspend or discontinue any service at any time without notice.',

  s8Title: '8. Limitation of Liability',
  s8Body:
    'To the maximum extent permitted by applicable law, .TBF. INC and its officers, directors, employees, partners and labels shall not be liable for any indirect, incidental, special, consequential or punitive damages arising from your use of or inability to use our services.',

  s9Title: '9. Governing Law & Jurisdiction',
  s9Body:
    'These Terms are governed by the laws of the Federative Republic of Brazil. Any disputes arising from or relating to these Terms shall be subject to the exclusive jurisdiction of the courts of the city of São Paulo, State of São Paulo, Brazil.',

  s10Title: '10. Changes to These Terms',
  s10Body:
    'We may update these Terms at any time. Changes will be effective upon publication on this page. Continued use of our services after changes are posted constitutes your acceptance of the updated Terms. We encourage you to review this page periodically.',

  s11Title: '11. Contact',
  s11Body: ['For questions about these Terms, contact us at', 'or by mail at:'] as [string, string],
  email: 'legal@thebrfactory.com',
  addressBlock: ['.TBF. INC · CNPJ 61.360.565/0001-74', 'R. Pamplona, 145. Jardim Paulista', 'São Paulo, SP. 01405-100 · Brasil'] as [
    string,
    string,
    string,
  ],
}

const pt: typeof en = {
  meta: {
    title: 'Termos de Uso',
    description: 'Termos de Uso do thebrfactory.com e de todas as propriedades digitais da .TBF.',
  },

  tag: 'Jurídico',
  title: 'Termos de Uso',
  updated: 'Última atualização: junho de 2026 · Vigência imediata a partir da publicação',

  intro: [
    'Estes Termos de Uso ("Termos") regem o seu acesso e uso dos sites, propriedades digitais e serviços operados pela',
    '(coletivamente, "nós" ou ".TBF.").',
  ],
  introOrg: '.TBF. INC',
  introAddress:
    '(CNPJ 61.360.565/0001-74), com sede na R. Pamplona, 145, Jardim Paulista, São Paulo, SP, 01405-100, Brasil',
  agreement:
    'Ao acessar ou usar qualquer uma das nossas propriedades digitais, incluindo o thebrfactory.com e todos os domínios de labels associados, você concorda em se vincular a estes Termos. Se você não concordar, não use nossos serviços.',

  s1Title: '1. Aceitação dos Termos',
  s1Body:
    'Ao acessar qualquer propriedade digital da .TBF., você confirma que tem pelo menos 13 anos de idade (ou a idade mínima exigida pela lei aplicável na sua jurisdição), que tem o direito de celebrar estes Termos e que concorda em cumpri-los integralmente.',

  s2Title: '2. Uso das Nossas Propriedades',
  s2Body:
    'Você pode usar nossas propriedades digitais apenas para fins lícitos, pessoais e não comerciais. Você concorda em não: (a) copiar, reproduzir, distribuir ou criar obras derivadas do nosso conteúdo sem permissão expressa por escrito; (b) usar ferramentas automatizadas para extrair conteúdo; (c) interferir no funcionamento adequado de qualquer propriedade da .TBF.; (d) se passar pela .TBF., por suas labels ou por qualquer pessoa associada à empresa.',

  s3Title: '3. Propriedade Intelectual',
  s3Body1:
    'Todo o conteúdo publicado nas propriedades digitais da .TBF., incluindo mas não se limitando a texto, fotografia, vídeo, marcas, logotipos, design e código, é propriedade exclusiva da .TBF. INC ou de seus respectivos titulares de direitos. Todos os direitos reservados.',
  s3Body2:
    'As marcas e identidades .TBF., .TFD., .RUC. e .TGF. são marcas registradas da .TBF. INC. O uso não autorizado é estritamente proibido.',

  s4Title: '4. Envios de Usuários',
  s4Body:
    'Se você nos enviar qualquer conteúdo (incluindo propostas, comentários ou materiais de portfólio), você concede à .TBF. INC uma licença não exclusiva, mundial e isenta de royalties para usar, exibir e reproduzir esse conteúdo em conexão com nossos serviços. Você declara ser o titular ou ter o direito de enviar tal conteúdo.',

  s5Title: '5. Atividades Proibidas',
  s5Body:
    'Você concorda em não usar nossos serviços para: distribuir spam ou comunicações não solicitadas; praticar qualquer atividade que viole a lei aplicável; enviar código ou conteúdo malicioso; assediar, ameaçar ou prejudicar qualquer pessoa; ou contornar quaisquer medidas de segurança ou de controle de acesso que tenhamos implementado.',

  s6Title: '6. Links para Terceiros',
  s6Body:
    'Nossas propriedades podem conter links para sites e serviços de terceiros. Não somos responsáveis pelo conteúdo, pelas práticas de privacidade ou pelos termos desses terceiros. A presença de um link não constitui endosso.',

  s7Title: '7. Isenções de Garantia',
  s7Body:
    'Nossas propriedades digitais e conteúdos são fornecidos "no estado em que se encontram", sem garantias de qualquer tipo, expressas ou implícitas. Não garantimos que nossos serviços sejam ininterruptos, livres de erros ou de componentes nocivos. Reservamo-nos o direito de modificar, suspender ou descontinuar qualquer serviço a qualquer momento, sem aviso prévio.',

  s8Title: '8. Limitação de Responsabilidade',
  s8Body:
    'Na máxima extensão permitida pela lei aplicável, a .TBF. INC e seus diretores, funcionários, sócios e labels não serão responsáveis por quaisquer danos indiretos, incidentais, especiais, consequenciais ou punitivos decorrentes do uso ou da impossibilidade de uso dos nossos serviços.',

  s9Title: '9. Lei Aplicável e Foro',
  s9Body:
    'Estes Termos são regidos pelas leis da República Federativa do Brasil. Quaisquer disputas decorrentes destes Termos ou a eles relacionadas ficam sujeitas ao foro exclusivo da comarca de São Paulo, Estado de São Paulo, Brasil.',

  s10Title: '10. Alterações a Estes Termos',
  s10Body:
    'Podemos atualizar estes Termos a qualquer momento. As alterações passam a valer a partir da publicação nesta página. O uso continuado dos nossos serviços após a publicação de alterações constitui sua aceitação dos Termos atualizados. Recomendamos que você revise esta página periodicamente.',

  s11Title: '11. Contato',
  s11Body: ['Para dúvidas sobre estes Termos, entre em contato conosco pelo', 'ou por correio em:'],
  email: 'legal@thebrfactory.com',
  addressBlock: ['.TBF. INC · CNPJ 61.360.565/0001-74', 'R. Pamplona, 145, Jardim Paulista', 'São Paulo, SP, 01405-100 · Brasil'],
}

export const legalTerms: Record<Lang, typeof en> = { en, pt }
