#!/usr/bin/env node
// =============================================================================
// check-stories: o layout padrão de stories mora só em src/components/StoryPlayer/.
// Falha se arquivo de fora renderizar barras de progresso de story, sobrescrever
// o cromo do player ou declarar outro player/modal de story.
// Comentários são ignorados. `node scripts/check-stories.mjs`
// =============================================================================

import { readdirSync, readFileSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { join, relative, sep } from 'node:path'

const RAIZ = fileURLToPath(new URL('..', import.meta.url))
const SRC = join(RAIZ, 'src')
const DONO = join('src', 'components', 'StoryPlayer') + sep

const REGRAS = [
  [/\b(playerClassName|deckClassName|thumbsClassName)\b/, 'prop de classe no player (cromo é só do StoryPlayer)'],
  [/\.p3-(story|deck-flat|thumbs)\b|["'`]p3-(story|deck-flat|thumbs)\b/, 'seletor/classe que mexe no cromo do player'],
  [/StoryPlayer\.module\.css|StoryModal\.module\.css/, 'import do CSS do player fora da pasta dele'],
  [/\b(?:function|const|class)\s+\w*Story\w*(?:Modal|Deck|Player|Viewer|Lightbox)\b/, 'outro player/modal de story declarado'],
  [/\bStoryDeck\b|\bCaseStoryModal\b|\bStoryModal\b/, 'componente de story antigo'],
  [/(?:story|stories)[-_]?(?:bars?|progress|segments?)\b|\bstoryFill\b|\bstory(?:Bar|Progress|Segment)s?\b/i, 'barras de progresso de story fora do player'],
]

function arquivos(dir) {
  const out = []
  for (const nome of readdirSync(dir)) {
    const p = join(dir, nome)
    if (statSync(p).isDirectory()) out.push(...arquivos(p))
    else if (/\.(tsx?|css)$/.test(nome)) out.push(p)
  }
  return out
}

const limpa = (txt) => txt.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '')

const erros = []
for (const arq of arquivos(SRC)) {
  const rel = relative(RAIZ, arq)
  if (rel.startsWith(DONO)) continue
  const linhas = limpa(readFileSync(arq, 'utf8')).split('\n')
  linhas.forEach((linha, n) => {
    for (const [re, msg] of REGRAS) {
      if (re.test(linha)) erros.push(`${rel}: ${msg}: ${linha.trim().slice(0, 90)}`)
    }
  })
}

if (erros.length) {
  console.error('\nSTORIES FORA DO LAYOUT PADRAO:')
  for (const e of erros) console.error(`   ${e}`)
  console.error('\nUse <StoryPlayer> de src/components/StoryPlayer/StoryPlayer.tsx.\n')
  process.exit(1)
}
console.log('check:stories ok: nenhum story fora de src/components/StoryPlayer/.')
