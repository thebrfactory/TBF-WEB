// =============================================================================
// check-i18n — governança como código para o site bilíngue
//
// Três coisas que ninguém lembra de conferir à mão e que quebram em silêncio:
//   1. Rota em inglês sem gêmea em português (a pílula PT|EN cai em 404).
//   2. Dicionário com chave só num dos idiomas (texto some da tela).
//   3. Link interno cru dentro de uma view (leva o leitor de volta ao inglês).
//
// Roda em segundos, sem rede. `node scripts/check-i18n.mjs`
// =============================================================================

import { readdirSync, readFileSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { join, relative } from 'node:path'

// fileURLToPath e não `.pathname`: o caminho deste repo tem espaço no nome, e
// `.pathname` devolve %20, que o fs não resolve.
const RAIZ = fileURLToPath(new URL('..', import.meta.url))
const EN = join(RAIZ, 'src/app/(en)')
const PT = join(RAIZ, 'src/app/(pt)/pt')
const VIEWS = join(RAIZ, 'src/views')
const DICTS = join(RAIZ, 'src/content/i18n')

// Rotas que existem em um idioma só, de propósito. Toda entrada aqui precisa
// de justificativa: é dívida declarada, não exceção silenciosa.
const SEM_GEMEO = new Set(['studio'])

let falhas = 0
const erro = (msg) => {
  falhas++
  console.error('  ✗ ' + msg)
}

function rotas(base) {
  const achadas = []
  const anda = (dir, prefixo) => {
    let entradas
    try {
      entradas = readdirSync(dir)
    } catch {
      return
    }
    if (entradas.includes('page.tsx')) achadas.push(prefixo || '/')
    for (const e of entradas) {
      const cheio = join(dir, e)
      if (statSync(cheio).isDirectory()) anda(cheio, prefixo + '/' + e)
    }
  }
  anda(base, '')
  return achadas
}

console.log('\n1. Toda rota em inglês tem gêmea em português?')
const enRotas = rotas(EN)
const ptRotas = new Set(rotas(PT))
for (const r of enRotas) {
  const primeiro = r.split('/')[1] ?? ''
  if (SEM_GEMEO.has(primeiro)) continue
  if (!ptRotas.has(r)) erro(`falta a rota portuguesa de ${r} (esperada em src/app/(pt)/pt${r === '/' ? '' : r})`)
}
console.log(`   ${enRotas.length} rotas em inglês conferidas`)

console.log('\n2. Os dicionários têm as mesmas chaves nos dois idiomas?')
const arquivosDict = []
const varre = (dir) => {
  for (const e of readdirSync(dir)) {
    const cheio = join(dir, e)
    if (statSync(cheio).isDirectory()) varre(cheio)
    else if (e.endsWith('.ts')) arquivosDict.push(cheio)
  }
}
varre(DICTS)
for (const f of arquivosDict) {
  const src = readFileSync(f, 'utf8')
  // O contrato do tipo (`const pt: typeof en`) é quem obriga as chaves a
  // baterem; aqui só conferimos que o contrato está declarado.
  if (src.includes('const en =') && !/const pt: typeof en =/.test(src)) {
    erro(`${relative(RAIZ, f)}: o bloco pt precisa ser declarado como \`const pt: typeof en\` para o type-check cobrar as chaves`)
  }
}
console.log(`   ${arquivosDict.length} dicionários conferidos`)

console.log('\n3. Alguma view tem link interno cru?')
for (const f of readdirSync(VIEWS)) {
  const src = readFileSync(join(VIEWS, f), 'utf8')
  const crus = [...src.matchAll(/href=(?:"|')(\/(?!brandsystem|pt\/)[^"']*)(?:"|')/g)]
  for (const m of crus) {
    erro(`${f}: href="${m[1]}" não passa por localizedPath()`)
  }
}
console.log(`   ${readdirSync(VIEWS).length} views conferidas`)

console.log(falhas === 0 ? '\n✓ site bilíngue íntegro\n' : `\n${falhas} problema(s)\n`)
process.exit(falhas === 0 ? 0 : 1)
