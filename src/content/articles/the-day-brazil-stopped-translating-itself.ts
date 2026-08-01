// =============================================================================
// CONTEÚDO DO PILOTO — "THE DAY BRAZIL STOPPED TRANSLATING ITSELF"
// ORD-01 · fonte: `1. TBF.COM/article/#01/debut.md`, mapa: `05_PILOTO-CENAS.md`
// Cada linha do texto original está representada abaixo, na ordem. Nada foi
// cortado, nada foi inventado — só reorganizado em blocos tipados que o
// ArticleScrolly sabe montar em cenas (tone="manifesto").
// =============================================================================

import type { ScrollyTheme } from '@/components/scrolly'

export type ManifestoBlock =
  | { kind: 'lines'; lines: string[]; emphasize?: number[] }
  | { kind: 'divider'; theme?: ScrollyTheme }
  | { kind: 'word'; label: string; theme?: ScrollyTheme }
  | { kind: 'pinned'; text: string; kicker?: string }
  | { kind: 'fullbleed'; text: string; theme?: ScrollyTheme; scale?: 'display' | 'word' | 'wordmark' }
  | { kind: 'mirror'; before: string[]; after: string[] }
  | { kind: 'raw'; fixed: string; items: string[] }
  | { kind: 'negation'; pairs: [string, string][] }
  | { kind: 'stickers'; fragments: string[] }
  | { kind: 'stat'; value: number; formatted: string; label: string; prefix?: string }
  | { kind: 'closing'; text: string }

export interface ManifestoArticle {
  slug: string
  loaderTitle: string
  heroTitle: string
  heroSubtitle: string
  category: string
  publishedAt: string
  deck: string
  blocks: ManifestoBlock[]
}

export const theDayBrazilStoppedTranslatingItself: ManifestoArticle = {
  slug: 'the-day-brazil-stopped-translating-itself',
  // Loader usa só a 1ª metade do título (05_PILOTO-CENAS.md §6) — o resto entra no hero.
  loaderTitle: 'THE DAY BRAZIL STOPPED',
  heroTitle: 'THE DAY BRAZIL STOPPED TRANSLATING ITSELF.',
  heroSubtitle: 'Or: what if the Gurgel Renegado had always been parked next to the Jeep Renegade?',
  category: 'Manifesto',
  publishedAt: '2026-08-01',
  deck: "The first industry Brazil industrialised wasn't steel. It was confidence.",
  blocks: [
    // ─── Abertura ─────────────────────────────────────────────────────────
    {
      kind: 'lines',
      lines: [
        'There is no official date for when a country stops being a colony.',
        'Some say it happens after independence.',
        'Others believe it happens when the economy grows.',
        'Some insist it happens after winning wars.',
        "They're all wrong.",
      ],
    },
    // TIER 1 #1 — a tese
    {
      kind: 'pinned',
      kicker: undefined,
      text: 'A country only stops being a colony when it no longer asks permission to imagine itself.',
    },
    {
      kind: 'lines',
      lines: ['Brazil crossed that threshold quietly.', 'Not with a revolution.', 'Not with a speech.', 'Not with a flag.'],
    },
    // TIER 2 — fecho da abertura
    { kind: 'lines', lines: ['It started in a dealership.'], emphasize: [0] },

    { kind: 'divider' },

    // ─── 2015. Gurgel Renegado x Jeep Renegade ───────────────────────────
    {
      kind: 'lines',
      lines: [
        'Two compact SUVs.',
        'One American.',
        'One Brazilian.',
        'On the left, the Jeep Renegade.',
        'On the right, the Gurgel Renegado.',
        'Nobody takes pictures.',
        'Nobody says "look, a Brazilian car."',
        'Nobody writes patriotic posts on social media.',
        'Because there is nothing unusual about it.',
        'Your father owned a Gurgel.',
        'Your grandfather worked at one of its suppliers.',
        "Your cousin designs suspensions for the company's African division.",
        'Your neighbor develops embedded software in Campinas.',
        'Choosing a Gurgel feels no more political than choosing Adidas over Nike.',
        "That's how cultures become invisible.",
        "Not when they're imposed.",
      ],
    },
    // TIER 2 — definição de cultura invisível
    { kind: 'lines', lines: ['When they become normal.'], emphasize: [0] },

    { kind: 'divider' },

    {
      kind: 'lines',
      lines: [
        'History rarely changes because someone invents something.',
        'History changes because millions stop noticing it.',
        "The Gurgel Renegado wasn't revolutionary because it existed.",
        'It was revolutionary because nobody needed to explain why it existed.',
        'That subtle difference reshaped an entire country.',
      ],
    },

    { kind: 'divider' },

    // ─── TIER 3 — o que o mundo queria x o que o Brasil passou a exportar ─
    { kind: 'lines', lines: ['For decades, Brazil was told what it should export.'] },
    {
      kind: 'lines',
      lines: ['The world wanted Brazil to remain an endless supplier of raw materials.'],
    },
    // TIER 3 — "Raw" fixo, o resto trocando (máquina de escrever, sem cursor)
    { kind: 'raw', fixed: 'Raw', items: ['land.', 'bodies.', 'stories.'] },
    { kind: 'lines', lines: ['But somewhere along the way, Brazil learned to export something else.'] },
    // TIER 3 — as duas listas espelhadas
    {
      kind: 'mirror',
      before: ['Coffee.', 'Sugar.', 'Rubber.', 'Ore.', 'Soy.', 'Talent.', 'Footballers.', 'Models.', 'Musicians.'],
      after: ['Systems.', 'Languages.', 'Myths.', 'Infrastructure.', 'Imagination.'],
    },

    { kind: 'divider' },

    {
      kind: 'lines',
      lines: [
        'People often ask what transformed the Brazilian economy.',
        "They're asking the wrong question.",
        'The economy was never the beginning.',
        'It was the consequence.',
        "The first industry Brazil industrialised wasn't steel.",
      ],
    },
    // TIER 1 #2 — o pivô, o momento mais silencioso da página
    { kind: 'fullbleed', text: 'It was confidence.', theme: 'dark', scale: 'display' },

    { kind: 'divider' },

    {
      kind: 'lines',
      lines: [
        'By the early 2000s, Brazilian companies were no longer trying to become "the Brazilian version" of foreign brands.',
        'That expression disappeared.',
      ],
    },
    // TIER 3 — pares de negação
    {
      kind: 'negation',
      pairs: [
        ['There was no Brazilian Apple.', 'Only Arara Technologies.'],
        ['No Brazilian Disney.', 'Only Amazônia Studios.'],
        ['No Brazilian Studio 54.', 'Only Brazilian Hi-Fi.'],
      ],
    },
    {
      kind: 'lines',
      lines: ['Nobody introduced these institutions by comparing them to somewhere else.', 'Comparison had become obsolete.'],
    },

    { kind: 'divider' },

    {
      kind: 'lines',
      lines: [
        "Brazilian Hi-Fi wasn't a nightclub.",
        'It was where the country rehearsed its next version of itself.',
        'Designers met engineers.',
        'Filmmakers met physicists.',
        'Fashion editors argued with anthropologists until sunrise.',
        'Musicians tested unfinished albums in front of semiconductor founders.',
        "Ideas weren't pitched.",
        'They circulated.',
        'Every country has places where culture accelerates.',
        'New York had Studio 54.',
        'Manchester had the Haçienda.',
        'São Paulo had Brazilian Hi-Fi.',
        'The difference?',
        "Brazilian Hi-Fi didn't launch trends.",
      ],
    },
    // TIER 2 — o que diferencia Brazilian Hi-Fi de Studio 54
    { kind: 'lines', lines: ['It metabolised them.'], emphasize: [0] },

    { kind: 'divider' },

    {
      kind: 'lines',
      lines: [
        'Around the same time, another institution quietly emerged.',
        'Nobody could explain exactly what it was.',
        'Agency?',
        'Not really.',
        'Production company?',
        'Sometimes.',
        'Holding?',
        'Too small.',
        'Creative studio?',
        'Not even close.',
        'People simply called it:',
      ],
    },
    // TIER 1 #3 — a casa se nomeia
    { kind: 'fullbleed', text: '.THE BRAZILIAN FACTORY.', theme: 'dark', scale: 'wordmark' },
    {
      kind: 'lines',
      lines: [
        'Trying to define it always felt slightly embarrassing.',
        'Like trying to define the internet as a website.',
        'Technically possible.',
        'Conceptually useless.',
        "The Brazilian Factory didn't produce campaigns.",
        "It didn't produce films.",
        "It didn't produce brands.",
        'Those were side effects.',
      ],
    },
    // TIER 2 — o que a casa vende, dito sem vender
    { kind: 'lines', lines: ['Its real product was institutional imagination.'], emphasize: [0] },
    {
      kind: 'lines',
      lines: [
        'It transformed cultural signals into companies.',
        'Companies into movements.',
        'Movements into myths.',
        'If Brazilian Hi-Fi was where ideas collided...',
        'The Brazilian Factory was where they acquired permanent form.',
      ],
    },

    { kind: 'divider' },

    // ─── MELFIORE entra na história ───────────────────────────────────────
    {
      kind: 'lines',
      lines: [
        'This is also where MELFIORE enters the story.',
        'Nobody remembers the first night she appeared.',
        'Only that one day everyone already knew her.',
        'Not because she went viral.',
        'Virality was always considered a weak form of reputation.',
        'People knew MELFIORE because someone always had a story.',
      ],
    },
    // TIER 3 — as únicas aspas do artigo, conversa de festa ouvida pela metade
    {
      kind: 'stickers',
      fragments: [
        'I met her after a screening.',
        'She disappeared with a filmmaker from Recife.',
        'She convinced a software founder to finance an opera.',
        'She was wearing yellow over her eyes.',
      ],
    },
    {
      kind: 'lines',
      lines: [
        'Nobody could verify any of it.',
        'Nobody wanted to.',
        'Some figures become celebrities.',
        'Others become folklore.',
        'MELFIORE belonged to the second category.',
      ],
    },

    { kind: 'divider' },

    {
      kind: 'lines',
      lines: [
        'Foreign journalists kept asking the same question.',
        '"When did Brazil become a cultural superpower?"',
        'Brazilian historians usually smiled before answering.',
        '"We didn\'t."',
      ],
    },
    // TIER 1 #4 — o título voltando, na voz de outro personagem
    { kind: 'fullbleed', text: 'We simply stopped translating ourselves.', theme: 'dark', scale: 'display' },
    { kind: 'lines', lines: ['That sentence confused almost everyone.', 'Until they looked closer.'] },

    { kind: 'divider' },

    {
      kind: 'lines',
      lines: [
        'The suspension system developed by Gurgel for dirt roads in Goiás became the global standard for rural mobility in Australia.',
        'A Brazilian operating system designed for public schools became the preferred educational platform across Latin America and West Africa.',
        'Children in London dressed as Curupira on Halloween.',
        'Japanese animation studios openly cited Monteiro Lobato alongside Miyazaki.',
        'A filmmaker from Xique-Xique refused a Hollywood contract because his next feature had already secured R$ 500 million from a Brazilian cultural investment fund.',
      ],
    },
    // TIER 3 — o único número do texto
    { kind: 'stat', value: 500, formatted: '500', prefix: 'R$ ', label: 'milhões — o fundo cultural de Xique-Xique' },
    { kind: 'lines', lines: ['None of this happened because Brazil wanted global recognition.', 'It happened because recognition became inevitable.'] },

    { kind: 'divider' },

    {
      kind: 'lines',
      lines: [
        'For decades, critics misunderstood Brazilian originality.',
        'They assumed it emerged despite contradiction.',
        'They couldn\'t see that contradiction was the engine.',
        'Long before artificial intelligence began remixing culture, Brazil had already mastered the practice.',
        'Not in laboratories.',
        'In street festivals.',
        'In public squares.',
        'On carnival trucks.',
        'Inside dance halls.',
        'In improvised garages.',
        'The infamous Carreta Furacão became one of the earliest case studies taught in design schools worldwide.',
        'Not because it was absurd.',
        'Because it revealed a uniquely Brazilian technology.',
        'The ability to absorb global symbols...',
        '...and return them as something impossible to classify.',
        'Not imitation.',
        'Not parody.',
        'Transformation.',
        'Oswald de Andrade had already named the process a century earlier.',
      ],
    },
    // TIER 1 #5 — uma palavra sozinha, ChapterDivider no seu uso mais puro
    { kind: 'word', label: 'Anthropophagy.' },
    { kind: 'lines', lines: ['In this Brazil, anthropophagy never remained an artistic manifesto.'] },
    // TIER 2 — a piada séria: manifesto virou política
    { kind: 'lines', lines: ['It became industrial policy.'], emphasize: [0] },

    { kind: 'divider' },

    {
      kind: 'lines',
      lines: [
        "Foreign analysts spent years trying to decode the country's unexpected rise.",
        'Most failed because they kept measuring GDP.',
        'The real transformation had happened elsewhere.',
        'Brazil had quietly rewritten the grammar of influence.',
        'Hollywood no longer dictated imagination.',
        'Silicon Valley no longer monopolised innovation.',
        'Milan no longer defined elegance.',
        'Tokyo no longer owned the future.',
        'Not because those places declined.',
      ],
    },
    // TIER 2 — a tese geopolítica em nove palavras
    { kind: 'lines', lines: ['Because another accent entered the conversation.'], emphasize: [0] },

    { kind: 'divider' },

    {
      kind: 'lines',
      lines: [
        'Looking back, historians agree on one detail.',
        "The decisive moment wasn't technological.",
        "It wasn't economic.",
        "It wasn't geopolitical.",
        "It wasn't even political.",
        'It was psychological.',
      ],
    },
    // TIER 1 #6 — o clímax emocional. A ÚNICA virada para branco do artigo inteiro.
    {
      kind: 'fullbleed',
      text: 'The day Brazilian children stopped believing the future always spoke another language.',
      theme: 'light',
      scale: 'display',
    },
    {
      kind: 'lines',
      lines: [
        'Everything else followed naturally.',
        'Including the cars.',
        'Including the films.',
        'Including the billion-dollar companies.',
        'Including the currency.',
        'Including the confidence.',
      ],
    },
    {
      kind: 'lines',
      lines: [
        "Perhaps that's why nobody remembers exactly when Brazil became one of the world's cultural centres.",
        'They only remember something much simpler.',
        'The day choosing a Gurgel stopped meaning anything at all.',
        'Because, by then...',
      ],
    },
    // Fecho — 05_PILOTO-CENAS.md §6: sozinha, entrando devagar no preto, depois do branco do clímax.
    { kind: 'closing', text: '...it had always been there.' },
  ],
}
