// =============================================================================
// imageDims: medida nativa das fotos de /public, so no servidor.
// 1) manifesto src/data/image-dims.json (gerado no prebuild por
//    scripts/image-dims.mjs; viaja no bundle, public/ nao vai para a function)
// 2) sharp em public/ (fallback de dev, foto nova antes do manifesto)
// 3) 3:2
// =============================================================================

import path from 'node:path'
import sharp from 'sharp'
import manifest from '@/data/image-dims.json'

const dims = manifest as unknown as Record<string, [number, number]>
const cache = new Map<string, Promise<{ width: number; height: number }>>()

function normalize(src: string) {
  const clean = src.split('?')[0].split('#')[0]
  return clean.startsWith('/') ? clean : '/' + clean
}

export function nativeSize(src: string) {
  const key = normalize(src)
  const hit = dims[key]
  if (hit) return Promise.resolve({ width: hit[0], height: hit[1] })
  let p = cache.get(key)
  if (!p) {
    p = sharp(path.join(process.cwd(), 'public', key))
      .metadata()
      .then((m) => ({ width: m.width ?? 3, height: m.height ?? 2 }))
      .catch(() => ({ width: 3, height: 2 }))
    cache.set(key, p)
  }
  return p
}
