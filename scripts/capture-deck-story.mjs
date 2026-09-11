// Gerador dos quadros de story do CRIVO (1080x1920). A fonte vem em DECK_SRC.
// Viewport mobile REAL (540x960 @2x): o deck e responsivo, entao a slide PREENCHE o quadro.
// Print de desktop colado no meio de tela vertical foi o erro que isto conserta (10/09/2026).
// FONTE DE VERDADE: index.html do repo vitorthelobo/crivo-pitch, 16 slides. NAO o
// deck-v3.html do Desktop, que e de 30/08, parou em 15 slides e ja rendeu uma leva errada.
//   gh api repos/vitorthelobo/crivo-pitch/contents/index.html \
//     -H 'Accept: application/vnd.github.raw' > /tmp/crivo-index.html
// uso: DECK_SRC=/tmp/crivo-index.html node scripts/capture-deck-story.mjs <saida> <indice>...

import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const SRC = process.env.DECK_SRC || (process.env.HOME + '/Desktop/CRIVO/deck-v3.html');
const OUT = process.argv[2];
const SLIDES = process.argv.slice(3).map(Number);

// tira o preambulo de artifact (frame-runtime + base href), que nao existe fora do claude.ai
let html = fs.readFileSync(SRC, 'utf8');
html = html.replace(/<!-- frame-runtime -->[\s\S]*?<!-- \/frame-runtime -->/, '');
html = html.replace(/<base href="[^"]*">/, '');
const tmp = path.join(OUT, '_deck-limpo.html');
fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(tmp, html);

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 540, height: 960 },   // 1080x1920 com dsf 2
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});
await page.goto('file://' + tmp, { waitUntil: 'networkidle' });
await page.waitForTimeout(2500);           // fontes + blobs do fundo

// chrome de interacao nao existe em story estatico, e a casa nao usa traco horizontal
// (CLAUDE.md do TBF-WEB). O que sai, pedido dele em 11/09: o rotulo "DECK V3" do topo,
// o eyebrow "ATON PRAXIS - DESAFIO 39" e a linha "V3 - 2 apresentadores" da capa, e as
// duas reguas (a de baixo do wordmark e a que sai do eyebrow).
await page.addStyleTag({ content: `
  .navb, .hint { display:none !important; }
  .slide { transition:none !important; }
  .hud { display:none !important; }   /* wordmark pequeno do topo + contador */
  .marker::after { content:none !important; }
  .lockup .descr { border-top:0 !important; padding-top:0 !important; }
` });
await page.evaluate(() => {
  // O eyebrow ("ATON PRAXIS - DESAFIO 39", "ATO 2 - DOR Nº 1", "ATO 4 - VALOR") e
  // numeracao de ato de apresentacao: situa quem assiste ao pitch, nao quem ve story.
  document.querySelectorAll('.slide .marker').forEach((m) => m.remove());
  document.querySelectorAll('.slide')[0]?.querySelector('.fine')?.remove();
});

// `br.lb{display:none}` abaixo de 860px cola as palavras ("rankeiafornecedores",
// "ganha,medido"), porque nao ha espaco em volta da quebra no HTML. Troca por espaco.
// Defeito da fonte, nao da captura: o deck no celular mostra o mesmo.
await page.evaluate(() => {
  document.querySelectorAll('br.lb').forEach((b) => b.replaceWith(' '));
});

for (const n of SLIDES) {
  const label = await page.evaluate((i) => {
    const ss = [...document.querySelectorAll('.slide')];
    ss.forEach((s, k) => s.classList.toggle('active', k === i));
    const rail = document.querySelector('.rail i');
    if (rail) rail.style.width = ((i + 1) / ss.length * 100) + '%';
    const c = document.querySelector('.count');
    if (c) c.textContent = String(i + 1).padStart(2, '0') + ' / ' + String(ss.length).padStart(2, '0');
    return ss[i].getAttribute('aria-label');
  }, n);
  await page.waitForTimeout(600);
  const f = path.join(OUT, `slide-${String(n).padStart(2, '0')}.png`);
  await page.screenshot({ path: f });
  console.log(`${n}\t${label}\t${f}`);
}
await browser.close();
