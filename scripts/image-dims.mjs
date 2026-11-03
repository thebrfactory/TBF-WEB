#!/usr/bin/env node
// =============================================================================
// IMAGE DIMS · manifesto das medidas das fotos de public/
// -----------------------------------------------------------------------------
// Escreve src/data/image-dims.json no formato { "/images/x/y.webp": [w, h] }.
// Chave = o mesmo `src` que EditorialPhoto e MediaParallax recebem (barra inicial).
// POR QUE: o next.config.ts exclui public/ do pacote das functions da Vercel
// (limite de 250 MB). Sem public/ em runtime, a medida via sharp falharia na
// revalidacao ISR e toda foto cairia em 3:2. O manifesto viaja no bundle.
// Roda no prebuild. Chaves ordenadas para o diff ficar estavel.
// =============================================================================

import { readdir, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const raiz = process.cwd()
const publico = path.join(raiz, 'public')
const saida = path.join(raiz, 'src', 'data', 'image-dims.json')
const EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif'])

async function* varrer(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.')) continue
    const p = path.join(dir, e.name)
    if (e.isDirectory()) {
      if (dir === publico && e.name === '_ARQUIVO') continue
      yield* varrer(p)
    } else if (EXT.has(path.extname(e.name).toLowerCase())) yield p
  }
}

const dims = {}
for await (const arq of varrer(publico)) {
  try {
    const m = await sharp(arq).metadata()
    if (m.width && m.height) {
      dims['/' + path.relative(publico, arq).split(path.sep).join('/')] = [m.width, m.height]
    }
  } catch (err) {
    console.warn(`image-dims: pulou ${arq} (${err.message})`)
  }
}

const ordenado = Object.fromEntries(Object.keys(dims).sort().map((k) => [k, dims[k]]))
await mkdir(path.dirname(saida), { recursive: true })
const linhas = Object.entries(ordenado).map(([k, v]) => `${JSON.stringify(k)}:${JSON.stringify(v)}`)
await writeFile(saida, '{\n' + linhas.join(',\n') + '\n}\n')
console.log(`image-dims: ${Object.keys(ordenado).length} entradas`)
