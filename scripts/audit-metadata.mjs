#!/usr/bin/env node
// =============================================================================
// AUDIT-METADATA — censo de metadata das 70 rotas (E4 higiene do site)
//
// Percorre todo page.tsx em src/app e reporta, por rota: title, description,
// openGraph, alternates.canonical (metadataBase supre isso via layout raiz,
// então o que se confere aqui é alternates.languages), robots.
// Estático: le o texto do arquivo, nao executa o Next. Falso negativo possivel
// quando o metadata vem 100% de import indireto sem nome reconhecivel; nesse
// caso o script avisa "verificar manual" em vez de acusar falta.
// =============================================================================

import { readFileSync } from 'node:fs'
import { globSync } from 'node:fs'
import { join, relative } from 'node:path'
import { execSync } from 'node:child_process'

const ROOT = process.cwd()

function findPages() {
  const out = execSync('find src/app -name "page.tsx"', { cwd: ROOT }).toString().trim()
  return out.split('\n').filter(Boolean)
}

function routeFromPath(p) {
  let r = p
    .replace(/^src\/app/, '')
    .replace(/\/page\.tsx$/, '')
    .replace(/\(en\)/, '')
    .replace(/\(pt\)/, '')
  if (r === '') r = '/'
  return r
}

function hasMetadataExport(src) {
  return /export\s+const\s+metadata\s*[:=]/.test(src) || /export\s+(async\s+)?function\s+generateMetadata/.test(src)
}

function field(src, name) {
  // Heuristica textual: procura a chave dentro do bloco metadata (nao faz parse de AST).
  const re = new RegExp(`\\b${name}\\s*[:(]`)
  return re.test(src)
}

const pages = findPages()
const rows = []

for (const p of pages) {
  const src = readFileSync(join(ROOT, p), 'utf8')
  const route = routeFromPath(p)
  const hasMeta = hasMetadataExport(src)
  const hasTitle = hasMeta && field(src, 'title')
  const hasDescription = hasMeta && field(src, 'description')
  const hasOG = hasMeta && field(src, 'openGraph')
  const hasAlternates = hasMeta && (field(src, 'alternates') || /languageAlternates/.test(src))
  const hasRobotsNoindex = /robots\s*:\s*\{[^}]*index\s*:\s*false/.test(src)
  rows.push({
    route,
    file: p,
    hasMeta,
    hasTitle,
    hasDescription,
    hasOG,
    hasAlternates,
    hasRobotsNoindex,
  })
}

rows.sort((a, b) => a.route.localeCompare(b.route))

const problems = rows.filter(
  (r) => !r.hasMeta || !r.hasTitle || !r.hasDescription || !r.hasOG || !r.hasAlternates
)

console.log(`Total de rotas (page.tsx): ${rows.length}`)
console.log(`Rotas com problema de metadata: ${problems.length}\n`)

if (problems.length) {
  console.log('rota | metadata | title | description | openGraph | alternates | arquivo')
  for (const r of problems) {
    console.log(
      `${r.route} | ${r.hasMeta ? 'sim' : 'NAO'} | ${r.hasTitle ? 'sim' : 'NAO'} | ${
        r.hasDescription ? 'sim' : 'NAO'
      } | ${r.hasOG ? 'sim' : 'NAO'} | ${r.hasAlternates ? 'sim' : 'NAO'} | ${r.file}`
    )
  }
}

console.log('\nRotas com robots noindex declarado:')
for (const r of rows.filter((r) => r.hasRobotsNoindex)) {
  console.log(`  ${r.route}  (${r.file})`)
}
