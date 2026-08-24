// =============================================================================
// artigo-para-md.mjs: transforma uma materia do motor scrolly em .md legivel.
//
// Existe porque o texto de uma materia mora dentro de um objeto TypeScript, com
// chaves, aspas e marcacao de dispositivo no meio, e ninguem revisa redacao
// assim. Este script le o ARQUIVO DE VERDADE (nada de copiar o texto a mao, que
// e como as duas versoes divergem) e escreve o mesmo conteudo na ordem em que a
// pessoa le na tela, PT inteiro e depois EN inteiro.
//
// O guia de leitura do .md gerado mora AQUI, no gerador, e nao no arquivo de
// saida: regra 13 do CLAUDE.md, arquivo gerado nao guarda o proprio guia.
//
// uso:
//   node scripts/artigo-para-md.mjs <slug> [destino.md]
//   node scripts/artigo-para-md.mjs the-label-that-learned-to-ask-itself
//
// Rodar de novo depois de qualquer mudanca no .ts. O .md e derivado: editar ele
// nao muda o site.
// =============================================================================
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const AQUI = dirname(fileURLToPath(import.meta.url))
const RAIZ = resolve(AQUI, '..')
const slug = process.argv[2] ?? 'the-label-that-learned-to-ask-itself'
const origem = join(RAIZ, 'src/content/articles', `${slug}.ts`)
const destino = process.argv[3] ?? join(RAIZ, 'src/content/articles/_leitura', `${slug}.md`)

// O .ts so importa TIPO, que some na compilacao: tirando essa linha, o arquivo
// ja e JavaScript valido e o proprio node avalia. Sem parser, sem build.
const fonte = readFileSync(origem, 'utf8')
  .replace(/^import type .*$/m, '')
  // `export type { ... } from './types'` tambem some na compilacao, e o node nao
  // entende. A 1a materia reexporta os tipos daqui por compatibilidade, e sem
  // esta linha o gerador quebrava so nela.
  .replace(/^export type \{[^}]*\} from .*$/gm, '')
  .replace(/^export const (\w+): \w+ =/m, 'export const $1 =')
  .replace(/ as \w+(?=[,)\]}\n])/g, '')
const tmp = join(mkdtempSync(join(tmpdir(), 'tbf-md-')), 'artigo.mjs')
writeFileSync(tmp, fonte)
const mod = await import(pathToFileURL(tmp).href)
const art = Object.values(mod)[0]

const GUIA_DE_DISPOSITIVO = {
  pinned: 'BLOCO GRUDADO NA TELA',
  fullbleed: 'FRASE GIGANTE, TELA INTEIRA',
  word: 'ABERTURA DE CAPITULO',
  stat: 'NUMERO GRANDE',
  image: 'IMAGEM',
  mirror: 'ANTES E DEPOIS',
  negation: 'PARES DE NEGACAO',
  stickers: 'FRAGMENTOS SOLTOS',
  closing: 'FECHO',
}

function bloco(b, L) {
  const rot = GUIA_DE_DISPOSITIVO[b.kind]
  const marca = rot ? `\`${rot}\`\n\n` : ''
  switch (b.kind) {
    case 'lines':
      return b.lines
        .map((l, i) => ((b.emphasize ?? []).includes(i) ? `**${l[L]}**` : l[L]))
        .join('\n')
    case 'word':
      return `## ${b.label[L]}`
    case 'pinned':
      return marca + (b.kicker ? `_${b.kicker[L]}_\n\n` : '') + `> ${b.text[L]}`
    case 'fullbleed':
      return marca + `> # ${b.text[L]}`
    case 'stat':
      return marca + `> ## ${b.formatted[L]}\n> ${b.label[L]}`
    case 'closing':
      return marca + `> ${b.text[L]}`
    case 'image':
      return marca + `![${b.alt[L]}](${b.src})\n\n${b.caption ? b.caption[L] : ''}\n\n_${b.credit}_`
    case 'pair':
      return marca + b.items.map((i) => `![${i.alt[L]}](${i.src})`).join('\n\n')
    case 'mirror':
      return (
        marca +
        b.before.map((l) => `- ${l[L]}`).join('\n') +
        '\n\n' +
        b.after.map((l) => `- ${l[L]}`).join('\n')
      )
    case 'negation':
      return marca + b.pairs.map(([a, c]) => `- ${a[L]} / ${c[L]}`).join('\n')
    case 'raw':
      return marca + b.items.map((i) => `- ${b.fixed[L]} ${i[L]}`).join('\n')
    case 'stickers':
      return marca + b.fragments.map((f) => `- ${f[L]}`).join('\n')
    case 'divider':
      return '---'
    default:
      return `\`(bloco ${b.kind} sem renderizacao)\``
  }
}

function versao(L) {
  const cab = [
    `# ${art.heroTitle[L]}`,
    `**${art.heroSubtitle[L]}**`,
    `> ${art.deck[L]}`,
    `\`${art.category}\` · \`${art.publishedAt}\` · \`/${L}/editorial/${art.slug}\``,
  ].join('\n\n')
  return [cab, '---', ...art.blocks.map((b) => bloco(b, L))].join('\n\n')
}

const hoje = new Date().toISOString().slice(0, 10)
const saida = [
  `> Gerado por \`scripts/artigo-para-md.mjs\` em ${hoje}, a partir de`,
  `> \`src/content/articles/${art.slug}.ts\`. Este arquivo é DERIVADO: editar aqui`,
  `> não muda o site. Mexeu no texto, rode o script de novo.`,
  '',
  '## 🟢 EASY GUIDE',
  '',
  '> **O que é.** A redação inteira do artigo, do jeito que ela aparece na tela,',
  '> em texto simples. Primeiro a versão em português, depois a mesma em inglês.',
  '>',
  '> **Por que existe.** No site, esse texto mora dentro de um arquivo de',
  '> programação, cheio de aspas e símbolo no meio. Ninguém consegue revisar',
  '> redação daquele jeito. Aqui está só o texto.',
  '>',
  '> **O que decide.** Se a redação está boa. Ordem das frases, corte, repetição,',
  '> frase que sobra.',
  '>',
  '> 🔴 **O que precisa de VOCÊ.** Ler e dizer o que sai, o que fica e o que muda.',
  '> Pode escrever em cima, e eu passo suas mudanças para o site.',
  '>',
  '> **O que acontece se não responder.** Nada quebra. O artigo continua do jeito',
  '> que está, com o texto atual.',
  '>',
  '> As caixinhas cinzas no meio do texto (`FRASE GIGANTE, TELA INTEIRA`) dizem',
  '> como aquele pedaço aparece na tela, e não fazem parte da redação.',
  '',
  '---',
  '',
  versao('pt'),
  '',
  '---',
  '',
  versao('en'),
  '',
].join('\n')

writeFileSync(destino, saida)
console.log(`gravado: ${destino}`)
console.log(`${art.blocks.length} blocos, ${saida.length} caracteres`)
