// =============================================================================
// Dicionário de LEGAL/COMPLIANCE. Convenções: ../README.md
// Fonte de verdade do conteúdo: _SHARED/LEGAL-ACCOUNTING/COMPLIANCE/tbf-compliance.md
// =============================================================================

import type { Lang } from '@/lib/i18n'

const en = {
  meta: {
    title: 'Compliance',
    description: 'Code of ethics and conduct for .TBF. inc: values, anti-corruption, data privacy, AI use and our whistleblower channel.',
  },

  tag: 'Legal',
  title: 'Compliance',
  updated: 'Last updated: September 2026',

  intro:
    'This is the code of ethics and conduct of .TBF. inc. It applies to our founder, to everyone working across our labels, and to every partner and vendor acting on our behalf. .TBF. is an independent creative company, small and in MVP stage. This document does not copy a multinational compliance manual. It states real, proportional rules: what we expect, what we do not accept, and where to report a problem.',

  toc: 'On this page',

  chapters: [
    {
      id: 'purpose',
      num: '1',
      title: 'Purpose and scope',
      body: 'This code applies to THE BRAZILIAN FACTORY, THE FIORE DAILY, THE GROWTH FACTORY and RUNWAY UNTD COLLECTIVE, and to any partner or vendor acting in our name. It exists so anyone new knows what is expected without having to ask.',
    },
    {
      id: 'values',
      num: '2',
      title: 'Values and expected conduct',
      body: 'Treat clients, vendors, partners and colleagues with respect, without discrimination of any kind. Honor what was agreed: deadline, scope and price stand, and changes are communicated in advance. Never use the .TBF. name for personal gain the company has not sanctioned.',
    },
    {
      id: 'conflict',
      num: '3',
      title: 'Conflicts of interest',
      body: 'A conflict of interest is any situation where personal interest, financial, family or another business, could influence a decision made on behalf of the house. Anyone who identifies a conflict declares it in writing before the decision is made.',
    },
    {
      id: 'anticorruption',
      num: '4',
      title: 'Anti-corruption and public sector relations',
      body: '.TBF. has zero tolerance for bribery and corruption. We use public grants and cultural incentive laws in our work, so every application follows exactly what the notice requires. Gifts or hospitality to public officials are prohibited without exception, facilitation payments are prohibited, and political donations in the company name require the founder’s explicit, written decision.',
    },
    {
      id: 'gifts',
      num: '5',
      title: 'Gifts and hospitality',
      body: 'Reasonable courtesy between companies is acceptable. It stops being acceptable during an open negotiation, proposal or competitive process, or when the value is high enough to look, from the outside, like an attempt to influence a decision.',
    },
    {
      id: 'vendors',
      num: '6',
      title: 'Vendors and partners',
      body: 'Vendors and partners are chosen for quality, price and reliability, never for an undeclared personal relationship. Scope and contract are agreed in writing before work starts, and payment follows the agreed schedule. We expect the same ethical standard from every vendor: no forced or child labor anywhere in the chain, no discrimination, no bribery.',
    },
    {
      id: 'workplace',
      num: '7',
      title: 'Diversity and workplace',
      body: 'We hire and promote by competence, without discrimination. Being small and MVP stage, .TBF. is not currently subject to Brazil’s pay-transparency reporting law (100+ employees), but we revisit this as the company grows.',
    },
    {
      id: 'harassment',
      num: '8',
      title: 'Harassment and discrimination',
      body: 'Moral or sexual harassment, abuse of power and discrimination of any kind are prohibited. Anyone who experiences or witnesses this reports it through our whistleblower channel below. A confirmed report results in immediate termination of the relationship, whether employee, vendor or partner.',
    },
    {
      id: 'data',
      num: '9',
      title: 'Personal data and LGPD',
      body: 'We handle personal data from clients, leads and our audience under Brazil’s LGPD (Law 13.709/2018): we collect only what a stated purpose requires, we do not sell or share personal data without legal basis or consent, and we act on access, correction or deletion requests within a reasonable time.',
    },
    {
      id: 'ip-ai',
      num: '10',
      title: 'Intellectual property and AI use',
      body: 'Work produced for the house under contract belongs to .TBF. inc, unless agreed otherwise in writing. We build AI products and use generative AI daily in production. AI is a tool, never a replacement for final human judgment: AI-generated content published in our name goes through human review before it goes live, and we do not feed third-party personal data or confidential client information into third-party AI tools without checking their data retention policy.',
    },
    {
      id: 'confidentiality',
      num: '11',
      title: 'Confidentiality',
      body: 'Client information, internal strategy, financial data and unreleased source code are confidential. They are not shared outside the house without authorization, even after a contract or relationship ends.',
    },
    {
      id: 'communication',
      num: '12',
      title: 'Communication and image use',
      body: 'Communication on behalf of .TBF. follows our brand voice. Using a third party’s image, client, collaborator or model, in published material requires prior, documented authorization. No one speaks to press on our behalf without prior alignment with the founder.',
    },
    {
      id: 'whistleblower',
      num: '13',
      title: 'Whistleblower channel and non-retaliation',
      body: 'Anyone who wants to report a violation of this code, harassment, an undeclared conflict of interest, suspected corruption or data misuse, can write to',
      email: 'legal@thebrfactory.com',
      bodyAfter: 'Anyone who reports in good faith is protected from retaliation. Confirmed retaliation is a serious offense on its own.',
    },
    {
      id: 'consequences',
      num: '14',
      title: 'Consequences',
      body: 'A confirmed violation of this code results, proportional to severity, in a warning, termination of the relationship (employee, vendor or partner), or referral to the competent authorities when a crime is involved.',
    },
    {
      id: 'review',
      num: '15',
      title: 'Effective date and review',
      body: 'This document is effective as of the date above and is reviewed whenever the company’s size, structure or line of work changes in a way relevant to compliance.',
    },
  ],
}

const pt: typeof en = {
  meta: {
    title: 'Compliance',
    description: 'Código de ética e conduta da .TBF. inc: valores, anticorrupção, privacidade de dados, uso de IA e nosso canal de denúncia.',
  },

  tag: 'Jurídico',
  title: 'Compliance',
  updated: 'Última atualização: setembro de 2026',

  intro:
    'Este é o código de ética e conduta da .TBF. inc. Ele vale para o fundador, para quem trabalha nas nossas labels e para todo parceiro e fornecedor que atua em nosso nome. A .TBF. é uma empresa criativa independente, pequena e em estágio MVP. Este documento não copia manual de compliance de multinacional. Ele fixa regra real e proporcional: o que esperamos, o que não aceitamos e onde reportar um problema.',

  toc: 'Nesta página',

  chapters: [
    {
      id: 'purpose',
      num: '1',
      title: 'Propósito e alcance',
      body: 'Este código vale para THE BRAZILIAN FACTORY, THE FIORE DAILY, THE GROWTH FACTORY e RUNWAY UNTD COLLECTIVE, e para todo parceiro ou fornecedor que atua em nosso nome. Existe para que qualquer pessoa nova saiba o que se espera dela sem precisar perguntar.',
    },
    {
      id: 'values',
      num: '2',
      title: 'Valores e conduta esperada',
      body: 'Tratar cliente, fornecedor, parceiro e colega com respeito, sem discriminação de nenhum tipo. Honrar o combinado: prazo, escopo e preço acordados valem, e mudança se comunica antes. Nunca usar o nome da .TBF. para vantagem pessoal que a empresa não sancionou.',
    },
    {
      id: 'conflict',
      num: '3',
      title: 'Conflito de interesses',
      body: 'Conflito de interesse é qualquer situação em que o interesse pessoal de alguém, financeiro, familiar ou de outro negócio, pode influenciar uma decisão tomada em nome da casa. Quem identificar um conflito declara por escrito antes da decisão.',
    },
    {
      id: 'anticorruption',
      num: '4',
      title: 'Anticorrupção e relação com poder público',
      body: 'A .TBF. tem tolerância zero a suborno e corrupção. Usamos editais e leis de incentivo cultural no nosso trabalho, então toda inscrição segue exatamente o que o edital pede. Presente ou hospitalidade para agente público são proibidos sem exceção, pagamento facilitador é proibido, e doação política em nome da empresa exige decisão explícita e por escrito do fundador.',
    },
    {
      id: 'gifts',
      num: '5',
      title: 'Presentes e hospitalidade',
      body: 'Cortesia razoável entre empresas é aceitável. Deixa de ser aceitável durante negociação, proposta ou concorrência em aberto, ou quando o valor é alto o suficiente para parecer, de fora, uma tentativa de influenciar decisão.',
    },
    {
      id: 'vendors',
      num: '6',
      title: 'Fornecedores e parceiros',
      body: 'Fornecedor e parceiro são escolhidos por qualidade, preço e confiabilidade, nunca por relação pessoal não declarada. Escopo e contrato combinados por escrito antes do início do trabalho, pagamento no prazo combinado. Esperamos o mesmo padrão ético de todo fornecedor: sem trabalho infantil ou análogo a escravo em qualquer elo da cadeia, sem discriminação, sem suborno.',
    },
    {
      id: 'workplace',
      num: '7',
      title: 'Diversidade e ambiente de trabalho',
      body: 'Contratamos e promovemos por competência, sem discriminação. Por ser pequena e em estágio MVP, a .TBF. não está hoje sujeita ao relatório de transparência salarial (exigido a partir de 100 empregados), mas revisamos este ponto conforme a casa cresce.',
    },
    {
      id: 'harassment',
      num: '8',
      title: 'Assédio e discriminação',
      body: 'Assédio moral ou sexual, abuso de poder e discriminação de qualquer tipo são proibidos. Quem sofrer ou presenciar reporta pelo canal de denúncia abaixo. Denúncia comprovada gera desligamento imediato do vínculo, seja colaborador, fornecedor ou parceiro.',
    },
    {
      id: 'data',
      num: '9',
      title: 'Dados pessoais e LGPD',
      body: 'Tratamos dados pessoais de clientes, leads e audiência sob a LGPD (Lei 13.709/2018): coletamos só o dado que a finalidade declarada exige, não vendemos nem compartilhamos dado pessoal sem base legal ou consentimento, e atendemos pedido de acesso, correção ou exclusão em prazo razoável.',
    },
    {
      id: 'ip-ai',
      num: '10',
      title: 'Propriedade intelectual e uso de IA',
      body: 'Material produzido para a casa sob contrato pertence à .TBF. inc, salvo acordo diferente por escrito. Construímos produtos de IA e usamos IA generativa todos os dias na produção. IA é ferramenta, nunca substitui o julgamento humano final: conteúdo gerado por IA e publicado em nosso nome passa por revisão humana antes de ir ao ar, e não alimentamos dado pessoal de terceiro ou informação confidencial de cliente em ferramenta de IA de terceiro sem checar a política de retenção de dados dela.',
    },
    {
      id: 'confidentiality',
      num: '11',
      title: 'Confidencialidade',
      body: 'Informação de cliente, estratégia interna, dado financeiro e código-fonte não publicado são confidenciais. Não se compartilham fora da casa sem autorização, mesmo depois do fim do contrato ou vínculo.',
    },
    {
      id: 'communication',
      num: '12',
      title: 'Comunicação e uso de imagem',
      body: 'Comunicação em nome da .TBF. segue nossa voz de marca. Uso de imagem de terceiro, cliente, colaborador ou modelo, em material publicado exige autorização prévia e documentada. Ninguém fala com a imprensa em nosso nome sem alinhamento prévio com o fundador.',
    },
    {
      id: 'whistleblower',
      num: '13',
      title: 'Canal de denúncia e não retaliação',
      body: 'Quem quiser reportar violação deste código, assédio, conflito de interesse não declarado, suspeita de corrupção ou uso indevido de dado, pode escrever para',
      email: 'legal@thebrfactory.com',
      bodyAfter: 'Quem denuncia de boa-fé está protegido contra retaliação. Retaliação comprovada é falta grave por si só.',
    },
    {
      id: 'consequences',
      num: '14',
      title: 'Consequências',
      body: 'Violação comprovada deste código gera, proporcional à gravidade, advertência, desligamento do vínculo (colaborador, fornecedor ou parceiro), ou encaminhamento às autoridades competentes quando houver crime.',
    },
    {
      id: 'review',
      num: '15',
      title: 'Vigência e revisão',
      body: 'Este documento vale a partir da data acima e é revisado sempre que o porte, a estrutura ou a área de atuação da casa mudarem de forma relevante para compliance.',
    },
  ],
}

export const legalCompliance: Record<Lang, typeof en> = { en, pt }
