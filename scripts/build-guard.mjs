#!/usr/bin/env node
// =============================================================================
// BUILD GUARD · o `npm run build` recusa rodar por cima de um `next dev` vivo
// -----------------------------------------------------------------------------
// POR QUE ELE EXISTE. Em 24/08/2026 o `npm run build` "quebrava em /careers e
// /about/quick-facts" e ficou dois dias registrado como bug do site, bloqueando
// deploy. Não era. O mesmo commit compila 87 de 87 páginas sem um erro numa
// cópia limpa do repositório. O que quebrava era a COLISÃO: os dois comandos
// escrevem na MESMA pasta `.next`, o build passa por cima do que o dev server
// está servindo, e o que sobra são rotas mortas e um build sujo. O sintoma
// aparece em página estática, por isso pareceu bug de rota.
//
// O CONSERTO É O GUARD, não um remendo em `/careers`. Diagnóstico que depende
// de alguém lembrar da colisão falha, sempre, a alguma taxa: é a regra do teto
// de regras da casa. Aqui a máquina lembra.
//
// 🔴 ELE PRECISA SER SILENCIOSO ONDE NÃO HÁ DEV SERVER, e isso inclui a Vercel:
// guard que chuta é pior que guard nenhum. Só barra quando ACHA um processo
// `next dev` rodando NESTE mesmo diretório. Sem certeza, ele cala e deixa
// passar. Em CI não existe `next dev`, então ele nunca dispara lá.
// =============================================================================

import { execSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { spawnSync } from 'node:child_process'

const raiz = process.cwd()

/** Devolve os PIDs de `next dev` cujo diretório de trabalho é esta pasta. */
function devServersDaqui() {
  // `ps` não existe em toda imagem de CI. Sem ele, o guard cala.
  let saida = ''
  try {
    saida = execSync('ps -Ao pid=,command=', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })
  } catch {
    return []
  }

  const candidatos = []
  for (const linha of saida.split('\n')) {
    const m = linha.trim().match(/^(\d+)\s+(.*)$/)
    if (!m) continue
    const [, pid, cmd] = m
    // O processo pai aparece como ".../node_modules/.bin/next dev"; o filho, que
    // é quem serve de verdade, aparece como "next-server (v15...)". O pai é o
    // que carrega o caminho, e é ele que dá a certeza de ser ESTE projeto.
    if (!/[/\\]next(\.js)?\s+dev\b|[/\\]\.bin[/\\]next\s+dev\b/.test(cmd)) continue
    if (!cmd.includes(raiz)) continue
    candidatos.push(pid)
  }
  return candidatos
}

const pids = devServersDaqui()

if (pids.length > 0 && existsSync(`${raiz}/.next`)) {
  console.error('')
  console.error('🔴 BUILD BARRADO: existe um `next dev` rodando nesta mesma pasta.')
  console.error('')
  console.error(`   PID: ${pids.join(', ')}`)
  console.error('')
  console.error('   Os dois comandos escrevem na MESMA pasta .next. Rodar o build por')
  console.error('   cima do dev server derruba as rotas que ele está servindo e deixa')
  console.error('   um build sujo, que depois aparece como "erro" em página estática.')
  console.error('   Foi o que travou o deploy em 24/08/2026.')
  console.error('')
  console.error('   Para seguir, escolha um:')
  console.error(`     1. pare o dev server:  kill ${pids.join(' ')}`)
  console.error('     2. limpe e rode:       rm -rf .next && npm run build')
  console.error('     3. build sem tocar no dev server, numa cópia do repo:')
  console.error('        git worktree add --detach /tmp/tbf-build HEAD')
  console.error(`        ln -s "${raiz}/node_modules" /tmp/tbf-build/node_modules`)
  console.error('        cd /tmp/tbf-build && npm run build')
  console.error('')
  process.exit(1)
}

// Contrato do zine: Manifesto sem aviso de ficção ou Field Research sem fonte
// reprova o build (scripts/check-zine-contract.mjs).
const contrato = spawnSync(process.execPath, [`${raiz}/scripts/check-zine-contract.mjs`], { stdio: 'inherit' })
if (contrato.status !== 0) process.exit(1)
