#!/usr/bin/env node
// =============================================================================
// AUDIT-LINKS - links internos quebrados (auditoria de higiene do site)
//
// Coleta todo `href="/..."` em src/ (string literal; ignora template literal
// com variavel, que nao da para resolver estaticamente) e confere se existe
// rota correspondente em src/app, considerando segmentos dinamicos
// ([slug], [...slug], [[...slug]]) e route groups ((en)/(pt)).
//
// Fora do escopo de "quebrado", tratados a parte:
//   - `/api/*`            rota de API, nao tem page.tsx
//   - `/brandsystem/*`    outra aplicacao servida por rewrite (next.config.ts)
//   - rotas com redirect permanente em next.config.ts (aponta certo, so nao
//     e o caminho canonico; reportado como CONFERIR, nao como 404)
// =============================================================================

import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative, extname } from 'node:path'
import { execSync } from 'node:child_process'

const ROOT = process.cwd()

// ─── 1. Rotas validas, a partir de src/app ─────────────────────────────────

function findFiles(nome) {
  const out = execSync(`find src/app -name "${nome}"`, { cwd: ROOT }).toString().trim()
  return out ? out.split('\n').filter(Boolean) : []
}

function segmentToRegex(seg) {
  if (seg.startsWith('[[...') && seg.endsWith(']]')) return null // optional catch-all: casa com zero ou mais, tratado a parte
  if (seg.startsWith('[...') && seg.endsWith(']')) return '[^/]+(?:/[^/]+)*'
  if (seg.startsWith('[') && seg.endsWith(']')) return '[^/]+'
  return seg.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function pageRouteToPattern(pageFile) {
  const parts = pageFile
    .replace(/^src\/app\//, '')
    .replace(/\/page\.tsx$/, '')
    .split('/')
    .filter((s) => s !== '(en)' && s !== '(pt)')

  const hasOptionalCatchAll = parts.some((s) => s.startsWith('[[...'))
  const regexParts = parts.map(segmentToRegex).filter((p) => p !== null)
  let pattern = '^/' + regexParts.join('/')
  if (hasOptionalCatchAll) {
    // A base sem o segmento tambem e valida (ex.: /studio e /studio/x)
    const base = pattern.replace(/\/$/, '')
    pattern = `(?:${base}(?:/.*)?)`
  }
  return new RegExp(pattern + '$')
}

const pageFiles = findFiles('page.tsx')
const routePatterns = pageFiles.map(pageRouteToPattern)
// Raiz `/` e `/pt` tambem sao validas quando o page.tsx e o proprio segmento vazio.

function routeExists(path) {
  const clean = path.split('?')[0].split('#')[0]
  if (clean === '') return true
  return routePatterns.some((re) => re.test(clean))
}

// ─── 2. Redirects permanentes declarados em next.config.ts ────────────────

function loadRedirectSources() {
  const src = readFileSync(join(ROOT, 'next.config.ts'), 'utf8')
  const sources = []
  const re = /source:\s*'([^']+)'/g
  let m
  while ((m = re.exec(src))) sources.push(m[1])
  return sources
}
const redirectSources = loadRedirectSources()

function matchesRedirectSource(path) {
  return redirectSources.some((src) => {
    const pattern = '^' + src.replace(/:[a-zA-Z]+\*/g, '.*').replace(/:[a-zA-Z]+/g, '[^/]+') + '$'
    return new RegExp(pattern).test(path)
  })
}

// ─── 3. Excecoes conhecidas, fora de escopo de "rota em src/app" ──────────

function isOutOfScope(path) {
  return (
    path.startsWith('/api/') ||
    path.startsWith('/brandsystem') ||
    path.startsWith('/#') || // ancora na home
    path === '/site.webmanifest' ||
    path === '/favicon.ico' ||
    /\.(svg|png|jpg|jpeg|webp|ico|xml|txt|json|pdf|woff2?|ttf|otf)$/.test(path.split('?')[0])
  )
}

// ─── 4. Varredura de href="/..." em src/ ───────────────────────────────────

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    const st = statSync(full)
    if (st.isDirectory()) {
      if (entry === 'node_modules' || entry === '.next') continue
      walk(full, out)
    } else if (['.tsx', '.ts'].includes(extname(entry))) {
      out.push(full)
    }
  }
  return out
}

const files = walk(join(ROOT, 'src'))
const hrefRe = /href\s*=\s*"(\/[^"]*)"/g

const quebrados = []
const conferir = []

for (const file of files) {
  const rel = relative(ROOT, file)
  const src = readFileSync(file, 'utf8')
  const lines = src.split('\n')
  lines.forEach((line, i) => {
    let m
    const re = new RegExp(hrefRe)
    while ((m = re.exec(line))) {
      const href = m[1]
      if (isOutOfScope(href)) continue
      if (routeExists(href)) continue
      if (matchesRedirectSource(href)) {
        conferir.push({ file: rel, line: i + 1, href })
        continue
      }
      quebrados.push({ file: rel, line: i + 1, href })
    }
  })
}

console.log(`Rotas conhecidas (page.tsx): ${pageFiles.length}`)
console.log(`Links internos quebrados (404 real): ${quebrados.length}`)
if (quebrados.length) {
  console.log('\norigem (arquivo:linha) | destino')
  for (const q of quebrados) console.log(`  ${q.file}:${q.line} -> ${q.href}`)
}

console.log(`\nLinks que apontam para rota com redirect permanente (funcionam, mas nao sao canonicos): ${conferir.length}`)
if (conferir.length) {
  for (const q of conferir) console.log(`  ${q.file}:${q.line} -> ${q.href}`)
}
