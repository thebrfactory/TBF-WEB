#!/usr/bin/env node
// =============================================================================
// check-zine-contract: contrato por categoria das matérias do /zine
//   Manifesto      -> precisa de `fiction` (aviso de ficção)
//   Field Research -> precisa de ao menos um item em `sources`
// Lê o texto dos arquivos (sem importar TS). `node scripts/check-zine-contract.mjs [pasta]`
// =============================================================================

import { readdirSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'

const RAIZ = fileURLToPath(new URL('..', import.meta.url))
const PASTA = process.argv[2] ?? join(RAIZ, 'src/content/articles')

const erros = []
for (const arq of readdirSync(PASTA)) {
  if (!arq.endsWith('.ts') || arq === 'types.ts' || arq === 'index.ts') continue
  const src = readFileSync(join(PASTA, arq), 'utf8').replace(/^\s*\/\/.*$/gm, '')
  const cat = src.match(/^\s*category:\s*['"]([^'"]+)['"]/m)?.[1]
  if (!cat) continue
  const slug = src.match(/^\s*slug:\s*['"]([^'"]+)['"]/m)?.[1] ?? arq
  if (cat === 'Manifesto' && !/^\s*fiction:\s*\{/m.test(src)) {
    erros.push(`${slug}: Manifesto precisa do campo fiction (aviso de ficção).`)
  }
  if (cat === 'Field Research') {
    const bloco = src.match(/^\s*sources:\s*\[([\s\S]*?)\n\s*\],?\s*$/m)?.[1] ?? ''
    if (!/\burl:\s*['"]/.test(bloco)) {
      erros.push(`${slug}: Field Research precisa de ao menos uma fonte em sources.`)
    }
  }
}

if (erros.length) {
  console.error('')
  console.error('🔴 CONTRATO DO ZINE QUEBRADO:')
  for (const e of erros) console.error(`   ${e}`)
  console.error('')
  process.exit(1)
}
