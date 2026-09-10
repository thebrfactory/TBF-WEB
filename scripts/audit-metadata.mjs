#!/usr/bin/env node
// =============================================================================
// AUDIT-METADATA - censo de metadata das rotas (auditoria de higiene do site)
//
// Percorre todo page.tsx em src/app e reporta, por rota: title, description,
// openGraph, alternates.languages (hreflang PT/EN). Confere tambem se cada
// layout raiz ((en) e (pt)) declara metadataBase.
//
// Um campo ausente no proprio page.tsx conta como herdado quando um layout.tsx
// ANCESTRAL, que nao seja o layout raiz do idioma, ja declara o mesmo campo
// (caso do /studio, cujo layout so existe para marcar noindex). O layout raiz
// nao conta como heranca valida para title/description/openGraph/alternates:
// ele e o fallback do site inteiro, e cada rota precisa do proprio metadado
// para nao competir na busca com todas as outras.
//
// Estatico: le o texto do arquivo, nao executa o Next. Falso negativo possivel
// quando o metadata vem 100% de import indireto sem nome reconhecivel; nesse
// caso o script avisa "verificar manual" em vez de acusar falta.
// =============================================================================

import { readFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { execSync } from 'node:child_process'

const ROOT = process.cwd()

// Rotas que sao ferramenta/admin, nao conteudo editorial: censo mostra o dado
// mas nao entra na contagem de "problema" (mesma logica do sitemap.ts, que ja
// as declara fora de proposito).
const NAO_EDITORIAL = ['/studio']

function findFiles(nome) {
  const out = execSync(`find src/app -name "${nome}"`, { cwd: ROOT }).toString().trim()
  return out ? out.split('\n').filter(Boolean) : []
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

function isRootLayout(layoutPath) {
  // src/app/(en)/layout.tsx ou src/app/(pt)/layout.tsx
  return /^src\/app\/\((en|pt)\)\/layout\.tsx$/.test(layoutPath)
}

function hasMetadataExport(src) {
  return (
    /export\s+const\s+metadata\s*[:=]/.test(src) ||
    /export\s+(async\s+)?function\s+generateMetadata/.test(src)
  )
}

function field(src, name) {
  // Heuristica textual: procura a chave dentro do bloco metadata (nao faz parse de AST).
  const re = new RegExp(`\\b${name}\\s*[:(]`)
  return re.test(src)
}

/** Layouts ancestrais de um page.tsx, da raiz do route group ate o diretorio da pagina. */
function ancestorLayouts(pageFile) {
  const layouts = []
  let dir = dirname(pageFile)
  while (dir && dir.startsWith('src/app')) {
    const candidate = join(dir, 'layout.tsx')
    if (existsSync(join(ROOT, candidate))) layouts.push(candidate)
    if (dir === 'src/app') break
    dir = dirname(dir)
  }
  return layouts
}

const pages = findFiles('page.tsx')
const rows = []

for (const p of pages) {
  const src = readFileSync(join(ROOT, p), 'utf8')
  const route = routeFromPath(p)
  const ownHasMeta = hasMetadataExport(src)

  const ownFields = {
    title: ownHasMeta && field(src, 'title'),
    description: ownHasMeta && field(src, 'description'),
    openGraph: ownHasMeta && field(src, 'openGraph'),
    alternates: ownHasMeta && (field(src, 'alternates') || /languageAlternates/.test(src)),
  }
  const ownRobotsNoindex = /robots\s*:\s*\{[^}]*index\s*:\s*false/.test(src)

  // Heranca: layout ancestral NAO-raiz que declare o mesmo campo.
  let inheritedRobotsNoindex = false
  let inheritedAnyField = false
  for (const layoutPath of ancestorLayouts(p)) {
    if (isRootLayout(layoutPath)) continue
    const layoutSrc = readFileSync(join(ROOT, layoutPath), 'utf8')
    if (!hasMetadataExport(layoutSrc)) continue
    if (/robots\s*:\s*\{[^}]*index\s*:\s*false/.test(layoutSrc)) inheritedRobotsNoindex = true
    for (const key of Object.keys(ownFields)) {
      if (!ownFields[key] && field(layoutSrc, key)) {
        ownFields[key] = true
        inheritedAnyField = true
      }
    }
  }

  const hasMeta = ownHasMeta || inheritedAnyField || inheritedRobotsNoindex
  const hasRobotsNoindex = ownRobotsNoindex || inheritedRobotsNoindex

  rows.push({
    route,
    file: p,
    hasMeta,
    hasTitle: ownFields.title,
    hasDescription: ownFields.description,
    hasOG: ownFields.openGraph,
    hasAlternates: ownFields.alternates,
    hasRobotsNoindex,
    editorial: !NAO_EDITORIAL.some((rota) => route.includes(rota)),
  })
}

rows.sort((a, b) => a.route.localeCompare(b.route))

const problems = rows.filter(
  (r) => r.editorial && (!r.hasMeta || !r.hasTitle || !r.hasDescription || !r.hasOG || !r.hasAlternates)
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

const naoEditorial = rows.filter((r) => !r.editorial)
if (naoEditorial.length) {
  console.log('\nRotas fora do censo editorial (ferramenta/admin, so ciencia):')
  for (const r of naoEditorial) {
    console.log(
      `  ${r.route}  metadata=${r.hasMeta ? 'sim' : 'NAO'}  robots-noindex=${
        r.hasRobotsNoindex ? 'sim' : 'NAO'
      }  (${r.file})`
    )
  }
}

console.log('\nRotas com robots noindex declarado:')
for (const r of rows.filter((r) => r.hasRobotsNoindex)) {
  console.log(`  ${r.route}  (${r.file})`)
}

// ─── metadataBase nos layouts raiz ─────────────────────────────────────────
console.log('\nmetadataBase nos layouts raiz:')
for (const layoutFile of ['src/app/(en)/layout.tsx', 'src/app/(pt)/layout.tsx']) {
  const full = join(ROOT, layoutFile)
  if (!existsSync(full)) {
    console.log(`  ${layoutFile}: ARQUIVO NAO ENCONTRADO`)
    continue
  }
  const src = readFileSync(full, 'utf8')
  const tem = /metadataBase\s*:/.test(src)
  console.log(`  ${layoutFile}: ${tem ? 'sim' : 'NAO, falta'}`)
}
