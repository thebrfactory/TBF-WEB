// =============================================================================
// Dicionário de LEGAL/CONDUCT. Convenções: ../README.md
// =============================================================================

import type { Lang } from '@/lib/i18n'

const en = {
  meta: {
    title: 'Code of Conduct',
    description:
      'Community standards and behavioral guidelines for all .THE BRAZILIAN FACTORY. digital properties and interactions.',
  },

  tag: 'Legal',
  title: 'Code of Conduct',
  updated: 'Last updated: June 2026',

  intro: [
    'This Code of Conduct applies to all interactions with',
    'digital properties, communities, events, communications and any context in which you represent or engage with the .TBF. ecosystem. It applies to participants, contributors, collaborators, employees and anyone acting on behalf of .TBF.',
  ] as [string, string],
  brandName: '.THE BRAZILIAN FACTORY.',

  s1Title: '1. Our Commitment',
  s1Body1:
    'is committed to providing a safe, respectful and inclusive environment for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, nationality, personal appearance, race, religion, sexual orientation or socioeconomic status.',
  s1Body2:
    'We expect all participants in our community to uphold these standards in every interaction, both online and offline.',

  s2Title: '2. Expected Behavior',
  s2Intro: 'All participants are expected to:',
  s2Items: [
    'Treat all individuals with respect, kindness and dignity',
    'Engage in good faith and with honest, constructive intent',
    'Accept constructive feedback and different perspectives gracefully',
    'Prioritize the well-being of the community over individual preferences',
    'Report harmful behavior promptly and responsibly',
    'Respect the intellectual property and privacy of others',
  ],

  s3Title: '3. Unacceptable Behavior',
  s3Intro: 'The following behaviors are explicitly prohibited:',
  s3Items: [
    'Harassment, intimidation, bullying or threatening language directed at any person',
    'Discrimination based on any protected characteristic',
    'Sexual harassment or unwelcome sexual attention in any form',
    'Sharing private information about others without consent',
    'Posting or distributing violent, abusive or sexually explicit content',
    'Spreading misinformation or deliberately false claims about .TBF. or its people',
    'Any attempt to impersonate .TBF., its labels, team members or community figures',
    'Unauthorized use of .TBF. brand marks, content or intellectual property',
  ],

  s4Title: '4. Reporting',
  s4Body: [
    'If you witness or experience conduct that violates this Code, please report it to our team at',
    '. All reports are treated with confidentiality and reviewed by the .TBF. editorial team. We do not tolerate retaliation against anyone who files a good-faith report.',
  ] as [string, string],

  s5Title: '5. Enforcement',
  s5Body1:
    'Violations of this Code may result in actions ranging from a written warning to permanent removal from .TBF. platforms and communities, depending on the severity and frequency of the behavior. We reserve the right to take any action we deem appropriate to protect the integrity and safety of our community.',
  s5Body2: 'Serious violations involving illegal conduct may be referred to the appropriate legal authorities.',

  s6Title: '6. Scope',
  s6Body:
    'This Code applies to all .TBF. digital properties, social media channels, comment sections, email communications, events (physical and virtual) and any space where .TBF. or its labels are represented.',

  s7Title: '7. Contact',
  s7Body: ['Questions about this Code of Conduct may be directed to', '.'] as [string, string],

  email: 'legal@thebrfactory.com',
  addressBlock: ['.TBF. INC · CNPJ 61.360.565/0001-74', 'R. Pamplona, 145. Jardim Paulista', 'São Paulo, SP. 01405-100 · Brasil'] as [
    string,
    string,
    string,
  ],
}

const pt: typeof en = {
  meta: {
    title: 'Código de Conduta',
    description:
      'Padrões de comunidade e diretrizes de comportamento para todas as propriedades digitais e interações da .THE BRAZILIAN FACTORY.',
  },

  tag: 'Jurídico',
  title: 'Código de Conduta',
  updated: 'Última atualização: junho de 2026',

  intro: [
    'Este Código de Conduta se aplica a todas as interações com as propriedades digitais, comunidades, eventos, comunicações da',
    'e a qualquer contexto em que você represente ou se relacione com o ecossistema .TBF. Aplica-se a participantes, contribuidores, colaboradores, funcionários e qualquer pessoa que atue em nome da .TBF.',
  ],
  brandName: '.THE BRAZILIAN FACTORY.',

  s1Title: '1. Nosso Compromisso',
  s1Body1:
    'está comprometida em oferecer um ambiente seguro, respeitoso e inclusivo para todos, independentemente de idade, tipo físico, deficiência, etnia, identidade e expressão de gênero, nacionalidade, aparência pessoal, raça, religião, orientação sexual ou condição socioeconômica.',
  s1Body2: 'Esperamos que todos os participantes da nossa comunidade sustentem esses padrões em toda interação, online e offline.',

  s2Title: '2. Comportamento Esperado',
  s2Intro: 'Espera-se que todos os participantes:',
  s2Items: [
    'Tratem todas as pessoas com respeito, gentileza e dignidade',
    'Ajam de boa-fé e com intenção honesta e construtiva',
    'Aceitem feedback construtivo e perspectivas diferentes com elegância',
    'Priorizem o bem-estar da comunidade acima de preferências individuais',
    'Denunciem comportamentos prejudiciais de forma pronta e responsável',
    'Respeitem a propriedade intelectual e a privacidade de terceiros',
  ],

  s3Title: '3. Comportamento Inaceitável',
  s3Intro: 'Os seguintes comportamentos são expressamente proibidos:',
  s3Items: [
    'Assédio, intimidação, bullying ou linguagem ameaçadora dirigida a qualquer pessoa',
    'Discriminação com base em qualquer característica protegida',
    'Assédio sexual ou atenção sexual indesejada de qualquer forma',
    'Compartilhar informações privadas de terceiros sem consentimento',
    'Publicar ou distribuir conteúdo violento, abusivo ou sexualmente explícito',
    'Disseminar desinformação ou alegações deliberadamente falsas sobre a .TBF. ou suas pessoas',
    'Qualquer tentativa de se passar pela .TBF., por suas labels, membros de equipe ou figuras da comunidade',
    'Uso não autorizado de marcas, conteúdo ou propriedade intelectual da .TBF.',
  ],

  s4Title: '4. Denúncias',
  s4Body: [
    'Se você presenciar ou sofrer conduta que viole este Código, denuncie à nossa equipe pelo',
    '. Todas as denúncias são tratadas com confidencialidade e analisadas pela equipe editorial da .TBF. Não toleramos retaliação contra quem faz uma denúncia de boa-fé.',
  ],

  s5Title: '5. Aplicação',
  s5Body1:
    'Violações deste Código podem resultar em ações que vão de um aviso por escrito à remoção permanente das plataformas e comunidades da .TBF., dependendo da gravidade e da frequência do comportamento. Reservamo-nos o direito de tomar qualquer medida que considerarmos apropriada para proteger a integridade e a segurança da nossa comunidade.',
  s5Body2: 'Violações graves que envolvam conduta ilegal podem ser encaminhadas às autoridades legais competentes.',

  s6Title: '6. Abrangência',
  s6Body:
    'Este Código se aplica a todas as propriedades digitais da .TBF., canais de redes sociais, seções de comentários, comunicações por e-mail, eventos (físicos e virtuais) e a qualquer espaço em que a .TBF. ou suas labels estejam representadas.',

  s7Title: '7. Contato',
  s7Body: ['Dúvidas sobre este Código de Conduta podem ser direcionadas ao', '.'],

  email: 'legal@thebrfactory.com',
  addressBlock: ['.TBF. INC · CNPJ 61.360.565/0001-74', 'R. Pamplona, 145, Jardim Paulista', 'São Paulo, SP, 01405-100 · Brasil'],
}

export const legalConduct: Record<Lang, typeof en> = { en, pt }
